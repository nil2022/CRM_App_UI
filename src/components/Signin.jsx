import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies, Cookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import authService from '../server/auth'
import { Backdrop, CircularProgress, } from '@mui/material'
import CustomizedSnackbars from './SnackbarComponent'
import { useForm } from 'react-hook-form'

const cookieOptions = {
    path: '/',
    httpOnly: false,
    secure: true,
    sameSite: 'lax'
}

export default function Signin() {

    const [successMsg, setSuccessMsg] = useState('')
    const [error, setError] = useState('')
    /** set loading state  */
    const [loading, setLoading] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { register, handleSubmit} = useForm();
  
    /* ******************************************** */
    /* ***********  HANDLE THE LOGIN  ************* */
    /* ******************************************** */
    const login = async (data) => {
        setError('')
        setSuccessMsg('')
        try {
            setOpen(true)
            const userSession = await authService.login(data)
            // console.log('userSession:', userSession)
            dispatch(authLogin(userSession.data?.user))
            if (userSession) {
                // console.log('Login Successfull !')
                toast(userSession?.message, {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                })

                localStorage.setItem('accessToken', userSession.data?.accessToken || null)
                localStorage.setItem('refreshToken', userSession.data?.refreshToken || null)
                localStorage.setItem('userStatus', JSON.stringify(true))
                setCookie('accessToken', userSession.data?.accessToken || null, cookieOptions)
                setCookie('refreshToken', userSession.data?.refreshToken || null, cookieOptions)
                await authService.getCurrentUser(userSession.data?.accessToken || null)
                setOpen(false)
                setTimeout(() => {
                    navigate('/')
                }, 500);
            }
        } catch (err) {
            setOpen(false)
            setError(err.response?.data?.message || err.message)
            // err.response?.data?.message ? toast.error(err.response?.data?.message) : toast.error(err.message)
            console.log('Login error ::', err.response?.data?.message || err.message)
        }
    }

    useEffect(() => {
        if (!authStatus) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('allUsers')
            localStorage.removeItem('userStatus')
            removeCookie('accessToken', cookieOptions)
            removeCookie('refreshToken', cookieOptions)
        }
    }, [])

    return (
        <>
            <section>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {successMsg && (<CustomizedSnackbars severity='success' message={successMsg} setOpenSnackbar={true} />)}
                {error && (<CustomizedSnackbars severity='error' message={error} setOpenSnackbar={true} />)}
                <div className="flex items-center justify-center py-8 min-h-screen bg-zinc-800">
                    <div className="mx-auto w-full sm:max-w-sm rounded-xl py-20 px-8 shadow-lg shadow-slate-700 bg-gray-600 text-white mt-[70px]">
                        <div className="mb-2 flex justify-center">
                            <img src="/login.png"
                                className="rounded-full"
                                width={60}
                                alt="login_Page_image"
                                loading='lazy' />
                        </div>
                        <h2 className="text-center text-2xl font-[700] leading-tight">
                            Log in to {'\n'}Dashboard
                        </h2>
                        <p className="mt-2 text-center text-base font-[500]">
                            Don&apos;t have an account?{' '}
                            <br />
                            <Link
                                to="/register"
                                rel="noopener noreferrer"
                                className="font-[700] transition-all duration-200 hover:underline"
                            >
                                Register Now !
                            </Link>
                        </p>
                        <form
                            onSubmit={handleSubmit(login)}
                            className="mt-8 max-w-[280px] mx-auto"
                        >
                            <div className="space-y-5">
                                <div>
                                    <div className="mt-2">
                                        <input
                                            type='text'
                                            autoComplete='userId'
                                            placeholder="Username"
                                            {...register('userId', {
                                                required: true,
                                                minLength: 3
                                            })}
                                            className='w-full py-2 px-2 rounded-md bg-slate-700 outline-none hover:ring-2 hover:ring-slate-400 transition-all duration-500'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-2 ">
                                        <input
                                            type='password'
                                            autoComplete='current-password'
                                            placeholder="Password"
                                            {...register('password', {
                                                required: true
                                            })}
                                            className='w-full py-2 px-2 rounded-md bg-slate-700 outline-none hover:ring-2 hover:ring-slate-400 transition-all duration-500'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        // onClick={handleLogin}
                                        className="inline-flex w-full items-center justify-center rounded-lg bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-slate-700 transition-all duration-400"
                                    >
                                        Sign In <ArrowRight className="ml-2" size={16} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}