import { createContext, Dispatch, ReactNode, useContext, useEffect, useState } from "react";
import { useMensages } from "../messages/mapMensages";
import { Menu } from "../../components/Menu/Menu";
import api from "../../services/api";

type LoginData = {
    AccountLogin: () => void;
};

export const Login = createContext({} as LoginData)

type LoginProps = {
    children: ReactNode;
}

export const LoginProvider = ({ children }: LoginProps) => {
    const { 
        msg,
        setMsg, 
        allMsg, 
        setAllMsg, 
        msgsCounter, 
        setMode, 
        mode, 
        setInputMsg, 
        setError, 
        setErrorMensage, 
        auth, 
        setAuth,
        userEmail, 
        setUserEmail
    } = useMensages()
    
    const sendDataLogin = () => {
        const user = {
            email:  userEmail,
            password: msg
        }

        api.post(`/login`, user)
            .then(res => {
                console.log(res.data.auth)
                const auth = res.data.auth

                if (auth) {
                    setError(false)
                    setMsg('')
                    setAllMsg([
                        ...allMsg,
                        "Welcome",
                        <Menu />
                    ])
                    setInputMsg('text');
                    setAuth(true)
                    setMode('')
                } else {
                    setError(true)
                    setErrorMensage("this account don't exist")
                    setInputMsg('text');
                    AccountLogin()
                }
                setMsg('')
            })
    }

    const passwordAccountLogin = () => {
        console.log("batata")
        if (allMsg[allMsg.length -1] != "What's your password?" && validateEmail(msg)) {
            setInputMsg('password')
            setUserEmail(msg)
            setAllMsg([
                ...allMsg,
                "What's your password?",
            ])
            setError(false)
            setMsg('')
        }

        !validateEmail(msg) ?? AccountLogin
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const emailAccountLogin = () => {
        if (allMsg.length == 0) {
            setAllMsg([
                "What's your email?"
            ])
        } else if (allMsg[allMsg.length -1] != "What's your email?") {
            setAllMsg([
                ...allMsg,
                "What's your email?"
            ])
        }
    }

    const AccountLogin = () => {
        if (auth === false) {
            emailAccountLogin()
            setMode('login')
        }
    }

    const loginManager = {
        "What's your email?": passwordAccountLogin,
        "What's your password?": sendDataLogin
    }

    useEffect(() => {
        if (mode == 'login') {
            console.log(allMsg[allMsg.length -2])
            return loginManager[allMsg[allMsg.length -2]]()
        }
    }, [msgsCounter])

    return (
        <Login.Provider value={{
            AccountLogin,
        }}>
            {children}
        </Login.Provider>
    )
}

export const useLogin = () => {
    return useContext(Login);
}