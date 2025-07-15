import React, { Children, useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../provider/Authprovider';
import useUserRole from '../hooks/useUserRole';



const CharityRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const { role, roleLoading } = useUserRole();
    const location = useLocation();

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user || role !== 'charity') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default CharityRoute;