import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Home } from './components/Home.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Error from './components/Error.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

/** Import Pages */
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import DashboardLayout from './components/Dashboard/DashboardLayout.jsx'


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Layout />}>
//       <Route path='/' element={<Home />} />
//       <Route path='/register' element={<Register />} />
//       <Route path='/login' element={<Login />} />
//       <Route path='/dashboard' element={
//         <PrivateRoute><Dashboard /></PrivateRoute>}>
//         <Route path='/dashboard/profile' element={<ProfilePage />} />
//       </Route>
//       <Route path='*' element={<Error />} />
//     </Route>
//   )
// )

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/dashboard',
        element: (<PrivateRoute><DashboardLayout /></PrivateRoute>),
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />,
          },
          {
            path: '/dashboard/profile',
            element: <ProfilePage />,
          }
        ]
      },
      {
        path: '*',
        element: <Error />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
