import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { CookiesProvider } from 'react-cookie'


function Layout() {


  return (
    <CookiesProvider>
      <Header/>
      {/* <div>{cookies.accessToken ? <Dashboard user={cookies.accessToken}/> : <HandleCookies/> }</div> */}
      <Outlet/>
      <Footer/>
    </CookiesProvider>    
  )
}

export default Layout