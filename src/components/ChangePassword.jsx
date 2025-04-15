import React, { useState, useEffect } from "react";
import CustomizedSnackbars from "./SnackbarComponent";
import toast from "react-hot-toast";
import authService from "../server/auth";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { VisibilityRounded, VisibilityOffRounded } from "@mui/icons-material";
import {
    IconButton,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    FormControl,
    CircularProgress,
    Box,
} from "@mui/material";

function ChangePassword() {
    const initialValues = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleMouseDownPassword = (e) => e.preventDefault();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setError("");
        setOpen(true);
        setLoading(true);

        try {
            const passwordUpdate = await authService.changeUserPassword(
                formValues.oldPassword,
                formValues.newPassword,
                formValues.confirmPassword
            );

            if (passwordUpdate.success === true) {
                toast.success(passwordUpdate.message);
                setFormValues(initialValues);
                setTimeout(() => {
                    navigate("/dashboard", {
                        unstable_viewTransition: true,
                        unstable_flushSync: true,
                    });
                }, 600);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            console.log(
                "Change Password Error :: ",
                err?.response || err.message
            );
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
            {error && (
                <CustomizedSnackbars
                    severity="error"
                    message={error}
                    setOpenSnackbar={true}
                />
            )}
            <form
                onSubmit={handlePasswordChange}
                className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-24 min-h-[75vh] xl:h-[88vh]"
            >
                <div className="space-y-6 w-full max-w-xl  bg-white p-4 lg:p-8 border border-zinc-200 shadow-lg rounded-lg">
                    <h2 className="text-xl font-semibold text-slate-800 text-center">
                        Change Password
                    </h2>

                    {/* Old Password */}
                    <FormControl className="w-full" variant="outlined" required>
                        <InputLabel htmlFor="oldPassword">
                            Old Password
                        </InputLabel>
                        <OutlinedInput
                            id="oldPassword"
                            type={showOldPassword ? "text" : "password"}
                            value={formValues.oldPassword}
                            onChange={handleChange}
                            autoComplete="current-password"
                            label="Old Password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowOldPassword((prev) => !prev)
                                        }
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showOldPassword ? (
                                            <VisibilityOffRounded />
                                        ) : (
                                            <VisibilityRounded />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    {/* New Password */}
                    <FormControl className="w-full" variant="outlined" required>
                        <InputLabel htmlFor="newPassword">
                            New Password
                        </InputLabel>
                        <OutlinedInput
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={formValues.newPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                            label="New Password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowNewPassword((prev) => !prev)
                                        }
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showNewPassword ? (
                                            <VisibilityOffRounded />
                                        ) : (
                                            <VisibilityRounded />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    {/* Confirm Password */}
                    <FormControl className="w-full" variant="outlined" required>
                        <InputLabel htmlFor="confirmPassword">
                            Confirm Password
                        </InputLabel>
                        <OutlinedInput
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formValues.confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                            label="Confirm Password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (prev) => !prev
                                            )
                                        }
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? (
                                            <VisibilityOffRounded />
                                        ) : (
                                            <VisibilityRounded />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    {/* Submit Button */}
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
                            "Update Password"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChangePassword;
