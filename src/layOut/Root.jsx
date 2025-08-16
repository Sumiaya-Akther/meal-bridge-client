import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../shared/Header/Navbar';
import Footer from '../shared/Footer/Footer';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Root = () => {

    useEffect(() => {
        Aos.init({
            duration: 600, 
            once: true,     
        });
    }, []);

    return (
        <div>
            <Navbar />
            <main className='w-11/12 mx-auto mt-30 mb-10 -z-10 min-h-[calc(100vh-452px)]'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Root;
