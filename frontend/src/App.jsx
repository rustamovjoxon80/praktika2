import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Operations from './pages/Operations/Operations';
import Inventory from './pages/Inventory/Inventory';
import NewOrder from './pages/NewOrder/NewOrder';
import Management from './pages/Management/Management';
import Admin from './pages/Admin/Admin';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import CartDrawer from './components/CartDrawer/CartDrawer';

function App() {
  return (
    <BrowserRouter>
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/new-order" element={<NewOrder />} />
        <Route path="/management" element={<Management />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
