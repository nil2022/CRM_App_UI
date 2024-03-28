import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import authService from '../server/auth'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'


function Signup() {

    /** set success message when success is true */
    const [successMsg, setSuccessMsg] = useState({})
    /** set error message when error is true */
    const [error, setError] = useState('')
    /** set loading state  */
    const [loading, setLoading] = useState(false)

    const intialValues = { fullName: "", userId: "", password: "", email: "", usertype: "CUSTOMER" };
    const [formValues, setFormValues] = useState(intialValues);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
        // console.log(formValues);
    }

    const handleRegistration = useCallback(async (e) => {
        e.preventDefault()
        setError(null)

        try {
            const userCreated = await authService.createAccount(formValues)
            if (userCreated) {
                const userSession = await authService.login({ userId: formValues.userId, password: formValues.password })
                if (userSession) {
                    console.log('userSession:', userSession)
                    localStorage.setItem('accessToken', userSession.data.Response?.accessToken || '')
                    const userData = await authService.getCurrentUser({ userId: userSession.data.Response?.userId, accessToken: userSession.data.Response?.accessToken })
                    if (userData) {
                        dispatch(login(userData))
                        navigate('/dashboard')
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
        } catch (error) {
            console.log('handleRegistration :: Error:', error.message)
            setError(error.message)
        }
    }, [formValues])

    useEffect(() => {

        if (loading) {
            toast.loading('Please wait.....')
        }

        return () => {
            toast.dismiss()
        }
    }, [loading])

    // console.log('formValues:', formValues)

    return (
        <>
            <section>
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
                        {error && <p className="text-red-500 text-center font-semibold text-lg mt-2">{error}</p>}
                        <form
                            onSubmit={handleRegistration}
                            className="mt-8"
                        >
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="text-base font-[500] text-gray-900">
                                        {' '}
                                        Full Name{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            autoComplete='on'
                                            placeholder="John Doe"
                                            id="fullName"
                                            value={formValues.fullName}
                                            onChange={handleChange}
                                            required
                                        ></input>
                                    </div>
                                </div>
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
                                            autoComplete="userId"
                                            placeholder="username"
                                            id="userId"
                                            value={formValues.userId}
                                            onChange={handleChange}
                                            required
                                        ></input>
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
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password"
                                            className="text-base font-[500] text-gray-900">
                                            {' '}
                                            Email{' '}
                                        </label>
                                    </div>
                                    <div className="mt-2 mb-4">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            autoComplete='on'
                                            placeholder="username@domain.com"
                                            id="email"
                                            value={formValues.email}
                                            onChange={handleChange}
                                            required
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="usertype"
                                            className="text-base font-[500] text-gray-900">
                                            Usertype:
                                        </label>
                                        <select
                                            id="usertype"
                                            onChange={handleChange}
                                            className='bg-gray-200 border border-gray-500 text-slate-900 text-sm font-[700] ml-5 rounded-lg 
                                             focus:border-blue-500  focus:border-2 block w-full p-2 focus:outline-none
                                             has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900' >
                                            <option value="CUSTOMER">CUSTOMER</option>
                                            <option value="ENGINEER">ENGINEER</option>
                                            <option value="ADMIN">ADMIN</option>
                                        </select>
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