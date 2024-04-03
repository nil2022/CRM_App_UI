import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Datatable } from './DataTable'
import authService from '../../server/auth'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/authSlice'
import { useCookies } from 'react-cookie'
import { Alert, Backdrop, Box, Button, CircularProgress, Skeleton, Snackbar } from '@mui/material'
import { SuccessBanner } from './SuccessBanner'
import UserCard from './UserCard'
import toast from 'react-hot-toast'
import ProfileCard from '../Header/Profile'


export default function Dashboard() {

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken', 'refreshToken']);
  const allUsers = useSelector((state) => state.data?.usersData)
  const userData = useSelector((state) => state.auth.userData)
  const [renderCount, setRenderCount] = useState(0)
  const authData = useSelector((state) => state.auth.userData)
  const [open, setOpen] = React.useState(false);


  useEffect(() => {
    setOpen(true)
    authService.getCurrentUser(cookies?.accessToken || null)
      .then((userData) => {

        // console.log('DashboardLayout :: getCurrentUser :: userData:', userData)
      })
      .catch((error) => {
        console.log('Dashboard.jsx :: getCurrentUser :: Error:', error?.response)
        if (error.response?.statusText === 'Unauthorized' && error.response?.status === 401) {
          // authService.refreshAccessToken(cookies?.refreshToken || null)
          //   .then((response) => {
          //     console.log('response:', response)
          //   })
          //   .catch((error) => {
          //     console.log('Dashboard.jsx :: getCurrentUser :: Error:', error?.response)
          //   })
          // console.log('Dashboard.jsx :: getCurrentUser :: Error:', error?.response)
        } else if (error.response?.statusText === 'Not Found' && error.response?.status === 404) {
          toast.error(error.response?.data?.message)
          navigate('/login', {
            unstable_viewTransition: true,
            unstable_flushSync: true
          })
        }
      }
      ).finally(() => {
        setOpen(false)
      })
    // console.log('renderCount: (in Dashboard.jsx)', renderCount)
    setRenderCount(prevCount => prevCount + 1)

  }, [])



  if (authData) {
    return (
      <div className='flex flex-col'>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {authData.userType === 'ADMIN' && (<p className='text-3xl text-center p-2'>Hi, {authData?.fullName}</p>)}
        {renderCount > 0 && <p className='m-4 p-2'>Render Count in Dashboard.jsx :{renderCount}</p>}
        {/* <UserCard /> */}
        {authData.userType === 'CUSTOMER' && (
          <div className='h-[70vh] '>
            <div className='block md:hidden items-center justify-center'>
              <ProfileCard />
            </div>
            <div className='hidden md:block text-xl font-[500] m-5'>
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
        )}
        {/* <h1 className='text-3xl font-bold text-center h-fit'>Dashboard</h1> */}
        {error && <p className="text-red-500 text-center font-semibold text-lg mt-2">{error}</p>}
        {/* ****************************ACTUAL CODE ************************************* */}
        {authData.userType === 'ADMIN' && (
          <div className="m-4 border-2">
            <div>
              <Datatable />
            </div>
          </div>
        )}
      </div>
    )
  }
}