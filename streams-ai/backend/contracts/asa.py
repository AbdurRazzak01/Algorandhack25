import json
import os
from algosdk.v2client import algod
from algosdk import account, mnemonic
from algosdk.transaction import AssetConfigTxn, wait_for_confirmation
from dotenv import load_dotenv

# Load .env
load_dotenv()

# 🔐 Load from .env
ALGOD_URL = os.getenv("ALGOD_URL")
ALGOD_TOKEN = os.getenv("ALGOD_TOKEN")
MERCHANT_ADDR = os.getenv("MERCHANT_ADDR")
MERCHANT_MN = os.getenv("MERCHANT_MN").strip().strip('"')

# ✅ Validate mnemonic
words = MERCHANT_MN.split()
if len(words) != 25:
    raise ValueError(f"Mnemonic must be exactly 25 words, got {len(words)}")

# 🔑 Derive key
merchant_sk = mnemonic.to_private_key(MERCHANT_MN)

# 🔗 Connect to Algorand node
client = algod.AlgodClient(ALGOD_TOKEN, ALGOD_URL)


def create_asa(name, unit):
    print(f"🚀 Creating ASA {name} ({unit})...")
    params = client.suggested_params()

    txn = AssetConfigTxn(
        sender=MERCHANT_ADDR,
        sp=params,
        total=1_000_000_000,   # 1B tokens
        decimals=6,
        default_frozen=False,
        unit_name=unit,
        asset_name=name,
        manager=MERCHANT_ADDR,
        reserve=MERCHANT_ADDR,
        freeze=MERCHANT_ADDR,
        clawback=MERCHANT_ADDR,
        strict_empty_address_check=False,
    )

    signed = txn.sign(merchant_sk)
    txid = client.send_transaction(signed)
    print(f"⏳ Waiting for confirmation... TXID = {txid}")
    result = wait_for_confirmation(client, txid, 4)
    asset_id = result["asset-index"]
    print(f"✅ Created ASA: {name} ({unit}) with ID: {asset_id}")
    return asset_id


if __name__ == "__main__":
    ausd_id = create_asa("Algorand USD", "AUSD")
    sausd_id = create_asa("Staked Algorand USD", "sAUSD")

    with open("contracts/asa_ids.json", "w") as f:
        json.dump({"AUSD_ID": ausd_id, "SAUSD_ID": sausd_id}, f, indent=2)

    print("📦 ASA IDs saved to contracts/asa_ids.json")
