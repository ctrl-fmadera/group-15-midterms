import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function Navbar() {
  return (
    <nav>
      <h1>TaskFlow</h1>
      <div>
        <Link to="/tasks">Tasks</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
