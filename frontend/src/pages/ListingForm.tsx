import React, { useState } from "react";
import API from "../api/client";
import { useNavigate } from "react-router-dom";

export default function ListingForm(){
  const [type, setType] = useState("plastic");
  const [qty, setQty] = useState(5);
  const [price, setPrice] = useState(5);
  const navigate = useNavigate();

  async function submit(e: any){
    e.preventDefault();
    try {
      await API.post("/wastes", { type, subType: "", quantityKg: qty, priceType: "negotiable", priceMin: price, address: { label: "Home", street: "DemoSt", city: "DemoCity", pincode: "12345", lat: 12.961, lng: 77.607 }});
      navigate("/dashboard");
    } catch (err) { alert("error creating listing"); }
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl mb-4">Create Listing</h2>
      <form onSubmit={submit} className="space-y-4">
        <label>Type
          <select value={type} onChange={(e)=>setType(e.target.value)} className="block w-full border p-2 rounded mt-1">
            <option value="plastic">Plastic</option>
            <option value="paper">Paper</option>
            <option value="ewaste">E-waste</option>
            <option value="metal">Metal</option>
          </select>
        </label>
        <label>Quantity (kg)
          <input type="number" value={qty} onChange={(e)=>setQty(Number(e.target.value))} className="block w-full border p-2 rounded mt-1" />
        </label>
        <label>Price Min/kg
          <input type="number" value={price} onChange={(e)=>setPrice(Number(e.target.value))} className="block w-full border p-2 rounded mt-1" />
        </label>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded">Create</button>
      </form>
    </main>
  );
}

