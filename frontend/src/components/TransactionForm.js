import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function TransactionForm() {
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [product_id, setProductId] = useState('');
    const [user_id, setUserId] = useState(1); // Suponiendo que el ID de usuario es 1
    const [supplier_id, setSupplierId] = useState('');
    const [type, setType] = useState('entrada');
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/products')
        .then(response => setProducts(response.data))
        .catch(error => console.error(error));

        axios.get('/api/suppliers')
        .then(response => setSuppliers(response.data))
        .catch(error => console.error(error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const transactionData = { 
            product_id, 
            user_id, 
            supplier_id: supplier_id ? supplier_id : null, 
            type, 
            quantity 
        };
        console.log(transactionData); // Para depuración
        axios.post('/api/transactions', transactionData)
        .then(response => {
            console.log('Transaction created:', response.data);
            // Reset the form
            setProductId('');
            setSupplierId('');
            setType('entrada');
            setQuantity(0);
            // Redirect to the transaction list after creation
            navigate('/transactions');
        })
        .catch(error => {
            console.error('There was an error creating the transaction!', error.response.data);
        });
    };

    const productOptions = products.map(product => ({
        value: product.id,
        label: product.name,
    }));

    const supplierOptions = suppliers.map(supplier => ({
        value: supplier.id,
        label: supplier.name,
    }));

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Producto:</label>
                <Select 
                options={productOptions} 
                onChange={(selectedOption) => setProductId(selectedOption.value)}
                isClearable
                placeholder="Seleccione un producto"
                />
            </div>
            <div className="form-group">
                <label>Proveedor (opcional):</label>
                <Select 
                options={supplierOptions} 
                onChange={(selectedOption) => setSupplierId(selectedOption ? selectedOption.value : '')}
                isClearable
                placeholder="Seleccione un proveedor"
                />
            </div>
            <div className="form-group">
                <label>Tipo:</label>
                <select className="form-control" value={type} onChange={(e) => setType(e.target.value)} required>
                <option value="entrada">Entrada</option>
                <option value="salida">Salida</option>
                <option value="ajuste">Ajuste</option>
                </select>
            </div>
            <div className="form-group">
                <label>Cantidad:</label>
                <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Crear Transacción</button>
        </form>
    );
}

export default TransactionForm;
