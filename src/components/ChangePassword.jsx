import React, { useState } from 'react'
import CustomizedSnackbars from './SnackbarComponent'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import authService from '../server/auth';
import { useNavigate } from 'react-router-dom'

function ChangePassword() {

    const intialValues = { oldPassword: "", newPassword: "", confirmPassword: "" };
    const [formValues, setFormValues] = useState(intialValues);
    const [error, setError] = useState('');
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value, });
    }

    const handlePasswordChange = async (e) => {
        e.preventDefault()
        setError('')
        setOpen(true)

        // console.log(formValues)
        try {

            const passwordUpdate = await authService.changeUserPassword(formValues.oldPassword, formValues.newPassword, formValues.confirmPassword)
            if (passwordUpdate.success === true) {
                toast.success(passwordUpdate.message)
                setFormValues(intialValues)
                setOpen(false)
                setTimeout(() => {
                    navigate('/dashboard', {
                        unstable_viewTransition: true,
                        unstable_flushSync: true,
                    })
                }, 500);
                
            }

        } catch (err) {
            setOpen(false)
            setFormValues(intialValues)
            setError(err.response?.data?.message || err.message)
            console.log('Change Password Error :: ', err?.response || err.message)
        }

    }


    useEffect(() => {

    }, [open])



    return (
        <div>
            {error && (<CustomizedSnackbars severity='error' message={error} setOpenSnackbar={true} />)}
            <form
                onSubmit={handlePasswordChange}
                className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-16 lg:px-8 
                lg:py-24 xl:h-[88vh] "
            >
                <div className="space-y-5 min-w-[300px]">
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="userId"
                                className="text-base font-[500] text-gray-900">
                                {' '}
                                Current Password{' '}
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="password"
                                autoComplete='on'
                                placeholder="Current Password"
                                id="oldPassword"
                                value={formValues.oldPassword}
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
                                New Password{' '}
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="password"
                                autoComplete='on'
                                placeholder="New Password"
                                id="newPassword"
                                value={formValues.newPassword}
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
                                Confirm Password{' '}
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="password"
                                autoComplete='on'
                                placeholder="Confirm Password"
                                id="confirmPassword"
                                value={formValues.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            className="inline-flex w-full items-center justify-center rounded-lg bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-slate-700 transition-all duration-400"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword