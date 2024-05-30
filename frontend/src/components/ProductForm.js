import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/products', product);
            console.log('Product created:', response.data);
            setProduct({ name: '', description: '' });
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
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
            <div className="form-group">
                <label>Descripción</label>
                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Descripción"
                />
            </div>
            <button type="submit" className="btn btn-primary">Guardar Producto</button>
        </form>
    );
};

export default ProductForm;
