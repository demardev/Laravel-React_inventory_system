import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  };

  return (
    <div>
      <h1>Productos</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Proveedor</th>
            <th>UCC</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Valor en Existencia</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.supplier ? product.supplier.name : 'Sin proveedor'}</td>
              <td>{product.ucc}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{(product.quantity * product.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
