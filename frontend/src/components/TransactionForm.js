import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const TransactionForm = () => {
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [message, setMessage] = useState('');
    const [transaction, setTransaction] = useState({
        product_id: '',
        supplier_id: '',
        type: '',
        quantity: '',
        user_id: 1, 
    });

    const transactionTypes = [
        { value: 'Entrada', label: 'Entrada' },
        { value: 'Salida', label: 'Salida' },
        { value: 'Ajuste', label: 'Ajuste' },
    ];

    useEffect(() => {
        fetchProducts();
        fetchSuppliers();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get('/api/suppliers');
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction({ ...transaction, [name]: value });
    };

    const handleSelectChange = (selectedOption, actionMeta) => {
        setTransaction({ ...transaction, [actionMeta.name]: selectedOption ? selectedOption.value : '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/transactions', transaction);
            console.log('Transaction created:', response.data);
            setMessage('Transaction created successfully');
            
            setTransaction({
                product_id: '',
                supplier_id: '',
                type: '',
                quantity: '',
                user_id: 1,
            });
        } catch (error) {
            console.error('Error saving transaction:', error);
            setMessage('Error creating transaction');
        }
    };

    return (
        <div>
            <h2>Agregar Transacción</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Producto</label>
                    <Select
                        name="product_id"
                        value={transaction.product_id ? { value: transaction.product_id, label: products.find(p => p.id === transaction.product_id)?.name } : null}
                        options={products.map(product => ({ value: product.id, label: product.name }))}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="form-group">
                    <label>Proveedor</label>
                    <Select
                        name="supplier_id"
                        value={transaction.supplier_id ? { value: transaction.supplier_id, label: suppliers.find(s => s.id === transaction.supplier_id)?.name } : null}
                        options={suppliers.map(supplier => ({ value: supplier.id, label: supplier.name }))}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="form-group">
                    <label>Tipo de Transacción</label>
                    <Select
                        name="type"
                        value={transaction.type ? { value: transaction.type, label: transaction.type } : null}
                        options={transactionTypes}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="form-group">
                    <label>Cantidad</label>
                    <input
                        type="number"
                        name="quantity"
                        value={transaction.quantity}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <input
                    type="hidden"
                    name="user_id"
                    value={transaction.user_id}
                />
                <button type="submit" className="btn btn-primary">Guardar Transacción</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default TransactionForm;
