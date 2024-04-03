import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Backdrop, Button, CircularProgress, IconButton, Skeleton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import authService from '../../server/auth'
import { clearAllUsersData, usersData } from '../../store/userDataSlice'
import { logout } from '../../store/authSlice'
import { useCookies } from 'react-cookie'
import { CachedRounded } from '@mui/icons-material';
import { Box } from 'lucide-react'


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
            {renderCount > 0 && <p>Render Count in Datatable.jsx :{renderCount}</p>}
            Users in DB: {allUsers.length}
            {allUsers.length > 0 && (
                <section className="mx-auto w-full max-w-7xl px-4 py-4">
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                        <div>
                            <h2 className="text-lg font-semibold">Users</h2>
                            <p className="mt-1 text-sm text-gray-700">
                                This is a list of all <strong>Users</strong> in our database
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50 ">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                                >
                                                    <span>Customers</span>
                                                </th>
                                                <th
                                                    scope='col'
                                                    className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                                                >
                                                    <span>Email ID</span>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-8 py-3.5 text-center text-sm font-normal text-gray-700"
                                                >
                                                    User ID
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                                                >
                                                    User Type
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
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
                                                    className="relative px-4 py-3.5"
                                                >
                                                    <button onClick={handleFetchUsers}>
                                                        <CachedRounded />
                                                    </button>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-slate-50">
                                            {allUsers.map((person) => (
                                                <tr key={person._id}>
                                                    <td className="whitespace-nowrap px-4 py-4">
                                                        <div className="flex items-center">
                                                            <div className="h-10 w-10 flex-shrink-0">
                                                                {person.avatar ? (
                                                                    <img
                                                                        className="h-10 w-10 rounded-full object-cover"
                                                                        src='../src/assets/avatar.png'
                                                                        alt="person-image"
                                                                    />
                                                                ) : (<UserCircleIcon className="h-8 w-8 rounded-full object-cover" />)}
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
                                                        {/* <div className="text-sm text-gray-900 ">{person.userType}</div> */}
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
                </section>
            )}
        </div>
    )
    // return !loading ? (
    //     <div>
    //         <Backdrop
    //             sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //             open={open}
    //         >
    //             <CircularProgress color="inherit" />
    //         </Backdrop>
    //         {renderCount > 0 && <p>Render Count in Datatable.jsx :{renderCount}</p>}
    //         Users in DB: {allUsers.length}
    //         {allUsers.length > 0 && (
    //             <section className="mx-auto w-full max-w-7xl px-4 py-4">
    //                 <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
    //                     <div>
    //                         <h2 className="text-lg font-semibold">Users</h2>
    //                         <p className="mt-1 text-sm text-gray-700">
    //                             This is a list of all <strong>Users</strong> in our database
    //                         </p>
    //                     </div>
    //                 </div>
    //                 <div className="mt-6 flex flex-col">
    //                     <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    //                         <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
    //                             <div className="overflow-hidden border border-gray-200 md:rounded-lg">
    //                                 <table className="min-w-full divide-y divide-gray-200">
    //                                     <thead className="bg-gray-50 ">
    //                                         <tr>
    //                                             <th
    //                                                 scope="col"
    //                                                 className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
    //                                             >
    //                                                 <span>Customers</span>
    //                                             </th>
    //                                             <th
    //                                                 scope='col'
    //                                                 className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
    //                                             >
    //                                                 <span>Email ID</span>
    //                                             </th>
    //                                             <th
    //                                                 scope="col"
    //                                                 className="px-8 py-3.5 text-center text-sm font-normal text-gray-700"
    //                                             >
    //                                                 User ID
    //                                             </th>
    //                                             <th
    //                                                 scope="col"
    //                                                 className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
    //                                             >
    //                                                 User Type
    //                                             </th>

    //                                             <th
    //                                                 scope="col"
    //                                                 className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
    //                                             >
    //                                                 Status
    //                                             </th>

    //                                             <th
    //                                                 scope="col"
    //                                                 className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
    //                                             >

    //                                             </th>
    //                                             <th
    //                                                 scope="col"
    //                                                 className="relative px-4 py-3.5"
    //                                             >
    //                                                 <button onClick={handleFetchUsers}>
    //                                                     <CachedRounded />
    //                                                 </button>
    //                                             </th>
    //                                         </tr>
    //                                     </thead>
    //                                     <tbody className="divide-y divide-gray-200 bg-slate-50">
    //                                         {allUsers.map((person) => (
    //                                             <tr key={person._id}>
    //                                                 <td className="whitespace-nowrap px-4 py-4">
    //                                                     <div className="flex items-center">
    //                                                         <div className="h-10 w-10 flex-shrink-0">
    //                                                             {person.avatar ? (
    //                                                                 <img
    //                                                                     className="h-10 w-10 rounded-full object-cover"
    //                                                                     src='../src/assets/avatar.png'
    //                                                                     alt="person-image"
    //                                                                 />
    //                                                             ) : (<UserCircleIcon className="h-8 w-8 rounded-full object-cover" />)}
    //                                                         </div>
    //                                                         <div className="ml-4">
    //                                                             <div className="text-sm font-medium text-gray-900">{person.fullName}</div>
    //                                                             <div className="text-sm text-gray-700">{person._id}</div>
    //                                                         </div>
    //                                                     </div>
    //                                                 </td>
    //                                                 <td
    //                                                     className='whitespace-nowrap px-4 py-4 text-center'
    //                                                 >
    //                                                     <div className="text-sm text-gray-700">{person.email}</div>
    //                                                 </td>
    //                                                 <td className="whitespace-nowrap px-8 py-4 text-center">
    //                                                     {/* <div className="text-sm text-gray-900 ">{person.userType}</div> */}
    //                                                     <div className="text-sm text-gray-700">{person.userId}</div>
    //                                                 </td>
    //                                                 <td className="whitespace-nowrap px-4 py-4 text-center">
    //                                                     {person.userType === 'ADMIN' ? (<div className="inline-flex rounded-full bg-blue-200 px-2 text-xs font-semibold leading-5 text-blue-800">{person.userType}</div>) : (person.userType === 'ENGINEER' ? (<div className="inline-flex rounded-full bg-yellow-200 px-2 text-xs font-semibold leading-5 text-yellow-800">{person.userType}</div>) : (
    //                                                         <div className="inline-flex rounded-full bg-slate-200 px-2 text-xs font-semibold leading-5 text-slate-800">{person.userType}</div>
    //                                                     ))}
    //                                                 </td>
    //                                                 <td className="whitespace-nowrap px-4 py-4 text-center">
    //                                                     {person.userStatus === 'APPROVED' ? (<span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
    //                                                         {person.userStatus}
    //                                                     </span>) : (
    //                                                         <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
    //                                                             {person.userStatus}
    //                                                         </span>
    //                                                     )}
    //                                                 </td>
    //                                                 <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
    //                                                     {person.userId !== 'john123' &&
    //                                                         (<Button onClick={() => editUserStatus(person.userId, (person.userStatus === 'APPROVED') ? 'PENDING' : 'APPROVED')}
    //                                                             className="text-gray-700"
    //                                                             variant='text'>
    //                                                             <ModeEditRoundedIcon sx={{ color: 'black' }} />
    //                                                         </Button>)}
    //                                                 </td>
    //                                                 <td>
    //                                                     {person.userId !== 'john123' &&
    //                                                         (<IconButton aria-label="delete" onClick={() => deleteUser(person.userId)}>
    //                                                             <DeleteIcon sx={{ color: 'black' }} />
    //                                                         </IconButton>)}
    //                                                 </td>
    //                                             </tr>
    //                                         ))}
    //                                     </tbody>
    //                                 </table>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </section>
    //         )}
    //     </div>
    // ) : (
    //     <div className='w-full min-h-[60vh] items-center justify-center flex'>
    //         {/* <Box sx={{ padding: '1em', marginTop: '5em', minHeight: '30vh', alignSelf: 'center', rowGap: '2em' }}>
    //             <Skeleton animation="pulse" variant='rectangular' sx={{ fontSize: '1rem' }} />
    //             <Skeleton animation="pulse" sx={{ fontSize: '1rem' }} />
    //             <Skeleton animation="pulse" variant='h2' />
    //             <Skeleton animation="pulse" variant='h2' />
    //             <Skeleton animation="pulse" variant='h2' />
    //             <br />
    //             <Skeleton animation="pulse" variant='rectangular' sx={{ fontSize: '1rem' }} />
    //             <Skeleton animation="pulse" sx={{ fontSize: '1rem' }} />
    //             <Skeleton animation="pulse" variant='h2' />
    //             <Skeleton animation="pulse" variant='h2' />
    //             <Skeleton animation="pulse" variant='h2' />
    //         </Box> */}
    //         <Backdrop
    //             sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //             open={open}
    //         >
    //             <CircularProgress color="inherit" />
    //         </Backdrop>
    //     </div>
    // )
}
