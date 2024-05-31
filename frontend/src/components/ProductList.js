import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    // Estado para almacenar cajas de productos, búsqueda y paginación
    const [productBoxes, setProductBoxes] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageGroup, setPageGroup] = useState(1);
    const pagesPerGroup = 10;

    // Efecto para buscar cajas de productos cuando cambian la búsqueda o la página
    useEffect(() => {
        fetchProductBoxes();
    }, [search, page]);

    // Función para obtener las cajas de productos desde el servidor
    const fetchProductBoxes = async () => {
        try {
            const response = await axios.get('/api/product-boxes', {
                params: { search, page }
            });
            setProductBoxes(response.data.data);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error('Error al obtener las cajas de productos:', error);
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

    // Renderizar la lista de productos
    return (
        <div>
            <h2 className='mt-4 mb-3'>Lista de Productos</h2>
            <input
                type="text"
                placeholder="Buscar por nombre de producto, proveedor, UCC"
                value={search}
                onChange={handleSearchChange}
                className="form-control mb-3 border-dark"
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
                            className={`page-item ${page === startPage + index ? 'active' : ''} mx-1 page-link`}
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

export default ProductList;
