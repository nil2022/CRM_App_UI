import * as React from "react";
import {
    Button,
    Card,
    CardContent,
    Box,
    Typography,
    Chip,
    Divider,
    Grid,
    Avatar,
} from "@mui/material";
import {
    AlternateEmailRounded,
    DeleteRounded,
    Edit,
    ForwardToInboxTwoTone,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

export default function UserCardProfile({
    fetchFunc = "",
    editFunc = "",
    deleteFunc = "",
}) {
    const data = useSelector((state) => state.data?.usersData || []);
    // Use ref to track if fetch has been called
    const fetchExecuted = React.useRef(false);

    React.useEffect(() => {
        // Only fetch if the function exists and hasn't been called yet
        if (fetchFunc && !fetchExecuted.current) {
            fetchFunc();
            fetchExecuted.current = true;
        }
        // No dependency on fetchFunc to prevent re-fetching
    }, []);

    // Helper function to get userType chip props
    const getUserTypeChipProps = (userType) => {
        switch (userType) {
            case "ADMIN":
                return { color: "primary", sx: { fontWeight: "bold" } };
            case "ENGINEER":
                return { color: "warning", sx: { fontWeight: "bold" } };
            default:
                return { color: "default", sx: { fontWeight: "bold" } };
        }
    };

    // Helper function to get userStatus chip props
    const getStatusChipProps = (status) => {
        return status === "APPROVED"
            ? { color: "success", sx: { fontWeight: "bold" } }
            : { color: "error", sx: { fontWeight: "bold" } };
    };

    return (
        <Box sx={{ px: 1, mt: 2, pb: 8 }}>
            {data.length > 0 ? (
                <Grid container spacing={2}>
                    {data.map((user) => (
                        <Grid item xs={12} sm={6} md={4} key={user._id}>
                            <Card
                                sx={{
                                    boxShadow: 3,
                                    borderLeft: 6,
                                    borderColor:
                                        user.userStatus === "APPROVED"
                                            ? "success.main"
                                            : "error.main",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <CardContent
                                    sx={{
                                        p: { xs: 2, sm: 3 },
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    {/* Header with name and status */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: {
                                                xs: "column",
                                                sm: "row",
                                            },
                                            justifyContent: "space-between",
                                            alignItems: {
                                                xs: "flex-start",
                                                sm: "center",
                                            },
                                            gap: 1,
                                            mb: 2,
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: "bold",
                                                fontSize: {
                                                    xs: "1rem",
                                                    sm: "1.25rem",
                                                },
                                                wordBreak: "break-word",
                                            }}
                                        >
                                            {user.fullName}
                                        </Typography>
                                        <Chip
                                            label={user.userStatus}
                                            size="small"
                                            {...getStatusChipProps(
                                                user.userStatus
                                            )}
                                        />
                                    </Box>

                                    {/* User avatar and type section */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: {
                                                xs: "column",
                                                sm: "row",
                                            },
                                            alignItems: {
                                                xs: "center",
                                                sm: "flex-start",
                                            },
                                            mb: 2,
                                            gap: 2,
                                        }}
                                    >
                                        {user.avatar ? (
                                            <Avatar
                                                src={user.avatar}
                                                alt={user.fullName}
                                                sx={{ width: 64, height: 64 }}
                                            />
                                        ) : (
                                            <Avatar
                                                sx={{
                                                    width: 64,
                                                    height: 64,
                                                    bgcolor: "grey.300",
                                                }}
                                            >
                                                {user.fullName.charAt(0)}
                                            </Avatar>
                                        )}
                                        <Box
                                            sx={{
                                                width: "100%",
                                                textAlign: {
                                                    xs: "center",
                                                    sm: "left",
                                                },
                                            }}
                                        >
                                            <Chip
                                                label={user.userType}
                                                size="small"
                                                {...getUserTypeChipProps(
                                                    user.userType
                                                )}
                                                sx={{ mb: 1 }}
                                            />
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 0.5,
                                                    flexWrap: "wrap",
                                                    justifyContent: {
                                                        xs: "center",
                                                        sm: "flex-start",
                                                    },
                                                    wordBreak: "break-word",
                                                }}
                                            >
                                                <AlternateEmailRounded
                                                    fontSize="small"
                                                    color="action"
                                                />
                                                {user.userId}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Email */}
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 0.5,
                                            mb: 1,
                                            wordBreak: "break-all",
                                            overflowWrap: "break-word",
                                        }}
                                    >
                                        <ForwardToInboxTwoTone
                                            fontSize="small"
                                            color="action"
                                            sx={{ mt: 0.3 }}
                                        />
                                        <Box component="span" sx={{ flex: 1 }}>
                                            {user.email}
                                        </Box>
                                    </Typography>

                                    {/* User ID */}
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                    >
                                        User ID
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 1,
                                            wordBreak: "break-all",
                                            overflowWrap: "break-word",
                                        }}
                                    >
                                        {user._id}
                                    </Typography>

                                    <Divider sx={{ my: 1 }} />

                                    {/* About section */}
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            mt: 1,
                                            p: 1.5,
                                            bgcolor: "grey.50",
                                            borderRadius: 1,
                                            minHeight: "60px",
                                            flex: 1,
                                        }}
                                    >
                                        About User
                                    </Typography>

                                    {/* Action buttons */}
                                    {user.userId !== "john123" && (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: {
                                                    xs: "column",
                                                    sm: "row",
                                                },
                                                justifyContent: "space-between",
                                                gap: 1,
                                                mt: 2,
                                            }}
                                        >
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                color="primary"
                                                onClick={() =>
                                                    editFunc(
                                                        user.userId,
                                                        user.userStatus ===
                                                            "APPROVED"
                                                            ? "PENDING"
                                                            : "APPROVED"
                                                    )
                                                }
                                                startIcon={<Edit />}
                                                sx={{
                                                    textTransform: "capitalize",
                                                    flex: 1,
                                                }}
                                            >
                                                {user.userStatus === "APPROVED"
                                                    ? "Set Pending"
                                                    : "Approve"}
                                            </Button>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                color="error"
                                                onClick={() =>
                                                    deleteFunc(user.userId)
                                                }
                                                startIcon={<DeleteRounded />}
                                                sx={{
                                                    textTransform: "capitalize",
                                                    flex: 1,
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box sx={{ textAlign: "center", my: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                        No Users Found
                    </Typography>
                </Box>
            )}
        </Box>
    );
}
