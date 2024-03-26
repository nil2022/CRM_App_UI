'use client'
import { ArrowRight } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import {  useToast } from '@chakra-ui/react'

const cookies = new Cookies(null, {
    path: '/',
    httpOnly: false,
    secure: true
});


function Signin() {

    /** set success message when success is true */
    const [successMsg, setSuccessMsg] = useState({})
    /** set error message when error is true */
    const [errorMsg, setErrorMsg] = useState({})
    /** set loading state  */
    const [loading, setLoading] = useState(false)
    const intialValues = { userId: "", password: "" };
    const [formValues, setFormValues] = useState(intialValues);
    const [loginSuccess, setLoginSuccess] = useState(false)
    const toastChakra = useToast()

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
    }
    /* ******************************************** */
    /* ***********  HANDLE THE LOGIN  ************* */
    /* ******************************************** */

   
    const handleLogin = useCallback(async (e) => {
        e.preventDefault()

        const signInUrl = import.meta.env.VITE_CRM_BACKEND_URL
        setLoading(true)
        try {
            const response = await axios.post(`${signInUrl}/crm/api/auth/signin`,
                {
                    userId: formValues.userId,
                    password: formValues.password,
                })

            setLoading(false)
            toast.dismiss()
            setSuccessMsg(response.data)
            setErrorMsg({})
            console.log('success:', response)
            setLoginSuccess(true)
            cookies.set('accessToken', response.data?.Response?.accessToken)
        } catch (error) {
            setLoading(false)
            setLoginSuccess(false)
            toast.dismiss()
            setErrorMsg(error)
            setSuccessMsg({})
            console.log("Got Error:", error)
            error.response?.data.message ? toast.error(error.response.data.message) : toast.error(error.message)
        }

        toastChakra.promise(examplePromise, {
            success: { title: 'Promise resolved', description: 'Looks great' },
            error: { title: 'Promise rejected', description: 'Something wrong' },
            loading: { title: 'Promise pending', description: 'Please wait' },
          })

    }, [formValues])


    const handleGithubLogin = useCallback(async (e) => {
        e.preventDefault()
        const githubLoginURL = 'http://localhost:5173'
        setLoading(true)
        try {
            const response = await axios.get(`${githubLoginURL}/api/auth/github`)
            setLoading(false)
            toast.dismiss()
            setSuccessMsg(response.data)
            console.log('success:', response.data)

        } catch (error) {
            setLoading(false)
            toast.dismiss()
            setErrorMsg(error)
            console.log("Got Error:", error)
        }

    }, [])


    useEffect(() => {

        if (loading) {
            toast.loading('Please wait.....')
        }

        if (loginSuccess && cookies.get('accessToken')) {
            toast.dismiss()
            toast.success(successMsg.message)
            setTimeout(() => {
                toast.dismiss()
                navigate('/dashboard', {
                    unstable_viewTransition: true,
                    unstable_flushSync: true
                })
            }, 1500);
        }

        return () => {
            toast.dismiss()
        }
    }, [loading, loginSuccess, successMsg, navigate])


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
                                to="/signup"
                                rel="noopener noreferrer"
                                className="font-[800] text-black transition-all duration-200 hover:underline"
                            >
                                Register Now !
                            </Link>
                        </p>
                        <form
                            onSubmit={handleLogin}
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