import React from 'react';
import { Provider  } from 'react-redux'
import Product from './components/Product';
import ProductForm from './components/ProductForm';
import Usuario from './components/Usuario';
import Menu from './components/Menu';
import store from './store/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Login from './components/Login';
import Register from './components/Register';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
    return (
        <>
            <Provider store={store}>
                <div className="container">
                        <h1 className="d-flex justify-content-center">
                            Administracion de productos
                        </h1>
                        <div className="row">
                            <div className="col-md-auto">
                                <Menu/>
                            </div>
                            <div className="col">
                                <Routes>
                                <Route path='/' element={<Layout />} >

                                    {/*Rutas protegidas*/}
                                    <Route element={<RequireAuth/>}>
                                        <Route element={<PersistLogin />}>
                                            <Route path='/products' element={<Product />} />
                                            <Route path='/create-product' element={<ProductForm />} />
                                            <Route path='/edit-product/:id' element={<ProductForm />} />

                                            <Route path='/user' element={<Usuario />} />
                                        </Route>
                                    </Route>

                                    {/*Rutas publicas*/}
                                    <Route path='*' element={<NotFound />} />
                                </Route>
                                </Routes>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            Copyright &#169; Nahum {new Date().getFullYear()}
                        </div>
                </div>
            </Provider>   
        </>)
}

export default App;