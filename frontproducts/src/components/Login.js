import { useState } from "react";
import useAuth from '../hooks/useAuth';
import axios from '../api/axios'
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LOGIN_URL = '/login';

function Login() {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const [datos, setDatos] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        let newDatos = { ...datos, [name]: value };
        setDatos(newDatos);
    }
    //30OFF--dXbGZm
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!e.target.checkValidity()) {
            console.log("no enviar");
        } else {
            try {
                const response = await axios.post(LOGIN_URL,
                    datos,
                    {
                        headers: { 'Content-TYpe': 'application/json' }
                    }
                );
                const token = response?.data?.token;
                const refreshToken = response?.data?.refreshToken;

                setAuth({ email: datos.email, token, refreshToken });
                navigate(from, { replace: true });
            } catch (err) {
                console.log(!err?.response);
            }
        }
    };

    return (
        <section className="h-100">
            <div className="container h-100">
                <div className="row justify-content-sm-center h-100">
                    <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <div className="card shadow-lg">
                            <div className="card-body p-5">
                                <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                                <form onSubmit={handleSubmit} className="needs-validation" noValidate={true} autoComplete="off">
                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" htmlFor="email">Usuario</label>
                                        <input id="email" type="text" onChange={handleInputChange} value={datos.email} className="form-control" name="email" required autoFocus />
                                        <div className="invalid-feedback">
                                            Usuario inválido
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="mb-2 w-100">
                                            <label className="text-muted" htmlFor="password">Contrase&ntilde;a</label>
                                        </div>
                                        <input id="password" type="password" onChange={handleInputChange} value={datos.password} className="form-control" name="password" required />
                                        <div className="invalid-feedback">
                                            Contraseña es requirida
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="form-check">
                                            <input type="checkbox" name="remember" id="remember" className="form-check-input" />
                                            <label htmlFor="remember" className="form-check-label">Recordarme</label>
                                        </div>
                                        <button type="submit" className="btn btn-primary ms-auto">
                                            <i className="bi bi-box-arrow-in-right"></i> Ingresar
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <p>
                                Quieres registrarte?<br />
                                <span className="line">
                                    <Link to="/register">
                                        Si
                                    </Link>
                                </span>
                            </p>
                            <div className="card-footer py-3 border-0">
                                <div className="text-center">
                                    Copyright &#169; Nahum {new Date().getFullYear()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    );
}

export default Login;