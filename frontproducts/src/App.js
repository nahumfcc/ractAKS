import React from 'react';
import { Provider  } from 'react-redux'
import Product from './components/Product';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductForm from './components/ProductForm';
import Usuario from './components/Usuario';
import Menu from './components/Menu';
import store from './store/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
    return (
        <>
            <Provider store={store}>
                <div className="container">
                    <BrowserRouter>
                        <h1 className="d-flex justify-content-center">
                            Administracion de productos
                        </h1>
                        <div className="row">
                            <div className="col-md-auto">
                                <Menu/>
                            </div>
                            <div className="col">
                                <Routes>
                                    <Route path='/' element={<Product />} />
                                    <Route path='/create-product' element={<ProductForm />} />
                                    <Route path='/edit-product/:id' element={<ProductForm />} />
                                    <Route path='/user' element={<Usuario />} />
                                </Routes>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            Copyright &#169; Nahum {new Date().getFullYear()}
                        </div>
                    </BrowserRouter>
                </div>
            </Provider>   
        </>)
}

export default App;