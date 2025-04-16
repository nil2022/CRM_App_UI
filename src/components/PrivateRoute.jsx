// import React, { useEffect, useState } from 'react';
// import { useCookies } from 'react-cookie';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import authService from '../server/auth';
// import { Backdrop, CircularProgress } from '@mui/material';

// export default function PrivateRoute({ children, authentication = true }) {
//     const isAuthenticated = useSelector((state) => state.auth.status);
//     const token = useCookies(['accessToken'])[0].accessToken;
//     const navigate = useNavigate();
//     const [loader, setLoader] = useState(true);
//     const [open, setOpen] = React.useState(false);

//     let i = 0;
//     useEffect(() => {
//         setOpen(true);

//         if (isAuthenticated) {
//             setLoader(false);
//             authService.getCurrentUser(token)
//                 .then(() => {
//                     // ? not needed to implement .then
//                     setLoader(false);
//                     setOpen(false);
//                     console.log('PrivateRoute :: getCurrentUser :: Success')
//                 })
//                 .catch((error) => {
//                     setLoader(false);
//                     setOpen(false);
//                     if (error.response?.status === 401 && error.response?.statusText === 'Unauthorized') {
//                         console.log('PrivateRoute :: getCurrentUser :: Error:', error.response)
//                     }
//                 })
//         }

//         // TODO: make it a better authentication for pages
//         if (!isAuthenticated && !token && authentication) {
//             setLoader(false);
//             setOpen(false);
//             toast.dismiss();
//             toast.error('Please login first');
//             navigate('/login');
//         } else setLoader(false);

//     }, [i])

//     return loader ? <h1 className='w-full h-full bg-red-700'>
//         <Backdrop
//             sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//             open={open}
//         >
//             <CircularProgress color="inherit" />
//         </Backdrop>
//     </h1> : <div>{children}</div>
// }

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import authService from "../server/auth";
import { Backdrop, CircularProgress } from "@mui/material";

export default function PrivateRoute({ children, authentication = true }) {
    const isAuthenticated = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const [open, setOpen] = useState(false);
    const token = useCookies(["accessToken"])[0].accessToken;
    let i = 0;

    useEffect(() => {
        setOpen(true);

        if (isAuthenticated) {
            setLoader(false);
            authService
                .getCurrentUser(token)
                .then(() => {
                    // ? not needed to implement .then
                    setLoader(false);
                    setOpen(false);
                    console.log("PrivateRoute :: getCurrentUser :: Success");
                })
                .catch((error) => {
                    setLoader(false);
                    setOpen(false);

                    // Handle different network errors
                    if (!error.response) {
                        // Network error (no response)
                        console.log("PrivateRoute :: Network Error");
                        toast.error(
                            "Network error. Please check your connection."
                        );
                        navigate("/login");
                        return;
                    }

                    // Handle different status codes more specifically
                    if (
                        error.response?.status === 401 &&
                        error.response?.statusText === "Unauthorized"
                    ) {
                        console.log(
                            "PrivateRoute :: getCurrentUser :: Error:",
                            error.response
                        );
                        toast.dismiss();
                        toast.error(
                            "Your session has expired. Please login again."
                        );
                        navigate("/login");
                    } else if (error.response?.status === 403) {
                        console.log(
                            "PrivateRoute :: getCurrentUser :: Error:",
                            error.response
                        );
                        toast.dismiss();
                        toast.error(
                            "You do not have permission to access this resource."
                        );
                        navigate("/login");
                    } else {
                        console.log(
                            "PrivateRoute :: getCurrentUser :: Error:",
                            error.response
                        );
                        toast.dismiss();
                        toast.error(
                            "Authentication error. Please login again."
                        );
                        navigate("/login");
                    }
                });
        }

        // TODO: make it a better authentication for pages
        if (!isAuthenticated && !token && authentication) {
            setLoader(false);
            setOpen(false);
            toast.dismiss();
            toast.error("Please login first");
            navigate("/login");
        } else setLoader(false);
    }, [i]);

    return loader ? (
        <div className="w-full h-full bg-red-700">
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div>{children}</div>
        </div>
    ) : (
        children
    );
}
