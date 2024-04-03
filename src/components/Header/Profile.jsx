import React from 'react'
import { useSelector } from 'react-redux'

export default function ProfileCard() {

  const userData = useSelector((state) => state.auth.userData)

  return (
    <div className='p-10 items-center justify-center'>
      <div 
      className="w-fit sm:w-[38rem] sm:flex max-w-2xl flex-col justify-center rounded-md border border-gray-200 hover:cursor-pointer hover:border-none hover:outline-none 
      border-black md:flex-row hover:shadow-2xl hover:shadow-violet-500 focus:shadow-violet-500 transition-all duration-500 hover:scale-110">
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
          <div className="sm:min-w-[300px] mt-4">
            {/* <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              {userData?.userId}
            </span>
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              {userData?.email}
            </span>
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              {userData?.userType}
            </span> */}
          </div>
          {/* <div className="mt-3 flex items-center space-x-2">
            <img
              className="inline-block h-8 w-8 rounded-full"
              src={userData?.avatar}
              alt="user-pic"
            />
            <span className="flex flex-col">
              <span className="text-[12px] font-medium text-gray-900">{userData?.fullName}</span>
              <span className="text-[10px] font-medium text-gray-500">{userData?.email}</span>
            </span>
          </div> */}
        </div>
      </div>
    </div>
  )
}

