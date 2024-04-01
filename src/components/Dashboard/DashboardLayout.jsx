import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { useEffect } from 'react'
import authService from '../../server/auth'
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';

export default function DashboardLayout() {

    const navigate = useNavigate();
    const [cookies] = useCookies(['accessToken']);
    // const [error, setError] = useState('')

    useEffect(() => {
        authService.getCurrentUser(cookies?.accessToken || null, cookies?.refreshToken || null)
            .then((userData) => {
                console.log('DashboardLayout :: getCurrentUser :: userData:', userData)
            })
            .catch((error) => {
                console.log('DashboardLayout :: getCurrentUser :: Error:', error?.response || 'something went wrong')
                if (error.response?.statusText === 'Unauthorized' && error.response?.status === 401) {
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
        <div>
            <Outlet />
        </div>
    )
}