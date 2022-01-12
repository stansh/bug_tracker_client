import { Navigate, Route } from 'react-router-dom';
import { useUser } from './useUser';

/* export const PrivateRoute = props => {
    const user = useUser();

    if (!user) return <Navigate to="/login" />

    return <Route {...props} />
} */


export const PrivateRoute = ({children})=> {
    const user = useUser();
    console.log(user)

    return user ? children : <Navigate to="/login" />;
}