// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../api/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) localStorage.setItem('token', token); else localStorage.removeItem('token');
    if (user) localStorage.setItem('user', JSON.stringify(user)); else localStorage.removeItem('user');
  }, [token, user]);

  const login = async ({ username, password }) => {
    const res = await loginUser({ username, password });
    // expected: res.data.data = { token, user: { _id, username, role } }
    const { token: t, user: u } = res.data.data;
    setToken(t);
    setUser(u);
    return res;
  };

  const register = async (payload) => {
    const res = await registerUser(payload);
    // optional: auto-login after register — we just return response
    return res;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated: !!token, isInstructor: user?.role === 'instructor' }}>
      {children}
    </AuthContext.Provider>
  );
};
