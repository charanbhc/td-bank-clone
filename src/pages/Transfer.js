// pages/Transfer.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { transferMoney } from '../utils/Transfer';
import { auth } from '../firebase';

export default function Transfer() {
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleTransfer = async (e) => {
    e.preventDefault();

    const fromEmail = auth.currentUser?.email;
    if (!fromEmail) {
      alert('User not logged in.');
      return;
    }

    try {
      await transferMoney(fromEmail, to.trim(), parseFloat(amount));
      setStatus('Transfer Successful!');
      setAmount('');
      setTo('');
    } catch (error) {
      console.error('Transfer failed:', error);
      setStatus('Transfer Failed. ' + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Transfer Money</h2>
      <form onSubmit={handleTransfer} style={styles.form}>
        <input
          type="email"
          placeholder="Recipient's Email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send</button>
      </form>

      <button onClick={() => navigate('/dashboard')} style={styles.backButton}>
        ← Back
      </button>

      {status && <p style={styles.status}>{status}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    textAlign: 'center',
    fontFamily: 'Arial'
  },
  heading: {
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '10px',
    fontSize: '16px'
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#00704A',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  backButton: {
    marginTop: '15px',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#ccc',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  status: {
    marginTop: '15px',
    fontWeight: 'bold'
  }
};
