import { Route } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom'



const PrivateRoute = ({element: Component, ...rest}) => {
    const {loggedIn} = useAuth();
    let auth = {'token':true}

    return(
        // <Route {...rest} render={(props) => {
        //     if(loggedIn) {
        //         return <Component {...props}/>
        //     }

        //     else {
        //         <Navigate to='/login'/>
        //     }
        // }}> 

        // </Route>
        auth.token ? <Outlet/> : <Navigate to='/login'/>

    )
}

export default PrivateRoute