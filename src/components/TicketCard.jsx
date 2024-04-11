import React from 'react'
import { useSelector } from 'react-redux'

function TicketCard() {

    const allTickets = useSelector((state) => state.tickets?.ticketsData || [])

    return (
        <div>
            <div className='min-h-[150px] p-4'>
                <div className='w-full'>
                    <div className='w-full grid sm:grid-cols-2 md:grid-cols-3 gap-4 '>
                        {allTickets.length > 0 ? (
                            allTickets.map((ticket) => (
                                <div key={ticket._id} 
                                className='w-full bg-slate-200 rounded-lg p-4 min-h-[200px] shadow-xl shadow-violet-300 outline-none m-2'
                                >
                                    <p><strong>Title:</strong> {ticket.title}</p>
                                    <p><strong>Description:</strong> {ticket.description}</p>
                                    <p><strong>Assigned To:</strong> {ticket.assignee}</p>
                                    <p><strong>Ticket Status:</strong> {ticket.status}</p>
                                    <p><strong>Ticket Priority:</strong> {ticket.ticketPriority}</p>

                                </div>
                            ))
                        ) : <div>
                            <h1>No Tickets Found</h1>
                        </div>}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TicketCard