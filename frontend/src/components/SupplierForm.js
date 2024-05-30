import React, { useState } from 'react';
import axios from 'axios';

function SupplierForm() {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/suppliers', { name })
      .then(response => {
        console.log('Supplier created:', response.data);
        setName('');
      })
      .catch(error => {
        console.error('There was an error creating the supplier!', error.response.data);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nombre del Proveedor:</label>
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <button type="submit" className="btn btn-primary">Agregar Proveedor</button>
    </form>
  );
}

export default SupplierForm;
