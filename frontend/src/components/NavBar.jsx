import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar(){
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <header className="navbar">
      <div className="inner" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <span className="brand">EduFlow</span>
          <span style={{marginLeft:8}} className="small muted">Courses & Lessons</span>
        </div>

        <nav className="navlinks">
          <NavLink to="/courses" className={({isActive}) => isActive ? 'active' : ''}>Courses</NavLink>
          {isAuthenticated && user?.role === 'instructor' && (
            <NavLink to="/instructor" className={({isActive}) => isActive ? 'active' : ''}>Instructor</NavLink>
          )}
          {!isAuthenticated ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          ) : (
            <>
              <span className="small muted" style={{marginLeft:8}}>{user.username}</span>
              <button className="btn ghost" onClick={() => { logout(); nav('/courses'); }}>Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
