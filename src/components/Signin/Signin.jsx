import { ArrowRight, Cookie } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'


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

    const [cookies, setCookie] = useCookies(['accessToken'])

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
    }


    const handleLogin = useCallback(async(e) => {
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
            console.log('success:', response.data)
            
            setLoginSuccess(true)
            setCookie('accessToken', response.data?.Response?.accessToken, {
                path: '/',
                secure: true
            })
        } catch (error) {
            setLoading(false)
            setLoginSuccess(false)
            toast.dismiss()
            setErrorMsg(error)
            setSuccessMsg({})
            console.log("Got Error:", error)
            // setCookie('accessToken', '')
            error.response?.data.message ?  toast.error(error.response.data.message) : toast.error(error.message)
        }
    }, [formValues, setCookie])


    const handleGithubLogin = useCallback(async(e) => {
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

    },[])


    useEffect(() => {

        if (loading) {
            toast.loading('Please wait.....')
        }

        if(loginSuccess) {
            // toast.dismiss()
            toast.success(successMsg.message)
            setTimeout(() => {
                navigate('/dashboard')
            }, 1500);
        }

        return () => {
            toast.dismiss()
        }
    }, [loading,loginSuccess,successMsg, navigate])

    // console.log('cookies:', cookies)

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
                                    height={24}  />
                                </span>
                                Sign up with GitHub
                            </button>
                        </div>
                    </div>
                </div>
                {/* <div>
                    Please Note that initially after clicking  
                    <div className="inline-flex w-[90px] h-[30px] gap-x-1 items-center justify-center rounded-lg bg-black mx-1 px-[5px] py-1 font-semibold leading-5 text-white hover:bg-slate-700 transition-all duration-400">
                        Sign In
                    </div>
                    button, it may take time because the backend of this app is connected with a server which sleeps after inactivity.
                </div> */}
            </section>
        </>
    )
}

export default Signin