import React, { useState } from "react";
import authService from "../server/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ticketService from "../server/ticket";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

function CreateTicket() {
    const navigate = useNavigate();
    const intialValues = { ticketTitle: "", ticketDescription: "" };
    const [formValues, setFormValues] = useState(intialValues);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        ticketService
            .createTicket(formValues.ticketTitle, formValues.ticketDescription)
            .then((response) => {
                toast.success("Ticket Created Successfully!");
                setFormValues(intialValues);
                setTimeout(() => navigate("/tickets"), 800);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to create ticket");
            })
            .finally(() => setLoading(false));
    };

    return (
        <Box
            component="section"
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white"
        >
            <form
                onSubmit={handleSubmit}
                className="bg-white border border-zinc-200 shadow-lg rounded-xl p-6 sm:p-10 w-full max-w-xl space-y-6"
            >
                <div className="text-center space-y-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                        Create a New Ticket
                    </h2>
                    <p className="text-sm text-zinc-500">
                        Fill the details to raise a support request
                    </p>
                </div>

                <div className="space-y-5">
                    <TextField
                        id="ticketTitle"
                        value={formValues.ticketTitle}
                        onChange={handleChange}
                        label="Ticket Title"
                        variant="outlined"
                        required
                        placeholder="Ticket Subject"
                        fullWidth
                    />

                    <TextField
                        id="ticketDescription"
                        value={formValues.ticketDescription}
                        onChange={handleChange}
                        label="Ticket Description"
                        variant="outlined"
                        required
                        placeholder="Write some description about your ticket"
                        multiline
                        rows={4}
                        fullWidth
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 bg-slate-800 text-white font-semibold py-2.5 rounded-lg shadow-sm transition-all duration-300 
                            ${loading ? "cursor-not-allowed opacity-70" : "hover:bg-slate-700 active:scale-[0.98]"}
                            focus:outline-none focus:ring-2 focus:ring-slate-400`}
                    >
                        {loading ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            "Submit Ticket"
                        )}
                    </button>
                </div>
            </form>
        </Box>
    );
}

export default CreateTicket;
