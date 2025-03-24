import React from 'react';
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('userAuthToken');
    
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export default UserProtectedRoute;
