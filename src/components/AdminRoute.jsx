import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'
import { Loading } from './Loading'

function AdminRoute() {
    const { user } = UserAuth()

    // console.log("🚀 ~ file: AdminRoute.jsx:10 ~ AdminRoute ~ user:", user)

    if (!user.uid) {
        return <Loading />
    }

    if (user.isAcademic)
        return <Navigate to='/academic-dashboard' />
    if (user.isBuilding)
        return <Navigate to='/building-dashboard' />
    if (user.isWelfare)
        return <Navigate to='/welfare-dashboard' />
    if (user.isFinace)
        return <Navigate to='/finace-dashboard' />
    if (user.isSC)
        return <Navigate to='/sc-dashboard' />
    if (user.isDirector)
        return <Navigate to='/director-dashboard' />
        
    if (!user.isAdmin)
        return <Navigate to='/dashboard' />

    return (
        <Outlet />
    )

}

export default AdminRoute