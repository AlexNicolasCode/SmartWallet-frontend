import '../styles/globals.css'
import { CreateAccountProvider } from '../src/contexts/user/CreateAccount'
import { DepositProvider } from '../src/contexts/transactions/Deposit'
import { LoginProvider } from '../src/contexts/user/login'
import { MapMensagesProvider } from '../src/contexts/messages/mapMensages'
import { NewDefaultCoinProvider } from '../src/contexts/transactions/newDefaultCoin'
import { WalletProvider } from '../src/contexts/transactions/SeeWallet'
import { WithdrawMoneyProvider } from '../src/contexts/transactions/WithdrawMoney'
import { SeeTransactionsProvider } from '../src/contexts/transactions/SeeTransactions'

function MyApp({ Component, pageProps }) {
  return (
    <MapMensagesProvider>
      <LoginProvider>
        <CreateAccountProvider>
          <WalletProvider>
            <DepositProvider>
              <WithdrawMoneyProvider>
               <NewDefaultCoinProvider>
                  <SeeTransactionsProvider>
                    <Component {...pageProps} />
                  </SeeTransactionsProvider>
                </NewDefaultCoinProvider>
              </WithdrawMoneyProvider>
            </DepositProvider>
          </WalletProvider>
        </CreateAccountProvider>
      </LoginProvider>
    </MapMensagesProvider>
  )
}

export default MyApp
