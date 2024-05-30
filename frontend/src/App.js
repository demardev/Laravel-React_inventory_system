import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import SupplierForm from './components/SupplierForm';
import NavigationBar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="container">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/transactions/new" element={<TransactionForm />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/suppliers/new" element={<SupplierForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
