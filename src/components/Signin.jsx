import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies, Cookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import authService from '../server/auth'
import { Alert, Backdrop, CircularProgress, } from '@mui/material'
import CustomizedSnackbars from './SnackbarComponent'
import TextField from '@mui/material/TextField';
import { VisibilityRounded, VisibilityOffRounded } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';


export default function Signin() {

    const [successMsg, setSuccessMsg] = useState('')
    const [error, setError] = useState('')
    /** set loading state  */
    const [loading, setLoading] = useState(false)
    const intialValues = { userId: "", password: "" };
    const [formValues, setFormValues] = useState(intialValues);
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
    }
    /* ******************************************** */
    /* ***********  HANDLE THE LOGIN  ************* */
    /* ******************************************** */

    const login = async (e) => {
        e.preventDefault()
        setError('')
        setSuccessMsg('')
        try {
            setOpen(true)
            const userSession = await authService.login(formValues)
            console.log('userSession:', userSession)
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
                setCookie('accessToken', userSession.data?.accessToken || null, {
                    path: '/',
                    httpOnly: false,
                    secure: true,
                    sameSite: 'none'
                })
                setCookie('refreshToken', userSession.data?.refreshToken || null, {
                    path: '/',
                    httpOnly: false,
                    secure: true,
                    sameSite: 'none'
                })
                const userData = await authService.getCurrentUser(userSession.data?.accessToken || null)
                // console.log('userData: (after Login, getting current user)', userData)
                setOpen(false)
                setTimeout(() => {
                    navigate('/', {
                        unstable_viewTransition: true,
                        unstable_flushSync: true
                    })
                }, 500);
            }
        } catch (err) {
            setOpen(false)
            setError(err.response?.data?.message || err.message)
            // err.response?.data?.message ? toast.error(err.response?.data?.message) : toast.error(err.message)
            console.log('Login error ::', err.response?.data?.message || err.message)
            setFormValues(intialValues)
        }
    }
    // console.log('formValues:', formValues)

    useEffect(() => {
        console.log('mounted (in Signin.jsx component)')

        if (!authStatus) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('allUsers')
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
        }



        return () => {
            console.log('unmounted (in Signin.jsx component)')
            // toast.dismiss()
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
                <div className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-24 
                min-h-[85vh]  xl:h-[88vh]">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm w-[80%]">
                        <div className="mb-2 flex justify-center">
                            <img src="/login.png"
                                className="rounded-full"
                                width={60}
                                alt="login_Page_image"
                                loading='lazy' />
                        </div>
                        <h2 className="text-center text-3xl font-[700] leading-tight text-black">
                            Log in to {'\n'}Dashboard
                        </h2>
                        <p className="mt-2 text-center text-base text-gray-600">
                            Don&apos;t have an account?{' '}
                            <br />
                            <Link
                                to="/register"
                                rel="noopener noreferrer"
                                className="font-[800] text-black transition-all duration-200 hover:underline"
                            >
                                Register Now !
                            </Link>
                        </p>
                        <form
                            onSubmit={login}
                            className="mt-8"
                        >
                            <div className="space-y-5">
                                <div>
                                    <div className="mt-2">
                                        <TextField
                                            type='text'
                                            autoComplete='userId'
                                            placeholder="Username"
                                            id="userId"
                                            value={formValues.userId}
                                            onChange={handleChange}
                                            required
                                            label="Username"
                                            variant='outlined'
                                            className='w-full'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-2 ">
                                        <FormControl
                                            className='w-full'
                                            variant="outlined">
                                            <InputLabel
                                                htmlFor="password"
                                                required
                                            >
                                                Password
                                            </InputLabel>
                                            <OutlinedInput
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                value={formValues.password}
                                                onChange={handleChange}
                                                label="Password"
                                                placeholder='Password'
                                                required
                                            />
                                        </FormControl>
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