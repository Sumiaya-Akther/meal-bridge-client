import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../socialLogin/SocialLogin';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../provider/Authprovider';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const result = await signIn(email, password);
      console.log("Login User:", result.user);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back to MealBridge!'
      });
      navigate(from);
    } catch (error) {
      console.error("Login Error:", error);
      let message = "Invalid email or password.";

      if (error.message.includes("user-not-found")) {
        message = "Email doesn’t match.";
      } else if (error.message.includes("wrong-password")) {
        message = "Password doesn’t match.";
      }

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: message
      });
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center text-primary">Please Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {errors.email && <p className='text-error text-sm'>{errors.email.message}</p>}

          {/* Password */}
          <label className="label mt-2">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters, one uppercase and one special character'
              }
            })}
            className="input input-bordered w-full"
            placeholder="Password"
          />
          {errors.password && <p className='text-error text-sm'>{errors.password.message}</p>}

          <button className="btn btn-primary w-full mt-4">Login</button>
        </form>

        <p className="mt-2 text-sm text-center">
          New to MealBridge?
          <Link to="/register" className="text-secondary ml-1 hover:underline">Register</Link>
        </p>

        <div className="divider">OR</div>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
