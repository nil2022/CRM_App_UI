import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ticketsData } from "../store/ticketsDataSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import moment from "moment";
import toast from "react-hot-toast";
import ticketService from "../server/ticket";

import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Chip,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Backdrop,
    CircularProgress,
    useMediaQuery,
    useTheme,
    Card,
    CardContent,
    Divider,
    Grid,
    Select,
    FormControl,
    Tooltip,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Tickets() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

    const userData = useSelector((state) => state.auth?.userData || []);
    const allTickets = useSelector((state) => state.tickets?.ticketsData || []);
    const [ticketId, setTicketId] = useState("");
    const [loading, setLoading] = useState(false);
    const [serialNo, setSerialNo] = useState(1);
    const [renderCount, setRenderCount] = useState(0);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isCustomer = userData.userType === "CUSTOMER";

    const [statusAnchorEl, setStatusAnchorEl] = useState(null);
    const openStatusMenu = Boolean(statusAnchorEl);

    const [priorityAnchorEl, setPriorityAnchorEl] = useState(null);
    const openPriorityMenu = Boolean(priorityAnchorEl);
    const [selectedTicketId, setSelectedTicketId] = useState("");

    const handleStatusClick = (event, id) => {
        setStatusAnchorEl(event.currentTarget);
        setTicketId(id);
    };

    const handleStatusClose = () => {
        setStatusAnchorEl(null);
    };

    const handlePriorityClick = (event, id) => {
        setPriorityAnchorEl(event.currentTarget);
        setSelectedTicketId(id);
    };

    const handlePriorityClose = () => {
        setPriorityAnchorEl(null);
    };

    const handleTicketStatusAndPriority = (
        id,
        ticketPriority,
        ticketStatus
    ) => {
        setLoading(true);
        setOpen(true);

        ticketService
            .editTicketData(id, ticketPriority, ticketStatus)
            .then((response) => {
                console.log("Edit Ticket Response:", response.message);
                toast.success("Ticket Updated Successfully!");
            })
            .catch((err) => {
                console.log("Error:", err);
                toast.error("Failed to update ticket");
            })
            .finally(() => {
                setLoading(false);
                setOpen(false);
                setStatusAnchorEl(null);
                setPriorityAnchorEl(null);
                handleFetchTickets();
            });
    };

    const handleStatusChange = (event, ticketId) => {
        const newStatus = event.target.value;
        handleTicketStatusAndPriority(ticketId, "", newStatus);
    };

    const handlePriorityChange = (event, ticketId) => {
        const newPriority = event.target.value;
        handleTicketStatusAndPriority(ticketId, newPriority, "");
    };

    const handleFetchTickets = () => {
        setLoading(true);
        setSerialNo(1);
        setRenderCount((prevCount) => prevCount + 1);

        ticketService
            .getAllTickets()
            .then((response) => {
                dispatch(ticketsData(response.data));
            })
            .catch((err) => {
                console.log("Error:", err.message);
                if (err?.data?.statusCode === 429) {
                    toast.error(
                        "Too Many Requests. Please try after some time."
                    );
                    navigate("/login");
                    dispatch(logout());
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        handleFetchTickets();
    }, []);

    const getStatusChipProps = (status) => {
        switch (status) {
            case "OPEN":
                return { color: "success", variant: "filled" };
            case "IN_PROGRESS":
                return { color: "info", variant: "filled" };
            case "BLOCKED":
                return { color: "default", variant: "filled" };
            case "CLOSED":
                return { color: "error", variant: "filled" };
            default:
                return { color: "default", variant: "filled" };
        }
    };

    const getPriorityChipProps = (priority) => {
        switch (priority) {
            case "LOW":
                return { color: "success", variant: "outlined" };
            case "MEDIUM":
                return { color: "warning", variant: "outlined" };
            case "HIGH":
                return { color: "error", variant: "outlined" };
            default:
                return { color: "default", variant: "outlined" };
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "OPEN":
                return theme.palette.success.main;
            case "IN_PROGRESS":
                return theme.palette.info.main;
            case "BLOCKED":
                return theme.palette.grey[500];
            case "CLOSED":
                return theme.palette.error.main;
            default:
                return theme.palette.text.primary;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "LOW":
                return theme.palette.success.main;
            case "MEDIUM":
                return theme.palette.warning.main;
            case "HIGH":
                return theme.palette.error.main;
            default:
                return theme.palette.text.primary;
        }
    };

    const renderMobileView = () => (
        <Box sx={{ px: 2, mt: 2, pb: 8 }}>
            {allTickets.length > 0 ? (
                allTickets.map((ticket, index) => (
                    <Card
                        key={ticket._id}
                        sx={{
                            mb: 2,
                            boxShadow: 3,
                            borderLeft: 6,
                            borderColor:
                                ticket.status === "OPEN"
                                    ? "success.main"
                                    : ticket.status === "IN_PROGRESS"
                                      ? "info.main"
                                      : ticket.status === "BLOCKED"
                                        ? "grey.500"
                                        : "error.main",
                        }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 1,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    #{index + 1} {ticket.title}
                                </Typography>
                                <Chip
                                    label={ticket.status}
                                    size="small"
                                    {...getStatusChipProps(ticket.status)}
                                    sx={{ fontWeight: "bold" }}
                                />
                            </Box>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 2 }}
                            >
                                {ticket.description}
                            </Typography>

                            <Divider sx={{ my: 1 }} />

                            <Grid container spacing={1} sx={{ mt: 1 }}>
                                {userData.userType !== "CUSTOMER" && (
                                    <Grid item xs={6}>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Reported By
                                        </Typography>
                                        <Typography variant="body2">
                                            {ticket.reporter}
                                        </Typography>
                                    </Grid>
                                )}
                                <Grid
                                    item
                                    xs={
                                        userData.userType !== "CUSTOMER"
                                            ? 6
                                            : 12
                                    }
                                >
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Assigned To
                                    </Typography>
                                    <Typography variant="body2">
                                        {ticket.assignee}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Priority
                                    </Typography>
                                    <Box>
                                        <Chip
                                            label={ticket.ticketPriority}
                                            size="small"
                                            {...getPriorityChipProps(
                                                ticket.ticketPriority
                                            )}
                                            sx={{ fontSize: "0.7rem" }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Created At
                                    </Typography>
                                    <Typography variant="body2">
                                        {moment(ticket.createdAt).format(
                                            "MMM Do, YYYY"
                                        )}
                                    </Typography>
                                </Grid>
                            </Grid>

                            {userData.userType !== "CUSTOMER" && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 1,
                                        mt: 2,
                                    }}
                                >
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                        onClick={(e) =>
                                            handleStatusClick(e, ticket._id)
                                        }
                                        endIcon={<ArrowDropDownIcon />}
                                        sx={{ textTransform: "capitalize" }}
                                    >
                                        Change Status
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="secondary"
                                        onClick={(e) =>
                                            handlePriorityClick(e, ticket._id)
                                        }
                                        endIcon={<ArrowDropDownIcon />}
                                        sx={{ textTransform: "capitalize" }}
                                    >
                                        Change Priority
                                    </Button>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Box sx={{ textAlign: "center", my: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                        No Tickets Found
                    </Typography>
                </Box>
            )}
        </Box>
    );

    const renderDesktopView = () => (
        <TableContainer
            component={Paper}
            sx={{
                boxShadow: 4,
                borderRadius: 2,
                ".MuiTableCell-root": {
                    borderColor: theme.palette.divider,
                },
            }}
        >
            <Table sx={{ minWidth: 650 }} size={isTablet ? "small" : "medium"}>
                <TableHead>
                    <TableRow className="bg-gray-800">
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                            #
                        </TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                            Title
                        </TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                            Description
                        </TableCell>
                        {userData.userType !== "CUSTOMER" && (
                            <TableCell
                                sx={{ color: "#fff", fontWeight: "bold" }}
                            >
                                Reported By
                            </TableCell>
                        )}
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                            Assigned Engineer
                        </TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                            Status
                        </TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                            Priority
                        </TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                            Created At
                        </TableCell>
                        <TableCell
                            align="right"
                            sx={{ color: "#fff", fontWeight: "bold" }}
                        >
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allTickets.length > 0 ? (
                        allTickets.map((ticket, index) => (
                            <TableRow
                                key={ticket._id}
                                sx={{
                                    "&:nth-of-type(odd)": {
                                        backgroundColor:
                                            theme.palette.action.hover,
                                    },
                                    "&:hover": {
                                        backgroundColor:
                                            theme.palette.action.selected,
                                    },
                                }}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Typography noWrap sx={{ maxWidth: 150 }}>
                                        {ticket.title}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Tooltip
                                        title={ticket.description}
                                        componentsProps={{
                                            tooltip: {
                                                sx: {
                                                    fontSize: 12, 
                                                    maxWidth: 300, 
                                                    p: 1, 
                                                },
                                            },
                                        }}
                                    >
                                        <Typography
                                            noWrap
                                            sx={{ maxWidth: 200 }}
                                        >
                                            {ticket.description}
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                                {userData.userType !== "CUSTOMER" && (
                                    <TableCell>{ticket.reporter}</TableCell>
                                )}
                                <TableCell>{ticket.assignee}</TableCell>
                                <TableCell>
                                    {isCustomer ? (
                                        <Chip
                                            label={ticket.status}
                                            size="small"
                                            {...getStatusChipProps(
                                                ticket.status
                                            )}
                                            sx={{ fontWeight: "bold" }}
                                        />
                                    ) : (
                                        <FormControl
                                            size="small"
                                            sx={{ minWidth: 120 }}
                                        >
                                            <Select
                                                value={ticket.status}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        e,
                                                        ticket._id
                                                    )
                                                }
                                                displayEmpty
                                                sx={{
                                                    fontSize: "0.75rem",
                                                    color: getStatusColor(
                                                        ticket.status
                                                    ),
                                                    fontWeight: "bold",
                                                    "& .MuiOutlinedInput-notchedOutline":
                                                        {
                                                            borderColor:
                                                                getStatusColor(
                                                                    ticket.status
                                                                ),
                                                        },
                                                    "&:hover .MuiOutlinedInput-notchedOutline":
                                                        {
                                                            borderColor:
                                                                getStatusColor(
                                                                    ticket.status
                                                                ),
                                                        },
                                                    height: "32px",
                                                }}
                                            >
                                                <MenuItem
                                                    value="OPEN"
                                                    sx={{
                                                        color: theme.palette
                                                            .success.main,
                                                    }}
                                                >
                                                    OPEN
                                                </MenuItem>
                                                <MenuItem
                                                    value="IN_PROGRESS"
                                                    sx={{
                                                        color: theme.palette
                                                            .info.main,
                                                    }}
                                                >
                                                    IN PROGRESS
                                                </MenuItem>
                                                <MenuItem
                                                    value="BLOCKED"
                                                    sx={{
                                                        color: theme.palette
                                                            .grey[500],
                                                    }}
                                                >
                                                    BLOCKED
                                                </MenuItem>
                                                <MenuItem
                                                    value="CLOSED"
                                                    sx={{
                                                        color: theme.palette
                                                            .error.main,
                                                    }}
                                                >
                                                    CLOSED
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {isCustomer ? (
                                        <Chip
                                            label={ticket.ticketPriority}
                                            size="small"
                                            {...getPriorityChipProps(
                                                ticket.ticketPriority
                                            )}
                                            sx={{ fontWeight: "bold" }}
                                        />
                                    ) : (
                                        <FormControl
                                            size="small"
                                            sx={{ minWidth: 120 }}
                                        >
                                            <Select
                                                value={ticket.ticketPriority}
                                                onChange={(e) =>
                                                    handlePriorityChange(
                                                        e,
                                                        ticket._id
                                                    )
                                                }
                                                displayEmpty
                                                sx={{
                                                    fontSize: "0.75rem",
                                                    color: getPriorityColor(
                                                        ticket.ticketPriority
                                                    ),
                                                    fontWeight: "bold",
                                                    "& .MuiOutlinedInput-notchedOutline":
                                                        {
                                                            borderColor:
                                                                getPriorityColor(
                                                                    ticket.ticketPriority
                                                                ),
                                                        },
                                                    "&:hover .MuiOutlinedInput-notchedOutline":
                                                        {
                                                            borderColor:
                                                                getPriorityColor(
                                                                    ticket.ticketPriority
                                                                ),
                                                        },
                                                    height: "32px",
                                                }}
                                            >
                                                <MenuItem
                                                    value="LOW"
                                                    sx={{
                                                        color: theme.palette
                                                            .success.main,
                                                    }}
                                                >
                                                    LOW
                                                </MenuItem>
                                                <MenuItem
                                                    value="MEDIUM"
                                                    sx={{
                                                        color: theme.palette
                                                            .warning.main,
                                                    }}
                                                >
                                                    MEDIUM
                                                </MenuItem>
                                                <MenuItem
                                                    value="HIGH"
                                                    sx={{
                                                        color: theme.palette
                                                            .error.main,
                                                    }}
                                                >
                                                    HIGH
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {moment(ticket.createdAt).format(
                                        "MMM Do, YYYY"
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {userData.userType !== "CUSTOMER" && (
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() =>
                                                toast("Coming Soon...", {
                                                    icon: "🚀",
                                                })
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={
                                    userData.userType !== "CUSTOMER" ? 9 : 8
                                }
                                sx={{ textAlign: "center", py: 4 }}
                            >
                                <Typography variant="h6" color="text.secondary">
                                    No Tickets Found
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <Box
            sx={{
                p: { xs: 1, sm: 3 },
                mt: 10,
                minHeight: "calc(100vh - 180px)",
                pb: 10,
            }}
        >
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open || loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    sx={{
                        fontWeight: "bold",
                        color: theme.palette.primary.main,
                    }}
                >
                    Ticket Management
                </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                This is a list of all <strong>Tickets</strong> in our database
            </Typography>

            {isMobile ? renderMobileView() : renderDesktopView()}

            <Menu
                id="status-menu"
                anchorEl={statusAnchorEl}
                open={openStatusMenu}
                onClose={handleStatusClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <MenuItem
                    onClick={() =>
                        handleTicketStatusAndPriority(ticketId, "", "OPEN")
                    }
                    sx={{
                        color: "success.main",
                        "&:hover": { backgroundColor: "success.light" },
                    }}
                >
                    OPEN
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        handleTicketStatusAndPriority(
                            ticketId,
                            "",
                            "IN_PROGRESS"
                        )
                    }
                    sx={{
                        color: "info.main",
                        "&:hover": { backgroundColor: "info.light" },
                    }}
                >
                    IN PROGRESS
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        handleTicketStatusAndPriority(ticketId, "", "CLOSED")
                    }
                    sx={{
                        color: "error.main",
                        "&:hover": { backgroundColor: "error.light" },
                    }}
                >
                    CLOSED
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        handleTicketStatusAndPriority(ticketId, "", "BLOCKED")
                    }
                    sx={{
                        color: "text.primary",
                        "&:hover": { backgroundColor: "action.hover" },
                    }}
                >
                    BLOCKED
                </MenuItem>
            </Menu>

            <Menu
                id="priority-menu"
                anchorEl={priorityAnchorEl}
                open={openPriorityMenu}
                onClose={handlePriorityClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <MenuItem
                    onClick={() =>
                        handleTicketStatusAndPriority(
                            selectedTicketId,
                            "LOW",
                            ""
                        )
                    }
                    sx={{
                        color: "success.main",
                        "&:hover": { backgroundColor: "success.light" },
                    }}
                >
                    LOW
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        handleTicketStatusAndPriority(
                            selectedTicketId,
                            "MEDIUM",
                            ""
                        )
                    }
                    sx={{
                        color: "warning.main",
                        "&:hover": { backgroundColor: "warning.light" },
                    }}
                >
                    MEDIUM
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        handleTicketStatusAndPriority(
                            selectedTicketId,
                            "HIGH",
                            ""
                        )
                    }
                    sx={{
                        color: "error.main",
                        "&:hover": { backgroundColor: "error.light" },
                    }}
                >
                    HIGH
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default Tickets;
