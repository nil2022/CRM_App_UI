import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function PrivateRoute ({ children }) {
    const isAuthenticated = useSelector((state) => state.auth.status);
    const token = useSelector((state) => state.auth.accessToken);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        // TODO: make it a better authentication for pages
        if (!isAuthenticated && !token) {
            setLoader(false);
            // toast.dismiss();
            toast.error('Please login first');
            navigate('/login');
        } else setLoader(false);
        
    }, [])

    // console.log('loader:', loader)

    return loader ? <h1>Loading...</h1> : <div>{children}</div>
};