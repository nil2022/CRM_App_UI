import React from 'react'
import { useSelector } from 'react-redux'

export default function ProfileCard() {

  const userData = useSelector((state) => state.auth.userData)

  return (
    <div className='m-2 p-5 flex flex-col items-center'>
      <div 
      className="w-[250px] text-center flex flex-col rounded-md border border-gray-200 shadow-violet-300 shadow-xl">
      {/* Profile pic with _id */}
        <div className="flex flex-col items-center justify-center w-full md:h-[250px] md:w-[300px] p-4 gap-y-2">
          <img
            src={userData?.avatar || 'Avatar'}
            alt="user_image"
            className="h-[200px] w-[200px] rounded-md object-cover"
          />
          <p className='text-xl'>{userData?.fullName}</p>
        </div>
      {/* User Details */}
        <div className="p-4">
          <h1 className=" items-center text-3xl font-semibold">
            Hi, {userData?.fullName || 'Full Name'}
          </h1>
          <p className='text-xs max-w-[250px] overflow-hidden'>{userData?._id || 'id'}</p>
          <hr className='my-3 border border-gray-300 w-full ' />
          <h2 className="font-medium text-gray-800">{userData?.email || 'Email'}</h2>
          <h2 className="font-medium text-gray-500">{userData?.userType || 'User Type'}</h2>
          <p className="mt-3 text-sm text-gray-600">
            About User
          </p>
        </div>
      </div>
    </div>
  )
}

