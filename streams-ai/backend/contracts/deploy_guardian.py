import os
from algosdk.v2client import algod
from algosdk import mnemonic
from algosdk.transaction import ApplicationCreateTxn, StateSchema, wait_for_confirmation
from dotenv import load_dotenv
import base64

# Load .env
load_dotenv()

ALGOD_URL = os.getenv("ALGOD_URL")
ALGOD_TOKEN = os.getenv("ALGOD_TOKEN")
MERCHANT_ADDR = os.getenv("MERCHANT_ADDR")
MERCHANT_MN = os.getenv("MERCHANT_MN").strip().strip('"')

PRIVATE_KEY = mnemonic.to_private_key(MERCHANT_MN)
client = algod.AlgodClient(ALGOD_TOKEN, ALGOD_URL)

def compile_program(client, source_path):
    with open(source_path, "r") as f:
        source_code = f.read()
    response = client.compile(source_code)
    print("Compiler Response:", response)
    return base64.b64decode(response["result"])

def deploy_app():
    approval = compile_program(client, "contracts/guardian_approval.teal")
    clear = compile_program(client, "contracts/guardian_clear.teal")

    global_schema = StateSchema(num_uints=5, num_byte_slices=1)  # Includes admin address
    local_schema = StateSchema(num_uints=0, num_byte_slices=0)

    params = client.suggested_params()

    txn = ApplicationCreateTxn(
        sender=MERCHANT_ADDR,
        sp=params,
        on_complete=0,
        approval_program=approval,
        clear_program=clear,
        global_schema=global_schema,
        local_schema=local_schema,
    )

    signed_txn = txn.sign(PRIVATE_KEY)
    txid = client.send_transaction(signed_txn)

    print(f"⏳ Deploying Guardian App... TXID: {txid}")
    result = wait_for_confirmation(client, txid, 4)
    app_id = result["application-index"]

    print(f"✅ Guardian App deployed successfully! App ID: {app_id}")

    with open("contracts/guardian_app_id.txt", "w") as f:
        f.write(str(app_id))

    return app_id

if __name__ == "__main__":
    deploy_app()
