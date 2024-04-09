import React, { useState } from 'react';
import authService from '../server/auth';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function CreateTicket() {
    const [ticketTitle, setTicketTitle] = useState('');
    const [ticketDescription, setTicketDescription] = useState('');
    const navigate = useNavigate();
    const intialValues = { ticketTitle: "", ticketDescription: ""};
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
        authService.createTicket(formValues.ticketTitle, formValues.ticketDescription)
            .then((response) => {
                console.log(response);
                toast.success('Ticket Created Successfully !')
                setTicketTitle('');
                setTicketDescription('');
                navigate('/tickets')

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
                lg:py-24 xl:h-[88vh] "
            >
                <div className="space-y-5 min-w-[300px]">
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="userId"
                                className="text-base font-[500] text-gray-900">
                                {' '}
                                Subject{' '}
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                autoComplete='on'
                                placeholder="Provide Subject"
                                id="ticketTitle"
                                value={formValues.ticketTitle}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                                className="text-base font-[500] text-gray-900">
                                {' '}
                                Ticket Description{' '}
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                className="flex h-100 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                autoComplete='on'
                                placeholder="Description of Ticket"
                                id="ticketDescription"
                                value={formValues.ticketDescription}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            className="inline-flex w-full items-center justify-center rounded-lg bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-slate-700 transition-all duration-400"
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