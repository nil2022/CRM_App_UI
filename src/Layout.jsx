import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { CookiesProvider, useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './store/authSlice'
import authService from './server/auth'
import toast, { Toaster } from 'react-hot-toast'
import { clearAllUsersData } from './store/userDataSlice'


function Layout() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken']);

  // const userAuth = useSelector((state) => state.auth)
  // console.log('userAuth: (in Layout.jsx component)', userAuth)

  useEffect(() => {
    console.log('mounted (in Layout.jsx component)')
    setLoading(true);
    // console.log('cookies:', cookies.accessToken)
    if (localStorage.getItem('accessToken')) {
      authService.getCurrentUser(cookies?.accessToken || null)
        .then((userData) => {
          if (userData) {
            dispatch(login(userData.data))
          }
          // else {
          //   dispatch(logout());
          // }
        })
        .catch((error) => {
          setLoading(false)
          console.log('Layout :: getCurrentUser :: Error:', error.response)
          // if (error.response?.statusText === 'Unauthorized' && error.response?.status === 401) {
          //   // TODO: add refresh token endpoint to renew access token
          //   // authService.refreshAccessToken()
          //   dispatch(logout())
          //   dispatch(clearAllUsersData())
          //   localStorage.removeItem('accessToken')
          //   setTimeout(() => {
          //     toast.error(error.response?.data?.message)
          //     navigate('/login')
          //   }, 1000);
          // }
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
      dispatch(logout());
    }
    return () => {
      console.log('unmounted (in Layout.jsx component)')
      // toast.dismiss()
    }
  }, [])

  // console.log('Environment values:', import.meta.env.VITE_CRM_BACKEND_URL)

  return !loading ? (<div className='w-full block'>
    <CookiesProvider >
      <Header />
      <Toaster position="top-center"
        toastOptions={{
          duration: 1500,
          className: 'font-[600]'
        }} />
      <Outlet />
      <Footer />
    </CookiesProvider>
  </div>
  ) : null
}

export default Layout