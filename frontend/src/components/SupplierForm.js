import React, { useState } from 'react';
import axios from 'axios';

const SupplierForm = () => {
    const [supplier, setSupplier] = useState({
        name: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier({ ...supplier, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/suppliers', supplier);
            setSupplier({ name: '', address: '' });
        } catch (error) {
            console.error('Error creating supplier:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mt-4 mb-3">
                <label>Nombre del Proveedor</label>
                <input
                    type="text"
                    name="name"
                    value={supplier.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Nombre del Proveedor"
                />
            </div>
            <div className="form-group my-3">
                <label>Dirección</label>
                <input
                    type="text"
                    name="address"
                    value={supplier.address}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Dirección"
                />
            </div>
            <button type="submit" className="btn btn-dark">Guardar Proveedor</button>
        </form>
    );
};

export default SupplierForm;