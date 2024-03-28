import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { CookiesProvider } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './store/authSlice'
import authService from './server/auth'
import { Toaster } from 'react-hot-toast'


function Layout() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const userAuth = useSelector((state) => state.auth)
  // console.log('userAuth: (in Layout.jsx component)', userAuth)

  useEffect(() => {
    setLoading(true);
    if (userAuth.status === true && localStorage.getItem('accessToken')) {
      authService.getCurrentUser({
        userId: userAuth.userData?.userId,
        accessToken: localStorage.getItem('accessToken')
      })
        .then((userData) => {
          if (userData) {
            dispatch(login({ userData }))
          } else {
            dispatch(logout());
          }
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
      dispatch(logout());
    }
  }, [])

  // console.log('Environment values:', import.meta.env.VITE_CRM_BACKEND_URL)

  return !loading ? (<div className='w-full block'>
    <CookiesProvider>
      <Header />
      <Toaster position="top-center"/>
      <Outlet />
      <Footer />
    </CookiesProvider>
  </div>
  ) : null
}

export default Layout