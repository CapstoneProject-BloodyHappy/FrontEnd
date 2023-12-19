// pages/_app.js
import '../styles/globals.css'
import '../styles/login/styles.css'
import '../styles/chat/livechat.css'
import '../styles/loading/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getApps, initializeApp } from "firebase/app";
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import useAuth from '../src/libs/useAuth';

import Bottom_Navbar from '../component/navbar';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

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
  const auth = useAuth();
  const [userData, setUserData] = useState(null);

  const checkProfile = async () => {
    await fetch(`${process.env.API_URL}/profile`, {
      headers: {
        'Authorization': getCookie('token'),
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setUserData(data);
          if (data.role === 'doctor') {
            router.push('/chat');
          }
          if (router.pathname === '/login') {
            if (data.role === 'user') {
              router.push('/history');
            } else if (data.role === 'doctor') {
              router.push('/chat');
            }
          }
        });
      } else if (res.status === 401) {
        auth.handleSignOut();
        router.push('/login');
      } else if (res.status === 403) {
        router.push('/profile/new');
      } else {
        alert('API Error');
        auth.handleSignOut();
      }
    }).catch((err) => {
      console.error(err);
      alert('API Error');
      auth.handleSignOut();
    });
  }

  useEffect(() => {
    if (getCookie('token') === undefined && router.pathname !== '/login') {
      router.push('/login');
    } else if (getCookie('token') !== undefined && router.pathname !== '/profile/new') {
      checkProfile();
    }
  }, [router.pathname]);

  return (
    <>
      <Bottom_Navbar userdata={userData}/>
      <Component {...pageProps } userdata={userData}/>
    </>
  );
}

export default MyApp;