export type Plan = "monthly" | "annual" | "streaming";

export type FlowState =
  | { step: "DISCONNECTED" }
  | { step: "CONNECTED" }
  | { step: "PLAN_SELECTED"; plan: Plan; discountBps: number }
  | { step: "OFFERING"; plan: Plan; discountBps: number }
  | { step: "PAYMENT_READY"; plan: Plan; discountBps: number }
  | { step: "PAID"; txid: string }
  | { step: "STREAMING"; lastTxid?: string }
  | { step: "RECEIPTS" };

export type Action =
  | { type: "CONNECT_SUCCESS" }
  | { type: "SELECT_PLAN"; plan: Plan }
  | { type: "OFFER_SHOWN"; discountBps: number }
  | { type: "OFFER_ACCEPTED" }
  | { type: "PAY_SUCCESS"; txid: string }
  | { type: "STREAM_START" }
  | { type: "STREAM_WITHDRAW"; txid: string }
  | { type: "GO_RECEIPTS" }
  | { type: "RESET" };

export function reducer(s: FlowState, a: Action): FlowState {
  switch (a.type) {
    case "CONNECT_SUCCESS": return { step: "CONNECTED" };
    case "SELECT_PLAN":
      return { step: "PLAN_SELECTED", plan: a.plan, discountBps: 0 };
    case "OFFER_SHOWN":
      if (s.step === "PLAN_SELECTED" || s.step === "OFFERING")
        return { step: "OFFERING", plan: s.plan, discountBps: a.discountBps };
      return s;
    case "OFFER_ACCEPTED":
      if (s.step === "OFFERING")
        return { step: "PAYMENT_READY", plan: s.plan, discountBps: s.discountBps };
      return s;
    case "PAY_SUCCESS": return { step: "PAID", txid: a.txid };
    case "STREAM_START": return { step: "STREAMING" };
    case "STREAM_WITHDRAW": return { step: "STREAMING", lastTxid: a.txid };
    case "GO_RECEIPTS": return { step: "RECEIPTS" };
    case "RESET": return { step: "DISCONNECTED" };
    default: return s;
  }
}

export const initial: FlowState = { step: "DISCONNECTED" };
