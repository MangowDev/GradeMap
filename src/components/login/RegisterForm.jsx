import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/login/loginApi";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    surnames: "",
    username: "",
    password: "",
    password_confirmation: "",
    dni: "",
    email: "",
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await registerUser(formData);
      console.log("Registration succesful: ", result);
      navigate("/home");
    } catch (err) {
      setError("There was an error registering: ", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] sm:w-full max-w-full mx-auto px-15 space-y-6 sm:space-y-8"
    >
      <h2 className="text-4xl sm:text-6xl font-sansation p-3 sm:p-5 font-bold text-center text-secondary">
        Register
      </h2>

      <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 w-full">
        <div className="w-full">
          <label
            htmlFor="name"
            className="block text-xl sm:text-3xl font-medium font-sansation text-cuaternary"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 sm:mt-3 font-rubik block w-full text-lg sm:text-2xl py-2 px-2 border-b-2 text-black border-secondary focus:outline-none focus:ring-2 focus:ring-cuaternary hover:pl-3 sm:hover:pl-4 transition-all duration-200"
            placeholder="Tony"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="surnames"
            className="block text-xl sm:text-3xl font-medium font-sansation text-cuaternary"
          >
            Surnames:
          </label>
          <input
            type="text"
            id="surnames"
            name="surnames"
            value={formData.surnames}
            onChange={handleChange}
            className="mt-2 sm:mt-3 font-rubik block w-full text-lg sm:text-2xl py-2 px-2 border-b-2 text-black border-secondary focus:outline-none focus:ring-2 focus:ring-cuaternary hover:pl-3 sm:hover:pl-4 transition-all duration-200"
            placeholder="Stark"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 w-full">
        <div className="w-full">
          <label
            htmlFor="username"
            className="block text-xl sm:text-3xl font-medium font-sansation text-cuaternary"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-2 sm:mt-3 font-rubik block w-full text-lg sm:text-2xl py-2 px-2 border-b-2 text-black border-secondary focus:outline-none focus:ring-2 focus:ring-cuaternary hover:pl-3 sm:hover:pl-4 transition-all duration-200"
            placeholder="IronMan99"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="dni"
            className="block text-xl sm:text-3xl font-medium font-sansation text-cuaternary"
          >
            DNI:
          </label>
          <input
            type="text"
            id="dni"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            className="mt-2 sm:mt-3 font-rubik block w-full text-lg sm:text-2xl py-2 px-2 border-b-2 text-black border-secondary focus:outline-none focus:ring-2 focus:ring-cuaternary hover:pl-3 sm:hover:pl-4 transition-all duration-200"
            placeholder="26354899D"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 w-full">
        <div className="w-full">
          <label
            htmlFor="password"
            className="block text-xl sm:text-3xl font-medium font-sansation text-cuaternary"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-2 sm:mt-3 font-rubik text-lg sm:text-2xl block w-full py-2 px-2 border-b-2 text-black border-secondary focus:outline-none focus:ring-2 focus:ring-cuaternary hover:pl-3 sm:hover:pl-4 transition-all duration-200"
            placeholder="Your password..."
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="password_confirmation"
            className="block text-xl sm:text-3xl font-medium font-sansation text-cuaternary"
          >
            Confirmation:
          </label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            className="mt-2 sm:mt-3 font-rubik text-lg sm:text-2xl block w-full py-2 px-2 border-b-2 text-black border-secondary focus:outline-none focus:ring-2 focus:ring-cuaternary hover:pl-3 sm:hover:pl-4 transition-all duration-200"
            placeholder="Password Confirmation..."
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-xl sm:text-3xl font-medium font-sansation text-cuaternary"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-2 sm:mt-3 font-rubik block w-full text-lg sm:text-2xl py-2 px-2 border-b-2 text-black border-secondary focus:outline-none focus:ring-2 focus:ring-cuaternary hover:pl-3 sm:hover:pl-4 transition-all duration-200"
          placeholder="email@example.com"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-secondary font-sansation font-semibold text-primary text-2xl sm:text-3xl py-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-cuaternary hover:text-tertiary"
        >
          {isSubmitting ? "Submitting..." : "Register"}
        </button>

        {error && (
          <p className="text-red-600 mt-5 font-rubik text-lg text-center">
            {error}
          </p>
        )}

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
