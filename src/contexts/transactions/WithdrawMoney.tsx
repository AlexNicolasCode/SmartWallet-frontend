import { createContext, ReactNode, useContext, useEffect } from "react";
import { Menu } from "../../components/Menu/Menu";
import { useMensages } from "../messages/mapMensages";
import { api } from "../../services/api";

type WithdrawMoneyData = {
    newWithdrawMoney: () => void;
};

export const WithdrawMoney = createContext({} as WithdrawMoneyData)

type WithdrawMoneyProps = {
    children: ReactNode;
}

export const WithdrawMoneyProvider = ({ children }: WithdrawMoneyProps) => {
    const { msg, allMsg, setAllMsg, msgsCounter, setInputMsg, userEmail} = useMensages()    

    useEffect(() => {
        if (allMsg[allMsg.length -2] == "How much money do you want to withdraw?") {
            sendData();
        }
    }, [msgsCounter])

    const sendData = () => {
        if (msg > 0) {
            api.post(`/withdraw-money`, { email: userEmail, value: msg })
                .then(res => {     
                    setAllMsg([
                        ...allMsg,
                        res.data.message,
                        <Menu />
                    ])
                    setInputMsg("text")
                })
        }
    }

    const newWithdrawMoney = () => {
        setAllMsg([
            ...allMsg,
            "How much money do you want to withdraw?",
        ])
        setInputMsg("number")
    }

    return (
        <WithdrawMoney.Provider value={{
            newWithdrawMoney,
        }}>
            {children}
        </WithdrawMoney.Provider>
    )
}

export const useWithdrawMoney = () => {
    return useContext(WithdrawMoney);
}
