import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // ✅ Create navigate instance

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData; // ✅ Extract from state
  
    try {
      const response = await axios.post("/api/users/login", { email, password });
      console.log("Login response:", response);
  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard"); // ✅ Make sure 'navigate' is defined
      }
    } catch (err) {
      console.error("Login failed:", err);
      if (err.response) {
        console.error("Error response:", err.response.data);
        alert(err.response.data.message || "Login failed");
      } else {
        alert("Login failed: Network or server issue");
      }
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
