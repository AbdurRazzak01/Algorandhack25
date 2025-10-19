import os, base64
from fastapi import APIRouter
from pydantic import BaseModel
from algosdk.v2client import algod
from algosdk.transaction import PaymentTxn, ApplicationNoOpTxn, LogicSigTransaction, calculate_group_id
from algosdk import mnemonic, logic, account, transaction
from dotenv import load_dotenv

load_dotenv()

ALGOD_URL = os.getenv("ALGOD_URL")
ALGOD_TOKEN = os.getenv("ALGOD_TOKEN")
APP_ID = int(os.getenv("APP_ID"))
MERCHANT_MN = os.getenv("MERCHANT_MN")
ESCROW_PROG_B64 = os.getenv("ESCROW_PROG_B64")

client = algod.AlgodClient(ALGOD_TOKEN, ALGOD_URL, headers={"X-API-Key": ALGOD_TOKEN} if ALGOD_TOKEN != "a" else {})
merchant_sk = mnemonic.to_private_key(MERCHANT_MN)
merchant_addr = account.address_from_private_key(merchant_sk)

router = APIRouter(prefix="/stream", tags=["stream"])

class WDReq(BaseModel):
    user: str
    amount: int

@router.post("/withdraw")
def withdraw(req: WDReq):
    prog = base64.b64decode(ESCROW_PROG_B64)
    lsig = logic.LogicSigAccount(program=prog)
    escrow_addr = lsig.address()

    sp = client.suggested_params()
    pay = PaymentTxn(escrow_addr, sp, merchant_addr, req.amount)
    app_args = [b"auth_wd", req.amount.to_bytes(8, "big")]
    app_call = ApplicationNoOpTxn(merchant_addr, sp, APP_ID, app_args, accounts=[req.user])

    gid = calculate_group_id([pay, app_call])
    pay.group = gid
    app_call.group = gid

    stx_pay = LogicSigTransaction(pay, lsig)
    stx_app = app_call.sign(merchant_sk)

    txid = client.send_transactions([stx_pay, stx_app])
    res = transaction.wait_for_confirmation(client, txid, 4)
    return {"txid": txid, "confirmed": res.get("confirmed-round")}
