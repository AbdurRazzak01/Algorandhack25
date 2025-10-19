# create_wallet.py

from algosdk import account, mnemonic

# Generate a new Algorand account
private_key, address = account.generate_account()

# Print the account address and mnemonic
print("✅ New TestNet Wallet Created:")
print("Address:", address)
print("Mnemonic:", mnemonic.from_private_key(private_key))
