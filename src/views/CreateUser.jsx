import React from "react";
import Navbar from "../components/bars/Navbar/Navbar";
import Footer from "../components/bars/footer/Footer";
import CreateUserForm from "../components/users/form/CreateUserForm";

export default function CreateUser() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow">
        <CreateUserForm/>
      </main>
      <Footer />
    </div>
  );
}
