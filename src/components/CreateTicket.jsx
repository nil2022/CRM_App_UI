import React, { useState } from 'react';
import authService from '../server/auth';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import ticketService from '../server/ticket';
import TextField from '@mui/material/TextField';

function CreateTicket() {
    const [ticketTitle, setTicketTitle] = useState('');
    const [ticketDescription, setTicketDescription] = useState('');
    const navigate = useNavigate();
    const intialValues = { ticketTitle: "", ticketDescription: "" };
    const [formValues, setFormValues] = useState(intialValues);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value, });
    }

    // const handleChangeTitle = (event) => {
    //     setTicketTitle(event.target.value);
    // };

    // const handleChangeDescription = (event) => {
    //     setTicketDescription(event.target.value);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Make API call to submit ticket here
        console.log(formValues);
        ticketService.createTicket(formValues.ticketTitle, formValues.ticketDescription)
            .then((response) => {
                console.log(response);
                toast.success('Ticket Created Successfully !')
                setTicketTitle('');
                setTicketDescription('');
                setTimeout(() => {
                    navigate('/tickets')
                }, 800);

            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-16 lg:px-8 
                lg:py-24 min-h-[75vh] xl:h-[88vh]"
            >
                <div className="space-y-5 min-w-[300px] lg:min-w-[400px] bg-slate-100 p-4 lg:p-8 z-1 shadow-blue-300 shadow-xl outline-none rounded-lg">
                    <div>
                        {/* Ticket Title */}
                        <div className="mt-2">
                            <TextField
                                id="ticketTitle"
                                value={formValues.ticketTitle}
                                onChange={handleChange}
                                label="Ticket Title"
                                variant='outlined'
                                required
                                placeholder="Ticket Subject"
                                className='w-full transition-all duration-500'
                            />
                        </div>
                    </div>
                    <div>
                        {/* Ticket Description */}
                        <div className="mt-2">
                            <TextField
                                id="ticketDescription"
                                value={formValues.ticketDescription}
                                onChange={handleChange}
                                label="Ticket Description"
                                variant='outlined'
                                required
                                placeholder="Write some description about your ticket"
                                multiline
                                rows={4}
                                className='w-full'
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-slate-700 transition-all duration-400 outline-none ring-slate-300 hover:ring-4 focus-visible:ring-4 sm:text-sm sm:leading-6"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateTicket;