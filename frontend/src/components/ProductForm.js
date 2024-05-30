import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductForm() {
    const [name, setName] = useState('');
    const [ucc, setUcc] = useState('');
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/products', { name, ucc, quantity })
        .then(response => {
            console.log('Product created:', response.data);
            // Resetear el formulario
            setName('');
            setUcc('');
            setQuantity(0);
        })
        .catch(error => {
            console.error('There was an error creating the product!', error);
        });
    };

    const handleUccChange = (event) => {
        const value = event.target.value;
        // Asegurarse de que el valor sea numérico y no exceda los 12 caracteres
        if (/^\d{0,12}$/.test(value)) {
            setUcc(value);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Nombre del Producto:</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>UCC:</label>
                <input 
                type="text" 
                className="form-control" 
                value={ucc} 
                onChange={handleUccChange}
                maxLength="12" 
                required 
                pattern="\d{12}" 
                title="El UCC debe tener 12 dígitos"  />
            </div>
            <div className="form-group">
                <label>Cantidad:</label>
                <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Crear Producto</button>
        </form>
    );
}

export default ProductForm;

