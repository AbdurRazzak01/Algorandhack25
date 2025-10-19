3 min presentation + 1 min Q&A
[Innovation • Usability • Impact • Feasibility • Blockchain use • Technical quality ]
Slide Must show (canvas)
Team intro
Problem
Solution & vision
Demo
How Algorand used
Future roadmap
For Coding Track:
Smart contract (custom, not boilerplate)
Public GitHub repo (open source)
1. a short summary (<150 chars)
Algostable offers an Algorand-native, delta-neutral stablecoin to help crypto users earn a practical ~6–10% yield using ASAs, atomic groups, and perp-funding hedges, benchmarked to sUSDe’s observed APYs.
2. a full description (the problems it solves, how Algorand was used to achieve it)


A-USD is a synthetic dollar on Algorand, paired with a staked wrapper sA-USD that accrues yield via an exchange-rate model similar to sUSDe. Users mint A-USD with USDC, optionally stake to sA-USD, and see value per token rise as realized hedging revenue is posted to the vault. The accrual mechanism follows Ethena’s “reward-bearing token vault” pattern, which increases an index rather than rebasing balances.
The core engine targets a delta-neutral posture: hold long spot collateral and open equal-notional short perpetuals or futures so price moves offset each other. Yield is primarily the periodic funding that long perp traders pay to shorts when the perp trades above spot, plus any approved long-side rewards. This approach is documented in Ethena’s public materials and standard perpetual funding references.
Algorand is the right chain for this product. Atomic transaction groups let us bundle approve, mint, and stake as an all-or-nothing flow, fees are typically 0.001 ALGO per transaction when the network is not congested, and blocks confirm in roughly 2.8 to 3.3 seconds with immediate finality once included, which keeps accounting and index updates clean and fast. We also use Algorand Standard Assets for A-USD and sA-USD, Pera Wallet for signing, and Tinyman for swaps and price discovery.
3. a technical description (what SDKs were used, and what features of Algorand made this uniquely possible)
Mechanism. The protocol mints A-USD against approved collateral and maintains a matched short perp position off-chain to target delta near zero. On each funding interval, if the perp trades above spot, longs pay shorts; the funding payment equals FundingRate × Notional × TimeFraction. Realized PnL is posted on-chain and the vault updates an exchange-rate index r for sA-USD so value per token increases without rebasing. These mechanics mirror Ethena’s published model and the Deribit funding specification.
On-chain contracts on Algorand.
ASA tokens: A-USD and sA-USD issued as Algorand Standard Assets for first-class L1 performance and optional compliance controls.
MintRedeem app: validates signed quotes, checks oracle bounds, mints or burns A-USD, and enforces caps using app state. Executed inside atomic groups for user flows.
Vault app: holds vault state and the global index r for sA-USD, updates r when net PnL arrives, and exposes stake or unstake methods that exchange A-USD and sA-USD at the current exchange rate.
Oracle aggregator: accepts a signed price from our quote service and a third-party oracle Gora. Guards include staleness and deviation checks.


Algorand features we rely on.
Atomic transaction groups to guarantee multi-step operations succeed or revert together, which improves safety for mint, stake, and redeem.
Low, predictable fees at 0.001 ALGO per transaction in normal conditions so frequent accounting and small user actions are economical.
Fast confirmation and instant finality with average block time around 2.82 to 3.3 seconds, which makes index updates prompt and reduces UX latency.
ASAs for simple, secure token issuance at L1.
Ecosystem integrations.
Pera Wallet via @perawallet/connect for connection and signing in the browser.
Tinyman v2 for A-USD to USDC swaps, pool stats, and price discovery on Algorand.
Optional: Folks Finance for downstream lending or liquid staking integrations in later iterations.
Why this is uniquely feasible on Algorand. The combination of atomic groups, very low fees, and quick finality allows us to update r frequently and keep the user experience smooth. Users see near-instant stake confirmations, reliable index accrual, and low cost interactions that are difficult to match on higher-fee chains.
4. a link to the Canva slides
https://www.canva.com/design/DAG2MbJ344U/XCXyCNwVWjCqQgyHiAJOdg/edit?utm_content=DAG2MbJ344U&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
README with:
1. 30s Demo video (includes saying that we have a custom (not boilerplate) smart contract)
2. UI screenshots


3.  5mins video
This is vital, so that the judges can review your project properly. Make sure you explain clearly how you satisfied point 7 above. (Have a custom,not boilerplate, smart contract on Algorand. )
This is a great example of a winning Algorand project’s README: https://github.com/mahir-pa/poap. Bonus points for if your video is well-edited!
4. Block explorer link


For submission:
Twitter post
Linkedin post


Technical answers:	
Short description*
150 character summary of your project. Follow this format:  “Develops/Offers/Gives/etc. _(a defined offering)_ to help/support _(a defined audience)_ _(solve a problem)_ with _(secret sauce)_”. See some awesome examples in this blog post.
Algostable offers an Algorand-native, delta-neutral stablecoin to help crypto users earn a practical ~6–10% yield using ASAs, atomic groups, and perp-funding hedges, benchmarked to sUSDe’s observed APYs.

Full description* Describe your project as fully as possible! What it does, what problems it solves, how you used Algorand achieve it etc


A-USD is a synthetic dollar on Algorand, paired with a staked wrapper sA-USD that accrues yield via an exchange-rate model similar to sUSDe. Users mint A-USD with USDC, optionally stake to sA-USD, and see value per token rise as realized hedging revenue is posted to the vault. The accrual mechanism follows Ethena’s “reward-bearing token vault” pattern, which increases an index rather than rebasing balances.
The core engine targets a delta-neutral posture: hold long spot collateral and open equal-notional short perpetuals or futures so price moves offset each other. Yield is primarily the periodic funding that long perp traders pay to shorts when the perp trades above spot, plus any approved long-side rewards. This approach is documented in Ethena’s public materials and standard perpetual funding references.
Algorand is the right chain for this product. Atomic transaction groups let us bundle approve, mint, and stake as an all-or-nothing flow, fees are typically 0.001 ALGO per transaction when the network is not congested, and blocks confirm in roughly 2.8 to 3.3 seconds with immediate finality once included, which keeps accounting and index updates clean and fast. We also use Algorand Standard Assets for A-USD and sA-USD, Pera Wallet for signing, and Tinyman for swaps and price discovery.

Technical explanation* What tech did you use to build this project? In particular, what aspects of Algorand did you use? Which features of Algorand made this project uniquely possible? The deeper you can go, the better!


Technical explanation
Mechanism. The protocol mints A-USD against approved collateral and maintains a matched short perp position off-chain to target delta near zero. On each funding interval, if the perp trades above spot, longs pay shorts; the funding payment equals FundingRate × Notional × TimeFraction. Realized PnL is posted on-chain and the vault updates an exchange-rate index r for sA-USD so value per token increases without rebasing. These mechanics mirror Ethena’s published model and the Deribit funding specification.
On-chain contracts on Algorand.
ASA tokens: A-USD and sA-USD issued as Algorand Standard Assets for first-class L1 performance and optional compliance controls.
MintRedeem app: validates signed quotes, checks oracle bounds, mints or burns A-USD, and enforces caps using app state. Executed inside atomic groups for user flows.
Vault app: holds vault state and the global index r for sA-USD, updates r when net PnL arrives, and exposes stake or unstake methods that exchange A-USD and sA-USD at the current exchange rate.
Oracle aggregator: accepts a signed price from our quote service and a third-party oracle Gora. Guards include staleness and deviation checks.


Algorand features we rely on.
Atomic transaction groups to guarantee multi-step operations succeed or revert together, which improves safety for mint, stake, and redeem.
Low, predictable fees at 0.001 ALGO per transaction in normal conditions so frequent accounting and small user actions are economical.
Fast confirmation and instant finality with average block time around 2.82 to 3.3 seconds, which makes index updates prompt and reduces UX latency.
ASAs for simple, secure token issuance at L1.
Ecosystem integrations.
Pera Wallet via @perawallet/connect for connection and signing in the browser.
Tinyman v2 for A-USD to USDC swaps, pool stats, and price discovery on Algorand.
Optional: Folks Finance for downstream lending or liquid staking integrations in later iterations.
Why this is uniquely feasible on Algorand. The combination of atomic groups, very low fees, and quick finality allows us to update r frequently and keep the user experience smooth. Users see near-instant stake confirmations, reliable index accrual, and low cost interactions that are difficult to match on higher-fee chains.
