import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const TransactionForm = () => {
    // Estado para almacenar productos, proveedores y mensajes
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

    // Tipos de transacción disponibles
    const transactionTypes = [
        { value: 'Entrada', label: 'Entrada' },
        { value: 'Salida', label: 'Salida' },
        { value: 'Ajuste', label: 'Ajuste' },
    ];

    // Efecto para obtener productos y proveedores cuando se monta el componente
    useEffect(() => {
        fetchProducts();
        fetchSuppliers();
    }, []);

    // Función para obtener productos desde el servidor
    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Función para obtener proveedores desde el servidor
    const fetchSuppliers = async () => {
        try {
            const response = await axios.get('/api/suppliers');
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction({ ...transaction, [name]: value });
    };

    // Manejar cambios en los campos de selección
    const handleSelectChange = (selectedOption, actionMeta) => {
        setTransaction({ ...transaction, [actionMeta.name]: selectedOption ? selectedOption.value : '' });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/transactions', transaction);
            console.log('Transacción creada:', response.data);
            setMessage('Transacción creada exitosamente!');
            
            // Limpiar el formulario después de guardar la transacción
            setTransaction({
                product_id: '',
                supplier_id: '',
                type: '',
                quantity: '',
                user_id: 1,
            });
        } catch (error) {
            console.error('Error guardando transacción:', error);
            setMessage('Error al crear la transacción');
        }
    };

    // Renderizar el formulario de transacción
    return (
        <div>
            <h2 className='mt-4 mb-3'>Agregar Transacción</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label>Producto</label>
                    <Select
                        name="product_id"
                        value={transaction.product_id ? { value: transaction.product_id, label: products.find(p => p.id === transaction.product_id)?.name } : null}
                        options={products.map(product => ({ value: product.id, label: product.name }))}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="form-group my-3">
                    <label>Proveedor</label>
                    <Select
                        name="supplier_id"
                        value={transaction.supplier_id ? { value: transaction.supplier_id, label: suppliers.find(s => s.id === transaction.supplier_id)?.name } : null}
                        options={suppliers.map(supplier => ({ value: supplier.id, label: supplier.name }))}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="form-group my-3">
                    <label>Tipo de Transacción</label>
                    <Select
                        name="type"
                        value={transaction.type ? { value: transaction.type, label: transaction.type } : null}
                        options={transactionTypes}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="form-group my-3">
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
                <button type="submit" className="btn btn-dark">Guardar Transacción</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default TransactionForm;
