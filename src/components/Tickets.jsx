import { CachedRounded } from '@mui/icons-material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import authService from '../server/auth'
import { ticketsData } from '../store/ticketsDataSlice'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Backdrop, Button, CircularProgress, IconButton, Skeleton, LinearProgress } from '@mui/material'
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuDropDown from './MenuDropdown'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import toast from 'react-hot-toast'
import MenuBar from './MenuBar'
import UserCard from './Dashboard/UserCard'

function Tickets() {

    const userData = useSelector((state) => state.auth?.userData || [])
    const allTickets = useSelector((state) => state.tickets?.ticketsData || [])
    const [ticketId, setTicketId] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    let [serialNo, setSerialNo] = React.useState(1)
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(false);
    const openStatusMenu = Boolean(anchorEl);
    // const openPriorityMenu = Boolean(anchorPriorityEl);
    const handleClick = (e, id) => {
        setAnchorEl(e.currentTarget);
        // setAnchorPriorityEL(e.currentTarget);
        setTicketId(id)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTicketStatusAndPriority = (id, ticketPriority, ticketStatus) => {
        setLoading(true)
        setOpen(true)
        authService.editTicketData(id, ticketPriority, ticketStatus)
            .then((response) => {
                console.log("Edit Ticket Response:", response.message)
                toast.success('Ticket Updated Success !')
            })
            .catch((err) => {
                console.log('Error:', err)

            })
            .finally(() => {
                setLoading(false)
                setOpen(false)
                setAnchorEl(null);
            })
    }

    // console.log('allTickets', allTickets)

    const handleFetchTickets = () => {
        setSerialNo(1)
        authService.getAllTickets()
            .then((response) => {
                console.log(response)
                dispatch(ticketsData(response.data))
            })
            .catch((err) => {
                console.log('Error:', err)
            })
    }

    useEffect(() => {

        handleFetchTickets()

    }, [loading])


    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='block xl:hidden'>
            hii
                <UserCard  />
            </div>
            <section className="w-full mx-auto max-w-7xl p-4 h-full hidden xl:block">
                {/* //* Important info */}
                <div className="flex gap-x-4">
                    <div className='w-[80%] sm:w-[50%] flex flex-col gap-y-2'>
                        <p className="text-base text-gray-700">
                            This is a list of all <strong>Tickets</strong> in our database
                        </p>
                    </div>
                    <p className='flex w-[20%] sm:w-[50%] text-base my-auto mx-auto items-center  justify-end pr-4 lg:hidden'>
                        <strong className='px-4 hidden sm:block'>Refresh Users</strong>
                        <button
                            onClick={handleFetchTickets}
                            className='drop-shadow-lg transition-all duration-300'
                        >
                            <CachedRounded color='primary' />
                        </button>
                    </p>
                </div>
                <div className="mt-6 flex flex-col hidden lg:block">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 mb-4">
                            <div className="border-2 border-gray-200 md:rounded-lg shadow-lg shadow-violet-300">
                                <table className="min-w-full divide-y divide-gray-200 ">
                                    <thead className="bg-gray-50 ">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-center text-gray-700"
                                            >
                                                <span>Sr. No.</span>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-center text-gray-700"
                                            >
                                                <span>Title</span>
                                            </th>
                                            <th
                                                scope='col'
                                                className="px-4 py-3.5 text-center text-gray-700"
                                            >
                                                <span>Description</span>
                                            </th>
                                            {userData.userType !== 'CUSTOMER' && (<th
                                                scope='col'
                                                className="px-4 py-3.5 text-center text-gray-700"
                                            >
                                                <span>Reported By</span>
                                            </th>)}
                                            <th
                                                scope="col"
                                                className="px-8 py-3.5 text-center text-gray-700"
                                            >
                                                Assigned Engineer
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-8 py-3.5 text-center text-gray-700"
                                            >
                                                Ticket Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-center text-gray-700"
                                            >
                                                Ticket Priority
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-center text-gray-700"
                                            >
                                                <span>Created At</span>
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                                            >
                                                
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-center text-gray-700"
                                            >
                                                <button
                                                    onClick={handleFetchTickets}
                                                    className='hover:scale-105 drop-shadow-lg hover:-rotate-45 transition-all duration-300'
                                                >
                                                    <CachedRounded color='primary' />
                                                </button>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-slate-50">
                                        {allTickets.map((ticket) => (
                                            <tr key={ticket._id}>
                                                <td className="whitespace-nowrap text-center px-4 py-4">
                                                    {serialNo++}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <div className="flex items-center">
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                                                            <div className="text-sm text-gray-700">{ticket._id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td
                                                    className='whitespace-wrap px-4 py-4 text-center'
                                                >
                                                    <div className="text-sm text-gray-700">{ticket.description}</div>
                                                </td>
                                                {userData.userType !== 'CUSTOMER' && (<td className="whitespace-nowrap px-8 py-4 text-center">
                                                    <div className="text-sm text-gray-700">{ticket.reporter}</div>
                                                </td>)}
                                                <td className="whitespace-nowrap px-8 py-4 text-center">
                                                    <div className="text-sm text-gray-700">{ticket.assignee}</div>
                                                </td>
                                                {/* Ticket Status Buttons */}
                                                <td className="whitespace-nowrap px-4 py-4 text-center">
                                                    <Button
                                                        id="status-button"
                                                        aria-controls={openStatusMenu ? 'status-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={openStatusMenu ? 'true' : undefined}
                                                        onClick={(e) => (handleClick(e, ticket._id))}
                                                        variant="text"
                                                        disabled={userData.userType === 'CUSTOMER' ? true : false}
                                                    >
                                                        {ticket.status === 'OPEN' ? (<div className="inline-flex rounded-full bg-green-200 px-2 text-xs font-semibold leading-5 text-green-800">{ticket.status}</div>) : (ticket.status === 'IN_PROGRESS' ? (<div className="inline-flex rounded-full bg-blue-200 px-2 text-xs font-semibold leading-5 text-blue-800">{ticket.status}</div>) : (ticket.status === 'BLOCKED' ? (<div className="inline-flex rounded-full bg-gray-200 px-2 text-xs font-semibold leading-5 text-gray-800">{ticket.status}</div>) : (
                                                            <div className="inline-flex rounded-full bg-red-200 px-2 text-xs font-semibold leading-5 text-red-800">{ticket.status}</div>
                                                        )))}

                                                    </Button>
                                                    {/* TICKET STATUS OPTIONS */}
                                                    <Menu
                                                        id="status-menu"
                                                        anchorEl={anchorEl}
                                                        open={openStatusMenu}
                                                        onClose={handleClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'status-button',
                                                        }}
                                                    >
                                                        <MenuItem onClick={() =>
                                                            handleTicketStatusAndPriority(ticketId, '', 'OPEN')}
                                                            sx={{
                                                                color: 'green',
                                                                '&:hover': {
                                                                    backgroundColor: '#d6f5d6',
                                                                }
                                                            }}
                                                        >
                                                            OPEN
                                                        </MenuItem>
                                                        <MenuItem onClick={() =>
                                                            handleTicketStatusAndPriority(ticketId, '', 'IN_PROGRESS')}
                                                            sx={{
                                                                color: '#0077e6',
                                                                '&:hover': {
                                                                    backgroundColor: '#cce6ff',
                                                                }
                                                            }}
                                                        >
                                                            IN PROGRESS
                                                        </MenuItem>
                                                        <MenuItem onClick={() =>
                                                            handleTicketStatusAndPriority(ticketId, '', 'CLOSED')}
                                                            sx={{
                                                                color: '#cc0000',
                                                                '&:hover': {
                                                                    backgroundColor: '#ffcccc',
                                                                }
                                                            }}
                                                        >
                                                            CLOSED
                                                        </MenuItem>
                                                        <MenuItem onClick={() =>
                                                            handleTicketStatusAndPriority(ticketId, '', 'BLOCKED')}
                                                            sx={{
                                                                color: '#262626',
                                                                '&:hover': {
                                                                    backgroundColor: '#e6e6e6',
                                                                }
                                                            }}
                                                        >
                                                            BLOCKED
                                                        </MenuItem>
                                                    </Menu>

                                                </td>
                                                {/*  Ticket Priority Buttons */}
                                                <td className="whitespace-nowrap px-4 py-4 text-center">
                                                    <MenuBar
                                                        buttonItem={[{
                                                            text:
                                                                (
                                                                    ticket.ticketPriority === 'LOW' ? (<span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                                        {ticket.ticketPriority}
                                                                    </span>) : (ticket.ticketPriority === 'MEDIUM' ? (
                                                                        <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                                                                            {ticket.ticketPriority}
                                                                        </span>
                                                                    ) : (<span className="inline-flex rounded-full bg-orange-100 px-2 text-xs font-semibold leading-5 text-orange-800">
                                                                        {ticket.ticketPriority}
                                                                    </span>
                                                                    ))
                                                                ),
                                                        }

                                                        ]}
                                                        menuItem={[
                                                            {
                                                                text: 'LOW',
                                                                color: 'green',
                                                                backgroundColor: '#d6f5d6',
                                                                menuOnClickFn: () => {handleTicketStatusAndPriority(ticket._id, 'LOW', '')}
                                                            },
                                                            {
                                                                text: 'MEDIUM',
                                                                color: '#0077e6',
                                                                backgroundColor: '#cce6ff',
                                                                menuOnClickFn: () => handleTicketStatusAndPriority(ticket._id, 'MEDIUM', '')
                                                            },
                                                            {
                                                                text: 'HIGH',
                                                                color: '#cc0000',
                                                                backgroundColor: '#ffcccc',
                                                                menuOnClickFn: () => handleTicketStatusAndPriority(ticket._id, 'HIGH', '')
                                                            }
                                                        ]}
                                                    />
                                                </td>
                                                <td className="whitespace-wrap px-4 py-4 text-center text-xs font-medium ">
                                                        {ticket.createdAt}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                                                    {/* {ticket.userId !== 'john123' &&
                                                        (<Button
                                                            className="text-gray-700"
                                                            variant='text'>
                                                            <ModeEditRoundedIcon sx={{ color: 'black' }} />
                                                        </Button>)} */}
                                                </td>
                                                <td>
                                                    {/* {ticket.userId !== 'john123' &&
                                                        (<IconButton aria-label="delete" >
                                                            <DeleteIcon sx={{ color: 'black' }} />
                                                        </IconButton>)} */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='block lg:hidden w-full pt-4'>
                    <UserCardProfile fetchFunc={handleFetchUsers} editFunc={editUserStatus}
                        deleteFunc={deleteUser}
                    />
                </div> */}
            </section>
        </div>
    )
}

export default Tickets