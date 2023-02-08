import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        }

        !auth?.token ? verifyRefreshToken() : setLoading(false);

    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${auth?.token}`);
    }, [isLoading])

    return (<>
            {isLoading
                ? <p>Cargando...</p>
                : <Outlet />
            }
            </>
        );
}

export default PersistLogin