import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Datatable } from "./DataTable";
import authService from "../../server/auth";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import {
    Alert,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    Divider,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import toast from "react-hot-toast";
import ProfileCard from "../Header/Profile";
import {
    AccountCircle,
    Dashboard as DashboardIcon,
    SupervisorAccount,
} from "@mui/icons-material";

export default function Dashboard() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies] = useCookies(["accessToken", "refreshToken"]);
    const allUsers = useSelector((state) => state.data?.usersData);
    const userData = useSelector((state) => state.auth.userData);
    const [renderCount, setRenderCount] = useState(0);
    const authData = useSelector((state) => state.auth.userData);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));

    useEffect(() => {
        setOpen(true);
        authService
            .getCurrentUser(cookies?.accessToken || null)
            .then((userData) => {})
            .catch((error) => {
                console.log(
                    "Dashboard.jsx :: getCurrentUser :: Error:",
                    error?.response
                );
                if (
                    error.response?.statusText === "Not Found" &&
                    error.response?.status === 404
                ) {
                    toast.error(error.response?.data?.message);
                    navigate("/login", {
                        unstable_viewTransition: true,
                        unstable_flushSync: true,
                    });
                }
            })
            .finally(() => {
                setOpen(false);
                setLoading(false);
            });
        setRenderCount((prevCount) => prevCount + 1);
    }, []);

    // Loading state
    if (open || loading) {
        return (
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={true}
            >
                <CircularProgress color="primary" />
            </Backdrop>
        );
    }

    // Error state
    if (error) {
        return (
            <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
                <Button variant="contained" onClick={() => navigate("/login")}>
                    Back to Login
                </Button>
            </Container>
        );
    }

    // No auth data
    if (!authData) {
        return (
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={true}
            >
                <CircularProgress color="primary" />
            </Backdrop>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                overflow: "hidden",
                bgcolor: "grey.50",
                mt: 8,
            }}
        >
            <Box
                sx={{
                    py: { xs: 2, md: 3 },
                    px: { xs: 2, md: 4 },
                    background:
                        "linear-gradient(135deg, #4568dc 0%, #6a49bb 100%)",
                    color: "white",
                    borderRadius: { xs: 0, md: "0 0 16px 16px" },
                    mb: { xs: 2, md: 3 },
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: {
                                        xs: "1.5rem",
                                        sm: "2rem",
                                        md: "2.5rem",
                                    },
                                }}
                            >
                                Welcome, {authData?.fullName || "User"}!
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    mt: 1,
                                    opacity: 0.9,
                                    display: { xs: "none", sm: "block" },
                                }}
                            >
                                {authData.userType === "ADMIN"
                                    ? "Manage your application and users from the dashboard."
                                    : authData.userType === "ENGINEER"
                                      ? "Check your assigned tickets and tasks."
                                      : "View and manage your support tickets."}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={4}
                            sx={{
                                display: { xs: "none", md: "flex" },
                                justifyContent: "flex-end",
                            }}
                        >
                            {authData.userType === "ADMIN" ? (
                                <SupervisorAccount
                                    sx={{ fontSize: 80, opacity: 0.8 }}
                                />
                            ) : (
                                <AccountCircle
                                    sx={{ fontSize: 80, opacity: 0.8 }}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Container
                maxWidth={authData.userType === "ADMIN" ? "xxl" : "lg"}
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    pb: 4,
                }}
            >
                {authData.userType === "ADMIN" && (
                    <Box sx={{ height: "100%" }}>
                        <Datatable />
                    </Box>
                )}

                {(authData.userType === "CUSTOMER" ||
                    authData.userType === "ENGINEER") && (
                    <Grid container spacing={3}>
                        <Grid item xs={12} sx={{ display: { sm: "none" } }}>
                            <ProfileCard />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={4}
                            lg={3}
                            sx={{ display: { xs: "none", sm: "block" } }}
                        >
                            <Card
                                elevation={2}
                                sx={{
                                    borderRadius: 2,
                                    height: "100%",
                                    borderTop: 5,
                                    borderColor: "primary.main",
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ textAlign: "center", mb: 2 }}>
                                        <AccountCircle
                                            sx={{
                                                fontSize: 80,
                                                color: "primary.main",
                                            }}
                                        />
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        fontWeight="bold"
                                    >
                                        {userData?.fullName || "Full Name"}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ wordBreak: "break-all" }}
                                    >
                                        ID: {userData?._id || "id"}
                                    </Typography>

                                    <Divider sx={{ my: 2 }} />

                                    <Typography variant="body2" gutterBottom>
                                        <strong>Email:</strong>{" "}
                                        {userData?.email || "Email"}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <strong>Role:</strong>{" "}
                                        {userData?.userType || "User Type"}
                                    </Typography>

                                    <Box
                                        sx={{
                                            mt: 2,
                                            p: 2,
                                            bgcolor: "grey.100",
                                            borderRadius: 1,
                                            fontSize: "0.875rem",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            color="text.secondary"
                                        >
                                            About User
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={8} lg={9}>
                            <Paper
                                elevation={2}
                                sx={{
                                    p: { xs: 2, sm: 3 },
                                    borderRadius: 2,
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    color="primary"
                                >
                                    {authData.userType === "ENGINEER"
                                        ? "Your Assigned Tickets"
                                        : "Your Support Tickets"}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    paragraph
                                >
                                    {authData.userType === "ENGINEER"
                                        ? "View and manage all tickets assigned to you. Update status and respond to customer inquiries."
                                        : "Track the status of your support requests and submit new tickets if needed."}
                                </Typography>
                                <Divider sx={{ mb: 3 }} />

                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                    >
                                        No active tickets to display.
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Box>
    );
}
