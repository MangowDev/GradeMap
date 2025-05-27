import React from "react";
import Navbar from "../../components/bars/Navbar/Navbar";
import Footer from "../../components/bars/footer/Footer";

export default function SubjectList() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow"></main>
      <Footer />
    </div>
  );
}
