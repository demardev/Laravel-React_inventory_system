import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchTransactions();
    }, [search, page]);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('/api/transactions', {
                params: { search, page }
            });
            if (response.data.data) {
                setTransactions(response.data.data);
                setTotalPages(response.data.last_page);
            } else {
                setTransactions([]);
                setTotalPages(1);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setTransactions([]); // En caso de error, inicializar como array vacío
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1); // Reset page to 1 when search changes
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <h2>Lista de Transacciones</h2>
            <input
                type="text"
                placeholder="Buscar por nombre de producto, proveedor, UCC, usuario"
                value={search}
                onChange={handleSearchChange}
                className="form-control mb-3"
            />
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Proveedor</th>
                        <th>Tipo</th>
                        <th>Cantidad</th>
                        <th>UCCs Afectados</th>
                        <th>Usuario</th>
                        <th>Fecha de Creación</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length === 0 ? (
                        <tr>
                            <td colSpan="8">No se encontraron resultados.</td>
                        </tr>
                    ) : (
                        transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.product ? transaction.product.name : 'N/A'}</td>
                                <td>{transaction.supplier ? transaction.supplier.name : 'N/A'}</td>
                                <td>{transaction.type}</td>
                                <td>{transaction.quantity}</td>
                                <td>
                                    {transaction.affected_uccs ? JSON.parse(transaction.affected_uccs).join(', ') : 'N/A'}
                                </td>
                                <td>{transaction.user ? transaction.user.email : 'N/A'}</td>
                                <td>{new Date(transaction.created_at).toLocaleString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`page-item ${page === index + 1 ? 'active' : ''} page-item mx-1 mb-4 page-link`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TransactionList;
