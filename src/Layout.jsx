import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { CookiesProvider } from 'react-cookie'


function Layout() {

console.log('Environment values:', import.meta.env.VITE_CRM_BACKEND_URL)

  return (

    <CookiesProvider>
      <Header />
      <Outlet />
      <Footer />
    </CookiesProvider>

  )
}

export default Layout