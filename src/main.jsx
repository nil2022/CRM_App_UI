import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout  from './Layout.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Signup from './components/Signup/Signup.jsx'
import Signin from './components/Signin/Signin.jsx'
import { Home } from './components/Home/Home.jsx'
import Dashboard from './components/Dashboard/Dashboard/Dashboard.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<Layout />}>
      <Route path='/' element={<Home />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/signin' element={<Signin />}/>
      <Route path='/dashboard' element={<Dashboard />}/>
  </Route>
  ) 
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
