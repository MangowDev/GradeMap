import React from "react";
import Navbar from "../components/bars/Navbar/Navbar";
import Footer from "../components/bars/footer/Footer";
import CreateClassroomForm from "../components/classroom/form/CreateClassroomForm";

export default function CreateClassroom() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow">
        <CreateClassroomForm/>
      </main>
      <Footer />
    </div>
  );
}
