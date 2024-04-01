import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Datatable } from './DataTable'
import authService from '../../server/auth'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/authSlice'
import { allUsersData, clearAllUsersData } from '../../store/userDataSlice'
import { Sidebar } from './Sidebar'
import { useCookies } from 'react-cookie'
import { Alert, Box, Button, Snackbar } from '@mui/material'
import { SuccessBanner } from './SuccessBanner'


function Dashboard() {

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken', 'refreshToken']);
  const allUsers = useSelector((state) => state.allUsers.allUsersData)
  const [open, setOpen] = useState(false)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }


  const authData = useSelector((state) => state.auth.userData)

  const getUsers = useCallback(async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setOpen(true);

    authService.getAllUsers()
      .then((response) => {
        setLoading(false)
        dispatch(allUsersData(response?.data))
      })
      .catch((error) => {
        setLoading(false)
        console.log('Error:', error?.message || 'something went wrong')
        setError(error.response.data.message || error?.message || 'something went wrong')
        toast.dismiss()
        // error.response?.data.message ? toast.error(error.response.data.message) : toast.error(error.message)
      })
      .finally(() => setLoading(false))

  }, [])


  useEffect(() => {
    authService.getCurrentUser(cookies?.accessToken || null)
      .then((userData) => {
        // console.log('DashboardLayout :: getCurrentUser :: userData:', userData)
      })
      .catch((error) => {
        console.log('Dashboard.jsx :: getCurrentUser :: Error:', error?.response)
        if (error.response?.statusText === 'Unauthorized' && error.response?.status === 401) {
          authService.refreshAccessToken(cookies?.refreshToken || null)
            .then((response) => {
              console.log('response:', response)
            })
            .catch((error) => {
              console.log('Dashboard.jsx :: getCurrentUser :: Error:', error?.response)
            })
          // setError(error?.response?.data?.message || error?.response.statusText)
          // dispatch(logout())
          // dispatch(clearAllUsersData())
          // localStorage.removeItem('accessToken')
          // setTimeout(() => {
          //   toast.error(error.response?.data?.message)
          //   navigate('/login')
          // }, 1000);
        }
      })
  }, [])

  if (authData) {
    return !loading ? (
      <>
        <div className='min-h-[88vh]'>
          {/* <h1 className='text-3xl font-bold text-center h-fit'>Dashboard</h1> */}
          {error && <p className="text-red-500 text-center font-semibold text-lg mt-2">{error}</p>}
          {/* ****************************ACTUAL CODE ************************************* */}
          <div className=" m-3 flex flex-col">
            {authData.userType === 'ADMIN' ? (<Button onClick={getUsers} variant='contained' sx={{ m: 1, width: 'fit-content', alignSelf: 'flex-end' }}>Fetch Users</Button>) : null}
            {authData.userType === 'CUSTOMER' && <SuccessBanner />}
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
              >
                Users fetched Successfully !
              </Alert>
            </Snackbar>
            <div className="min-h-[100px] rounded ">
              <div className="min-h-[100px] w-full rounded-lg border">
                <div className="min-h-[50px] rounded justify-center items-center m-1 ">
                  {/* Table to view Customers */}
                  <div className='gap-4'>
                    <Datatable />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : null
  }

}

export default Dashboard