import React, { useEffect, useState } from "react";
import API from "../api/client";
import { Link } from "react-router-dom";

export default function Dashboard(){
  const [wastes, setWastes] = useState<any[]>([]);
  const role = localStorage.getItem("role");

  useEffect(()=> {
    API.get("/wastes").then(r => setWastes(r.data)).catch(()=> setWastes([]));
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm">My Listings</div>
          <div className="text-xl font-bold">{wastes.length}</div>
          <Link to="/list" className="text-sm mt-2 block">+ Create listing</Link>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm">Pending Pickups</div>
          <div className="text-xl font-bold">--</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm">CO₂ saved</div>
          <div className="text-xl font-bold">-- kg</div>
        </div>
      </div>

      <section className="mt-6">
        <h3 className="text-lg mb-2">Nearby Waste Listings</h3>
        <div className="grid grid-cols-3 gap-4">
          {wastes.map(w => (
            <div key={w.id} className="bg-white p-4 rounded shadow">
              <div className="font-semibold">{w.type} • {w.subType}</div>
              <div className="text-sm">Qty: {w.quantityKg} kg</div>
              <div className="text-sm">Owner: {w.owner?.name}</div>
              <div className="mt-2">
                <Link to={`/pickup/create?wasteId=${w.id}`} className="px-2 py-1 border rounded">Request Pickup</Link>
                <Link to={`/pickup/${w.id}`} className="ml-2 text-sm text-gray-600">Track</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

