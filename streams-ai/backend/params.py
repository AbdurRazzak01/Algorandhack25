# backend/params.py

from fastapi import APIRouter
from algosdk.v2client import algod
import os

router = APIRouter()

ALGOD_URL = os.getenv("ALGOD_URL")
ALGOD_TOKEN = os.getenv("ALGOD_TOKEN", "")

client = algod.AlgodClient(ALGOD_TOKEN, ALGOD_URL)

@router.get("/params")
def get_suggested_params():
    sp = client.suggested_params()
    return {
        "fee": sp.fee,
        "first": sp.first,
        "last": sp.last,
        "gen": sp.gen,
        "gh": sp.gh,
        "flat_fee": sp.flat_fee,
    }
