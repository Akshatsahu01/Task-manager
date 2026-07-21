import { Navigate } from "react-router-dom";

function Protected({children}){
    let token=localStorage.getItem("token")
    if (!token){
        return <Navigate to="/login" />
    }
    return children
}

export default Protected