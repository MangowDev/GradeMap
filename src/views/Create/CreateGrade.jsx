import React from "react";
import Navbar from "../../components/bars/Navbar/Navbar";
import Footer from "../../components/bars/footer/Footer";
import CreateGradeForm from "../../components/grades/form/CreateGradeForm";

export default function CreateGrade() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow">
        <CreateGradeForm/>
      </main>
      <Footer />
    </div>
  );
}
