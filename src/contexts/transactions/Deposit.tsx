import { createContext, Dispatch, ReactNode, useContext, useEffect, useState } from "react";
import { Menu } from "../../components/Menu/Menu";
import { useMensages } from "../messages/mapMensages";
import { api } from "../../services/api";

type DepositData = {
    newDeposit: () => void;
};

export const Wallet = createContext({} as DepositData)

type DepositProps = {
    children: ReactNode;
}

export const DepositProvider = ({ children }: DepositProps) => {
    const { msg, setMsg, allMsg, setAllMsg, msgsCounter, setInputMsg, userEmail} = useMensages()  
    
    useEffect(() => {
        if (allMsg[allMsg.length -2] == "How much can you to deposit?") {
            sendData();
        }
    }, [msgsCounter])

    const sendData = () => {
        if (msg > 0) {
            api.post(`/deposit`, { email: userEmail, value: msg })
                .then(res => {     
                    setAllMsg([
                        ...allMsg,
                        res.data.message,
                        <Menu />
                    ])
                    setInputMsg("text")
                })
        }
        setMsg('')
    }

    const newDeposit = () => {
        setAllMsg([
            ...allMsg,
            "How much can you to deposit?",
        ])
        setInputMsg("number")
    }

    return (
        <Wallet.Provider value={{
            newDeposit,
        }}>
            {children}
        </Wallet.Provider>
    )
}

export const useDeposit = () => {
    return useContext(Wallet);
}
