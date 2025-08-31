import React from "react";

export default function Profile(){
  const name = localStorage.getItem("role") || "User";
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl">Profile</h2>
      <p className="mt-4">Role: {name}</p>
    </main>
  );
}

