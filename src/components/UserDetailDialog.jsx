// src/components/UserDetailDialog.jsx
import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Avatar,
    Typography,
    Box,
    Divider,
} from "@mui/material";

export default function UserDetailDialog({
    open,
    onClose,
    user,
    onEdit,
    onDelete,
}) {
    if (!user) return null;

    const {
        fullName,
        email,
        avatar,
        lastLogin,
        role,
        status,
        userId,
    } = user;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>User details</DialogTitle>
            <DialogContent dividers>
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Avatar
                        src={avatar || undefined}
                        alt={fullName}
                        sx={{ width: 72, height: 72 }}
                    >
                        {!avatar && fullName ? fullName.charAt(0) : null}
                    </Avatar>

                    <Box>
                        <Typography variant="h6">{fullName}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {email}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 1,
                    }}
                >
                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            Last Login
                        </Typography>
                        <Typography variant="body2">
                            {lastLogin
                                && (isNaN(new Date(lastLogin).getTime()) ? "N/A" : new Date(lastLogin).toLocaleString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }))}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            Role
                        </Typography>
                        <Typography variant="body2">{role || "—"}</Typography>
                    </Box>

                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            Status
                        </Typography>
                        <Typography variant="body2">{status || "—"}</Typography>
                    </Box>

                    <Box>
                    </Box>
                </Box>

                {/* add any other fields here as needed */}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} size="small">
                    Close
                </Button>

                {/* Edit and Delete forwarded to parent via callbacks */}
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onEdit && onEdit(userId)}
                >
                    Edit Status
                </Button>

                <Button
                    size="small"
                    color="error"
                    variant="contained"
                    onClick={() => onDelete && onDelete(userId)}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}