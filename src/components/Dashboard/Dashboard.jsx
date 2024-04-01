import React, {useEffect, useState } from 'react'
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


function Dashboard() {

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken', 'refreshToken']);
  const allUsers = useSelector((state) => state.allUsers.allUsersData)
  const [open, setOpen] = useState(false)
  const [renderCount, setRenderCount] = useState(0)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const authData = useSelector((state) => state.auth.userData)


  useEffect(() => {
    setLoading(true)
    authService.getCurrentUser(cookies?.accessToken || null)
      .then((userData) => {
        setRenderCount(prevCount => prevCount + 1)
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
          console.log('Dashboard.jsx :: getCurrentUser :: Error:', error?.response)
        } else if(error.response?.statusText === 'Not Found' && error.response?.status === 404) {
          toast.error(error.response?.data?.message)
          navigate('/login') 
        }
      }
    ).finally(() => setLoading(false))  

  }, [])

  console.log('renderCount: (in Dashboard.jsx)', renderCount)

  if (authData) {
    return !loading ? (
      <div className='min-h-[88vh]'>
        {/* <UserCard /> */}
        {/* <h1 className='text-3xl font-bold text-center h-fit'>Dashboard</h1> */}
        {error && <p className="text-red-500 text-center font-semibold text-lg mt-2">{error}</p>}
        {/* ****************************ACTUAL CODE ************************************* */}
        <div className=" m-3 flex flex-col">
          {/* {authData.userType === 'ADMIN' ? (<Button onClick={getUsers} variant='contained' sx={{ m: 1, width: 'fit-content', alignSelf: 'flex-end' }}>Fetch Users</Button>) : null} */}
          {authData.userType === 'CUSTOMER' && <SuccessBanner />}
          {/* <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: '100%' }}
            >
              Users fetched Successfully !
            </Alert>
          </Snackbar> */}
          <div className="min-h-[100px] rounded ">
            <div className="min-h-[100px] w-full rounded-lg border">
              <div className="min-h-[50px] rounded justify-center items-center m-1 ">
                {/* Table to view Customers */}
                {authData.userType === 'ADMIN' && (<div className='gap-4'>
                  <Datatable />
                </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (<div className='w-full min-h-[52vh] items-center'>
      <Box sx={{ padding: '1em', marginTop: '5em', minHeight: '30vh', alignSelf: 'center', rowGap: '2em' }}>
        <Skeleton animation="pulse" variant='rectangular' sx={{ fontSize: '1rem' }} />
        <Skeleton animation="pulse" sx={{ fontSize: '1rem' }} />
        <Skeleton animation="pulse" variant='h2' />
        <Skeleton animation="pulse" variant='h2' />
        <Skeleton animation="pulse" variant='h2' />
        <br />
        <Skeleton animation="pulse" variant='rectangular' sx={{ fontSize: '1rem' }} />
        <Skeleton animation="pulse" sx={{ fontSize: '1rem' }} />
        <Skeleton animation="pulse" variant='h2' />
        <Skeleton animation="pulse" variant='h2' />
        <Skeleton animation="pulse" variant='h2' />
      </Box>
      <Box sx={{ padding: '1em', marginTop: '2em', minHeight: '30vh', alignSelf: 'center', rowGap: '1em' }}>
        <Skeleton animation="pulse" variant='rectangular' sx={{ fontSize: '1rem' }} />
        <Skeleton animation="pulse" sx={{ fontSize: '1rem' }} />
        <Skeleton animation="pulse" variant='h2' />
        <Skeleton animation="pulse" variant='h2' />
        <Skeleton animation="pulse" variant='h2' />
        <br />
        <Skeleton animation="pulse" variant='rectangular' sx={{ fontSize: '1rem' }} />
        <Skeleton animation="pulse" sx={{ fontSize: '1rem' }} />
        <Skeleton animation="pulse" variant='h2' />
        <Skeleton animation="pulse" variant='h2' />
        <Skeleton animation="pulse" variant='h2' />
      </Box>
    </div>)
  }
}

export default Dashboard