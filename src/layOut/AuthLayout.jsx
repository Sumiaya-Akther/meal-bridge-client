import React from 'react';
import { Link, Outlet } from 'react-router';
import Lottie from 'lottie-react';
import LottiImg from "../assets/lotties/animation.json"


const AuthLayout = () => {
    return (
        <div className="bg-base-200">
           <div className='w-11/12 mx-auto'>
             <div>
                <Link to="/"><img className='w-22' src="/mealBridge-logo.png" alt="" /></Link>
            </div>
            <div className="hero-content flex gap-5 flex-col md:flex-row-reverse">
                <div className='flex-1'>
                    <Lottie animationData={LottiImg} loop={true}>

                    </Lottie>
                </div>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
           </div>
        </div>
    );
};

export default AuthLayout;