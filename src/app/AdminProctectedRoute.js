import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('adminAuthToken');
    const username = localStorage.getItem('name');
    if (!token && !username) {
        return <Navigate to="/adminlogin" replace />;
    }
    
    return children;
};

export default AdminProtectedRoute;
