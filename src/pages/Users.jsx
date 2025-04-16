import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCw, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

// Use JSDoc to define the Ticket type
/**
 * @typedef {object} Ticket
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} reportedBy
 * @property {string} assignedEngineer
 * @property {string} ticketStatus
 * @property {string} ticketPriority
 * @property {string} createdAt
 */

const getStatusBadgeVariant = (/** @type {string} */ status) => {
    switch (status.toLowerCase()) {
        case 'open': return "default";
        case 'in progress': return "secondary";
        case 'closed': return "destructive";
        default: return "outline";
    }
};

const getPriorityBadgeVariant = (/** @type {string} */ priority) => {
    switch (priority.toLowerCase()) {
        case 'high': return "destructive";
        case 'medium': return "secondary";
        case 'low': return "outline";
        default: return "outline";
    }
};

const TicketsSection = () => {
    const [/** @type {Ticket[]} */ tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);


    // Simulate fetching data
    useEffect(() => {
        const mockTickets = [
            {
                id: 1,
                title: "Payment Failure",
                description: "Payment failed during checkout.",
                reportedBy: "alice_smith_456",
                assignedEngineer: "bob_w_789",
                ticketStatus: "OPEN",
                ticketPriority: "MEDIUM",
                createdAt: "30th March 2025, 12:16:29 AM",
            },
            {
                id: 2,
                title: "System Crash",
                description: "App crashes when opening profile.",
                reportedBy: "alice_smith_456",
                assignedEngineer: "bob_w_789",
                ticketStatus: "OPEN",
                ticketPriority: "LOW",
                createdAt: "30th March 2025, 12:18:42 AM",
            },
            {
                id: 3,
                title: "Testing Ticket",
                description: "Testing Ticket Description",
                reportedBy: "himanshu2",
                assignedEngineer: "bob_w_789",
                ticketStatus: "OPEN",
                ticketPriority: "LOW",
                createdAt: "6th April 2025, 11:30:00 AM",
            },
            {
                id: 4,
                title: "Testing Ticket",
                description: "Another Testing Ticket",
                reportedBy: "himanshu2",
                assignedEngineer: "bob_w_789",
                ticketStatus: "OPEN",
                ticketPriority: "LOW",
                createdAt: "6th April 2025, 11:30:11 AM",
            },
        ];

        // Simulate network latency
        const timer = setTimeout(() => {
            setTickets(mockTickets);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        // Simulate a refresh delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In a real app, you'd fetch data again here
        setRefreshing(false);
    };

    const handleDeleteTicket = (id) => {
        setSelectedTicketId(id); // Store the ID of the ticket to delete
        setOpen(true); // Open the dialog
    };

    const confirmDeleteTicket = () => {
        if (selectedTicketId) {
            setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== selectedTicketId));
        }
        setOpen(false); // Close the dialog
        setSelectedTicketId(null); // Reset the selected ticket ID
    };


    return (
        <div className="p-4 md:p-6 lg:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-200">
                Tickets in our Database
            </h2>

            <div className="mb-4 flex justify-end">
                <Button
                    variant="outline"
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className={cn(
                        "bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700",
                        refreshing && "opacity-70 cursor-not-allowed" // Conditional class
                    )}
                >
                    {refreshing ? (
                        <>
                            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                            Refreshing...
                        </>
                    ) : (
                        <>
                            <RotateCw className="mr-2 h-4 w-4" />
                            Refresh
                        </>
                    )}
                </Button>
            </div>

            {loading ? (
                <div className="text-gray-400">Loading tickets...</div> // Simple loading state
            ) : (
                <div className="rounded-md border border-gray-800 shadow-lg overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-800/50">
                            <TableRow>
                                <TableHead className="text-gray-200">ID</TableHead>
                                <TableHead className="text-gray-200">Title</TableHead>
                                <TableHead className="text-gray-200">Description</TableHead>
                                <TableHead className="text-gray-200">Reported By</TableHead>
                                <TableHead className="text-gray-200">Assigned Engineer</TableHead>
                                <TableHead className="text-gray-200">Ticket Status</TableHead>
                                <TableHead className="text-gray-200">Ticket Priority</TableHead>
                                <TableHead className="text-gray-200">Created At</TableHead>
                                <TableHead className="text-gray-200">Actions</TableHead> {/* New column for actions */}
                            </TableRow>
                        </TableHeader>
                        <TableBody className="bg-gray-900/90 backdrop-blur-md">
                            {tickets.map((ticket) => (
                                <TableRow key={ticket.id} className="hover:bg-gray-800/50 transition-colors">
                                    <TableCell className="font-medium text-gray-300">{ticket.id}</TableCell>
                                    <TableCell className="text-gray-300">{ticket.title}</TableCell>
                                    <TableCell className="text-gray-300">{ticket.description}</TableCell>
                                    <TableCell className="text-gray-300">{ticket.reportedBy}</TableCell>
                                    <TableCell className="text-gray-300">{ticket.assignedEngineer}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={getStatusBadgeVariant(ticket.ticketStatus)}
                                            className={cn(
                                                "px-2 py-1 rounded-full text-xs font-semibold",
                                                {
                                                    "bg-green-500/20 text-green-400": ticket.ticketStatus.toLowerCase() === 'open',
                                                    "bg-blue-500/20 text-blue-400": ticket.ticketStatus.toLowerCase() === 'in progress',
                                                    "bg-red-500/20 text-red-400": ticket.ticketStatus.toLowerCase() === 'closed',
                                                }
                                            )}
                                        >
                                            {ticket.ticketStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={getPriorityBadgeVariant(ticket.ticketPriority)}
                                            className={cn(
                                                "px-2 py-1 rounded-full text-xs font-semibold",
                                                {
                                                    "bg-red-500/20 text-red-400": ticket.ticketPriority.toLowerCase() === 'high',
                                                    "bg-yellow-500/20 text-yellow-400": ticket.ticketPriority.toLowerCase() === 'medium',
                                                    "bg-green-500/20 text-green-400": ticket.ticketPriority.toLowerCase() === 'low',
                                                }
                                            )}
                                        >
                                            {ticket.ticketPriority}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-400">{ticket.createdAt}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-gray-400 hover:text-blue-400"
                                                // Add onClick to handle edit functionality
                                                onClick={() => {
                                                    // Handle edit logic here, e.g., navigate to edit page
                                                    console.log(`Edit ticket ${ticket.id}`);
                                                }}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-gray-400 hover:text-red-400"
                                                onClick={() => handleDeleteTicket(ticket.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="bg-gray-800 text-white border-gray-700">
                    <DialogHeader>
                        <DialogTitle className="text-gray-100">Delete Ticket</DialogTitle>
                        <DialogDescription className="text-gray-300">
                            Are you sure you want to delete this ticket? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            className="bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            className="bg-red-500/90 hover:bg-red-500 text-white"
                            onClick={confirmDeleteTicket}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TicketsSection;

