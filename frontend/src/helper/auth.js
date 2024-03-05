import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ requiredRoles, children }) {
    const isLoggedIn = localStorage.getItem('token');

    if (!isLoggedIn) {
        return <Navigate to={'/'} replace />;
    }

    return (
        <>
            {children}
        </>
    );
}
