import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [productBoxes, setProductBoxes] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchProductBoxes();
    }, [search, page]);

    const fetchProductBoxes = async () => {
        try {
            const response = await axios.get('/api/product-boxes', {
                params: { search, page }
            });
            setProductBoxes(response.data.data);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error('Error fetching product boxes:', error);
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
            <h2>Lista de Productos</h2>
            <input
                type="text"
                placeholder="Buscar por nombre de producto, proveedor, UCC"
                value={search}
                onChange={handleSearchChange}
                className="form-control mb-3"
            />
            <table className="table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Proveedor</th>
                        <th>UCC</th>
                        <th>Cantidad en Existencia</th>
                    </tr>
                </thead>
                <tbody>
                    {productBoxes.length === 0 ? (
                        <tr>
                            <td colSpan="4">No se encontraron resultados.</td>
                        </tr>
                    ) : (
                        productBoxes.map(productBox => (
                            <tr key={productBox.id}>
                                <td>{productBox.product ? productBox.product.name : 'N/A'}</td>
                                <td>{productBox.supplier ? productBox.supplier.name : 'N/A'}</td>
                                <td>{productBox.ucc}</td>
                                <td>1</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`page-item ${page === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
