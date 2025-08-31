import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ListingForm from "./pages/ListingForm";
import Marketplace from "./pages/Marketplace";
import PickupCreate from "./pages/PickupCreate";
import PickupTracker from "./pages/PickupTracker";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/list" element={<ListingForm />} />
        <Route path="/market" element={<Marketplace />} />
        <Route path="/pickup/create" element={<PickupCreate />} />
        <Route path="/pickup/:id" element={<PickupTracker />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

