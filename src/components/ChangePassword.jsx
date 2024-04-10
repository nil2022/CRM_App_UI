import React, { useState } from 'react'
import CustomizedSnackbars from './SnackbarComponent'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import authService from '../server/auth';
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';

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
                lg:py-24 min-h-[75vh] xl:h-[88vh] "
            >
                <div className="space-y-5 min-w-[300px] lg:min-w-[400px] bg-slate-100 p-4 lg:p-8 z-1 shadow-blue-300 shadow-xl outline-none rounded-lg">
                    <div>
                        <div className="mt-2">
                            <TextField
                                type='password'
                                autoComplete='current-password'
                                placeholder="Old Password"
                                id="oldPassword"
                                value={formValues.oldPassword}
                                onChange={handleChange}
                                required
                                label="Old Password"
                                variant='outlined'
                                className='w-full transition-all duration-500'
                            />
                        </div>
                    </div>
                    <div>
                        <div className="mt-2">
                            <TextField
                                type='password'
                                autoComplete='current-password'
                                placeholder="New Password"
                                id="newPassword"
                                value={formValues.newPassword}
                                onChange={handleChange}
                                required
                                label="New Password"
                                variant='outlined'
                                className='w-full transition-all duration-500'
                            />
                        </div>
                    </div>
                    <div>
                        <div className="mt-2">
                            <TextField
                                type='password'
                                autoComplete='current-password'
                                placeholder="Confirm Password"
                                id="confirmPassword"
                                value={formValues.confirmPassword}
                                onChange={handleChange}
                                required
                                label="Confirm Password"
                                variant='outlined'
                                className='w-full transition-all duration-500'
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