import React from 'react';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';


const Footer = () => {
    return (
        <footer className="bg-base-200  py-10">
            <div className="w-11/12 mx-auto px-6 flex flex-col items-center gap-6">
                {/* Logo */}
                <div className="flex items-center space-x-3  font-bold text-3xl">
                    <h1 className="btn btn-ghost flex items-center font-bold text-xl md:text-3xl"><img className='w-22' src="/mealBridge-logo.png" alt="" /></h1>

                </div>

                {/* Links */}
                <nav>
                    <ul className="menu menu-horizontal text-[16px] px-1">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? "text-primary font-extrabold" : ""
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                {/* Social Icons */}
                <div className="flex space-x-6 text-2xl text-secondary">
                    <a
                        href="https://twitter.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary "
                        aria-label="Twitter"
                    >
                        <FaTwitter />
                    </a>
                    <a
                        href="https://linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary "
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary "
                        aria-label="Instagram"
                    >
                        <FaInstagram />
                    </a>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center  text-sm mt-8">
                &copy; {new Date().getFullYear()} MealBridge. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;