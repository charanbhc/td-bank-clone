import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const userEmail = auth.currentUser?.email || localStorage.getItem('userEmail');
      if (!userEmail) return;

      const userRef = doc(db, 'users', userEmail);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setTransactions(data.transactions || []);
      }

      setLoading(false);
    };

    fetchTransactions();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Transaction History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul style={styles.list}>
          {transactions
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((txn, index) => (
              <li key={index} style={styles.transaction}>
                <strong>{txn.type}</strong> {txn.type === 'Sent' ? `to ${txn.to}` : `from ${txn.from}`} <br />
                ₹{txn.amount} on {new Date(txn.timestamp).toLocaleString()}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    fontFamily: 'Arial'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  list: {
    listStyleType: 'none',
    padding: 0
  },
  transaction: {
    backgroundColor: '#f0f0f0',
    marginBottom: '12px',
    padding: '10px',
    borderRadius: '8px'
  }
};
