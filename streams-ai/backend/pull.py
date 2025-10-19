# backend/pull.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import base64
from algosdk.v2client import algod
from algosdk import transaction, encoding

router = APIRouter()

ALGOD_URL = os.getenv("ALGOD_URL")
ALGOD_TOKEN = os.getenv("ALGOD_TOKEN", "")
APP_ID = int(os.getenv("APP_ID", 0))

client = algod.AlgodClient(ALGOD_TOKEN, ALGOD_URL)

# ---- Request Body Models ----
class DiscountInput(BaseModel):
    user: str
    discount_bps: int
    user_nonce: int

class PullInput(BaseModel):
    user: str
    discounted_amount: int
    signed_pay_b64: str

# ---- Routes ----

@router.post("/apply-discount")
def apply_discount(data: DiscountInput):
    # ✅ This is just a placeholder — you should update this for real validation.
    if not data.user or data.discount_bps < 0:
        raise HTTPException(status_code=400, detail="Invalid discount input")
    print(f"✅ Discount applied for {data.user}: {data.discount_bps} bps")
    return {"ok": True}

@router.post("/pull")
def pull(data: PullInput):
    try:
        # decode signed payment txn
        signed_bytes = base64.b64decode(data.signed_pay_b64)
        signed_txn = encoding.future_msgpack_decode(signed_bytes)

        # submit to blockchain
        txid = client.send_transaction(signed_txn)
        print(f"✅ Submitted pull payment tx: {txid}")
        return {"txid": txid}
    except Exception as e:
        print(f"❌ Error during pull: {e}")
        raise HTTPException(status_code=500, detail=str(e))
