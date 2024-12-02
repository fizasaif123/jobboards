import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClientSignIn.css"; // Using the same CSS file for consistency
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client", // Default role
    tradeType: "",
    location: "", // For display (human-readable address)
    coordinates: { longitude: "", latitude: "" }, // For backend
  });

  const [error, setError] = useState("");

  // Automatically detect location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;

          // Set coordinates for backend
          setFormData((prevData) => ({
            ...prevData,
            coordinates: { longitude, latitude },
          }));

          try {
            // Reverse geocoding to get a human-readable address
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );

            const fullAddress = response.data.display_name;

            setFormData((prevData) => ({
              ...prevData,
              location: fullAddress, // Set human-readable address
            }));
          } catch (error) {
            setError("Unable to fetch location details. Please try again.");
          }
        },
        (err) => {
          setError("Unable to detect location. Please allow location access.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the role changes, reset tradeType
    if (name === "role" && value === "client") {
      setFormData({
        ...formData,
        [name]: value,
        tradeType: "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSubmit = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      if (formData.role === "tradeperson") {
        dataToSubmit.tradeType = formData.tradeType;
        dataToSubmit.location = [
          formData.coordinates.longitude,
          formData.coordinates.latitude,
        ];
      }

      const response = await axios.post("http://localhost:9000/api/auth/register", dataToSubmit);
      alert("Registration successful: " + response.data.message);
      navigate("/signin"); // Redirect to login page
    } catch (error) {
      console.error(
        "Error registering user:",
        error.response?.data || error.message
      );
      alert("Error: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="flex items-center justify-center py-8">
      <div className="form-wrapper">
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registration</span>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

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

            {formData.role === "tradeperson" && (
              <>
                <input
                  type="text"
                  name="tradeType"
                  placeholder="Trade Type"
                  value={formData.tradeType}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  readOnly
                  required
                />
              </>
            )}

            <button type="submit">Sign Up</button>

            <div className="pt-4 text-base auth-footer">
              Already registered?{" "}
              <Link to="/signin" className="!text-[#eeb408] font-bold">
                Sign in
              </Link>
            </div>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <Link to="/signin">
                <button className="ghost">Sign In</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
