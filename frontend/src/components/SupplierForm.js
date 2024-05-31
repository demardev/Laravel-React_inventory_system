import React, { useState } from 'react';
import axios from 'axios';

const SupplierForm = () => {
    // Estado para almacenar los datos del proveedor
    const [supplier, setSupplier] = useState({
        name: '',
        address: '',
    });

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier({ ...supplier, [name]: value });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/suppliers', supplier);
            // Limpiar el formulario después de guardar el proveedor
            setSupplier({ name: '', address: '' });
        } catch (error) {
            console.error('Error al crear el proveedor:', error);
        }
    };

    // Renderizar el formulario de proveedor
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
