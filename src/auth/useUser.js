import { useState, useEffect } from 'react';
import { useToken } from './useToken';

export const useUser = () => {
    const [token] = useToken();
    const currentTime = Date.now() / 1000
 
    const getPayloadFromToken = token => {
        const encodedPayload = token.split('.')[1];
        const payload  = JSON.parse(atob(encodedPayload));
        if (payload.exp < currentTime) {
            console.log('expired',token)
            localStorage.removeItem('token')
            return null
        } 
        return payload
    }


    const [user, setUser] = useState(() => {
        if (!token) return null;
        return getPayloadFromToken(token);
    });

    useEffect(() => {
        if (!token) {
            setUser(null);
        } else {
            setUser(getPayloadFromToken(token));
        }
    }, [token]);
    
    return user;
}