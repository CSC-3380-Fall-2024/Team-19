import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const {auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post('/auth/token/refresh/', {
            withCredentials: true,
            refresh: auth.refreshToken
        });
        setAuth((prev: any) => {
            return { ...prev, accessToken: response.data.access}
        });
        return response.data.access;
    }
    return refresh;
};

export default useRefreshToken;