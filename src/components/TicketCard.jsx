import React from 'react'
import { useSelector } from 'react-redux'

function TicketCard() {

    let allTickets = useSelector((state) => state.tickets?.ticketsData || [])
    // allTickets = [];

    return (
        <div>
            <div className='min-h-[150px] p-4'>
                <div className='w-full'>
                    <div className='w-full grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
                        {allTickets.length > 0 && (
                            allTickets.map((ticket) => (
                                <div key={ticket._id}
                                    className='w-full bg-slate-50 rounded-lg p-4 min-h-[200px] shadow-xl shadow-violet-500 outline-none border '
                                >
                                    <div className='flex flex-col space-y-2 min-h-[250px]'>
                                        <p><strong>Title:</strong> {ticket.title}</p>
                                        <p><strong>Description:</strong> {ticket.description}</p>
                                        <p><strong>Reported By:</strong> {ticket.reporter}</p>
                                        <p><strong>Assigned To:</strong> {ticket.assignee}</p>
                                        <p><strong>Ticket Status:</strong> {' '}
                                            {
                                                ticket.status === 'OPEN' ? (<div className="inline-flex rounded-full bg-green-200 px-2 text-xs font-semibold leading-5 text-green-800">{ticket.status}</div>) : (ticket.status === 'IN_PROGRESS' ? (<div className="inline-flex rounded-full bg-blue-200 px-2 text-xs font-semibold leading-5 text-blue-800">{ticket.status}</div>) : (ticket.status === 'BLOCKED' ? (<div className="inline-flex rounded-full bg-gray-200 px-2 text-xs font-semibold leading-5 text-gray-800">{ticket.status}</div>) : (
                                                    <div className="inline-flex rounded-full bg-red-200 px-2 text-xs font-semibold leading-5 text-red-800">{ticket.status}</div>
                                                )))}
                                        </p>
                                        <p><strong>Ticket Priority:</strong> {' '}
                                        {
                                            ticket.ticketPriority === 'LOW' ? (<span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                {ticket.ticketPriority}
                                            </span>) : (ticket.ticketPriority === 'MEDIUM' ? (
                                                <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                                                    {ticket.ticketPriority}
                                                </span>
                                            ) : (<span className="inline-flex rounded-full bg-orange-100 px-2 text-xs font-semibold leading-5 text-orange-800">
                                                {ticket.ticketPriority}
                                            </span>
                                            ))}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {allTickets.length === 0 && (<div
                        className='text-2xl font-[700] min-w-[300px] bg-slate-100 rounded-lg p-2 min-h-[150px] text-center items-center justify-center'
                    >
                        No Tickets Found, <br /> Raise a Ticket to help us to resolve your issue.
                    </div>)}
                </div>
            </div>
        </div>

    )
}

export default TicketCard