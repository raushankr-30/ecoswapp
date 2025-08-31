import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/client";

export default function PickupCreate(){
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const wasteId = params.get("wasteId") || "";
  const navigate = useNavigate();

  async function create() {
    try {
      const res = await API.post(`/pickups/create/${wasteId}`, {});
      alert("Pickup created");
      navigate(`/pickup/${res.data.pickup.id}`);
    } catch (err) { alert("error"); }
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl">Create Pickup</h2>
      <div className="mt-4">
        <div className="bg-white p-4 rounded shadow">Waste id: {wasteId}</div>
        <button onClick={create} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded">Create Pickup</button>
      </div>
    </main>
  );
}

