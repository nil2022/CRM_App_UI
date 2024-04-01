import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const userData = useSelector((state) => state.auth.userData)

  // console.log('authStatus: (in Profile component)', userData)

  return (
    <div>
      {/* <div className='text-3xl font-[700] text-center'>Profile</div> */}
      {userData && (
        <div className='min-w-[100px] text-center text-lg mt-2 mx-2 flex '>
          <p>Hi, <strong>{userData?.fullName}</strong> </p>
          {/* <p><strong>User Id:</strong> {userData?.userId}</p>
          <p><strong>Email:</strong> {userData?.email}</p> */}
        </div>
      )}
    </div>
  )
}
