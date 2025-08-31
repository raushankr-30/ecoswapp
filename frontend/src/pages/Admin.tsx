import React, { useEffect, useState } from "react";
import API from "../api/client";

export default function Admin(){
  const [esc, setEsc] = useState<any[]>([]);
  useEffect(()=>{ API.get("/admin/escalations").then(r=>setEsc(r.data)).catch(()=>setEsc([])); }, []);
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl">Admin - Escalations</h2>
      <div className="mt-4">
        {esc.length === 0 && <div>No escalations</div>}
        {esc.map(e => (
          <div key={e.id} className="bg-white p-4 rounded shadow mb-2">
            <div>Pickup: {e.id}</div>
            <div>Waste: {e.waste?.type} Qty: {e.waste?.quantityKg}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

