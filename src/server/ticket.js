import urlConfig from "../config/url.config";
import axios from "axios";

export class TicketService {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: urlConfig.backendUrl,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    /**
     * * Create Ticket
     */
    async createTicket(ticketTitle, ticketDescription) {
        try {
            const createTicket = await this.axiosInstance({
                url: "/api/v1/tickets/create-ticket",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                data: {
                    title: ticketTitle ? ticketTitle : "",
                    description: ticketDescription ? ticketDescription : "",
                },
            });
            console.log("createTicket:", createTicket.data);
            return createTicket.data;
        } catch (err) {
            console.log(
                "server/auth.js :: createTicket :: Error:",
                err || "Something went wrong!"
            );
            throw err;
        }
    }

    /**
     * * Get All Tickets
     */
    async getAllTickets() {
        try {
            const fetchAllTickets = await this.axiosInstance({
                url: "/api/v1/tickets/get-all-tickets",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            // console.log('fetchAllTickets:', fetchAllTickets.data)
            return fetchAllTickets.data;
        } catch (error) {
            console.log(
                "server/auth.js :: getAllTickets :: Error:",
                error?.response || "Something went wrong!"
            );
            throw error?.response || error;
        }
    }

    /**
     * * Edit Ticket Data
     */
    async editTicketData(ticketId, ticketPriority, ticketStatus, assignedTo) {
        try {
            const editTicket = await this.axiosInstance({
                url: `/api/v1/tickets/update-ticket`,
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                data: {
                    ticketPriority: ticketPriority ? ticketPriority : '',
                    status: ticketStatus ? ticketStatus : '',
                    assignee: assignedTo ? assignedTo : ''
                },
                params: {
                    id: ticketId
                }
            })
            // console.log('Edit Ticket Response:', editTicket.data)
            return editTicket.data;
        } catch (err) {
            console.log('server/auth.js :: editTicketData :: Error:', err?.response || 'Something went wrong!')
            throw err;
        }
    }
}

const ticketService = new TicketService();

export default ticketService;
