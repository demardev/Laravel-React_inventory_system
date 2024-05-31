import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
    // Estado para almacenar los datos del producto
    const [product, setProduct] = useState({
        name: '',
        description: '',
    });

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/products', product);
            console.log('Producto creado:', response.data);
            // Limpiar el formulario después de guardar el producto
            setProduct({ name: '', description: '' });
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };

    // Renderizar el formulario de producto
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mt-4 mb-3">
                <label>Nombre del Producto</label>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Nombre del Producto"
                />
            </div>
            <div className="form-group my-3">
                <label>Descripción</label>
                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Descripción"
                />
            </div>
            <button type="submit" className="btn btn-dark">Guardar Producto</button>
        </form>
    );
};

export default ProductForm;
