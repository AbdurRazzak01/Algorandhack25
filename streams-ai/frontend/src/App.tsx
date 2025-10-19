import { useEffect, useReducer, useState } from "react";
import { initial, reducer, type Plan } from "./state/flow";
import { pera } from "./lib/pera";
import { fetchParams } from "./lib/params";
import { api } from "./lib/api";
import algosdk, { SuggestedParams } from "algosdk";

import HeroConnect from "./scenes/HeroConnect";
import PlansScene from "./scenes/PlansScene";
import AgentScene from "./scenes/AgentScene";
import PayScene from "./scenes/PayScene";
import ReceiptsScene from "./scenes/ReceiptsScene";

import { TxToast } from "./components/TxToast";
import NeonButton from "./components/NeonButton";

const MERCHANT = import.meta.env.VITE_MERCHANT as string;
const EXPLORER = import.meta.env.VITE_EXPLORER_BASE || "https://testnet.algoexplorer.io/tx/";

export default function App() {
  const [addr, setAddr] = useState<string>();
  const [state, dispatch] = useReducer(reducer, initial);
  const [loading, setLoading] = useState(false);
  const [pct, setPct] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [discountBps, setDiscountBps] = useState(0);
  const [nonce] = useState(1);

  useEffect(() => {
    const t = setInterval(() => setPct((p) => (p > 0.98 ? 0 : +(p + 0.02).toFixed(2))), 320);
    return () => clearInterval(t);
  }, []);

  const speak = (text: string) => {
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1.03;
      u.pitch = 1.05;
      u.onstart = () => setSpeaking(true);
      u.onend = () => setSpeaking(false);
      speechSynthesis.speak(u);
    } catch {}
  };

  const connect = async () => {
    const addrs = await pera.connect();
    setAddr(addrs[0]);
    dispatch({ type: "CONNECT_SUCCESS" });
  };

  const handleSelectPlan = (plan: Plan) => dispatch({ type: "SELECT_PLAN", plan });

  const showOffer = () => {
    setDiscountBps(2000); // 20%
    dispatch({ type: "OFFER_SHOWN", discountBps: 2000 });
    speak("You're approaching your usage threshold. Switch to annual now and save 20%. Say yes to accept or no to decline.");
  };

  const acceptOffer = async () => {
    if (!addr) return;
    setLoading(true);
    try {
      await api.post("/apply-discount", {
        user: addr,
        discount_bps: 2000,
        user_nonce: nonce,
      });
      dispatch({ type: "OFFER_ACCEPTED" });
    } catch (e: any) {
      alert("Apply discount failed: " + (e?.response?.data?.detail || e.message));
    } finally {
      setLoading(false);
    }
  };

  const getParams = async (): Promise<SuggestedParams> => await fetchParams(import.meta.env.VITE_AGENT_API as string);

  const signUserPayment = async (from: string, to: string, amountMicro: number): Promise<string> => {
    const sp = await getParams();
    const payTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from,
      to,
      amount: amountMicro,
      suggestedParams: sp,
    });

    const unsigned = payTxn.toByte();
    const txnsToSign = [{ txn: unsigned, signers: [from] }];
    const signed = await pera.signTransaction([txnsToSign as any]);
    const b64 = btoa(String.fromCharCode(...new Uint8Array(signed[0].signedTxn)));
    return b64;
  };

  const payAndPull = async () => {
    if (!addr) return;
    setLoading(true);
    try {
      const baseMicro = 2_000_000; // 2 ALGO
      const amount = Math.floor(baseMicro * (1 - discountBps / 10000));
      const signed_b64 = await signUserPayment(addr, MERCHANT, amount);

      const r = await api.post("/pull", {
        user: addr,
        discounted_amount: amount,
        signed_pay_b64: signed_b64,
      });

      dispatch({ type: "PAY_SUCCESS", txid: r.data.group_txid || r.data.txid });
    } catch (e: any) {
      alert("Pull failed: " + (e?.response?.data?.detail || e.message));
    } finally {
      setLoading(false);
    }
  };

  const withdrawStream = async () => {
    if (!addr) return;
    setLoading(true);
    try {
      const r = await api.post("/stream/withdraw", {
        user: addr,
        amount: 20_000, // Example: 0.02 ALGO
      });
      dispatch({ type: "STREAM_WITHDRAW", txid: r.data.txid });
    } catch (e: any) {
      alert("Withdraw failed: " + (e?.response?.data?.detail || e.message));
    } finally {
      setLoading(false);
    }
  };

  const topbar = (
    <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-xl bg-gradient-to-br from-acc1 to-acc2" />
        <div className="text-white/80 text-sm">StreamSmart.AI</div>
      </div>
      <NeonButton onClick={!addr ? () => connect() : () => {}}>
        {addr ? addr.slice(0, 6) + "…" + addr.slice(-4) : "Connect Pera"}
      </NeonButton>
    </nav>
  );

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="aurora" />
      <div className="noise" />
      {topbar}

      {state.step === "DISCONNECTED" && <HeroConnect addr={addr} onConnect={connect} />}

      {state.step === "CONNECTED" && (
        <PlansScene
          selected={undefined}
          onSelect={handleSelectPlan}
          onNext={() => dispatch({ type: "SELECT_PLAN", plan: "monthly" })}
        />
      )}

      {state.step === "PLAN_SELECTED" && (
        <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
          <PlansScene selected={state.plan} onSelect={handleSelectPlan} onNext={showOffer} />
        </div>
      )}

      {(state.step === "OFFERING" || state.step === "PAYMENT_READY") && (
        <AgentScene
          onAccept={acceptOffer}
          onDecline={() => alert("Offer declined")}
          onSpeak={() => speak("Switch to annual now and save twenty percent. Say yes to accept or no to decline.")}
          speaking={speaking}
        />
      )}

      {state.step === "PAYMENT_READY" && (
        <PayScene
          mode={state.plan === "streaming" ? "stream" : "pull"}
          price={
            state.plan === "annual"
              ? ` ${(20 * (1 - discountBps / 10000)).toFixed(4)} ALGO`
              : ` ${(2 * (1 - discountBps / 10000)).toFixed(4)} ALGO`
          }
          onPay={payAndPull}
          onWithdraw={withdrawStream}
          onPause={() => alert("Pause (wire app call)")}
          pct={pct}
          loading={loading}
        />
      )}

      {state.step === "PAID" && <ReceiptsScene txid={state.txid} explorer={EXPLORER} />}

      {state.step === "STREAMING" && (
        <PayScene
          mode="stream"
          price=""
          onPay={() => {}}
          onWithdraw={withdrawStream}
          onPause={() => alert("Pause (wire app call)")}
          pct={pct}
          loading={loading}
        />
      )}

      <TxToast
        txid={
          state.step === "PAID"
            ? state.txid
            : state.step === "STREAMING" && state.lastTxid
            ? state.lastTxid
            : undefined
        }
        explorer={EXPLORER}
      />

      <footer className="text-center text-white/40 text-xs py-8">
        StreamSmart.AI — Agent-smart subscriptions on Algorand
      </footer>
    </div>
  );
}
