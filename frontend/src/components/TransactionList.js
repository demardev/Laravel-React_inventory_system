import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TransactionList() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('/api/transactions')
        .then(response => setTransactions(response.data))
        .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Transactions</h1>
            <ul>
                {transactions.map(transaction => (
                <li key={transaction.id}>
                    {transaction.type} - {transaction.quantity} units of {transaction.product.name}
                </li>
                ))}
            </ul>
        </div>
    );
}

export default TransactionList;
