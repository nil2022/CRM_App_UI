import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Backdrop, Button, CircularProgress, IconButton, Skeleton, LinearProgress } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import authService from '../../server/auth'
import { clearAllUsersData, usersData } from '../../store/userDataSlice'
import { logout } from '../../store/authSlice'
import { useCookies } from 'react-cookie'
import { CachedRounded } from '@mui/icons-material';
import UserCardProfile from './UserCard'


export function Datatable() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['accessToken', 'refreshToken']);
    const allUsers = useSelector((state) => state.data?.usersData || [])
    // const allUsers = JSON.parse([localStorage.getItem('allUsers')])
    // console.log('allUsers: (in DataTable.jsx)', allUsers)
    const [renderCount, setRenderCount] = useState(0)
    // const [fetchUsers, setFetchUsers] = useState(false)
    const [open, setOpen] = React.useState(false);

    const editUserStatus = (userId, userStatus) => {
        setOpen(true)
        authService.editUser(userId, userStatus)
            .then((response) => {
                // console.log('Edit User Response:', response.data)
                // return response.data
            })
            .catch((error) => {
                console.log('server/auth.js :: editUser :: Error:', error.response)
            })
            .finally(() => {
                setOpen(false)
            })
    }

    const deleteUser = (userId) => {
        setOpen(true)
        console.log('deleteUser:', userId)
        authService.deleteUser(userId)
            .then((response) => {
                console.log('Delete User Response:', response.data)
                return response.data
            })
            .catch((error) => {
                console.log('server/auth.js :: deleteUser :: Error:', error.response)
            })
            .finally(() => {
                setOpen(false)
            })
    }

    /** GET ALL USERS IN DATABASE */
    const handleFetchUsers = () => {
        // setOpen(true)
        authService.getAllUsers()
            .then((response) => {
                dispatch(usersData(response?.data))
            })
            .catch((error) => {
                console.log('DataTable.jsx :: getAllUsers :: Error:', error.response)
                if (error.response?.statusText === 'Forbidden' && error.response?.status === 403) {
                    toast.error(error.response?.data?.message)
                    dispatch(logout())
                    dispatch(clearAllUsersData())
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
                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('refreshToken')
                    localStorage.removeItem('allUsers')
                    navigate('/')
                } else if (error.response?.statusText === 'Too Many Requests' && error.response?.status === 429) {
                    toast.error(error.response?.statusText, {
                        icon: '🚫'
                    })
                    dispatch(logout())
                    dispatch(clearAllUsersData())
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
                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('refreshToken')
                    localStorage.removeItem('allUsers')
                    setTimeout(() => {
                        navigate('/')
                    }, 500);
                }
            })
            .finally(() => {
                // setOpen(false)
                setRenderCount(prevCount => prevCount + 1)
            })
    }

    useEffect(() => {

        handleFetchUsers()

    }, [open])

    console.log('renderCount: (in DataTable.jsx)', renderCount)

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {/* {renderCount > 0 && <p className='p-4'>Render Count in Datatable.jsx : {renderCount}</p>} */}
            <p className='p-4'>Users in DB: {allUsers.length}</p>
            {allUsers.length > 0 && (
                <section className="w-full mx-auto max-w-7xl p-4 h-full">
                    {/* //* Important info */}
                    <div className="flex gap-x-4">
                        <div className='w-[80%] sm:w-[50%] flex flex-col gap-y-2'>
                            <p className="text-base text-gray-700">
                                This is a list of all <strong>Users</strong> in our database
                            </p>
                        </div>
                        <p className='flex w-[20%] sm:w-[50%] text-base my-auto mx-auto items-center  justify-end pr-4 lg:hidden'>
                            <strong className='px-4 hidden sm:block'>Refresh Users</strong>
                            <button
                                onClick={handleFetchUsers}
                                className='hover:scale-105 drop-shadow-lg hover:-rotate-45 transition-all duration-300'
                            >
                                <CachedRounded color='primary' />
                            </button>
                        </p>
                    </div>
                    <div className="mt-6 flex flex-col hidden lg:block">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 mb-4">
                                <div className="border-2 border-gray-200 md:rounded-lg shadow-lg shadow-violet-300">
                                    <table className="min-w-full divide-y divide-gray-200 ">
                                        <thead className="bg-gray-50 ">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-gray-700"
                                                >
                                                    <span>Name</span>
                                                </th>
                                                <th
                                                    scope='col'
                                                    className="px-4 py-3.5 text-center text-gray-700"
                                                >
                                                    <span>Email ID</span>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-8 py-3.5 text-center text-gray-700"
                                                >
                                                    User ID
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-center text-gray-700"
                                                >
                                                    User Type
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-center text-gray-700"
                                                >
                                                    Status
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                                                >

                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-center text-gray-700"
                                                >
                                                    <button
                                                        onClick={handleFetchUsers}
                                                        className='hover:scale-105 drop-shadow-lg hover:-rotate-45 transition-all duration-300'
                                                    >
                                                        <CachedRounded color='primary' />
                                                    </button>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-slate-50">
                                            {allUsers.map((person) => (
                                                <tr key={person._id}>
                                                    <td className="whitespace-nowrap px-4 py-4">
                                                        <div className="flex items-center">
                                                            <div className="h-10 w-10 flex-shrink-0 ">
                                                                {person.avatar ? (
                                                                    <img
                                                                        className="h-10 w-10 rounded-full object-cover"
                                                                        src={person.avatar}
                                                                        alt="user-image"
                                                                    />
                                                                ) : (
                                                                    <UserCircleIcon  style={{color: 'gray', alignSelf: 'center', justifySelf: 'center', margin: 'auto'}} 
                                                                    className="h-10 w-10 rounded-full object-cover " />
                                                                )}
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{person.fullName}</div>
                                                                <div className="text-sm text-gray-700">{person._id}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className='whitespace-nowrap px-4 py-4 text-center'
                                                    >
                                                        <div className="text-sm text-gray-700">{person.email}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-8 py-4 text-center">
                                                        <div className="text-sm text-gray-700">{person.userId}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-center">
                                                        {person.userType === 'ADMIN' ? (<div className="inline-flex rounded-full bg-blue-200 px-2 text-xs font-semibold leading-5 text-blue-800">{person.userType}</div>) : (person.userType === 'ENGINEER' ? (<div className="inline-flex rounded-full bg-yellow-200 px-2 text-xs font-semibold leading-5 text-yellow-800">{person.userType}</div>) : (
                                                            <div className="inline-flex rounded-full bg-slate-200 px-2 text-xs font-semibold leading-5 text-slate-800">{person.userType}</div>
                                                        ))}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-center">
                                                        {person.userStatus === 'APPROVED' ? (<span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                            {person.userStatus}
                                                        </span>) : (
                                                            <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                                                {person.userStatus}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                                                        {person.userId !== 'john123' &&
                                                            (<Button onClick={() => editUserStatus(person.userId, (person.userStatus === 'APPROVED') ? 'PENDING' : 'APPROVED')}
                                                                className="text-gray-700"
                                                                variant='text'>
                                                                <ModeEditRoundedIcon sx={{ color: 'black' }} />
                                                            </Button>)}
                                                    </td>
                                                    <td>
                                                        {person.userId !== 'john123' &&
                                                            (<IconButton aria-label="delete" onClick={() => (deleteUser(person.userId))}>
                                                                <DeleteIcon sx={{ color: 'black' }} />
                                                            </IconButton>)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='block lg:hidden w-full pt-4'>
                        <UserCardProfile fetchFunc={handleFetchUsers} editFunc={editUserStatus}
                            deleteFunc={deleteUser}
                        />
                    </div>
                </section>
            )}
        </div>
    )
}
