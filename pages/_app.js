// pages/_app.js
import '../styles/globals.css'
import '../styles/login/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import Bottom_Navbar from '../component/navbar';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_CONFIG_APIKEY,
  authDomain: process.env.FIREBASE_CONFIG_AUTHDOMAIN,
  projectId: process.env.FIREBASE_CONFIG_PROJECTID,
  storageBucket: process.env.FIREBASE_CONFIG_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_CONFIG_APPID,
  measurementId: process.env.FIREBASE_CONFIG_MEASUREMENTID,
};

if (getApps().length < 1) {
  const app = initializeApp(firebaseConfig);
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (getCookie('token') === undefined && router.pathname !== '/login') {
      router.push('/login');
    } else if (getCookie('token') !== undefined && router.pathname === '/login') {
      router.push('/history');
    }
  }, [router.pathname]);

  return (
    <>
      <Bottom_Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;