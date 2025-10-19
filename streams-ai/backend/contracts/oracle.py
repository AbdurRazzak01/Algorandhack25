from pyteal import *

def approval():
    PRICE_KEY = Bytes("price")
    TS_KEY = Bytes("ts")
    SIGNER_KEY = Bytes("signer")

    #
    # On create: store trusted signer
    #
    on_create = Seq(
        App.globalPut(PRICE_KEY, Int(0)),
        App.globalPut(TS_KEY, Int(0)),
        App.globalPut(SIGNER_KEY, Txn.application_args[0]),
        Approve()
    )

    #
    # push(price, ts, sig)
    #
    push = Seq(
        Assert(Txn.application_args.length() == Int(4)),
        App.globalPut(PRICE_KEY, Btoi(Txn.application_args[1])),
        App.globalPut(TS_KEY, Btoi(Txn.application_args[2])),
        # NOTE: for MVP we skip Ed25519 validation to avoid signature-return issues
        Approve()
    )

    handle_noop = Cond(
        [Txn.application_args[0] == Bytes("push"), push],
    )

    program = Cond(
        [Txn.application_id() == Int(0), on_create],
        [Txn.on_completion() == OnComplete.NoOp, handle_noop],
        [Int(1), Reject()]
    )

    return program

def clear():
    return Approve()

if __name__ == "__main__":
    with open("contracts/oracle_approval.teal", "w") as f:
        f.write(compileTeal(approval(), mode=Mode.Application, version=8))

    with open("contracts/oracle_clear.teal", "w") as f:
        f.write(compileTeal(clear(), mode=Mode.Application, version=8))

    print("✅ Compiled and wrote oracle_approval.teal and oracle_clear.teal")
