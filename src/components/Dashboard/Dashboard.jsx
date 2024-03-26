'use client'

import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import { Sidebar } from './Sidebar'
import { Datatable } from './DataTable'

const cookies = new Cookies(null, {
  path: '/',
  httpOnly: false,
  secure: true
});


function Dashboard() {

  const navigate = useNavigate()

  /** set loading state  */
  const [loading, setLoading] = useState(false)

  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoggedOut, setIsLoggedOut] = useState(false)
  const [getAllUsersData, setGetAllUsersData] = useState({})

  const getUsers = useCallback(async (e) => {
    e.preventDefault()
    setLoading(true)
    const backendUrl = import.meta.env.VITE_CRM_BACKEND_URL
    try {
      setIsLoggedOut(false)
      const response = await axios.get(`${backendUrl}/crm/api/users`, {
        headers: {
          Authorization: `Bearer ${cookies.get('accessToken')}`,
        }
      })

      toast.dismiss()
      setGetAllUsersData(response.data)
      toast.success(response.data.message)

    } catch (error) {
      setLoading(false)
      console.log('Error:', error)
      toast.dismiss()
      error.response?.data.message ? toast.error(error.response.data.message) : toast.error(error.message)
    }
  }, [])

  const handleLogout = useCallback(async (e) => {
    e.preventDefault()
    setLoading(true)
    const backendUrl = import.meta.env.VITE_CRM_BACKEND_URL
    try {
      const response = await axios.get(`${backendUrl}/crm/api/auth/logout`, {
        headers: {
          Authorization: `Bearer ${cookies.get('accessToken')}`,
        }
      })
      setIsLoggedOut(true)
      setLoading(false)
      console.log('response:', response)
      cookies.remove('accessToken')
      console.log(response.data.message)

    } catch (error) {
      setLoading(false)
      console.log('Error:', error)
      toast.dismiss()
      toast.error(error.response?.data?.message)
    }
  }, [])



  useEffect(() => {

    if (loading) {
      toast.loading('Please wait.....')
    }

    if (!cookies.get('accessToken') && !isLoggedOut) {
      toast.dismiss()
      setLoading(false)
      toast.error('Please Login to access dashboard!')
      setTimeout(() => {
        toast.dismiss()
        navigate('/signin', {
          unstable_viewTransition: true,
          unstable_flushSync: true
        })
      }, 1500);
    }


    if (!cookies.get('accessToken') && isLoggedOut) {
      setLoading(false)
      toast.dismiss()
      toast.success('Logout successfully!')
      setTimeout(() => {
        toast.dismiss()
        navigate('/signin', {
          unstable_viewTransition: true,
          unstable_flushSync: true
        })
      }, 1500);
    }


    return () => {
      toast.dismiss()
    }
  }, [loading, isLoggedOut, navigate])

  function handleGetAllUsers() {
    const data = getAllUsersData.Response
    for (const iterator of data) {
      console.log(iterator['userId'])
      console.log(iterator['name'])
    }

  }

  // console.log('getAllUsersData:', handleGetAllUsers(getAllUsersData))

  return (
    <>
      <Toaster position="top-center" />
      <div className={cookies.get('accessToken') ? `block` : `hidden`}>
        <h1 className='text-3xl font-bold text-center h-fit'>Dashboard</h1>
        {/* ****************************ACTUAL CODE ************************************* */}
        <div className=" m-3 grid gap-3 grid-cols-12">
          <div className="min-h-[100px] w-full rounded hidden lg:block col-span-2">
            <Sidebar />
          </div>
          <div className="min-h-[100px] rounded col-span-12 lg:col-span-10">
            <div className="min-h-[100px] w-full rounded-lg grid sm:grid-row-6 border">
              <div className="h-fit rounded justify-center text-center items-center m-1 sm:row-span-2">
                <button
                  onClick={getUsers}
                  className=" row-span-2 w-[100px] h-full m-2 text-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Get Users
                </button>
                <button
                  onClick={handleLogout}
                  className="row-span-2 w-[100px] h-full m-2 text-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Logout
                </button>
              </div>
              <div className="min-h-[50px] rounded justify-center items-center m-1 sm:row-span-4">
                <p className='text-2xl h-[50px] p-2 m-1 border text-center font-bold gap-2'>
                  {'Data Length-'}{getAllUsersData.Response?.length ? getAllUsersData.Response?.length : 0}
                </p>
                {/* Table to view Customers */}
                <div className='gap-4'>
                  <Datatable
                    value={'Customers'}
                    data={getAllUsersData.Response}
                  />
                </div>
                {/* Table to view Engineerss */}
                {/* <div className='gap-4'>
                  <Datatable value={'Employees'} />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard