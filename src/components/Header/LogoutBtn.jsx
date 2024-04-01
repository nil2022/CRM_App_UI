import { Button } from '@mui/material'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../store/authSlice'
import { clearAllUsersData } from '../../store/userDataSlice'
import authService from '../../server/auth'
import LogoutIcon from '@mui/icons-material/Logout';

export default function LogoutBtn() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutBtn = async (e) => {
        e.preventDefault()


        authService.logout()
            .then(() => {
                console.log('Logout Successfully !')
                toast.success('Logout successfully !')
                dispatch(logout())
                dispatch(clearAllUsersData())
                navigate('/login')
            })
            .catch((error) => {
                console.log('Logout Error ::', error.message, error.response.data)
                if (!error.response?.data?.success && error.response?.data?.statusCode === 401) {
                    toast.error(error.response.data.message, {
                        duration: 3000
                    })
                    navigate('/login')
                }
            })
    }

    return (
        <div>
            <Link
                className='flex items-center text-black bg-gray-200 hover:bg-gray-400 transition-all duration-400 rounded-full px-2 py-1'
                onClick={logoutBtn}
            >
                <LogoutIcon sx={{ mr: 0.5 }} fontSize="medium" />
            </Link>
        </div>
    )
}