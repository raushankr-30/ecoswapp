import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(){
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => { localStorage.clear(); navigate("/"); };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">EcoSwap</Link>
        <nav className="space-x-4">
          <Link to="/market">Marketplace</Link>
          {token ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className="ml-3 px-3 py-1 border rounded">Logout</button>
            </>
          ) : (
            <Link to="/auth" className="px-3 py-1 border rounded">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

