import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../shared/Header/Navbar';
import Footer from '../shared/Footer/Footer';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <main className='w-7xl mx-auto mt-30 mb-10 -z-10  min-h-[calc(100vh-452px)] '>
             <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default Root;