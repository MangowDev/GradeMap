import React from "react";
import Navbar from "../../components/bars/Navbar/Navbar";
import Footer from "../../components/bars/footer/Footer";
import CreateComputerForm from "../../components/computers/form/CreateComputerForm";

export default function CreateComputer() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow">
        <CreateComputerForm/>
      </main>
      <Footer />
    </div>
  );
}
