import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./ClientSignIn.css"; // Using the provided CSS for styling

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "", role: "client" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:9000/api/auth/login ", formData);
      localStorage.setItem("userId", response.data.userId);

      if (formData.role === "client") {
        navigate("/post-job");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="flex items-center justify-center py-8">
      <div className="form-wrapper">
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
            >
              <option value="client">Client</option>
              <option value="tradeperson">Tradeperson</option>
            </select>
        

            <button type="submit">Sign In</button>
            <div className="pt-4 text-base auth-footer">
              Haven't account? <Link to="/signup" className="!text-[#eeb408] font-bold">Sign up</Link>
            </div>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <Link to="/signup"><button className="ghost">Sign Up</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default LoginForm;
