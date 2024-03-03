import { ArrowRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Link, redirect } from 'react-router-dom'

function Signin() {
    
    /** set success message when success is true */
    const [successMsg, setSuccessMsg] = useState({})
    /** set error message when error is true */
    const [errorMsg, setErrorMsg] = useState({})
    /** set loading state  */
    const [loading, setLoading] = useState(false)
    const intialValues = { userId: "", password: "" };
    const [formValues, setFormValues] = useState(intialValues);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
        console.log(formValues);
    }

//    function handleSubmit(e) {
//        e.preventDefault()
//        console.log('submit button pressed')
//        setLoading(true)
//        setTimeout(() => {
//         console.log('executed after 3 seconds')
//         setLoading(false)
//         toast.dismiss()
//         // toast.success('Hii this is toast')
//         toast(`userid: ${formValues.userId} password: ${formValues.password}`)
//        }, 3000);
//        console.log('userid:', formValues.userId, 'password:', formValues.password)
       
//    }

    const handleLogin = useCallback(async(e) => {
        e.preventDefault()
        
        const signInUrl = import.meta.env.VITE_CRM_BACKEND_URL
        setLoading(true)
        try {
            const response = await axios.post(`${signInUrl}/crm/api/auth/signin`,
                {
                    userId: formValues.userId,
                    password: formValues.password
                })

            setLoading(false)
            toast.dismiss()
            setSuccessMsg(response.data)
            console.log('success:', response.data)
            toast.success(response.data.message)
        } catch (error) {
            setLoading(false)
            toast.dismiss()
            setErrorMsg(error)
            console.log("Got Error:", error)
            error.response?.data.message ?  toast.error(error.response.data.message) : toast.error(error.message)
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

    return (
        <>
            <div><Toaster position="top-center" /></div>
            <section>
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm w-[80%]">
                        <div className="mb-2 flex justify-center">
                            <img src="../../src/assets/icons8-login-100.png"
                                className="h-12 w-12"
                                alt="login-image" />
                        </div>
                        <h2 className="text-center text-2xl font-bold leading-tight text-black">
                            Welcome back !
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
                        {/* <div className="mt-3 space-y-3">
                            <button
                                type="button"
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
                                type="button"
                                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                            >
                                <span className="mr-2 inline-block">
                                    <svg
                                        className="h-6 w-6 text-[#2563EB]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                                    </svg>
                                </span>
                                Sign up with Facebook
                            </button>
                        </div> */}
                        {/* <p className=" overflow-auto flex flex-col mt-5 text-wrap max-w-[300px] max-h-[200px] justify-center text-gray-600">
                        {console.log("data",data)}
                        accesstoken:
                        <br /> {data.Response?.accessToken}
                        <br />
                        userStatus: {data.Response?.userStatus}
                        </p> */}
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