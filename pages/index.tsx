import Head from 'next/head'
import { useEffect, useRef } from 'react'
import { useCreateAccount } from '../src/contexts/user/CreateAccount'
import { useLogin } from '../src/contexts/user/login'
import { useMensages } from '../src/contexts/messages/mapMensages'
import { H1, Chat, DefaultMensage, Input, ButtonSend, OptionsBtn, Sender } from '../src/components/styles/styles'

export default function Home() {
  const { msg, allMsg, setMsg, addNewMensage, inputMsg, error, errorMensage } = useMensages()
  const { AccountLogin } = useLogin()
  const { CreateNewAccount } = useCreateAccount()

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [allMsg]);

  return (
    <div>
      <Head>
        <title>SmartWallet</title>
      </Head>
      <main>
        <H1><strong>Smart</strong>Wallet</H1>
        <Chat>
          <DefaultMensage>Hi, I'm SmartCoin</DefaultMensage>
          <DefaultMensage>
            <OptionsBtn onClick={AccountLogin}>Login</OptionsBtn>
            <OptionsBtn onClick={CreateNewAccount}>Create Account</OptionsBtn>
          </DefaultMensage>
          {allMsg.map((prop, index) => (
            <DefaultMensage key={index}>{prop}</DefaultMensage>
          ))}
          <div ref={messagesEndRef} />
        </Chat>
        <Sender>
          <Input type={inputMsg} value={msg} onChange={event => setMsg(event.target.value)}/>
          <ButtonSend type="submit" onClick={addNewMensage}>Send</ButtonSend>
        </Sender>
      </main>
      <footer>
        { error && 
          <span>{errorMensage}</span>
        }
      </footer>
    </div>
  )
}
