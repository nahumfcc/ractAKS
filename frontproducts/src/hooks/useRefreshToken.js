import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        console.log("Comienza a solicitar nuevo token");
        console.log(JSON.stringify(auth?.token));
        try {
            const response = await axios.post('/User/refresh',
                {
                    token:  auth?.token,
                    refreshToken: auth?.refreshToken
                },
                {
                    headers: { 'Content-TYpe': 'application/json' }
                }
            );
            setAuth(prev => {
                console.log(JSON.stringify(prev));
                console.log("Nuevo token");
                console.log(response.data.token);
                return { ...prev, token: response.data.token, refreshToken: response.data.refreshToken }
            });
            return response.data.token;
        } catch (err) {
            console.log('Error', err?.response)
        }
    }
    return refresh;
}

export default useRefreshToken;