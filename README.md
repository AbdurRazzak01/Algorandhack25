
You said:
# AlgoStable: Algorithm-Backed Synthetic Stablecoin on Algorand

![Algorand](https://img.shields.io/badge/Built_on-Algorand-blue.svg)
![Python](https://img.shields.io/badge/Backend-Python%20%7C%20FastAPI-green.svg)
![Smart Contracts](https://img.shields.io/badge/Smart_Contracts-TEAL%20%7C%20PyTeal-orange.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---
[![Watch the video](https://img.youtube.com/vi/eCgZITySS2o/0.jpg)](https://youtu.be/eCgZITySS2o)

<iframe width="560" height="315" src="https://www.youtube.com/embed/eCgZITySS2o" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 🎯 Overview

**AUSD** is a synthetic stablecoin protocol built on **Algorand**, designed to maintain price stability using algorithmic backing instead of traditional fiat reserves. The system enables:

- ⚖️ **Minting/Redeeming AUSD** backed by ALGO
- 📉 **Real-time Oracle Integration** (via Gora Network)
- 🔁 **Swapping AUSD with other assets**
- 📈 **Yield generation through Vault Staking**
- 🔐 Smart contracts for secure decentralized issuance
- 🧠 A **hedging bot** simulating off-chain market neutrality

This is ideal for developers, DeFi builders, and anyone exploring stablecoin mechanics on Algorand.

---

## 📽 Demo Video

👉 [![Watch the Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE)

> 📹 Full walkthrough of minting, oracle, and vaults.

---

## 🧠 Use Case

- 🌍 **Stable medium of exchange** for users in volatile markets
- 💱 **Low-cost synthetic USD** for on-chain payments
- 📊 **Decentralized yield generation** without centralized intermediaries
- 🧪 **Simulated hedging** against collateral exposure using off-chain logic

---


---

## ⚙️ Technologies Used

| Component       | Tech Stack                        |
|----------------|------------------------------------|
| 🔗 Blockchain   | [Algorand](https://developer.algorand.org) |
| ⚙️ Smart Contracts | TEAL (with PyTeal)              |
| ⚡ Backend      | Python, FastAPI, Algorand SDK     |
| 📡 Oracle       | [Gora Network](https://gora.io/) (on-chain) |
| 🧠 Hedging Bot  | Python simulation + CoinGecko API |
| 🔁 Swap Engine  | Tinyman integration (or mock AMM) |
| 🧪 Testing      | Python (asyncio, CLI)             |

---

## 🔐 Smart Contract Design

### ✅ Mint/Redeem Contract

- Users stake ALGO or collateral into the vault
- AUSD is minted algorithmically based on the current oracle price
- Burn (redeem) flow reduces supply

### 🏦 Vault Contract

- Accepts deposits
- Optional yield hooks
- Tracks collateral ratio

### 🔮 Oracle Contract (via Gora)

- Periodically updated price feed (e.g., ALGO/USD)
- Powered by on-chain oracle data
- Oracle value is fetched via FastAPI backend and displayed to user

---

## 🔄 Stablecoin Stability Logic

- **Price source**: Real-time price from Gora Oracle contract
- **Peg mechanism**:
  - Minting requires ALGO collateral at real market price
  - If price drops, redemption + burning adjust the supply
  - Hedging bot simulates maintaining neutrality via shorting

---
After Running asa: 

🚀 Creating ASA Algorand USD (AUSD)...
⏳ Waiting for confirmation... TXID = TBNP4B7F5I2W7APIIPF46RWGEX2XX25RK655UFK4ETZTHAHIVAJA
✅ Created ASA: Algorand USD (AUSD) with ID: 747999145
🚀 Creating ASA Staked Algorand USD (sAUSD)...
⏳ Waiting for confirmation... TXID = NEWYAZGWHUEPEYRCS6U5Q2DUG5L2LSJVKU4F72NIM5OURXWJFKUQ
✅ Created ASA: Staked Algorand USD (sAUSD) with ID: 747999146
📦 ASA IDs saved to contracts/asa_ids.json
(.venv) mdabdurrazzak@MDs-MacBook-Pro backend % 

Compiler Response: {'hash': 'XUJZ2QJ7P5CFRMHCRRC6VU2YKI5UV2UBBJKJ26KYSEFT2AAKTVMTZX6Q4M', 'result': 'CCACAAEmAgtUb3RhbE1pbnRlZAZQYXVzZWQxGCISQAA3MRkiEkAAByNAAAEAI0M2GgCABG1pbnQSQAAWNhoAgAZyZWRlZW0SQAABAIgAJkIADogADUIACCgiZykiZyNDI0OKAAApZCISRCgoZDYaARcIZyNDigAAKWQiEkQoKGQ2GgEXCWcjQw=='}
Compiler Response: {'hash': 'OHV4S2PM4R3XXXQOIKERQ6OV2OYRZZG6A66XSUVR5ADF4NXVPEZRXMYYQE', 'result': 'CIEBQw=='}
⏳ Deploying MintRedeem App... TXID: TZWV2GR2DGCRTORVIXD3IVHRVG2M5YCROS2N3FHQY2G2EEUFH2DQ
✅ MintRedeem App deployed successfully! App ID: 747999340
(.venv) mdabdurrazzak@MDs-MacBook-Pro backend % 


 Compiled and wrote vault_approval.teal and vault_clear.teal
(.venv) mdabdurrazzak@MDs-MacBook-Pro backend % python3 contracts/deploy_vault.py

Compiler Response: {'hash': 'DVXYR2LAN7273WEINOU4SU2Q3H52TAHB2MT6Y3QARWCJC33FRZM2BDCZCA', 'result': 'CCADAMCEPQEmAwNOQVYBcgtsYXN0X3VwZGF0ZTEYIhJAAEgxGSISQAABADYaAIAFc3Rha2USQAAsNhoAgAd1bnN0YWtlEkAAFjYaAIAGYWNjcnVlEkAAAQCIAINCABiIAERCABKIABFCAAwoImcpI2cqMgdnJEMiQ4oAACgoZDYaARcIZ4ALbWludF9zQVVTRDo2GgEXIx0iKWQfSEhMFEQWULAkQ4oAACgoZDYaARcpZB0iIx9ISEwURAlngAxyZXR1cm5fQVVTRDo2GgEXKWQdIiMfSEhMFEQWULAkQ4oAAChkIg1EKChkNhoBFwhnKSlkKGQ2GgEXCB0iKGQfSEhMFERnKjIHZyRD'}
Compiler Response: {'hash': 'OHV4S2PM4R3XXXQOIKERQ6OV2OYRZZG6A66XSUVR5ADF4NXVPEZRXMYYQE', 'result': 'CIEBQw=='}
⏳ Deploying Vault App... TXID: MVW3D52ASAWSN5YQOD5EQDOOZ7TPTXOO3E46SNK6CQFBWL3XCEWA
✅ Vault App deployed successfully! App ID: 747999696
(.venv) mdabdurrazzak@MDs-MacBook-Pro backend % 

(.venv) mdabdurrazzak@MDs-MacBook-Pro backend % python3 contracts/oracle.py

✅ Compiled and wrote oracle_approval.teal and oracle_clear.teal
(.venv) mdabdurrazzak@MDs-MacBook-Pro backend % python3 contracts/deploy_oracle.py

Compiler Response: {'hash': 'KYX3P4IS76F2OEGA2GO7P3O2OYR7VZ4GSDKOPGG7ZBRSNULWRKXBTLCIAY', 'result': 'CCACAAEmAgVwcmljZQJ0czEYIhJAADAxGSISQAAHI0AAAQAiQzYaAIAEcHVzaBJAAAEAMRuBBBJEKDYaARdnKTYaAhdnI0MoImcpImeABnNpZ25lcjYaAGcjQw=='}
Compiler Response: {'hash': 'OHV4S2PM4R3XXXQOIKERQ6OV2OYRZZG6A66XSUVR5ADF4NXVPEZRXMYYQE', 'result': 'CIEBQw=='}
⏳ Deploying Oracle App... TXID: 5KNXTDRGL6AQ2S7MBWT2233EZK5MHN7S3P3NTGD6DVXQV54KML4A
✅ Oracle App deployed successfully! App ID: 748000500
(.venv) mdabdurrazzak@MDs-MacBook-Pro backend % 

 Compiled and wrote guardian_approval.teal and guardian_clear.teal
(.venv) mdabdurrazzak@MDs-MacBook-Pro backend % python3 contracts/guardian.py

✅ Compiled and wrote guardian_approval.teal and guardian_clear.teal
(.venv) mdabdurrazzak@MDs-MacBook-Pro backend % python3 contracts/deploy_guardian.py

Compiler Response: {'hash': 'M5RWXXIDGRVL77724BQ6VB5XP2MP6AEA3DUJFUD2PBMQHCCNWB5ZCK5Z2U', 'result': 'CCACAQAmBQVBZG1pbgZQYXVzZWQHTWludENhcAtNYXhRdW90ZUFnZQxEZXZpYXRpb25CcHMxGCMSQACCMRkjEkAAByJAAAEAI0M2GgCACnNldF9wYXVzZWQSQABbNhoAgAxzZXRfbWludF9jYXASQABANhoAgBFzZXRfbWF4X3F1b3RlX2FnZRJAACA2GgCAEXNldF9kZXZpYXRpb25fYnBzEkAAAQCIAF8jQ4gASUL/+IgAMkL/8ogAG0L/7CgxAGcpI2cqgcCEPWcrgTxnJwSBMmciQ4oAADEAKGQSRCk2GgEXZyJDigAAMQAoZBJEKjYaARdnIkOKAAAxAChkEkQrNhoBF2ciQ4oAADEAKGQSRCcENhoBF2ciQw=='}
Compiler Response: {'hash': 'OHV4S2PM4R3XXXQOIKERQ6OV2OYRZZG6A66XSUVR5ADF4NXVPEZRXMYYQE', 'result': 'CIEBQw=='}
⏳ Deploying Guardian App... TXID: FRLWDL2QJ6KT3GLECEULRKRY7Z4ZYOAFQO2FPJNPR5Q6QNWQHL7A
✅ Guardian App deployed successfully! App ID: 748000860


# 💼 Merchant Wallet
MERCHANT_ADDR=J7GW4BILZGJ2BYRL7VSM3PAQLEZK5AAWIPEQQCBQMUTQNMGJWRL6L3IMVA

# 🌐 Node Access (AlgoNode)
ALGOD_URL=https://testnet-api.algonode.cloud
ALGOD_TOKEN=a

# 📦 Deployed App Info


# 🧾 Compiled Escrow TEAL Program (Base64)


VITE_EXPLORER_BASE=https://lora.algorand.foundation/tx/
VITE_APP_ID=747943848
VITE_MERCHANT=J7GW4BILZGJ2BYRL7VSM3PAQLEZK5AAWIPEQQCBQMUTQNMGJWRL6L3IMVA
VITE_AGENT_API=http://localhost:8080
VITE_ALGOD_URL=https://testnet-api.algonode.cloud


## 🚀 Getting Started

### 1. Install dependencies

bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
2. Setup .env
ALGOD_URL=https://testnet-api.algonode.cloud
ALGOD_TOKEN=""
ORACLE_MN="your 25-word oracle mnemonic"
ORACLE_ADDR=YOUR_ADDRESS

MERCHANT_MN="your merchant mnemonic"
MERCHANT_ADDR=YOUR_ADDRESS

MINT_APP_ID=12345678
VAULT_APP_ID=12345679
ORACLE_APP_ID=12345680

3. Run backend server
uvicorn backend.main:app --reload --port 5000

🔄 Interactions
✅ Mint AUSD
curl -X POST http://127.0.0.1:5000/mint -H "Content-Type: application/json" -d '{"amount": 1000}'

✅ Redeem AUSD
curl -X POST http://127.0.0.1:5000/redeem -H "Content-Type: application/json" -d '{"amount": 500}'

✅ Push Oracle Price
curl -X POST http://127.0.0.1:5000/oracle/push

✅ View Oracle Price
curl http://127.0.0.1:5000/oracle/value

🔧 Dev Tools
Script	Purpose
hedging_bot.py	Off-chain simulation for PnL
stress_test.py	Concurrent users (minting + stake)
optin.py	Token opt-in logic
🧪 Stress Testing
PYTHONPATH=. python3 backend/stress_test.py

📜 License

This project is licensed under the MIT License
.

🙌 Contributing

We welcome contributions! Feel free to open issues or pull requests to improve the protocol.

🌍 Acknowledgements

Algorand Foundation

Gora Network

Tinyman DEX

CoinGecko API
