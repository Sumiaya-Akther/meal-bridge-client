import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../socialLogin/SocialLogin';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../provider/Authprovider';
//import useAxios from '../../../hooks/useAxios';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset, setError } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  //const axiosInstance = useAxios();
  const from = location.state?.from || '/';
  const [profilePic, setProfilePic] = useState('');
  const [passwordValidationError, setPasswordValidationError] = useState("");

  const onSubmit = async (data) => {
    const password = data.password;
    setPasswordValidationError("");

    // password validation
    if (password.length < 6) {
      setPasswordValidationError("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordValidationError("Password must include at least one capital letter.");
      return;
    }
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
      setPasswordValidationError("Password must include at least one special character.");
      return;
    }

    try {
      const result = await createUser(data.email, password);
      console.log("User Created:", result);
      console.log(data);
      
      

      const userInfo = {
        name: data.name,
        email: data.email,
        role: 'user',
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString()
      };
     // await axiosInstance.post('/users', userInfo);

      const userProfile = {
        displayName: data.name,
        photoURL: profilePic
      };
      await updateUserProfile(userProfile);

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Welcome to MealBridge!'
      });

      reset();
      navigate(from);

    } catch (error) {
      setPasswordValidationError(error.message || "Registration failed");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Something went wrong!'
      });
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    try {
      const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`;
      const res = await axios.post(imagUploadUrl, formData);
      setProfilePic(res.data.data.url);
    } catch (error) {
      setPasswordValidationError("Image upload failed.");
      Swal.fire({
        icon: 'error',
        title: 'Image Upload Failed',
        text: 'Please try again later.'
      });
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shadow-xl mx-auto">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center text-primary">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <label className="label">Your Name</label>
          <input type="text" {...register('name', { required: true })} className="input input-bordered w-full" placeholder="Your Name" />
          {errors.name && <p className='text-error text-sm'>Name is required</p>}

          {/* Image */}
          <label className="label mt-2">Profile Image</label>
          <input type="file" {...register('image', { required: true })} onChange={handleImageUpload} className="file-input file-input-bordered w-full" />
          {errors.image && <p className='text-error text-sm'>Image is required</p>}

          {/* Email */}
          <label className="label mt-2">Email</label>
          <input type="email" {...register('email', { required: true })} className="input input-bordered w-full" placeholder="Email" />
          {errors.email && <p className='text-error text-sm'>Email is required</p>}

          {/* Password */}
          <label className="label mt-2">Password</label>
          <input type="password" {...register('password', { required: true })} className="input input-bordered w-full" placeholder="Password" />
          {errors.password && <p className='text-error text-sm'>Password is required</p>}
          {passwordValidationError && <p className='text-error text-sm'>{passwordValidationError}</p>}

          <button className="btn btn-primary w-full mt-4">Register</button>
        </form>

        <p className="mt-2 text-sm text-center">
          Already have an account?
          <Link to="/login" className="text-secondary ml-1 hover:underline">Login</Link>
        </p>

        <div className="divider">OR</div>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
