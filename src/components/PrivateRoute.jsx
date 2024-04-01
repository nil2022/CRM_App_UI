import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import authService from '../server/auth';

export default function PrivateRoute({ children, authentication=true }) {
    const isAuthenticated = useSelector((state) => state.auth.status);
    // const token = useSelector((state) => state.auth.accessToken);
    // const token = localStorage.getItem('accessToken');
    const token = useCookies(['accessToken'])[0].accessToken;
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    let i = 0;
    useEffect(() => {

            // const id = setInterval(() => {
            //     i++
            //     console.log('timer after', i, 'secs', id);
            //     if(i === 5){
            //         console.log('timer stopped!')
            //         clearInterval(id)
            //         clearInterval(id+1)
            //     }
            // }, 1000);


        if (isAuthenticated) {
            setLoader(false);
            authService.getCurrentUser(token)
                .then(() => {
                    // ? not needed to implement .then
                    setLoader(false);
                    console.log('PrivateRoute :: getCurrentUser :: Success')
                })
                .catch((error) => {
                    setLoader(false);
                    if (error.response?.status === 401 && error.response?.statusText === 'Unauthorized') {
                        console.log('PrivateRoute :: getCurrentUser :: Error:', error.response)
                    }
                })
        }

        // TODO: make it a better authentication for pages
        if (!isAuthenticated && !token && authentication) {
            setLoader(false);
            toast.dismiss();
            toast.error('Please login first');
            navigate('/login');
        } else setLoader(false);

    }, [i])

    // console.log('loader:', loader)

    return loader ? <h1>Loading...</h1> : <div>{children}</div>
};