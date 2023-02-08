import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.post('/User/refresh',
                {
                    token:  auth?.token,
                    refreshToken: auth?.refreshToken
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setAuth(prev => {
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