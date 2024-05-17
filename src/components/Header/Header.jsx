import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { logout } from '../../store/authSlice';
import { clearAllUsersData } from '../../store/userDataSlice';
import authService from '../../server/auth';
import BasicMenu from '../MenuDropdown';

export function Header() {

  const authStatus = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      <div className='w-full flex justify-between items-center gap-x-2 h-[70px] bg-zinc-800 fixed top-0 z-10 border-b-0 shadow-md border-zinc-700 text-white'>
        <div>
          <Link to ="/">
            <img src="/icon-bulb.png" alt="icon-image"
              width={50}
              className='rounded-full m-4' />
          </Link>
        </div>
        {authStatus && (
          <div>
            <BasicMenu buttonText="Menu" />
          </div>
        )}
        {!authStatus && (
          <div>
            <Link
              className='text-center font-[600] px-5 py-2 mr-2 sm:mr-4 hover:bg-zinc-700/40 text-zinc-300/70 hover:text-white transition-all duration-500 rounded-md'
              to="/login"
            >
              Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
