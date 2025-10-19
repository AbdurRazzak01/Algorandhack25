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

## 🚀 Getting Started

### 1. Install dependencies

```bash
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
