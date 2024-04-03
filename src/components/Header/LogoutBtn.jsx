import { Backdrop, Button, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../store/authSlice'
import { clearAllUsersData } from '../../store/userDataSlice'
import authService from '../../server/auth'
import LogoutIcon from '@mui/icons-material/Logout';
import { useCookies } from 'react-cookie'

export default function LogoutBtn() {

    const [open, setOpen] = React.useState(false);
    const [cookies, removeCookie] = useCookies(['accessToken', 'refreshToken']);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutBtn = async (e) => {
        e.preventDefault()
        setOpen(true)
        authService.logout()
            .then(() => {
                console.log('Logout Successfully !')
                toast.success('Logout successfully !', {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                })
                setOpen(false)
                setTimeout(() => {
                    navigate('/login', {
                        unstable_viewTransition: true,
                        unstable_flushSync: true,
                    })
                    dispatch(logout())
                    dispatch(clearAllUsersData())
                    removeCookie('accessToken', {
                        path: '/',
                        httpOnly: false,
                        secure: true,
                        sameSite: 'none'
                    })
                    removeCookie('refreshToken', {
                        path: '/',
                        httpOnly: false,
                        secure: true,
                        sameSite: 'none'
                    })
                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('refreshToken')
                    localStorage.removeItem('allUsers')
                }, 500);
            })
            .catch((error) => {
                console.log('Logout Error ::', error.message, error.response.data)
                if (!error.response?.data?.success && error.response?.data?.statusCode === 401) {
                    toast.error(error.response.data.message, {
                        duration: 3000
                    })
                    setTimeout(() => {
                        navigate('/login', {
                            unstable_viewTransition: true,
                            unstable_flushSync: true,
                        })
                    }, 500);
                }
            })
    }

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Link
                className='flex hover:bg-gray-400 hover:text-black transition-all duration-500 rounded-full p-2'
                onClick={logoutBtn}
            >
                <LogoutIcon sx={{ m: 0.5 }} fontSize="medium" />
            </Link>
        </div>
    )
}