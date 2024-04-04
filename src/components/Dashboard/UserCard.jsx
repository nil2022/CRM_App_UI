import * as React from 'react';
import { Backdrop, Button, CircularProgress } from '@mui/material';
import { DeleteRounded, Edit } from '@mui/icons-material';
import authService from '../../server/auth';
import { useSelector } from 'react-redux';

export default function UserCard({ fetchFunc, editFunc, deleteFunc }) {

    const data = useSelector((state) => state.data?.usersData || [])

    React.useEffect(() => {
        fetchFunc()
    }, [])

    // console.log('data: (in UserCard.jsx)', data)

    return (
        <div>
            <div className='w-full grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {data.length > 0 && (data.map((data) => (
                    <div key={data._id} className="min-w-[150px] rounded-md border">
                        <img
                            src={data.avatar}
                            alt="user-pic"
                            className="max-h-[300px] w-full rounded-md object-cover"
                        />
                        <div className="p-4">
                            <div>
                                <h1 className="text-lg font-semibold">{data.fullName}</h1>
                                <p className="text-[14px] md:text-[12px] font-semibold">_id: {data._id}</p>
                            </div>
                            <div className='border border-gray-300 m-2'></div>
                            <div className='flex flex-col'>
                                <div className='flex gap-x-4 items-center justify-center'>
                                    <p>{data.userType === 'ADMIN' ? (<div className="inline-flex rounded-full bg-blue-200 px-2 text-md font-semibold leading-5 text-blue-800">{data.userType}</div>) : (data.userType === 'ENGINEER' ? (<div className="inline-flex rounded-full bg-yellow-200 px-2 text-md font-semibold leading-5 text-yellow-800">{data.userType}</div>) : (
                                        <div className="inline-flex rounded-full bg-slate-200 px-2 text-md font-semibold leading-5 text-slate-800">{data.userType}</div>
                                    ))}
                                    </p>
                                    <p>{data.userStatus === 'APPROVED' ? (<span className="inline-flex rounded-full bg-green-100 px-2 text-md font-semibold leading-5 text-green-800">
                                        {data.userStatus}
                                    </span>) : (
                                        <span className="inline-flex rounded-full bg-red-100 px-2 text-md font-semibold leading-5 text-red-800">
                                            {data.userStatus}
                                        </span>
                                    )}</p>
                                </div>

                                <p className='text-[15px]'><strong>EMAIL :</strong>{' '}{data.email}</p>
                                <p><strong>UserID :</strong>{' '}{data.userId}</p>
                                {/* <p><strong>Registered :</strong> {' '}{data.email}</p>
                        <p><strong>Updated :</strong>{' '}{data.email}</p> */}
                                <p className="min-h-[50px] mt-3 text-sm text-gray-600 border rounded-md">
                                    About User
                                </p>
                            </div>
                            <div className='flex justify-around m-4'>
                                {data.userId !== 'john123' && (
                                    <Button
                                        variant='contained'
                                        startIcon={<Edit />}
                                        color='info'
                                        onClick={() => editFunc(data.userId, (data.userStatus === 'APPROVED') ? 'PENDING' : 'APPROVED')}
                                    >
                                        Edit
                                    </Button>)}
                                {data.userId !== 'john123' && (
                                    <Button
                                        variant='contained'
                                        startIcon={<DeleteRounded />}
                                        color='error'
                                        onClick={() => (deleteFunc(data.userId))}
                                    >
                                        Delete
                                    </Button>)}
                            </div>
                        </div>
                    </div>
                    ))
                )}
            </div>
        </div>
    )
}