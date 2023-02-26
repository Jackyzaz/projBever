import React from 'react'
import { Navigate ,Outlet} from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'

function ProtectedRoute({children}) {
    const { user } = UserAuth()
    
    if (!user) {
        return <Navigate to='/signin' />
    }
        
    return <Outlet/>;
}

export default ProtectedRoute