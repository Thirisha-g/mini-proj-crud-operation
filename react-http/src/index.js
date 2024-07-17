import React from 'react';
import ReactDOM from 'react-dom/client';
import { Footer, Navbar } from './components/layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import NFd from './pages/NFd';
import { BrowserRouter, Routes,Route } from'react-router-dom';
import ProductList from './pages/admin/products/ProductList';
import CreateProduct from './pages/admin/products/CreateProduct';
import EditProduct from './pages/admin/products/EditProduct';


function App(){
    return(   
        <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/admin/products" element={<ProductList/>} />
            <Route path="/admin/products/create" element={<CreateProduct/>} />
            <Route path="/admin/products/edit/:id" element={<EditProduct/>} />
            <Route path="*" element={<NFd/>} />
        </Routes>
        <Footer/>
        </BrowserRouter>
    )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

