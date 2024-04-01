import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { useEffect } from 'react'
import authService from '../../server/auth'

export default function DashboardLayout() {

    const navigate = useNavigate();
    // const [error, setError] = useState('')

    useEffect(() => {
        authService.getCurrentUser()
        .then((userData) => {
            console.log('DashboardLayout :: getCurrentUser :: userData:', userData)
        })
        .catch(() => {
            console.log('DashboardLayout :: getCurrentUser :: Error:', error.response)
            if(error.response?.statusText === 'Unauthorized' && error.response?.status === 401) {
                setTimeout(() => {
                    toast.error(error.response?.data?.message)
                    navigate('/login')
                }, 1000);
            }
        })
        return () => {
            // console.clear('Unmounting DashboardLayout')
        }
    }, [])

    return (
        <div className='w-full flex'>
            {/* <div className='max-w-[250px] w-4/12 hidden sm:block'>
                <Sidebar />
            </div> */}
                <Outlet />
        </div>
    )
}