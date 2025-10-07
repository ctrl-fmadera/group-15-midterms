import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user } = useContext(AuthContext);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) return <div style={{padding:20}}>Unauthorized — role required: {role}</div>;
  return children;
}
