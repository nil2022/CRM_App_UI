import { useCallback, useEffect, useState } from 'react'
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


function Signup() {

    /** set success message when success is true */
    const [successMsg, setSuccessMsg] = useState('')
    /** set error message when error is true */
    const [error, setError] = useState('')
    /** set loading state  */
    const [loading, setLoading] = useState(false)

    const intialValues = { fullName: "", userId: "", password: "", email: "", userType: "" };
    const [formValues, setFormValues] = useState(intialValues);
    const [cookies, setCookie] = useCookies(['accessToken']);
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
        // console.log(formValues);
    }

    const handleUserType = (e) => {
        setFormValues({ ...formValues, userType: e.target.value })
    }

    const handleRegistration = useCallback(async (e) => {
        e.preventDefault()
        setError('')
        setSuccessMsg('')
        setOpen(true)

        try {
            const userCreated = await authService.createAccount(formValues)
            if (userCreated.data.user.userType === 'ADMIN' || userCreated.data.user.userType === 'ENGINEER') {
                console.log('User Registered ! Verification Pending!')
                setSuccessMsg('User Registered ! Verification Pending!')
                setOpen(false)
                return;
            }
            if (userCreated) {
                const userSession = await authService.login({ userId: formValues.userId, password: formValues.password })
                if (userSession) {
                    console.log('userSession:', userSession)
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
                    localStorage.setItem('accessToken', userSession.data?.accessToken || '')
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
                            navigate('/', {
                                unstable_flushSync: true,
                                unstable_viewTransition: true
                            })
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
            console.log('handleRegistration :: Error:', err.response)
            setError(err.response?.data?.message)
        }
    }, [formValues])

    useEffect(() => {

        // if (loading) {
        //     toast.loading('Please wait.....')
        // }

        // return () => {
        //     toast.dismiss()
        // }
    }, [loading, open])

    // console.log('formValues:', formValues)

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
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm w-[80%]">
                        <div className="mb-2 flex justify-center">
                            <img src="/register-icon.png"
                                className="h-12 w-12"
                                alt="register_page_image"
                                loading='lazy' />
                        </div>
                        <h2 className="text-center text-3xl font-bold leading-tight text-black">
                            Create your free{'\n'} account
                        </h2>
                        <p className="mt-2 text-center text-base text-gray-600">
                            Already have an account?{' '}
                            <br />
                            <Link
                                to="/login"
                                className="font-[800] text-black transition-all duration-200 hover:underline"
                            >
                                Login Here !
                            </Link>
                        </p>
                        <form
                            onSubmit={handleRegistration}
                            className="mt-8"
                        >
                            <div className="space-y-5">
                                <div>
                                    <div className="mt-2">
                                        <TextField
                                            type='text'
                                            autoComplete='fullName'
                                            placeholder="John Doe"
                                            id="fullName"
                                            value={formValues.fullName}
                                            onChange={handleChange}
                                            required
                                            label="Full Name"
                                            variant='outlined'
                                            className='w-full'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-2">
                                        <TextField
                                            type='email'
                                            autoComplete='email'
                                            placeholder="Email"
                                            id="email"
                                            value={formValues.email}
                                            onChange={handleChange}
                                            required
                                            label="Email"
                                            variant='outlined'
                                            className='w-full'
                                        />
                                    </div>
                                </div>
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
                                    <div className="mt-2 mb-4">
                                        {/* <TextField
                                            type='password'
                                            autoComplete='current-password'
                                            placeholder="Password"
                                            id="password"
                                            value={formValues.password}
                                            onChange={handleChange}
                                            required
                                            label="Password"
                                            variant='outlined'
                                            className='w-full'
                                        /> */}
                                        <FormControl
                                            className='w-full'
                                            variant="outlined">
                                            <InputLabel
                                                htmlFor="password"
                                                required
                                            >Password</InputLabel>
                                            <OutlinedInput
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowPassword(!showPassword)}
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
                                    <div className="flex items-center justify-between">
                                        {/* <label htmlFor="usertype"
                                            className="text-base font-[500] text-gray-900">
                                            Usertype:
                                        </label> */}
                                        {/* <select
                                            id="userType"
                                            onChange={handleChange}
                                            className='bg-gray-200 border border-gray-500 text-slate-900 text-sm font-[700] ml-5 rounded-lg 
                                                focus:border-blue-500  focus:border-2 block w-full p-2 focus:outline-none
                                                has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900' >
                                            <option value="CUSTOMER">CUSTOMER</option>
                                            <option value="ENGINEER">ENGINEER</option>
                                            <option value="ADMIN">ADMIN</option>
                                        </select> */}
                                        <FormControl fullWidth>
                                            <InputLabel
                                                id="select-userType"
                                                required
                                            >
                                                User Role
                                            </InputLabel>
                                            <Select
                                                labelId="select-userType"
                                                id='userType'
                                                value={formValues.userType}
                                                onChange={handleUserType}
                                                required
                                                label="User Role"
                                                className='bg-slate-100'
                                                sx={{ fontWeight: 'bold' }}
                                            >
                                                {/* <MenuItem value=''>None</MenuItem> */}
                                                <MenuItem value='CUSTOMER' sx={{ fontWeight: 'bold' }}>CUSTOMER</MenuItem>
                                                <MenuItem value='ENGINEER' sx={{ fontWeight: 'bold' }}>ENGINEER</MenuItem>
                                                <MenuItem value='ADMIN' sx={{ fontWeight: 'bold' }}>ADMIN</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="inline-flex w-full items-center justify-center rounded-lg bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-slate-700 transition-all duration-400"
                                    >
                                        Register Now !
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-3 space-y-3">
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