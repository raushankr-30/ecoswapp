import React, { useState } from "react";
import API from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Auth(){
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function login(e: any){
    e.preventDefault();
    const res = await API.post("/auth/login", { email });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", res.data.user.id);
    localStorage.setItem("role", res.data.user.role);
    navigate("/dashboard");
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h2 className="text-2xl mb-4">Login (demo)</h2>
      <form onSubmit={login} className="space-y-4">
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email" className="w-full p-2 border rounded" />
        <button className="px-4 py-2 bg-emerald-600 text-white rounded">Login</button>
      </form>
      <p className="mt-4 text-sm text-gray-500">Use seeded emails from backend seed script (alice@..., ravi@..., chotu@...)</p>
    </main>
  );
}

