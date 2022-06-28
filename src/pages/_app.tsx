import '../styles/globals.css'

import { Provider } from 'react-redux'

import store from '../redux/store'
import Head from 'next/head'
import ProfileProvider from './profile'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { LOCAL_STORAGE_REGISTRATION_PROMOCODE } from '../constants'
import { isArray } from 'lodash'

export default function MyApp({ Component, pageProps }: any) {
  const router = useRouter();
  const { invite } = router.query;

  useEffect(() => {
    if (invite) {
      const promoCode = isArray(invite) ? invite[0] : invite;
      localStorage.setItem(LOCAL_STORAGE_REGISTRATION_PROMOCODE, promoCode);
    }
  }, [invite]);

  return (
    <Provider store={store}>
      <Head>
        <title>Clipcarry</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/icon-128.png" />
      </Head>
      <ProfileProvider>
        <Component {...pageProps} />
      </ProfileProvider>
    </Provider>
  )
}
