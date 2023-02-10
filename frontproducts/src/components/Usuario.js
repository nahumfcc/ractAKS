import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
const Usuario = () => {

    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    //const navigate = useNavigate();
    //const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        //const from = location.state?.from?.pathname || "/";

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('', {
                    signal: controller.signal
                });
                isMounted && setUsers(response.data);
            } catch (err) {
                console.log("Error", err);
                //navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    },[]);

    return (
        <article>
            <h2>Lista de usuarios</h2>
            {users?.length
                ? (<ul>
                    {users.map((user, i) => <li key={i}>{user}</li>)}
                </ul>
                ) : <p>No hay usuarios que mostrar</p>}
        {/*    <button onClick={() => refresh()}>Refrescar</button>*/}
        </article>
    );
}

export default Usuario;