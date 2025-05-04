import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Signup = () => {
  const [formData, setFormData] = useState({ fullname: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullname, email, password } = formData;

    if (!fullname || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axiosInstance.post("/api/users/signup", {
        fullname,
        email,
        password,
      });
      console.log("Signup response:", response);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        navigate("/login"); // Redirect to login if signup successful but no token
      }
    } catch (err) {
      console.error("Signup failed:", err);
      if (err.response) {
        setError(err.response.data.message || "Signup failed");
      } else {
        setError("Signup failed: Network or server issue");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Signup</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
