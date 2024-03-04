import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'


function Dashboard() {

  const navigate = useNavigate()

  const [cookies, setCookie] = useCookies(['accessToken'])
  /** set loading state  */
  const [loading, setLoading] = useState(false)
  // const [logoutSuccess, setLogoutSuccess] = useState(false)
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoggedOut, setIsLoggedOut] = useState(false)
  const [getAllUsersData, setGetAllUsersData] = useState({})

  const getUsers = useCallback(async (e) => {
    e.preventDefault()
    
    const backendUrl = import.meta.env.VITE_CRM_BACKEND_URL
    try {
      setIsLoggedOut(false)
      const response = await axios.get(`${backendUrl}/crm/api/users`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`
        }
      })
      // setIsLoggedIn(true)
      toast.dismiss()
      console.log('response:', response)
      setGetAllUsersData(response.data)
      toast.success(response.data.message)
    } catch (error) {
      // setIsLoggedIn(false)
      setLoading(false)
      console.log('Error:', error)
      toast.dismiss()
      toast.error(error.response?.data?.message)
    }
  }, [cookies])

  const handleLogout = useCallback(async (e) => {
    e.preventDefault()
    setLoading(true)
    const backendUrl = import.meta.env.VITE_CRM_BACKEND_URL
    try {
      const response = await axios.get(`${backendUrl}/crm/api/auth/logout`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
          // 'x-access-token': cookies.accessToken
        }
      })
      setIsLoggedOut(true)
      setLoading(false)
      console.log('response:', response)
      setCookie('accessToken', '', {
        path: '/',
        secure: true
      })

    } catch (error) {
      setLoading(false)
      console.log('Error:', error)
      toast.dismiss()
      toast.error(error.response?.data?.message)
    }
  }, [cookies, setCookie])

  useEffect(() => {

    if (loading) {
      toast.loading('Please wait.....')
    }

    if(!cookies.accessToken) {
      toast.dismiss()
      setLoading(false)
      toast.error('Please Login to access dashboard!')
      setTimeout(() => {
        navigate('/signin')
      }, 1500);
    }


    if(isLoggedOut) {
      setLoading(false)
      toast.dismiss()
      toast.success('Logout successfully!')
      setTimeout(() => {
        navigate('/signin')
      }, 1500);
    }

    return () => {
      toast.dismiss()
    }
  }, [loading, isLoggedOut, cookies, navigate])

  const handleGetAllUsers = useCallback(async () => {
    const data = getAllUsersData.Response
    for (const iterator of data) {
      console.log(iterator['userId'])
      console.log(iterator['name'])
    }

  },[getAllUsersData])

// console.log('getAllUsersData:', handleGetAllUsers(getAllUsersData))

  // console.log('cookies:', cookies)

  return (
    <>
      <div><Toaster position="top-center" /></div>
      <div className='w-full h-screen'>
        <h1 className='text-3xl font-bold text-center h-fit'>Dashboard</h1>
        <div className='w-full h-fit p-4 items-center text-right'>
          <button
            onClick={getUsers}
            className="w-[100px] h-[40px] m-2 text-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Get Users
          </button>
          <button
            onClick={handleLogout}
            className="w-[100px] h-[40px] m-2 text-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Logout
          </button>
        </div>
        <div className='w-full h-fit p-2 m-1 text-2xl text-center font-bold'>
          {' '}{}
        </div>
        <button 
        className=' w-fir h-fit p-2 m-1 text-2xl text-center font-bold bg-slate-300'
        onClick={handleGetAllUsers}>
        CLick
        </button>
      </div>
    </>
  )
}

export default Dashboard