import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export default function DashboardLayout() {

    return (
        <div className='w-full flex'>
            <div className='max-w-[250px] w-4/12 hidden sm:block'>
                <Sidebar />
            </div>
            <div className='w-full md:w-11/12 overflow-auto'>
                <Outlet />
            </div>
        </div>
    )
}