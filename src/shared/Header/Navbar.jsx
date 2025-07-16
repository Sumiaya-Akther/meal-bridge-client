import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router';
import ThemeToggle from '../../component/themeToggle/ThemeToggle';
import logo from '../../assets/mealBridge-logo.png'
import { AuthContext } from '../../provider/Authprovider';
import Swal from 'sweetalert2';
//import { AuthContext } from '../../provider/AuthProvider';



const Navbar = () => {

    const navigate = useNavigate();
    const { user, logOut } = useContext(AuthContext)
    //console.log(user);
    const handleLogOut = () => {
        logOut();
        if (logOut) {

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Logout Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/");
        }
    }


    return (
        <div className="navbar fixed top-0 z-50 bg-base-200 shadow-sm">
            <div className='w-7xl mx-auto flex justify-between'>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
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
                            <li>
                                <NavLink
                                    to="/allDonations"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-extrabold" : ""
                                    }
                                >
                                    All Donations
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        isActive ? "text-primary font-extrabold" : ""
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <h1 className="flex font-bold items-center md:text-3xl"><img className='w-22' src={logo} alt="" /></h1>
                </div>
                <div className="navbar-center hidden lg:flex">
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
                        <li>
                            <NavLink
                                to="/allDonations"
                                className={({ isActive }) =>
                                    isActive ? "text-primary font-extrabold" : ""
                                }
                            >
                                All Donations
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    isActive ? "text-primary font-extrabold" : ""
                                }
                            >
                                Dashboard
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end space-x-3">
                    <div>
                        <ThemeToggle></ThemeToggle>
                    </div>
                    {
                        user ? (
                            <div>
                                <ul className='flex items-center gap-3'>
                                    <li><button onClick={handleLogOut} className='btn bg-primary rounded-4xl'>LogOut</button></li>
                                    <li>
                                        <button className="mt-2" title={user?.displayName
                                        }><img className='w-8 rounded-full' referrerPolicy='no-referrer' src={`${user.photoURL}`} alt="" /></button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className='flex gap-5'>

                                <button onClick={() => navigate("/login")} className="btn bg-primary rounded-4xl">Login</button>

                            </div>

                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;