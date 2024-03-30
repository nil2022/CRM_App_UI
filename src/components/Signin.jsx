import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies,Cookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import authService from '../server/auth'

// const cookies = new Cookies(null, {
//     path: '/',
//     httpOnly: false,
//     secure: true
// });


function Signin() {

    /** set error message when error is true */
    const [error, setError] = useState('')
    /** set loading state  */
    const [loading, setLoading] = useState(false)
    const intialValues = { userId: "", password: "" };
    const [formValues, setFormValues] = useState(intialValues);

    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

    const authStatus = useSelector((state) => state.auth.status)

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        try {
            // console.log('formValues: (in login function)', formValues)
            const userSession = await authService.login(formValues)
            console.log('userSession:', userSession)
            dispatch(authLogin(userSession.data?.user))
            if (userSession) {
                // console.log('Login Successfull !')
                toast.success('Login Success')
                localStorage.setItem('accessToken', userSession.data?.accessToken || null )
                localStorage.setItem('refreshToken', userSession.data?.refreshToken || null )
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
                // sessionStorage.setItem('refreshToken', userSession.data?.refreshToken || null)
                const userData = await authService.getCurrentUser()
                // console.log('userData: (after Login, getting current user)', userData)
                navigate('/dashboard/profile')
            }
        } catch (err) {
            setError(err.response?.data?.message)
            err.response?.data?.message ? toast.error(err.response?.data?.message) : toast.error(err.message)
            console.log('Login error ::', err.response?.statusText)
        }
    }
    // console.log('formValues:', formValues)

    useEffect(() => {
        console.log('mounted (in Signin.jsx component)')

        if(!authStatus) {
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
            <div><Toaster position="top-center" /></div>
            <section>
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm w-[80%]">
                        <div className="mb-2 flex justify-center">
                            <img src="/login-icon.png"
                                className="h-12 w-12"
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
                        {/* {error && <p className="text-red-500 text-center font-semibold text-lg my-4 py-4">{error}</p>} */}
                        <form
                            onSubmit={login}
                            className="mt-8"
                        >
                            <div className="space-y-5">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="userId"
                                            className="text-base font-[500] text-gray-900">
                                            {' '}
                                            Username{' '}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            autoComplete='on'
                                            placeholder="John Doe"
                                            id="userId"
                                            value={formValues.userId}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password"
                                            className="text-base font-[500] text-gray-900">
                                            {' '}
                                            Password{' '}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            autoComplete='on'
                                            placeholder="Password"
                                            id="password"
                                            value={formValues.password}
                                            onChange={handleChange}
                                            required
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

export default Signin