import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({element}) => {
    const {authState} = useContext(AuthContext)
    return authState.isAuthenticated? element: <Navigate to="/"/>
}

export default PrivateRoute