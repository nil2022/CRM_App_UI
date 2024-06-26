import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Home } from './components/Home.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Error from './components/Error.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

/** Import Pages */
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import DashboardLayout from './components/Dashboard/DashboardLayout.jsx'
import ChangePassword from './components/ChangePassword.jsx'
import Tickets from './components/Tickets.jsx'
import CreateTicket from './components/CreateTicket.jsx'
import OTPInput from './components/OtpVerifyPage.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<PrivateRoute authentication = {false}> <Home/></PrivateRoute>} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/verify-otp' element={<OTPInput />} />
      <Route path='/dashboard' element={
        <PrivateRoute authentication = {true}><DashboardLayout /></PrivateRoute>}>
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
      <Route path='/change-password' element={<PrivateRoute authentication={true}><ChangePassword /></PrivateRoute>}/>
      <Route path='/tickets' element={<PrivateRoute authentication={true}><Tickets /></PrivateRoute>}/>
      <Route path='/create-ticket' element={<PrivateRoute authentication={true}><CreateTicket /></PrivateRoute>}/>
      <Route path='*' element={<Error />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
