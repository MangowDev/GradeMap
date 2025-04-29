import React from "react";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  return (
    <form className="w-[90%] sm:w-4/5 max-w-xl mx-auto space-y-6 sm:space-y-8">
      <h2 className="text-4xl sm:text-6xl font-sansation p-3 sm:p-5 font-bold text-center text-secondary">
        Register
      </h2>
      <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 w-full">
        <div className="w-full">
          <label
            className="block text-xl sm:text-3xl font-medium font-sansation text-cuaternary"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="mt-2 sm:mt-3 font-rubik block w-full text-lg sm:text-2xl py-2 px-2 border-b-2 text-black border-secondary focus:outline-none focus:ring-2 focus:ring-cuaternary hover:pl-3 sm:hover:pl-4 transition-all duration-200"
            placeholder="Tony"
          />
        </div>
        <div className="w-full">
          <label
            className="block text-xl sm:text-3xl font-medium font-sansation text-cuaternary"
            htmlFor="surnames"
          >
            Surnames:
          </label>
          <input
            type="text"
            id="surnames"
            className="mt-2 sm:mt-3 font-rubik block w-full text-lg sm:text-2xl py-2 px-2 border-b-2 text-black border-secondary focus:outline-none focus:ring-2 focus:ring-cuaternary hover:pl-3 sm:hover:pl-4 transition-all duration-200"
            placeholder="Hola buenas"
          />
        </div>
      </div>
      <div>
        <label
          className="block text-xl sm:text-3xl font-medium font-sansation text-cuaternary"
          htmlFor="username"
        >
          Username:
        </label>
        <input
          type="text"
          id="username"
          className="mt-2 sm:mt-3 font-rubik block w-full text-lg sm:text-2xl py-2 px-2 border-b-2 text-black border-secondary focus:outline-none focus:ring-2 focus:ring-cuaternary hover:pl-3 sm:hover:pl-4 transition-all duration-200"
          placeholder="Micolega782"
        />
      </div>
      <div>
        <label
          className="block text-xl sm:text-3xl font-medium font-sansation text-cuaternary"
          htmlFor="password"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="mt-2 sm:mt-3 font-rubik text-lg sm:text-2xl block w-full py-2 px-2 border-b-2 text-black border-secondary focus:outline-none focus:ring-2 focus:ring-cuaternary hover:pl-3 sm:hover:pl-4 transition-all duration-200"
          placeholder="Your password..."
        />
      </div>
      <div>
        <label
          className="block text-xl sm:text-3xl font-medium font-sansation text-cuaternary"
          htmlFor="email"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="mt-2 sm:mt-3 font-rubik block w-full text-lg sm:text-2xl py-2 px-2 border-b-2 text-black border-secondary focus:outline-none focus:ring-2 focus:ring-cuaternary hover:pl-3 sm:hover:pl-4 transition-all duration-200"
          placeholder="email@example.com"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-secondary font-sansation font-semibold text-primary text-2xl sm:text-3xl py-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-cuaternary hover:text-tertiary hover:cursor-pointer"
        >
          Register
        </button>
        <p className="mt-4 sm:mt-5 text-black text-base sm:text-xl font-rubik italic text-center">
          Already registered?{" "}
          <Link
            className="relative inline-block text-secondary transition-colors duration-200 ease-in-out hover:text-cuaternary
              after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-secondary
              after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100"
            to="/login"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </form>
  );
}
