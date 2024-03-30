import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
  const userData = useSelector((state) => state.auth.userData)

  // console.log('authStatus: (in Profile component)', userData)

  return (
    <div>
      <div className='text-3xl font-[700] text-center'>Profile</div>
      {userData && (
        <div className='min-w-[100px] text-left text-xl mt-4 mx-8 flex flex-col gap-y-2 border'>
          <p><strong>Name:</strong> {userData?.fullName}</p>
          <p><strong>User Id:</strong> {userData?.userId}</p>
          <p><strong>Email:</strong> {userData?.email}</p>
        </div>
      )}
    </div>
  )
}

export default Profile