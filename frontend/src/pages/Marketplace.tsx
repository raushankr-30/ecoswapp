import React, { useEffect, useState } from "react";
import API from "../api/client";
import { Link } from "react-router-dom";

export default function Marketplace(){
  const [wastes, setWastes] = useState<any[]>([]);
  useEffect(()=>{ API.get("/wastes").then(r=>setWastes(r.data)); }, []);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl mb-4">Marketplace</h2>
      <div className="grid grid-cols-3 gap-4">
        {wastes.map(w=>(
          <div key={w.id} className="bg-white p-4 rounded shadow">
            <div className="font-semibold">{w.type} {w.subType}</div>
            <div className="text-sm">Qty: {w.quantityKg} kg</div>
            <div className="text-sm">Seller: {w.owner?.name}</div>
            <div className="mt-3">
              <Link to={`/pickup/create?wasteId=${w.id}`} className="px-3 py-1 border rounded">Request Pickup</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

