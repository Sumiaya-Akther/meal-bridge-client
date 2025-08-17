import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { AuthContext } from '../../../provider/Authprovider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { FaEdit, FaSignOutAlt, FaEnvelope, FaClock, FaCalendarAlt, FaUserShield } from 'react-icons/fa';
import Loading from '../../../component/Loading/Loading';

const MyProfile = () => {
  const { user, logOut } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Get extra userInfo from DB (role etc)
  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ['user-info', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const encodedEmail = encodeURIComponent(user.email);
      const res = await axiosSecure.get(`/users/${encodedEmail}`);
      return res.data;
    }
  });

  if (isLoading) return <Loading></Loading>
  

  // Format dates using Firebase metadata
  const joined = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : 'Unknown';
  const lastLogin = user.metadata?.lastSignInTime
    ? new Date(user.metadata.lastSignInTime).toLocaleString()
    : 'Unknown';

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-3xl font-bold text-primary text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          My Profile
        </motion.h1>

        <motion.div
          className="lg:grid lg:grid-cols-3 lg:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {/* Left Column : Avatar + Quick links */}
          <motion.div className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="p-6 bg-base-200 rounded-2xl shadow-xl text-center">
              <img
                src={user.photoURL || 'https://i.ibb.co/tYTCvYt/default-user.png'}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto border-4 border-base-100 shadow-md mb-4"
              />
              <h2 className="text-2xl font-bold text-primary">{user.displayName || 'Anonymous'}</h2>
              <p className="text-sm text-gray-500 capitalize">{userInfo.role || 'user'}</p>

              <div className="mt-6 border-t border-base-300 pt-5">
                <h3 className="text-lg font-semibold mb-3 text-primary">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to="/dashboard/update-profile" className="flex items-center justify-center gap-2 hover:text-primary transition">
                    <FaEdit /> Edit Profile
                  </Link>

                  <button onClick={logOut} className="flex items-center justify-center gap-2 hover:text-error transition w-full">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column : Account Details + Status */}
          <motion.div className="lg:col-span-2 space-y-8">
            <div className="p-8 bg-base-200 rounded-2xl shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-primary">Account Details</h3>
                <Link to="/dashboard/update-profile" className="btn btn-sm btn-primary normal-case">
                  <FaEdit /> Edit
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 p-4 bg-base-100 rounded-xl">
                  <FaEnvelope className="text-primary text-xl" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-semibold">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-base-100 rounded-xl">
                  <FaClock className="text-primary text-xl" />
                  <div>
                    <p className="text-xs text-gray-500">Last Login</p>
                    <p className="text-sm font-semibold">{lastLogin}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-base-100 rounded-xl">
                  <FaCalendarAlt className="text-primary text-xl" />
                  <div>
                    <p className="text-xs text-gray-500">Member Since</p>
                    <p className="text-sm font-semibold">{joined}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-base-100 rounded-xl">
                  <FaUserShield className="text-primary text-xl" />
                  <div>
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="text-sm font-semibold capitalize">{userInfo.role || 'user'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status/Achievement */}
            <div className="p-8 bg-base-200 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-primary mb-5">Profile Status</h3>
              <div className="space-y-4">
                <div className="p-4 bg-base-100 rounded-xl flex gap-4 items-center">
                  <span className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center text-primary text-lg">✅</span>
                  <div>
                    <p className="font-semibold">Verified Member</p>
                    <p className="text-sm text-gray-500">Your account is verified by the system/admin.</p>
                  </div>
                </div>
                <div className="p-4 bg-base-100 rounded-xl flex gap-4 items-center">
                  <span className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center text-primary text-lg">🌱</span>
                  <div>
                    <p className="font-semibold">Active Supporter</p>
                    <p className="text-sm text-gray-500">Thanks for being part of the food waste reduction movement.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyProfile;
