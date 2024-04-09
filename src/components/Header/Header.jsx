import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Backdrop, Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { logout } from '../../store/authSlice';
import { clearAllUsersData } from '../../store/userDataSlice';
import authService from '../../server/auth';
import LogoutBtn from './LogoutBtn';
import Profile from './Profile';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import BasicMenu from '../MenuDropdown';

export function Header() {

  const authStatus = useSelector((state) => state.auth.status)
  const [error, setError] = useState('')
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutBtn = async (e) => {
    e.preventDefault()
    setError('')
    authService.logout()
      .then(() => {
        console.log('Logout Successfully !')
        toast.success('Logout successfully !')
        dispatch(logout())
        dispatch(clearAllUsersData())
        navigate('/login')
      })
      .catch((error) => {
        setError(error.message);
        console.log('Logout Error ::', error.message, error.response.data)
        // if (!error.response?.data?.success && error.response?.data?.statusCode === 401) {
        //     toast.error(error.response.data.message, {
        //         duration: 3000
        //     })
        //     navigate('/login')
        // }
      })
  }

  return (
    <div>
      <div className='w-full flex justify-center items-center sm:justify-end gap-x-2 min-h-[50px] bg-slate-700 text-white'>
        {authStatus && (<Link
          className='flex hover:bg-gray-300 hover:text-black transition-all duration-500 rounded-full p-2'
          to="/"
        >
          <HomeIcon sx={{ m: 0.5 }} fontSize="medium" />
        </Link>)}

        {/* {authStatus && (<Link
        className='flex items-center  hover:bg-gray-400 transition-all duration-400 rounded-full px-2 py-1'
        to="#"
      >
        <HowToRegIcon sx={{ mr: 0.5, color: "white" }} fontSize="small" />
        ACCOUNT
      </Link>)}

      {authStatus && (<Link
        className='flex items-center  hover:bg-gray-200 hover:bg-gray-400 transition-all duration-400 rounded-full px-3'
        to="#"
      >
        <LoginIcon sx={{ mr: 0.5 }} fontSize="small" color='white'/>
        SUPPORT
      </Link>)} */}

        {authStatus && (
          <div>
            <BasicMenu buttonText="Menu"/>
          </div>
        )}
        {/* {authStatus && (<Profile />)} */}
      </div>
    </div>
  );
}
