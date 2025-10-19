from pyteal import *

def approval():
    # Global State Keys
    NAV = Bytes("NAV")         # Total NAV in AUSD
    R = Bytes("r")             # Exchange rate, scaled by 1e6
    LAST_UPDATE = Bytes("last_update")

    # OnCreate: initialize global state
    on_create = Seq([
        App.globalPut(NAV, Int(0)),
        App.globalPut(R, Int(1_000_000)),  # r = 1.0 scaled
        App.globalPut(LAST_UPDATE, Global.latest_timestamp()),
        Return(Int(1))
    ])

    # Subroutine to stake AUSD and receive sAUSD
    @Subroutine(TealType.none)
    def stake():
        amount = Btoi(Txn.application_args[1])
        r = App.globalGet(R)
        sausd = WideRatio([amount, Int(1_000_000)], [r])

        return Seq([
            App.globalPut(NAV, App.globalGet(NAV) + amount),
            Log(Concat(Bytes("mint_sAUSD:"), Itob(sausd))),  # for MVP logs
            Approve()
        ])

    # Subroutine to unstake sAUSD and get AUSD
    @Subroutine(TealType.none)
    def unstake():
        sausd = Btoi(Txn.application_args[1])
        r = App.globalGet(R)
        ausd = WideRatio([sausd, r], [Int(1_000_000)])

        return Seq([
            App.globalPut(NAV, App.globalGet(NAV) - ausd),
            Log(Concat(Bytes("return_AUSD:"), Itob(ausd))),
            Approve()
        ])

    # Subroutine to accrue new yield into vault and update r
    @Subroutine(TealType.none)
    def accrue():
        net_pnl = Btoi(Txn.application_args[1])
        nav = App.globalGet(NAV)

        return Seq([
            Assert(nav > Int(0)),
            App.globalPut(NAV, nav + net_pnl),
            App.globalPut(R, WideRatio([App.globalGet(R), nav + net_pnl], [nav])),
            App.globalPut(LAST_UPDATE, Global.latest_timestamp()),
            Approve()
        ])

    # Dispatch logic for NoOp calls
    handle_noop = Cond(
        [Txn.application_args[0] == Bytes("stake"), stake()],
        [Txn.application_args[0] == Bytes("unstake"), unstake()],
        [Txn.application_args[0] == Bytes("accrue"), accrue()]
    )

    # Main program
    return Seq([
        Cond(
            [Txn.application_id() == Int(0), on_create],
            [Txn.on_completion() == OnComplete.NoOp, handle_noop],
        ),
        Reject()  # Fallback if no condition matched
    ])

# Clear state program
def clear():
    return Return(Int(1))


if __name__ == "__main__":
    with open("contracts/vault_approval.teal", "w") as f:
        f.write(compileTeal(approval(), mode=Mode.Application, version=8))

    with open("contracts/vault_clear.teal", "w") as f:
        f.write(compileTeal(clear(), mode=Mode.Application, version=8))

    print("✅ Compiled and wrote vault_approval.teal and vault_clear.teal")
