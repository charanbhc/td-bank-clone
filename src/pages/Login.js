import React, { useEffect } from 'react';
import { auth, db, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // ✅ Use UID (not email) for Firestore document path
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, { balance: 1000 }); // ✅ First-time setup
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Login Failed: ' + error.message);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome to TD Bank</h2>
      <button onClick={login} style={styles.button}>Sign in with Google</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    textAlign: 'center',
    fontFamily: 'Arial',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '22px',
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#00704A',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};
