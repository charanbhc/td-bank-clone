import { doc, runTransaction } from "firebase/firestore";
import { db } from "../firebase";

export const transferMoney = async (fromEmail, toEmail, amount) => {
  const from = fromEmail.trim().toLowerCase();
  const to = toEmail.trim().toLowerCase();
  const amt = parseFloat(amount);

  if (!from || !to || isNaN(amt) || amt <= 0) {
    throw new Error("Invalid input");
  }

  const fromRef = doc(db, "users", from);
  const toRef = doc(db, "users", to);

  await runTransaction(db, async (transaction) => {
    const fromSnap = await transaction.get(fromRef);
    const toSnap = await transaction.get(toRef);

    if (!fromSnap.exists() || !toSnap.exists()) {
      throw new Error("One of the users does not exist.");
    }

    const fromData = fromSnap.data();
    const toData = toSnap.data();

    if (fromData.balance < amt) {
      throw new Error("Insufficient balance.");
    }

    const now = Date.now();

    const updatedFromTransactions = [
      ...(fromData.transactions || []),
      {
        type: "Sent",
        to,
        amount: amt,
        timestamp: now,
      },
    ];

    const updatedToTransactions = [
      ...(toData.transactions || []),
      {
        type: "Received",
        from,
        amount: amt,
        timestamp: now,
      },
    ];

    transaction.update(fromRef, {
      balance: fromData.balance - amt,
      transactions: updatedFromTransactions,
    });

    transaction.update(toRef, {
      balance: toData.balance + amt,
      transactions: updatedToTransactions,
    });
  });
};
