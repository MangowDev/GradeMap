import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/login/loginApi";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      navigate('/home');
    }
  }, [navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await loginUser(formData);
      console.log("Login successful:", result);
      localStorage.setItem("user_id", result.user.id);
      localStorage.setItem("auth_token", result.token);
      navigate('/home');
    } catch (err) {
      setError("There was an error logging in: ", err);
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
        Login
      </h2>

      <div>
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
          placeholder="Your username..."
        />
      </div>

      <div>
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

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-secondary font-sansation font-semibold text-primary text-2xl sm:text-3xl py-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-cuaternary hover:text-tertiary"
        >
          {isSubmitting ? "Login in..." : "Log In"}
        </button>

        {error && <p className="text-red-600 mt-5 font-rubik text-lg text-center">{error}</p>}

        <p className="mt-4 sm:mt-5 text-black text-base sm:text-xl font-rubik italic text-center">
          Don't have an account?{" "}
          <Link
            className="relative inline-block text-secondary transition-colors duration-200 ease-in-out hover:text-cuaternary
            after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-secondary
            after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100"
            to="/register"
          >
            Register here
          </Link>
        </p>
      </div>
    </form>
  );
}
