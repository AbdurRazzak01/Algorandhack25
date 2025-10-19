# AlgoStable — Algorithm-Backed Synthetic Stablecoin on Algorand

![Algorand](https://img.shields.io/badge/Built_on-Algorand-00A3E0.svg)
![Smart Contracts](https://img.shields.io/badge/Smart_Contracts-TEAL%20%7C%20PyTeal-orange.svg)
![Backend](https://img.shields.io/badge/Backend-Python%20%7C%20FastAPI-009485.svg)
![License](https://img.shields.io/badge/License-MIT-black.svg)

**AUSD** is a synthetic stablecoin protocol on **Algorand**. It maintains price stability using algorithmic backing (ALGO collateral + oracle price) rather than fiat reserves, and ships with a minimal backend, on-chain contracts, and a demo runbook.

> **Status:** TestNet, research/education only. Do **not** use in production.

---

## 🎯 What You Can Do

* ⚖️ **Mint / Redeem AUSD** backed by ALGO collateral (stateful contracts in PyTeal/TEAL). ([Algorand Developer Portal][1])
* 🔮 **Oracle price feed** via **Gora Network** (+ backend fetch/push helpers). ([gora.io][2])
* 🔁 **Swap integrations** (Tinyman demo / mock AMM path). ([docs.tinyman.org][3])
* 🏦 **Vault & Guardian** apps to track collateralization, limits, and guardrails.
* 📈 **Yield hooks** (optional) + **hedging bot** simulation to neutralize collateral exposure (off-chain, educational).
* ⚡ **REST API** with **FastAPI**, served by **Uvicorn**. ([FastAPI][4])

---

## 🎥 Demo

[![Watch the video]([https://youtu.be/eCgZITySS2o](https://youtu.be/VJGvZJsw-fk))]

---

## 🧱 Architecture (High-Level)

```
                ┌───────────────────────────────┐
                │       FastAPI Backend         │
                │  - oracle fetch/push          │
                │  - mint/redeem endpoints      │
                │  - helpers & scripts          │
                └──────────────┬────────────────┘
                               │
                      Algod / Indexer (TestNet)
                               │
     ┌───────────────┬─────────┴───────────┬─────────────────┐
     │               │                     │                 │
┌────▼─────┐   ┌─────▼────┐         ┌──────▼─────┐     ┌─────▼─────┐
│ Mint/Rdm │   │  Vault   │         │  Oracle    │     │ Guardian   │
│  (ASC1)  │   │ (ASC1)   │         │  (ASC1)    │     │   (ASC1)   │
└────┬─────┘   └────┬─────┘         └─────┬──────┘     └─────┬──────┘
     │              │                     │                  │
     │         AUSD / sAUSD (ASAs)  ◄─────┴───────►  Policy / Limits
     │
Tinyman / AMM (optional swap path)
```

* Contracts: **PyTeal → TEAL** (stateful & stateless). ([pyteal.readthedocs.io][5])
* Algorand networks: development on **TestNet**. ([Algorand Developer Portal][6])
* REST/SDKs: **algod** + **Indexer** reference APIs. ([Algorand Developer Portal][7])

---

## 🍺 UI screenshots

<img width="2940" height="1662" alt="earn" src="https://github.com/user-attachments/assets/b6324415-8096-4034-ad36-23e5434d45a6" />
<img width="2940" height="1666" alt="swap" src="https://github.com/user-attachments/assets/449aef85-ec82-4f36-88f6-05c06db338c2" />
<img width="2940" height="1660" alt="rewards" src="https://github.com/user-attachments/assets/3a5f2ad4-adc2-4366-b416-06ace07f15c6" />
<img width="2876" height="1676" alt="dashboards" src="https://github.com/user-attachments/assets/cc178a5a-bb8b-4d01-b54a-539a23995105" />

---

## 🚀 Quickstart

### 0) Prerequisites

* Python 3.10+
* An Algorand wallet on **TestNet** (e.g., Pera) funded from the official **TestNet Dispenser**. ([Pera Wallet - Knowledgebase][8])
* Public **Algod** access (e.g., Algonode TestNet) or any node/infra you prefer; see Algorand REST docs for reference. ([Algorand Developer Portal][7])

> Faucet: [https://bank.testnet.algorand.network/](https://bank.testnet.algorand.network/) (official TestNet dispenser). ([bank.testnet.algorand.network][9])

### 1) Install dependencies

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 2) Configure environment

Create `backend/.env`:

```ini
# Node
ALGOD_URL=https://testnet-api.algonode.cloud
ALGOD_TOKEN=

# Signers (TestNet keys; never commit mnemonics)
ORACLE_MN="your 25-word oracle mnemonic"
ORACLE_ADDR=YOUR_TESTNET_ADDRESS

MERCHANT_MN="your merchant mnemonic"
MERCHANT_ADDR=YOUR_TESTNET_ADDRESS

# On-chain IDs (from deployment)
MINT_APP_ID=747999340
VAULT_APP_ID=747999696
ORACLE_APP_ID=748000500
GUARDIAN_APP_ID=748000860

ASA_AUSD_ID=747999145
ASA_SAUSD_ID=747999146
```

> **Tip:** Algorand Standard Assets (ASAs) are first-class protocol assets; opt-in is required on receivers. ([Algorand Developer Portal][1])

### 3) Run the backend

```bash
uvicorn backend.main:app --reload --port 5000
# or with FastAPI CLI (also reloads):
# fastapi dev backend/main.py
```

([FastAPI][10])

---

## 🔄 API (Developer Flow)

Mint AUSD:

```bash
curl -X POST http://127.0.0.1:5000/mint \
  -H "Content-Type: application/json" \
  -d '{"amount": 1000}'
```

Redeem AUSD:

```bash
curl -X POST http://127.0.0.1:5000/redeem \
  -H "Content-Type: application/json" \
  -d '{"amount": 500}'
```

Push oracle price (demo):

```bash
curl -X POST http://127.0.0.1:5000/oracle/push
```

Read oracle:

```bash
curl http://127.0.0.1:5000/oracle/value
```

> Price feeds can be fetched from exchange data providers (e.g., **CoinGecko** `/simple/price`) then relayed on-chain via your oracle app during testing. ([docs.coingecko.com][11])

---

## ⚙️ Tech Stack

| Component          | Tech                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------- |
| L1                 | [Algorand](https://developer.algorand.org) ([Algorand Developer Portal][6])                   |
| Smart contracts    | **TEAL** (compiled from **PyTeal**) ([pyteal.readthedocs.io][5])                              |
| Backend            | **Python + FastAPI + Uvicorn** ([FastAPI][4])                                                 |
| Oracle             | [Gora Network](https://www.gora.io/) ([gora.io][2])                                           |
| Swap               | [Tinyman](https://docs.tinyman.org/) (optional) ([docs.tinyman.org][3])                       |
| Node / APIs        | Algod & Indexer REST endpoints (official docs) ([Algorand Developer Portal][7])               |
| Market data (demo) | [CoinGecko API](https://docs.coingecko.com/reference/simple-price) ([docs.coingecko.com][11]) |

---

## 🔐 Contract Design

### Mint/Redeem

* Mint algorithmically issues AUSD against ALGO based on oracle price.
* Redeem path burns AUSD and releases collateral, enforcing min collateralization.
* Implemented as **stateful** applications in PyTeal/TEAL. ([pyteal.readthedocs.io][5])

### Vault

* Tracks positions, collateral ratios, and (optional) yield hooks.

### Oracle (Gora)

* Off-chain fetch → on-chain push (demo path).
* Supports custom feeds when moving beyond simple spot prices. ([gora.io][2])

### Guardian

* Protocol guardrails (pause mint, adjust caps, deviation BPS), callable by admin/multisig.

---

## 🧮 Stability Logic (TestNet demo)

* **Price source:** Off-chain fetch (e.g., CoinGecko) → on-chain oracle value. ([docs.coingecko.com][11])
* **Peg mechanics:**

  * Mint requires ALGO collateral at oracle price.
  * Redemptions + burn reduce supply when price deviates.
  * **Hedging bot** simulates delta-neutral behavior (educational).

---

## 📜 On-chain Transactions (TestNet)

> Quick view of every deployment we ran, with TXIDs and explorer links.

### Assets (ASAs)

- **AUSD (Algorand USD)** — **ASA ID:** `747999145`  
  **TXID:** `TBNP4B7F5I2W7APIIPF46RWGEX2XX25RK655UFK4ETZTHAHIVAJA`  
  🔎 View:  
  - AlgoExplorer: https://testnet.algoexplorer.io/tx/TBNP4B7F5I2W7APIIPF46RWGEX2XX25RK655UFK4ETZTHAHIVAJA  
  - GoalSeeker:  https://goalseeker.purestake.io/algorand/testnet/transaction/TBNP4B7F5I2W7APIIPF46RWGEX2XX25RK655UFK4ETZTHAHIVAJA  
  - Pera:        https://explorer.perawallet.app/tx/testnet/TBNP4B7F5I2W7APIIPF46RWGEX2XX25RK655UFK4ETZTHAHIVAJA

- **sAUSD (Staked AUSD)** — **ASA ID:** `747999146`  
  **TXID:** `NEWYAZGWHUEPEYRCS6U5Q2DUG5L2LSJVKU4F72NIM5OURXWJFKUQ`  
  🔎 View:  
  - AlgoExplorer: https://testnet.algoexplorer.io/tx/NEWYAZGWHUEPEYRCS6U5Q2DUG5L2LSJVKU4F72NIM5OURXWJFKUQ  
  - GoalSeeker:  https://goalseeker.purestake.io/algorand/testnet/transaction/NEWYAZGWHUEPEYRCS6U5Q2DUG5L2LSJVKU4F72NIM5OURXWJFKUQ  
  - Pera:        https://explorer.perawallet.app/tx/testnet/NEWYAZGWHUEPEYRCS6U5Q2DUG5L2LSJVKU4F72NIM5OURXWJFKUQ

### Applications (Stateful)

- **MintRedeem App** — **App ID:** `747999340`  
  **TXID:** `TZWV2GR2DGCRTORVIXD3IVHRVG2M5YCROS2N3FHQY2G2EEUFH2DQ`  
  🔎 View:  
  - AlgoExplorer: https://testnet.algoexplorer.io/tx/TZWV2GR2DGCRTORVIXD3IVHRVG2M5YCROS2N3FHQY2G2EEUFH2DQ  
  - GoalSeeker:  https://goalseeker.purestake.io/algorand/testnet/transaction/TZWV2GR2DGCRTORVIXD3IVHRVG2M5YCROS2N3FHQY2G2EEUFH2DQ  
  - Pera:        https://explorer.perawallet.app/tx/testnet/TZWV2GR2DGCRTORVIXD3IVHRVG2M5YCROS2N3FHQY2G2EEUFH2DQ

- **Vault App** — **App ID:** `747999696`  
  **TXID:** `MVW3D52ASAWSN5YQOD5EQDOOZ7TPTXOO3E46SNK6CQFBWL3XCEWA`  
  🔎 View:  
  - AlgoExplorer: https://testnet.algoexplorer.io/tx/MVW3D52ASAWSN5YQOD5EQDOOZ7TPTXOO3E46SNK6CQFBWL3XCEWA  
  - GoalSeeker:  https://goalseeker.purestake.io/algorand/testnet/transaction/MVW3D52ASAWSN5YQOD5EQDOOZ7TPTXOO3E46SNK6CQFBWL3XCEWA  
  - Pera:        https://explorer.perawallet.app/tx/testnet/MVW3D52ASAWSN5YQOD5EQDOOZ7TPTXOO3E46SNK6CQFBWL3XCEWA

- **Oracle App** — **App ID:** `748000500`  
  **TXID:** `5KNXTDRGL6AQ2S7MBWT2233EZK5MHN7S3P3NTGD6DVXQV54KML4A`  
  🔎 View:  
  - AlgoExplorer: https://testnet.algoexplorer.io/tx/5KNXTDRGL6AQ2S7MBWT2233EZK5MHN7S3P3NTGD6DVXQV54KML4A  
  - GoalSeeker:  https://goalseeker.purestake.io/algorand/testnet/transaction/5KNXTDRGL6AQ2S7MBWT2233EZK5MHN7S3P3NTGD6DVXQV54KML4A  
  - Pera:        https://explorer.perawallet.app/tx/testnet/5KNXTDRGL6AQ2S7MBWT2233EZK5MHN7S3P3NTGD6DVXQV54KML4A

- **Guardian App** — **App ID:** `748000860`  
  **TXID:** `FRLWDL2QJ6KT3GLECEULRKRY7Z4ZYOAFQO2FPJNPR5Q6QNWQHL7A`  
  🔎 View:  
  - AlgoExplorer: https://testnet.algoexplorer.io/tx/FRLWDL2QJ6KT3GLECEULRKRY7Z4ZYOAFQO2FPJNPR5Q6QNWQHL7A  
  - GoalSeeker:  https://goalseeker.purestake.io/algorand/testnet/transaction/FRLWDL2QJ6KT3GLECEULRKRY7Z4ZYOAFQO2FPJNPR5Q6QNWQHL7A  
  - Pera:        https://explorer.perawallet.app/tx/testnet/FRLWDL2QJ6KT3GLECEULRKRY7Z4ZYOAFQO2FPJNPR5Q6QNWQHL7A

---

## 📦 Known TestNet Deployments (example)

```
ASA:  AUSD     -> 747999145
ASA:  sAUSD    -> 747999146

App:  MintRedeem -> 747999340
App:  Vault      -> 747999696
App:  Oracle     -> 748000500
App:  Guardian   -> 748000860

Merchant: J7GW4BILZGJ2BYRL7VSM3PAQLEZK5AAWIPEQQCBQMUTQNMGJWRL6L3IMVA
Node:     https://testnet-api.algonode.cloud  (algod)
```

> Validate IDs via **Indexer** or block explorers; refer to official REST endpoints for lookups. ([Algorand Developer Portal][7])

---

## 🛠 Dev Scripts & Tools

* `contracts/deploy_*.py`: compile + deploy apps (PyTeal → TEAL). ([pyteal.readthedocs.io][5])
* `backend/hedging_bot.py`: off-chain PnL simulation.
* `backend/stress_test.py`: concurrent mint/stake flows.
* `backend/optin.py`: ASA opt-in helper (receivers must opt in). ([Algorand Developer Portal][1])

Stress test example:

```bash
PYTHONPATH=. python3 backend/stress_test.py
```

---

## 🔁 Optional Swap Path (Tinyman)

For swaps or price checks during demos, integrate **Tinyman** pools or mock an AMM quote path. See Tinyman docs for pool math, router behavior, and fees. ([docs.tinyman.org][3])

---

## 🧪 Local Testing Notes

* Use **TestNet Dispenser** to fund dev accounts. ([bank.testnet.algorand.network][9])
* Interact via SDKs or REST:

  * `algod` client for transactions/state.
  * `indexer` client for querying historical state. ([py-algorand-sdk.readthedocs.io][12])

---

## 🧾 Security & Disclaimers

* Educational prototype; unaudited.
* Guard keys with care; never commit mnemonics.
* Understand **ASA opt-in**, freeze/clawback implications when forking this design. ([Algorand Developer Portal][13])

---

## 🤝 Contributing

PRs and issues welcome—especially around risk controls, liquidation logic, keeper/hedger strategies, and formal verification.

---

## 📜 License

MIT

---

## 🙏 Acknowledgements

* **Algorand Developer Docs** (networks, REST, SDKs). ([Algorand Developer Portal][6])
* **PyTeal / TEAL** examples and references. ([pyteal.readthedocs.io][5])
* **Gora Network** (oracle). ([gora.io][2])
* **Tinyman** (DEX). ([docs.tinyman.org][3])
* **CoinGecko API** (market data). ([docs.coingecko.com][11])

---

### Appendix: Common Links

* Algorand networks overview & TestNet details. ([Algorand Developer Portal][6])
* Algorand REST: **algod**, **Indexer**, **KMD**. ([Algorand Developer Portal][7])
* PyTeal docs. ([pyteal.readthedocs.io][5])
* FastAPI run/CLI. ([FastAPI][14])
* Tinyman docs. ([docs.tinyman.org][3])
* CoinGecko `/simple/price`. ([docs.coingecko.com][11])

---
