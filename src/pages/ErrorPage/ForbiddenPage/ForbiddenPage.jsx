import React from 'react';
import { Link } from 'react-router';
import Lottie from 'lottie-react';
import forbiddenAnimation from '../../../assets/lotties/forbidden403.json';

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center space-y-6">
        <div className="w-60 h-60">
          <Lottie animationData={forbiddenAnimation} loop={true} />
        </div>
        <h1 className="text-4xl font-extrabold text-warning">403</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Access Forbidden</h2>
        <p className="text-base text-gray-500">
          You do not have permission to access this page.
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

export default ForbiddenPage;
