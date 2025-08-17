import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaImage, FaSave, FaTimesCircle, FaUndo } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../../provider/Authprovider";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [email] = useState(user?.email || ""); // read-only

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ displayName: fullName, photoURL });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Profile updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard"); // redirect after save
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to update profile",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  const handleReset = () => {
    setFullName(user?.displayName || "");
    setPhotoURL(user?.photoURL || "");
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-6">
      <motion.div
        className="card w-full max-w-2xl bg-base-200 shadow-2xl p-8 rounded-2xl"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-primary">
            <img
              src={photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-3xl font-bold text-primary">Update Profile</h2>
          <p className="text-secondary text-sm">Update your personal information below.</p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="form-control">
            <label className="label flex items-center gap-2">
              <FaUser /> Full Name
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-base-100 "
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Email (read-only) */}
          <div className="form-control">
            <label className="label flex items-center gap-2 text-primary">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              className="input input-bordered w-full bg-base-200 cursor-not-allowed"
              value={email}
              disabled
            />
          </div>

          {/* Photo URL */}
          <div className="form-control">
            <label className="label flex items-center gap-2 text-primary">
              <FaImage /> Photo URL
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-base-100"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-ghost text-secondary hover:text-primary normal-case"
            >
              <FaUndo /> Reset
            </button>
            <Link to="/dashboard" className="btn btn-secondary w-full sm:w-auto normal-case">
              <FaTimesCircle /> Cancel
            </Link>
            <motion.button
              type="submit"
              className="btn btn-primary w-full sm:w-auto normal-case"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSave /> Save Changes
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateProfile;
