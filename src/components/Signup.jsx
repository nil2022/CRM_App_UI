import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import authService from '../server/auth'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import { useCookies } from 'react-cookie'
import CustomizedSnackbars from './SnackbarComponent'
import TextField from '@mui/material/TextField';
import { VisibilityRounded, VisibilityOffRounded } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Alert, Backdrop, CircularProgress, } from '@mui/material'
import { useForm } from "react-hook-form"

const cookieOptions = {
    path: '/',
    httpOnly: false,
    secure: false,
    sameSite: 'none'
}
function Signup() {

 
    const [successMsg, setSuccessMsg] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [cookies, setCookie] = useCookies(['accessToken']);
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const {register, handleSubmit, getValues} = useForm();


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registerUser = (async(data) => {
        setError('')
        setSuccessMsg('')
        setOpen(true)

        try {
            const userCreated = await authService.createAccount(data)
            if (userCreated.data.user.userType === 'ADMIN' || userCreated.data.user.userType === 'ENGINEER') {
                console.log('User Registered ! Verification Pending!')
                setSuccessMsg('User Registered ! Verification Pending!')
                setOpen(false)
                return;
            }
            if (userCreated) {
                const userSession = await authService.login({ userId: getValues('userId'), password: getValues('password') })
                if (userSession) {
                    // console.log('userSession:', userSession)
                    setCookie('accessToken', userSession.data?.accessToken || null, cookieOptions)
                    setCookie('refreshToken', userSession.data?.refreshToken || null, cookieOptions)
                    localStorage.setItem('userStatus', JSON.stringify(true))
                    const userData = await authService.getCurrentUser(userSession.data?.accessToken)
                    if (userData) {
                        setOpen(false)
                        dispatch(login(userData.data))
                        setTimeout(() => {
                            toast.success('Registered Successfully, Welcome to CRM !', {
                                duration: 3000,
                                style: {
                                    textAlign: 'center',
                                }
                            })
                            navigate('/')
                        }, 800);
                    } else {
                        console.log('userData Error ::', userData)
                        setError(userData.message)
                    }
                } else {
                    console.log('userSession Error ::', userSession)
                    setError(userSession.message)
                }
            } else {
                console.log('userCreated Error ::', userCreated)
                setError(userCreated.message)
            }
        } catch (err) {
            setOpen(false)
            console.log('registerUser :: Error:', err.response)
            setError(err.response?.data?.message || err.message)
        }
    })

    useEffect(() => {
    }, [loading, open])


    return (
        <>
            <section>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {successMsg && (<CustomizedSnackbars severity="success" message={successMsg} setOpenSnackbar={true} />)}
                {error && (<CustomizedSnackbars severity="error" message={error} setOpenSnackbar={true} />)}
                <div className="flex items-center justify-center bg-zinc-800 min-h-screen">
                    <div className="sm:mx-auto sm:max-w-sm w-full bg-gray-600 rounded-xl p-8 shadow-lg shadow-slate-700 text-white mt-[72px]">
                        <div className="mb-2 flex justify-center">
                            <img src="/register.png"
                                className="rounded-full"
                                width={60}
                                alt="register_icon"
                                loading='lazy' />
                        </div>
                        <h2 className="text-center text-2xl font-bold leading-tight ">
                            Create your free{'\n'} account
                        </h2>
                        <p className="mt-2 text-center text-base">
                            Already have an account?{' '}
                            <br />
                            <Link
                                to="/login"
                                className="font-[700] transition-all duration-200 hover:underline"
                            >
                                Login Here !
                            </Link>
                        </p>
                        <form
                            onSubmit={handleSubmit(registerUser)}
                            className="mt-8 max-w-[280px] mx-auto"
                        >
                            <div className="space-y-4">
                                <div>
                                    <div className="mt-2">
                                        <input
                                            type='text'
                                            autoComplete='fullName'
                                            placeholder="John Doe"
                                            {...register('fullName', {
                                                required: true
                                            })}
                                            className='w-full py-2 px-2 rounded-md bg-slate-700 outline-none hover:ring-2 hover:ring-slate-400 transition-all duration-500'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-2">
                                        <input
                                            type='email'
                                            autoComplete='email'
                                            placeholder="johndoe@example.com"
                                            {...register('email', {
                                                required: true,
                                                validate: (value) => {
                                                    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                                                }
                                            })}
                                            className='w-full py-2 px-2 rounded-md bg-slate-700 outline-none hover:ring-2 hover:ring-slate-400 transition-all duration-500'
                                        />
                                    </div>
                                </div>
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
                                    <div className="mt-2 mb-4">
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
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="usertype"
                                            className="text-base font-[600]">
                                            Usertype:
                                        </label>
                                        <select
                                            {...register('userType', {
                                                required: true
                                            })}
                                            className='bg-slate-700 text-white font-[600] text-base py-2 px-2 rounded-md outline-none hover:ring-2 hover:ring-slate-400 transition-all duration-500 w-full ml-4'>
                                            <option value="CUSTOMER">CUSTOMER</option>
                                            <option value="ENGINEER">ENGINEER</option>
                                            <option value="ADMIN">ADMIN</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="w-full items-center justify-center rounded-lg bg-black px-3 py-2 text-lg font-semibold text-white hover:bg-slate-700 outline-none hover:ring-2 hover:ring-slate-400 transition-all duration-500"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-3 space-y-3 max-w-[280px] mx-auto">
                            <button
                                onClick={() => {
                                    toast.dismiss();
                                    toast('Coming soon...😃')
                                }}
                                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                            >
                                <span className="mr-2 inline-block">
                                    <svg
                                        className="h-6 w-6 text-rose-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                                    </svg>
                                </span>
                                Sign up with Google
                            </button>
                            <button
                                onClick={() => {
                                    toast.dismiss();
                                    toast('Coming soon...😃')
                                }}
                                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                            >
                                <span className="mr-2 inline-block">
                                    <img src="/github-icon.svg" alt="GitHub-icon"
                                        width={24}
                                        height={24} />
                                </span>
                                Sign up with GitHub
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Toaster position="top-center" />
        </>
    )
}

export default Signup