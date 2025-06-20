import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/');
      return;
    }
    setEmail(user.email);
    getDoc(doc(db, 'users', user.email)).then((docSnap) => {
      if (docSnap.exists()) {
        setBalance(docSnap.data().balance || 0);
      }
    });
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2>Welcome,</h2>
      <p>{email}</p>
      <h3>Balance: ₹{balance}</h3>
      <div style={styles.links}>
        <button onClick={() => navigate('/transfer')} style={styles.button}>Transfer Money</button>
        <button onClick={() => navigate('/transactions')} style={styles.button}>Transactions</button>
        <button onClick={() => { auth.signOut(); navigate('/'); }} style={styles.logout}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '30px',
    textAlign: 'center',
    fontFamily: 'Arial',
    border: '1px solid #ccc',
    borderRadius: '12px'
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '25px'
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#00704A',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  logout: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#A80000',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};
