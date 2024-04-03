import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Datatable } from './DataTable'
import authService from '../../server/auth'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/authSlice'
import { useCookies } from 'react-cookie'
import { Alert, Box, Button, Skeleton, Snackbar } from '@mui/material'
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
  const [renderCount, setRenderCount] = useState(0)
  const authData = useSelector((state) => state.auth.userData)


  useEffect(() => {
    // setLoading(true)
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
        // setLoading(false)
      })
    // console.log('renderCount: (in Dashboard.jsx)', renderCount)
    setRenderCount(prevCount => prevCount + 1)

  }, [navigate])



  if (authData) {
    return !loading ? (
      <div className='min-h-[88vh] flex flex-col items-center justify-center'>
        {authData.userType === 'ADMIN' && (<p className='text-3xl text-center p-2'>Hi, {authData?.fullName}</p>)}
        {renderCount > 0 && <p>Render Count in Dashboard.jsx :{renderCount}</p>}
        {/* <UserCard /> */}
        {authData.userType === 'CUSTOMER' && (<ProfileCard />)}
        {/* <h1 className='text-3xl font-bold text-center h-fit'>Dashboard</h1> */}
        {error && <p className="text-red-500 text-center font-semibold text-lg mt-2">{error}</p>}
        {/* ****************************ACTUAL CODE ************************************* */}
        <div className=" m-3 flex flex-col">
          {/* {authData.userType === 'CUSTOMER' && <SuccessBanner />} */}
          {authData.userType === 'ADMIN' && (<div className="w-full rounded  ">
            <div className=" w-full justify-start rounded-lg border bg-blue-100">
              <div className="min-h-[50px] flex rounded justify-start items-center m-1 ">
                <div className='gap-4'>
                  <Datatable />
                </div>
              </div>
            </div>
          </div>)}
        </div>
      </div>
    ) : (<div className='text-3xl text-center'>Loading...</div>
      // <div className='w-full min-h-[52vh] items-center'>
      //   <Box sx={{ padding: '1em', marginTop: '5em', minHeight: '30vh', alignSelf: 'center', rowGap: '2em' }}>
      //     <Skeleton animation="pulse" variant='rectangular' sx={{ fontSize: '1rem' }} />
      //     <Skeleton animation="pulse" sx={{ fontSize: '1rem' }} />
      //     <Skeleton animation="pulse" variant='h2' />
      //     <Skeleton animation="pulse" variant='h2' />
      //     <Skeleton animation="pulse" variant='h2' />
      //     <br />
      //     <Skeleton animation="pulse" variant='rectangular' sx={{ fontSize: '1rem' }} />
      //     <Skeleton animation="pulse" sx={{ fontSize: '1rem' }} />
      //     <Skeleton animation="pulse" variant='h2' />
      //     <Skeleton animation="pulse" variant='h2' />
      //     <Skeleton animation="pulse" variant='h2' />
      //   </Box>
      //   <Box sx={{ padding: '1em', marginTop: '2em', minHeight: '30vh', alignSelf: 'center', rowGap: '1em' }}>
      //     <Skeleton animation="pulse" variant='rectangular' sx={{ fontSize: '1rem' }} />
      //     <Skeleton animation="pulse" sx={{ fontSize: '1rem' }} />
      //     <Skeleton animation="pulse" variant='h2' />
      //     <Skeleton animation="pulse" variant='h2' />
      //     <Skeleton animation="pulse" variant='h2' />
      //     <br />
      //     <Skeleton animation="pulse" variant='rectangular' sx={{ fontSize: '1rem' }} />
      //     <Skeleton animation="pulse" sx={{ fontSize: '1rem' }} />
      //     <Skeleton animation="pulse" variant='h2' />
      //     <Skeleton animation="pulse" variant='h2' />
      //     <Skeleton animation="pulse" variant='h2' />
      //   </Box>
      // </div>
    )
  }
}