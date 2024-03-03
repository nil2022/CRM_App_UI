import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

function Signup() {

    /** set success message when success is true */
    const [successMsg, setSuccessMsg] = useState({})
    /** set error message when error is true */
    const [errorMsg, setErrorMsg] = useState({})
    /** set loading state  */
    const [loading, setLoading] = useState(false)

    const intialValues = { fullName: "", userId: "", password: "", email: "", usertype: "CUSTOMER" };
    const [formValues, setFormValues] = useState(intialValues);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
        console.log(formValues);
    }


    const handleRegistration = useCallback(async (e) => {
        e.preventDefault()

        const signupUrl = import.meta.env.VITE_CRM_BACKEND_URL
        setLoading(true)
        try {
            const response = await axios.post(`${signupUrl}/crm/api/auth/signup`,
                {
                    name: formValues.fullName,
                    userId: formValues.userId,
                    password: formValues.password,
                    email: formValues.email,
                    userType: formValues.usertype
                })
            setLoading(false)
            toast.dismiss()
            setSuccessMsg(response.data)
            console.log('success:', response.data)
            toast.success(response.data?.message)

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

    console.log('formValues:', formValues)

    return (
        <>
            <section>
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm w-[80%]">
                        <div className="mb-2 flex justify-center">
                            <img src="../../src/assets/icons8-register-100.png"
                                className="h-12 w-12" alt="login-image" />
                        </div>
                        <h2 className="text-center text-4xl font-bold leading-tight text-black">
                            Create your {'\n'} account
                        </h2>
                        <p className="mt-2 text-center text-base text-gray-600">
                            Already have an account?{' '}
                            <br />
                            <Link
                                to="/signin"
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
                                {/* <hr className='border-gray-300 border rounded-sm my-5'/> */}

                            </div>
                        </form>

                    </div>
                </div>
                <div>

                </div>
            </section>
            <Toaster position="top-center" />
        </>
    )
}

export default Signup