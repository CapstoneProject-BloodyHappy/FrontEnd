import { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

  const auth = getAuth();

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setCookie('user', result.user)
      setCookie('token', await result.user.getIdToken());
      router.push('/');
    } catch (error) {
      console.error('Google Sign-In Error:', error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      deleteCookie('token');
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Sign Out Error:', error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return {
    user,
    loading,
    loginWithGoogle,
    handleSignOut,
  };
};

export default useAuth;
