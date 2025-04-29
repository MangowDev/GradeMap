import React from "react";
import RegisterForm from "../components/login/RegisterForm";
import LoginLogo from "../components/login/LoginLogo";

export default function Register() {
  return (
    <div className="flex h-screen">
      <div className="relative w-2/3 bg-secondary overflow-hidden flex flex-col justify-center items-center">
      <LoginLogo/>
      </div>

      <div className="flex justify-center items-center w-1/2 bg-primary">
        <RegisterForm />
      </div>
    </div>
  );
}
