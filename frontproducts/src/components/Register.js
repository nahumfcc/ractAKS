import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios'
import { Link } from 'react-router-dom';

const EMAIL_REGEX = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

function Register() {
    const emailRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatchPassword, setValidMatchPassword] = useState(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatchPassword(password === matchPassword);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrorMessage('');
    }, [email, password, matchPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrorMessage("Datos Invalidos");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-TYpe': 'application/json' }
                }
            );

            console.log(response.data);
            setSuccess(true);
            //Clear inputs
        } catch (err) {
            if (!err?.response) {
                setErrorMessage("No responde el servidor");
            } else if (err.response?.status === 409) {
                setErrorMessage("El correo ya esta registrado");
            } else {
                setErrorMessage("Fallo el registro");
            }
            errorRef.current.focus();
        }
    }

    return (<>
        {success ? (
            <section>
                <h1>Registro existoso!</h1>
                <p>
                    <a href="/login">Login</a>
                </p>
            </section>
        ): (
            <section>
        <p ref={errorRef} className={errorMessage ? "errmsg" : "offscreen"}
            aria-live="assertive">{errorMessage}</p>
        <h1>Registro</h1>
        <form onSubmit={handleSubmit }>
            <label htmlFor="email">
                Correo:
            </label>
            <input
                type="text"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
            />
            {validEmail ? (
                <span>
                    <FontAwesomeIcon icon={faCheck} />
                </span>) :
                (
                    <span>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                )}
            {!validEmail && emailFocus && (
                <p id="uidnote">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Debe ser un correo electronico p.ej. correo@mail.com
                </p>
            )
            }

            <br/>
            <label htmlFor="password">
                Contrase&ntilde;a:
            </label>
            <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={validPassword ? "false" : "true"}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
            />
            {validPassword ? (
                <span>
                    <FontAwesomeIcon icon={faCheck} />
                </span>) :
                (
                    <span>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                )}
            {!validPassword && passwordFocus && (
                <p id="uidnote">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    La contrase&ntilde;a debe tener de 8 a 24 caracteres:
                    <br />
                    Al menos una mayuscula, una minuscula, un numero y un caracter especial: !@#$%
                </p>
            )
            }

            <br />
            <label htmlFor="match-password">
                Confirmar contrase&ntilde;a:
            </label>
            <input
                type="password"
                id="match-password"
                onChange={(e) => setMatchPassword(e.target.value)}
                required
                aria-invalid={validMatchPassword ? "false" : "true"}
                onFocus={() => setMatchPasswordFocus(true)}
                onBlur={() => setMatchPasswordFocus(false)}
            />
            {validMatchPassword ? (
                <span>
                    <FontAwesomeIcon icon={faCheck} />
                </span>) :
                (
                    <span>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                )}
            {!validMatchPassword && matchPasswordFocus && (
                <p id="uidnote">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Las contrase&ntilde;as no coinciden:
                </p>
            )
            }

            <br />
            <button
                disabled={!validEmail
                    || !validPassword
                    || !validMatchPassword} >
                Registrar</button>
        </form>
        <p>
            Ya estas registrado?<br />
                        <span className='line'>
                            <Link to="/login">Login</Link>                
            </span>
        </p>
    </section >
        )}
    </>);
}
export default Register;