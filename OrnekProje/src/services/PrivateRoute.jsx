import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({element}) => {
    const {state} = useContext(AuthContext)
    return state.isAuthenticated? element: <Navigate to="/"/>
}

export default PrivateRoute