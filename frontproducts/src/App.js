import React from 'react';
import Product from './components/Product';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductForm from './components/ProductForm';
function App() {
    return (
        <>
            <BrowserRouter>
                <div>Header</div>
                <div>Menu</div>
                <div>
                    <Routes>
                        <Route path='/' element={<Product />} />
                        <Route path='/create-product' element={<ProductForm />} />
                        <Route path='/edit-product/:id' element={<ProductForm />} />
                    </Routes>
                </div>
                <div>Footer</div>
            </BrowserRouter>
        </>)
}

export default App;