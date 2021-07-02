import { useDeposit } from "../../contexts/transactions/Deposit"
import { useMensages } from "../../contexts/messages/mapMensages"
import { useDefaultCoin } from "../../contexts/transactions/newDefaultCoin"
import { useSeeTransactions } from "../../contexts/transactions/SeeTransactions"
import { useWallet } from "../../contexts/transactions/SeeWallet"
import { useWithdrawMoney } from "../../contexts/transactions/WithdrawMoney"
import { OptionsBtn } from "../styles/styles"

export const Menu = () => {
    const { setAuth, setUserEmail, setAllMsg } = useMensages()
    const { seeWallet } = useWallet()
    const { newDeposit } = useDeposit()
    const { newWithdrawMoney } = useWithdrawMoney()
    const { setNewCoin } = useDefaultCoin()
    const { seeTransactions } = useSeeTransactions()

    const Logout = () => {
        setAllMsg([])
        setAuth(false)
        setUserEmail('')
    }

    return (
        <>
            What do you want to do now?<br />
            <OptionsBtn onClick={seeWallet}>See My Wallet</OptionsBtn><br />
            <OptionsBtn onClick={newDeposit}>Deposit</OptionsBtn><br />
            <OptionsBtn onClick={newWithdrawMoney}>Withdraw Money</OptionsBtn><br />
            <OptionsBtn onClick={seeTransactions}>See Your Transactions</OptionsBtn><br />
            <OptionsBtn onClick={Logout}>Logout</OptionsBtn><br />
        </>

    )
}