import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <div className='h-screen w-full flex'>
            <div className='flex-1 bg-green-400'></div>
            <div className='flex-1 flex flex-col items-center justify-center'>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout