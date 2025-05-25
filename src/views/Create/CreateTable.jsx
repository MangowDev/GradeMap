import React from "react";
import Navbar from "../../components/bars/Navbar/Navbar";
import Footer from "../../components/bars/footer/Footer";
import CreateTableForm from "../../components/tables/forms/CreateTableForm";

export default function CreateTable() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow">
        <CreateTableForm/>
      </main>
      <Footer />
    </div>
  );
}
