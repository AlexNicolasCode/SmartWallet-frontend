import { createContext, Dispatch, ReactNode, useContext, useEffect, useState } from "react";
import { Menu } from "../../components/Menu/Menu";
import { useMensages } from "../messages/mapMensages";
import { api } from "../../services/api";

type WalletData = {
    seeWallet: () => void;
};

export const Wallet = createContext({} as WalletData)

type WalletProps = {
    children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProps) => {
    const { allMsg, setAllMsg, userEmail} = useMensages()

    const seeWallet = () => {
        api.post(`/wallet/`, { email: userEmail })
            .then(res => {
                if (res.data.mensage != "No user found") {
                    setAllMsg([
                        ...allMsg,
                        res.data.mensage,
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

    return (
        <Wallet.Provider value={{
            seeWallet,
        }}>
            {children}
        </Wallet.Provider>
    )
}

export const useWallet = () => {
    return useContext(Wallet);
}
