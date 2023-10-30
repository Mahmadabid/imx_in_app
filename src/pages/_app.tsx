import Layout from '@/components/Layout';
import { UserObject } from '@/global/Types';
import { store } from '@/store/Store';
import '@/styles/globals.css'
import { HashContext, PassportContext, SignerContext, TxnHashContext, UserContext, UserDataContext, UserInfoContext } from '@/utils/Context';
import { createPassportInstance } from '@/utils/user/Passport';
import { passport } from '@imtbl/sdk';
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { ethers } from 'ethers';

export default function App({ Component, pageProps }: AppProps) {

  const [User, setUser] = useState(false);
  const [Hash, setHash] = useState(false);
  const [Log, setLog] = useState(false);
  const [passport, setPassport] = useState<passport.Passport | null>(null);
  const [Signer, setSigner] = useState<ethers.Signer | null>(null);
  const [UserInfo, setUserInfo] = useState<UserObject | null>(null);
  const [UserData, setUserData] = useState('');
  const [Txn, setTxn] = useState('');

  useEffect(() => {
    function initializePassport() {
      const instance = createPassportInstance();
      setPassport(instance);

      const key = `oidc.user:https://auth.immutable.com:${process.env.NEXT_PUBLIC_CLIENT_ID}`;
      const userData = localStorage.getItem(key);

      if (userData) {
        try {
          const parsedData: UserObject = JSON.parse(userData);
          setUserInfo(parsedData);
          setUser(true);
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
        }
      } else {
        setLog(true)
      }
    }

    initializePassport();
  }, [Log]);


  useEffect(() => {
    async function getWallet() {
      if (!passport) return;
      const Provider = passport.connectEvm();
      const provider = new ethers.providers.Web3Provider(Provider);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setSigner(signer);
    }

    getWallet();
  }, [User]);

  return (
    <PassportContext.Provider value={[passport, setPassport]}>
      <SignerContext.Provider value={[Signer, setSigner]}>
        <UserContext.Provider value={[User, setUser]}>
          <TxnHashContext.Provider value={[Txn, setTxn]}>
            <HashContext.Provider value={[Hash, setHash]}>
              <UserInfoContext.Provider value={[UserInfo, setUserInfo]}>
                <UserDataContext.Provider value={[UserData, setUserData]}>
                  <Provider store={store}>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </Provider>
                </UserDataContext.Provider>
              </UserInfoContext.Provider>
            </HashContext.Provider>
          </TxnHashContext.Provider>
        </UserContext.Provider>
      </SignerContext.Provider>
    </PassportContext.Provider>
  );
}
