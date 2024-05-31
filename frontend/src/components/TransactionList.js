import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionList = () => {
    // Estado para almacenar transacciones, búsqueda y paginación
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageGroup, setPageGroup] = useState(1);
    const pagesPerGroup = 10;

    // Efecto para buscar transacciones cuando cambian la búsqueda o la página
    useEffect(() => {
        fetchTransactions();
    }, [search, page]);

    // Función para obtener las transacciones desde el servidor
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
            console.error('Error al obtener las transacciones:', error);
            setTransactions([]); // En caso de error, inicializar como array vacío
        }
    };

    // Manejar el cambio en el campo de búsqueda
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1); // Reiniciar la página a 1 cuando cambia la búsqueda
    };

    // Manejar el cambio de página
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // Manejar el cambio al siguiente grupo de páginas
    const handleNextPageGroup = () => {
        setPageGroup(pageGroup + 1);
        setPage((pageGroup * pagesPerGroup) + 1);
    };

    // Manejar el cambio al grupo de páginas anterior
    const handlePreviousPageGroup = () => {
        setPageGroup(pageGroup - 1);
        setPage(((pageGroup - 2) * pagesPerGroup) + 1);
    };

    const startPage = (pageGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(pageGroup * pagesPerGroup, totalPages);

    // Renderizar la lista de transacciones
    return (
        <div>
            <h2 className='mt-4 mb-3'>Lista de Transacciones</h2>
            <input
                type="text"
                placeholder="Buscar por nombre de producto, proveedor, UCC, usuario"
                value={search}
                onChange={handleSearchChange}
                className="form-control mb-3 border-dark"
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
                    {pageGroup > 1 && (
                        <button
                            className="page-item mx-1 page-link"
                            onClick={handlePreviousPageGroup}
                        >
                            &laquo;
                        </button>
                    )}
                    {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                        <button
                            key={startPage + index}
                            className={`page-item ${page === startPage + index ? 'active' : ''} page-item mx-1 mb-4 page-link`}
                            onClick={() => handlePageChange(startPage + index)}
                        >
                            {startPage + index}
                        </button>
                    ))}
                    {endPage < totalPages && (
                        <button
                            className="page-item mx-1 page-link"
                            onClick={handleNextPageGroup}
                        >
                            &raquo;
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionList;
