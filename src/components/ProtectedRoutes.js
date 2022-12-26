import React from 'react'
import {Outlet,Navigate} from "react-router-dom"
// import MyProfile from './MyProfile'

export default function ProtectedRoutes(){

    return (
    !!localStorage.getItem("activeToken") ? <Outlet /> : <Navigate to="/seller/auth/login"/>
    )
}

// check condition for protect login page
export function ProtectedLogin (){
    return(
        localStorage.getItem("activeToken") ?  <Navigate to="/seller/myProfile" />  : <Outlet/>
    )
}
