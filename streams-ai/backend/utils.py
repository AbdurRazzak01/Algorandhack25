from algosdk import mnemonic

def get_private_key(mn):
    return mnemonic.to_private_key(mn)
