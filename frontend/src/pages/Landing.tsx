import React from "react";
import { Link } from "react-router-dom";

export default function Landing(){
  return (
    <main className="max-w-6xl mx-auto p-6">
      <section className="grid grid-cols-2 gap-6 items-center py-12">
        <div>
          <h1 className="text-4xl font-extrabold">Where Communities Connect to Turn Waste into Value</h1>
          <p className="mt-4 text-gray-700">Sell or give away segregated waste, schedule pickups, and help your city recycle better.</p>
          <div className="mt-6">
            <Link to="/auth" className="px-4 py-2 bg-emerald-600 text-white rounded">Get Started</Link>
            <Link to="/market" className="ml-3 px-4 py-2 border rounded">Marketplace</Link>
          </div>
        </div>
        <div>
          <div className="h-64 bg-white rounded shadow flex items-center justify-center">Illustration</div>
        </div>
      </section>

      <section className="py-8">
        <h2 className="text-2xl font-semibold mb-4">How it works</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded shadow">1. List Waste</div>
          <div className="bg-white p-6 rounded shadow">2. Match & Pickup</div>
          <div className="bg-white p-6 rounded shadow">3. Recycle & Earn</div>
        </div>
      </section>

      <section className="py-8">
        <h2 className="text-2xl font-semibold mb-4">Impact</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded shadow text-center">
            <div className="text-3xl font-bold">250kg</div>
            <div className="text-sm text-gray-500">waste diverted</div>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <div className="text-3xl font-bold">50</div>
            <div className="text-sm text-gray-500">pickups</div>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <div className="text-3xl font-bold">120kg</div>
            <div className="text-sm text-gray-500">CO₂ saved</div>
          </div>
        </div>
      </section>
    </main>
  );
}

