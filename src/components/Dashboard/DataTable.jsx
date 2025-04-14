import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import CachedRounded from "@mui/icons-material/CachedRounded";
import authService from "../../server/auth";
import { clearAllUsersData, usersData } from "../../store/userDataSlice";
import { logout } from "../../store/authSlice";
import { useCookies } from "react-cookie";
import UserCardProfile from "./UserCard";

export function Datatable() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(["accessToken", "refreshToken"]);
    const allUsers = useSelector((state) => state.data?.usersData || []);
    const [renderCount, setRenderCount] = useState(0);
    const [open, setOpen] = React.useState(false);

    const editUserStatus = (userId, userStatus) => {
        setOpen(true);
        authService
            .editUser(userId, userStatus)
            .then((response) => {
                toast.success("User status updated successfully!");
            })
            .catch((error) => {
                console.log(
                    "server/auth.js :: editUser :: Error:",
                    error.response
                );
                toast.error("Failed to update user status");
            })
            .finally(() => {
                setOpen(false);
                handleFetchUsers();
            });
    };

    const deleteUser = (userId) => {
        setOpen(true);
        authService
            .deleteUser(userId)
            .then((response) => {
                toast.success("User deleted successfully!");
            })
            .catch((error) => {
                console.log(
                    "server/auth.js :: deleteUser :: Error:",
                    error.response
                );
                toast.error("Failed to delete user");
            })
            .finally(() => {
                setOpen(false);
                handleFetchUsers();
            });
    };

    const handleFetchUsers = () => {
        setOpen(true);
        authService
            .getAllUsers()
            .then((response) => {
                dispatch(usersData(response?.data));
            })
            .catch((error) => {
                console.log(
                    "DataTable.jsx :: getAllUsers :: Error:",
                    error.response
                );
                if (
                    error.response?.statusText === "Forbidden" &&
                    error.response?.status === 403
                ) {
                    toast.error(error.response?.data?.message);
                    dispatch(logout());
                    dispatch(clearAllUsersData());
                    removeCookie("accessToken", {
                        path: "/",
                        httpOnly: false,
                        secure: true,
                        sameSite: "none",
                    });
                    removeCookie("refreshToken", {
                        path: "/",
                        httpOnly: false,
                        secure: true,
                        sameSite: "none",
                    });
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("allUsers");
                    navigate("/");
                } else if (
                    error.response?.statusText === "Too Many Requests" &&
                    error.response?.status === 429
                ) {
                    toast.error(error.response?.statusText, {
                        icon: "🚫",
                    });
                    dispatch(logout());
                    dispatch(clearAllUsersData());
                    removeCookie("accessToken", {
                        path: "/",
                        httpOnly: false,
                        secure: true,
                        sameSite: "none",
                    });
                    removeCookie("refreshToken", {
                        path: "/",
                        httpOnly: false,
                        secure: true,
                        sameSite: "none",
                    });
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("allUsers");
                    setTimeout(() => {
                        navigate("/");
                    }, 500);
                }
            })
            .finally(() => {
                setOpen(false);
                setRenderCount((prevCount) => prevCount + 1);
            });
    };

    useEffect(() => {
        handleFetchUsers();
    }, []);

    const renderMobileView = () => (
        <div className="block lg:hidden w-full pt-4">
            <UserCardProfile
                fetchFunc={handleFetchUsers}
                editFunc={editUserStatus}
                deleteFunc={deleteUser}
            />
        </div>
    );

    const renderDesktopView = () => (
        <TableContainer
            component={Paper}
            sx={{
                boxShadow: 4,
                borderRadius: 2,
                maxHeight: "calc(100vh - 250px)",
                ".MuiTableCell-root": {
                    borderColor: theme.palette.divider,
                },
            }}
        >
            <Table
                stickyHeader
                sx={{ minWidth: 650 }}
                size={isTablet ? "small" : "medium"}
            >
                <TableHead>
                    <TableRow className="bg-gray-800">
                        <TableCell
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                backgroundColor: "inherit",
                            }}
                        >
                            #
                        </TableCell>
                        <TableCell
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                backgroundColor: "inherit",
                            }}
                        >
                            Name
                        </TableCell>
                        <TableCell
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                backgroundColor: "inherit",
                            }}
                        >
                            Email
                        </TableCell>
                        <TableCell
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                backgroundColor: "inherit",
                            }}
                        >
                            User ID
                        </TableCell>
                        <TableCell
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                backgroundColor: "inherit",
                            }}
                        >
                            User Type
                        </TableCell>
                        <TableCell
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                backgroundColor: "inherit",
                            }}
                        >
                            Status
                        </TableCell>
                        <TableCell
                            align="center"
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                backgroundColor: "inherit",
                            }}
                        >
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allUsers.length > 0 ? (
                        allUsers.map((person, index) => (
                            <TableRow
                                key={person._id}
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
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box sx={{ mr: 2 }}>
                                            {person.avatar ? (
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover"
                                                    src={person.avatar}
                                                    alt="user-image"
                                                />
                                            ) : (
                                                <UserCircleIcon
                                                    style={{
                                                        color: "gray",
                                                    }}
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                            )}
                                        </Box>
                                        <Box>
                                            <Typography
                                                variant="body2"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                {person.fullName}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography noWrap sx={{ maxWidth: 150 }}>
                                        {person.email}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography noWrap sx={{ maxWidth: 120 }}>
                                        {person.userId}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {person.userType === "ADMIN" ? (
                                        <div className="inline-flex rounded-full bg-blue-200 px-2 text-xs font-semibold leading-5 text-blue-800">
                                            {person.userType}
                                        </div>
                                    ) : person.userType === "ENGINEER" ? (
                                        <div className="inline-flex rounded-full bg-yellow-200 px-2 text-xs font-semibold leading-5 text-yellow-800">
                                            {person.userType}
                                        </div>
                                    ) : (
                                        <div className="inline-flex rounded-full bg-slate-200 px-2 text-xs font-semibold leading-5 text-slate-800">
                                            {person.userType}
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {person.userStatus === "APPROVED" ? (
                                        <div className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                            {person.userStatus}
                                        </div>
                                    ) : (
                                        <div className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                            {person.userStatus}
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {person.userId !== "john123" && (
                                        <>
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() =>
                                                    editUserStatus(
                                                        person.userId,
                                                        person.userStatus ===
                                                            "APPROVED"
                                                            ? "PENDING"
                                                            : "APPROVED"
                                                    )
                                                }
                                                sx={{ mr: 1 }}
                                            >
                                                <ModeEditRoundedIcon />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() =>
                                                    deleteUser(person.userId)
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={7}
                                sx={{ textAlign: "center", py: 4 }}
                            >
                                <Typography variant="h6" color="text.secondary">
                                    No Users Found
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
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderColor: "divider",
            }}
        >
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
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
                    User Management
                </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                This is a list of all <strong>Users</strong> in our database
            </Typography>

            <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                {isMobile ? renderMobileView() : renderDesktopView()}
            </Box>
        </Box>
    );
}

export default Datatable;
