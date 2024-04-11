import React, { useState } from 'react'
import CustomizedSnackbars from './SnackbarComponent'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import authService from '../server/auth';
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import { VisibilityRounded, VisibilityOffRounded } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

function ChangePassword() {

    const intialValues = { oldPassword: "", newPassword: "", confirmPassword: "" };
    const [formValues, setFormValues] = useState(intialValues);
    const [error, setError] = useState('');
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

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
                            <FormControl
                                className='w-full'
                                variant="outlined">
                                <InputLabel
                                    htmlFor="oldPassword"
                                    required
                                >
                                    Old Password
                                </InputLabel>
                                <OutlinedInput
                                    id="oldPassword"
                                    type={showOldPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowOldPassword((show) => !show)}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showOldPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    value={formValues.oldPassword}
                                    onChange={handleChange}
                                    label="Old Password"
                                    placeholder='Old Password'
                                    autoComplete='current-password'
                                    required
                                />
                            </FormControl>
                        </div>
                    </div>
                    <div>
                        <div className="mt-2">
                            <FormControl
                                className='w-full'
                                variant="outlined">
                                <InputLabel
                                    htmlFor="newPassword"
                                    required
                                >
                                    New Password
                                </InputLabel>
                                <OutlinedInput
                                    id="newPassword"
                                    type={showNewPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowNewPassword((show) => !show)}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showNewPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    value={formValues.newPassword}
                                    onChange={handleChange}
                                    label="New Password"
                                    placeholder='New Password'
                                    autoComplete='new-password'
                                    required
                                />
                            </FormControl>
                        </div>
                    </div>
                    <div>
                        <div className="mt-2">
                            {/* <TextField
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
                            /> */}
                            <FormControl
                                className='w-full'
                                variant="outlined">
                                <InputLabel
                                    htmlFor="confirmPassword"
                                    required
                                >
                                    Confirm Password
                                </InputLabel>
                                <OutlinedInput
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowConfirmPassword((show) => !show)}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    value={formValues.confirmPassword}
                                    onChange={handleChange}
                                    label="Confirm Password"
                                    placeholder='Confirm Password'
                                    autoComplete='new-password'
                                    required
                                />
                            </FormControl>
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