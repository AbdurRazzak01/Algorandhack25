from pyteal import *

def approval():
    # On create, initialize global state
    on_create = Seq([
        App.globalPut(Bytes("TotalMinted"), Int(0)),
        App.globalPut(Bytes("Paused"), Int(0)),
        Approve()
    ])

    # Subroutine for mint
    @Subroutine(TealType.none)
    def mint():
        amount = Btoi(Txn.application_args[1])
        return Seq([
            Assert(App.globalGet(Bytes("Paused")) == Int(0)),
            App.globalPut(Bytes("TotalMinted"),
                          App.globalGet(Bytes("TotalMinted")) + amount),
            Approve()
        ])

    # Subroutine for redeem
    @Subroutine(TealType.none)
    def redeem():
        amount = Btoi(Txn.application_args[1])
        return Seq([
            Assert(App.globalGet(Bytes("Paused")) == Int(0)),
            App.globalPut(Bytes("TotalMinted"),
                          App.globalGet(Bytes("TotalMinted")) - amount),
            Approve()
        ])

    # Handle NoOp (calls)
    handle_noop = Cond(
        [Txn.application_args[0] == Bytes("mint"), mint()],
        [Txn.application_args[0] == Bytes("redeem"), redeem()]
    )

    # Main program logic
    program = Cond(
        [Txn.application_id() == Int(0), on_create],
        [Txn.on_completion() == OnComplete.NoOp, handle_noop],
        [Int(1), Approve()]
    )

    # ✅ Final return wrapper (fixes compile error)
    return Seq([program, Approve()])


def clear():
    return Approve()


if __name__ == "__main__":
    approval_teal = compileTeal(approval(), mode=Mode.Application, version=8)
    clear_teal = compileTeal(clear(), mode=Mode.Application, version=8)

    with open("contracts/mint_approval.teal", "w") as f:
        f.write(approval_teal)
    with open("contracts/mint_clear.teal", "w") as f:
        f.write(clear_teal)

    print("✅ Compiled and wrote mint_approval.teal and mint_clear.teal")
