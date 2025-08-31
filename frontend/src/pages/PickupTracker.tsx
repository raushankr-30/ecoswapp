import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/client";

export default function PickupTracker(){
  const { id } = useParams();
  const [pickup, setPickup] = useState<any>(null);

  useEffect(()=>{ if (id) API.get(`/pickups/${id}`).then(r=>setPickup(r.data)); }, [id]);

  async function updateStatus(status: string) {
    if (!id) return;
    await API.patch(`/pickups/${id}/status`, { status });
    const res = await API.get(`/pickups/${id}`);
    setPickup(res.data);
  }

  if (!pickup) return <div className="p-6">Loading...</div>;
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl mb-4">Pickup {pickup.id}</h2>
      <div className="bg-white p-4 rounded shadow">
        <div>Status: {pickup.status}</div>
        <div className="mt-2">Waste: {pickup.waste?.type} • {pickup.waste?.quantityKg} kg</div>
        <div className="mt-4 space-x-2">
          <button className="px-3 py-1 border rounded" onClick={()=>updateStatus("en_route")}>Mark En Route</button>
          <button className="px-3 py-1 border rounded" onClick={()=>updateStatus("picked_up")}>Mark Picked</button>
          <button className="px-3 py-1 border rounded" onClick={()=>updateStatus("delivered")}>Mark Delivered</button>
        </div>
      </div>
    </main>
  );
}

