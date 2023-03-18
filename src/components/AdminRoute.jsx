import React from 'react'
import { Navigate , Outlet } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'
import { Loading } from './Loading'

function AdminRoute() {
    const { user } = UserAuth()
    
    console.log("🚀 ~ file: AdminRoute.jsx:10 ~ AdminRoute ~ user:", user)
    
    // console.log(user.uid)
    // console.log(admin_uid.includes(user.uid))
    
    // return (
    //     (!user.uid) ? (<h1>Hello World</h1>) : (children)
    // );

    if (!user.uid) {
        return <Loading />
    }

    if ( !user.isAdmin )
        return <Navigate to = '/dashboard'/>

    return (
        <Outlet/>
    )

}

export default AdminRoute