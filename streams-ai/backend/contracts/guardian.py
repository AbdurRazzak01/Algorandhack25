from pyteal import *

def approval():
    # Global Keys
    PAUSED = Bytes("Paused")
    MINT_CAP = Bytes("MintCap")
    MAX_QUOTE_AGE = Bytes("MaxQuoteAge")
    DEVIATION_BPS = Bytes("DeviationBps")
    ADMIN = Bytes("Admin")  # New key

    # On create: store creator as admin
    on_create = Seq([
        App.globalPut(ADMIN, Txn.sender()),  # 🛡️ Set admin
        App.globalPut(PAUSED, Int(0)),
        App.globalPut(MINT_CAP, Int(1_000_000)),
        App.globalPut(MAX_QUOTE_AGE, Int(60)),
        App.globalPut(DEVIATION_BPS, Int(50)),
        Approve()
    ])

    # Helper: check if sender is admin
    is_admin = Txn.sender() == App.globalGet(ADMIN)

    # Admin-only set methods
    @Subroutine(TealType.none)
    def set_paused():
        return Seq([
            Assert(is_admin),
            App.globalPut(PAUSED, Btoi(Txn.application_args[1])),
            Approve()
        ])

    @Subroutine(TealType.none)
    def set_mint_cap():
        return Seq([
            Assert(is_admin),
            App.globalPut(MINT_CAP, Btoi(Txn.application_args[1])),
            Approve()
        ])

    @Subroutine(TealType.none)
    def set_max_quote_age():
        return Seq([
            Assert(is_admin),
            App.globalPut(MAX_QUOTE_AGE, Btoi(Txn.application_args[1])),
            Approve()
        ])

    @Subroutine(TealType.none)
    def set_deviation_bps():
        return Seq([
            Assert(is_admin),
            App.globalPut(DEVIATION_BPS, Btoi(Txn.application_args[1])),
            Approve()
        ])

    # Dispatcher
    handle_noop = Seq([
        Cond(
            [Txn.application_args[0] == Bytes("set_paused"), set_paused()],
            [Txn.application_args[0] == Bytes("set_mint_cap"), set_mint_cap()],
            [Txn.application_args[0] == Bytes("set_max_quote_age"), set_max_quote_age()],
            [Txn.application_args[0] == Bytes("set_deviation_bps"), set_deviation_bps()],
        ),
        Reject()
    ])

    program = Cond(
        [Txn.application_id() == Int(0), on_create],
        [Txn.on_completion() == OnComplete.NoOp, handle_noop],
        [Int(1), Reject()]
    )

    return program

def clear():
    return Approve()

if __name__ == "__main__":
    with open("contracts/guardian_approval.teal", "w") as f:
        f.write(compileTeal(approval(), mode=Mode.Application, version=8))

    with open("contracts/guardian_clear.teal", "w") as f:
        f.write(compileTeal(clear(), mode=Mode.Application, version=8))

    print("✅ Compiled and wrote guardian_approval.teal and guardian_clear.teal")
