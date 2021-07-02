import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Menu } from "../../components/Menu/Menu";
import { OptionsBtn } from "../../components/styles/styles";
import { useMensages } from "../messages/mapMensages";
import { api } from "../../services/api";

type NewDefaultCoinData = {
    setNewCoin: () => void;
};

export const NewDefaultCoin = createContext({} as NewDefaultCoinData)

type NewDefaultCoinProps = {
    children: ReactNode;
}

export const NewDefaultCoinProvider = ({ children }: NewDefaultCoinProps) => {
    const { allMsg, setAllMsg, userEmail } = useMensages()

    const sendNewDefaultCoin = (newCoin) => {
        api.post(`/wallet/`, {email: userEmail, coin: newCoin})
            .then(res => {
                if (res.data.message != "No user found") {
                    setAllMsg([
                        ...allMsg,
                        `${newCoin} is your new default coin`,
                        <Menu />
                    ])
                } else {
                    setAllMsg([
                        ...allMsg,
                        'error'
                    ])
                }
            })

    }

    const setNewCoin = () => {
        if (allMsg.length == 0) {
            setAllMsg([
                "What's your email?",
                <OptionsBtn onClick={sendNewDefaultCoin("BRL")}>Real</OptionsBtn>,      
                <OptionsBtn onClick={sendNewDefaultCoin("EUR")}>Euro</OptionsBtn>,      
                <OptionsBtn onClick={sendNewDefaultCoin("USD")}>Dolar</OptionsBtn>,      
            ])
        } else if (allMsg[allMsg.length -1] != "What's your email?") {
            setAllMsg([
                ...allMsg,
                "What's your email?"
            ])
        }
    }

    return (
        <NewDefaultCoin.Provider value={{
            setNewCoin,
        }}>
            {children}
        </NewDefaultCoin.Provider>
    )
}

export const useDefaultCoin = () => {
    return useContext(NewDefaultCoin);
}
