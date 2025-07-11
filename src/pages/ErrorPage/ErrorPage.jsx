import React from 'react';
import { Link } from 'react-router';
import Lottie from 'lottie-react';
import errorAnimation from '../../assets/lotties/No Data found.json';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center space-y-6">
        <div className="w-60 h-60">
          <Lottie animationData={errorAnimation} loop={true} />
        </div>
        <h1 className="text-4xl font-extrabold text-error">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Oops! Page not found.</h2>
        <p className="text-base text-gray-500">
          The page you are looking for might have been removed or temporarily unavailable.
        </p>
        <Link
          to="/"
          className="btn btn-primary px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition duration-300"
        >
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
