import axios from '../api/axios';
import useAuth from './useAuth';
import {jwtDecode} from "jwt-decode";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/auth/token/refresh/', {
            withCredentials: true
        });
        const decodedAccessToken = jwtDecode(response.data.access);
        const user = decodedAccessToken.username
        const role = decodedAccessToken.role
        setAuth(prev => {
            console.log(prev);
            console.log(response.data.access);
            return {
                ...prev, accessToken: response.data.access, user, role
            }
        });
        return response.data.access;
    }
    return refresh;
};

export default useRefreshToken;