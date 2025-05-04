import React from "react";
import Navbar from "../components/bars/Navbar/Navbar";

export default function Users() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow"></main>
      <Footer />
    </div>
  );
}
