import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Datatable } from './DataTable'
import authService from '../../server/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import { allUsersData, clearAllUsersData } from '../../store/userDataSlice'
import { Sidebar } from './Sidebar'


function Dashboard() {

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  // const authStatus = useSelector((state) => state.auth.status)

  // const getUsers = useCallback(async (e) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   setError('')

  //   authService.getAllUsers({ accessToken: localStorage.getItem('accessToken') })
  //     .then((response) => {
  //       setLoading(false)
  //       dispatch(allUsersData(response?.Response))
  //       toast.success(response?.message || 'Success')
  //     })
  //     .catch((error) => {
  //       setLoading(false)
  //       console.log('Error:', error?.message || 'something went wrong')
  //       setError(error.response.data.message || error?.message || 'something went wrong')
  //       toast.dismiss()
  //       // error.response?.data.message ? toast.error(error.response.data.message) : toast.error(error.message)
  //     })
  //     .finally(() => setLoading(false))

  // }, [])

  // const logoutBtn = async(e) => {
  //   setLoading(true)
  //   e.preventDefault()
  //   setError('')

  //     // console.log('coookies:', cookies.accessToken)
  //     authService.logout( localStorage.getItem('accessToken') )
  //     .then((response) => {
  //       console.log('Logout Successfull !', response)
  //       toast.success('Logout successfully !')
  //       dispatch(logout())
  //       dispatch(clearAllUsersData())
  //       localStorage.removeItem('accessToken')
  //       navigate('/login', {
  //         unstable_flushSync: true,
  //         unstable_viewTransition: 'all'
  //       })
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       console.log('Logout Error ::', error.message)
  //     })
  //     .finally(() => setLoading(false))
  // }



  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        // console.log('DashboardLayout :: getCurrentUser :: userData:', userData)
      })
      .catch((error) => {
        console.log('Dashboard.jsx :: getCurrentUser :: Error:', error.response)
        if (error.response?.statusText === 'Unauthorized' && error.response?.status === 401) {
          dispatch(logout())
          dispatch(clearAllUsersData())
          localStorage.removeItem('accessToken')
          setTimeout(() => {
            toast.error(error.response?.data?.message)
            navigate('/login')
          }, 1000);
        }
      })
    return () => {
      // console.clear('Unmounting Dashboard.jsx')
      toast.dismiss()
    }
  }, [])


  return !loading ? (
    <>
      <div>
        {/* <h1 className='text-3xl font-bold text-center h-fit'>Dashboard</h1> */}
        {error && <p className="text-red-500 text-center font-semibold text-lg mt-2">{error}</p>}
        {/* ****************************ACTUAL CODE ************************************* */}
        <div className=" m-3 flex flex-col">
          {/* <Sidebar /> */}
          <div className="min-h-[100px] rounded ">
            <div className="min-h-[100px] w-full rounded-lg border">
              <div className="h-fit rounded justify-center text-center items-center m-1">
                {/* <button
                  onClick={getUsers}
                  className="w-[100px] h-full m-2 text-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Get Users
                </button> */}
                {/* <button
                  onClick={logoutBtn}
                  className="w-[100px] h-full m-2 text-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Logout
                </button> */}
              </div>
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

export default Dashboard