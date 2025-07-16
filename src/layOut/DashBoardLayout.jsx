import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaHome, FaBoxOpen, FaMoneyCheckAlt, FaUserEdit, FaUserCheck, FaUserShield, FaHeart, FaDonate, FaPlus, FaClipboardList, FaListAlt } from 'react-icons/fa';
import { MdRateReview } from "react-icons/md";
import useUserRole from '../hooks/useUserRole';
import { Link } from 'react-router';

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  return (
    <div className="drawer lg:drawer-open w-11/12 mx-auto">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar for mobile */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dashboard</div>
        </div>

        {/* Page content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-1">
          <div>
            <Link to="/"><img className='w-22' src="/mealBridge-logo.png" alt="" /></Link>
          </div>

          <li>
            <NavLink to="/dashboard">
              <FaHome className="mr-2" /> Dashboard Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile">
              <FaUserEdit className="mr-2" /> My Profile
            </NavLink>
          </li>
          {/* -------------------------------------------------------> */}

          {/* <li>
            <NavLink to="/dashboard/manage-users">
              <FaUserShield className="mr-2" /> Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-donation">
              <FaPlus className="mr-2" /> Add Donation
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-donations">
              <FaBoxOpen className="mr-2" /> Manage Donations
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-donations">
              <FaBoxOpen className="mr-2" /> My Donations
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/feature-donations">
              <FaListAlt className="mr-2" /> Feature Donations
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/request-charity">
              <FaDonate className="mr-2" /> Request Charity Role
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-role-requests">
              <FaUserCheck className="mr-2" /> Manage Role Requests
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/transaction-history">
              <FaMoneyCheckAlt className="mr-2" /> Transaction History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/requested-donations">
              <FaClipboardList className="mr-2" /> Requested Donations
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-requests">
              <FaClipboardList className="mr-2" /> My Requests
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-pickups">
              <FaBoxOpen className="mr-2" /> My Pickups
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/received">
              <FaBoxOpen className="mr-2" /> Received Donations
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/favorites">
              <FaHeart className="mr-2" /> Favorites
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/reviews">
              <FaHeart className="mr-2" /> My Reviews
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/manage-requests">
              <FaClipboardList className="mr-2" /> Manage Food Requests
            </NavLink>
          </li> */}

          {/* ----------------------------------------------------------------------------- */}



          {/* === USER ROUTES === */}

          {!roleLoading && role === 'user' && (
            <>
              <li>
                <NavLink to="/dashboard/request-charity">
                  <FaDonate className="mr-2" /> Request Charity Role
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/favorites">
                  <FaHeart className="mr-2" /> Favorites
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reviews">
                  <MdRateReview className="mr-2" /> My Reviews
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/transaction-history">
                  <FaMoneyCheckAlt className="mr-2" /> Transaction History
                </NavLink>
              </li>
            </>
          )}

          {/* === CHARITY ROUTES === */}

          {!roleLoading && role === 'charity' && (
            <>
              <li>
                <NavLink to="/dashboard/my-requests">
                  <FaClipboardList className="mr-2" /> My Requests
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-pickups">
                  <FaBoxOpen className="mr-2" /> My Pickups
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/received">
                  <FaBoxOpen className="mr-2" /> Received Donations
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/transaction-history">
                  <FaMoneyCheckAlt className="mr-2" /> Transaction History
                </NavLink>
              </li>
            </>
          )}


          {/* === RESTAURANT ROUTES === */}

          {!roleLoading && role === 'restaurant' && (
            <>
              <li>
                <NavLink to="/dashboard/add-donation">
                  <FaPlus className="mr-2" /> Add Donation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-donations">
                  <FaBoxOpen className="mr-2" /> My Donations
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/requested-donations">
                  <FaClipboardList className="mr-2" /> Requested Donations
                </NavLink>
              </li>
            </>
          )}

          {/* === ADMIN ROUTES === */}

          {!roleLoading && role === 'admin' && (
            <>
              <li>
                <NavLink to="/dashboard/manage-users">
                  <FaUserShield className="mr-2" /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-role-requests">
                  <FaUserCheck className="mr-2" /> Manage Role Requests
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-donations">
                  <FaBoxOpen className="mr-2" /> Manage Donations
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-requests">
                  <FaClipboardList className="mr-2" /> Manage Food Requests
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/feature-donations">
                  <FaListAlt className="mr-2" /> Feature Donations
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
