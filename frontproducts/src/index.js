import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import OldApp from './OldApp';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/*' element={<App />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
