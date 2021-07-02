import { createContext, Dispatch, ReactNode, useContext, useEffect, useState } from "react";
import { Menu } from "../../components/Menu/Menu";
import { DefaultMensage } from "../../components/styles/styles";
import { useMensages } from "../messages/mapMensages";
import { api } from "../../services/api";

type SeeTransactionsData = {
    seeTransactions: () => void;
};

export const SeeTransactions = createContext({} as SeeTransactionsData)

type SeeTransactionsProps = {
    children: ReactNode;
}

export const SeeTransactionsProvider = ({ children }: SeeTransactionsProps) => {
    const { allMsg, setAllMsg, userEmail} = useMensages()

    const seeTransactions = async () => {
        await api.post(`/trasactions`, {email: userEmail})
            .then(res => {
                let data = res.data.data ?? []
                let transactions = data.map(item => {
                    return (
                            <DefaultMensage>
                                Email: {item.user}<br />
                                Start value: {item.starterValue}<br />
                                Change: {item.depositValue ?? item.withdrawValue}<br />
                                Value: {item.coin} {item.value}<br />
                                Date: {item.date}<br />
                            </DefaultMensage>
                    )
                })

                setAllMsg([
                    allMsg,
                    `Do have you `,
                    transactions[0] ? transactions : "No transctions found",
                    <Menu />
                ])
            })

    }

    return (
        <SeeTransactions.Provider value={{
            seeTransactions,
        }}>
            {children}
        </SeeTransactions.Provider>
    )
}

export const useSeeTransactions = () => {
    return useContext(SeeTransactions);
}
