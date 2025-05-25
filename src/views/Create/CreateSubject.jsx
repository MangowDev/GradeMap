import React from "react";
import Navbar from "../../components/bars/Navbar/Navbar";
import Footer from "../../components/bars/footer/Footer";
import CreateSubjectForm from "../../components/subjects/forms/CreateSubjectForm";

export default function CreateSubject() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow">
        <CreateSubjectForm/>
      </main>
      <Footer />
    </div>
  );
}
