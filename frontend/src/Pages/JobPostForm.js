import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./JobPostForm.css"; // Use the custom CSS

function JobPostForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tradeType: "",
    location: "",
    coordinates: [],
    description: "",
  });
  const [message, setMessage] = useState("");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const detectLocation = () => {
    setIsDetectingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;

          setFormData((prevData) => ({
            ...prevData,
            coordinates: [longitude, latitude],
          }));

          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );

            const address = response.data.display_name || "Unknown Location";
            setFormData((prevData) => ({
              ...prevData,
              location: address,
            }));
          } catch (error) {
            console.error("Error during reverse geocoding:", error);
            setMessage("Location Detected Successfully");
          }
          setIsDetectingLocation(false);
        },
        () => {
          setMessage("Location Detected Successfully.");
          setIsDetectingLocation(false);
        }
      );
    } else {
      setMessage("Geolocation is not supported by your browser.");
      setIsDetectingLocation(false);
    }
  };

  const handleManualLocation = async () => {
    if (!formData.location) {
      setMessage("Please enter a location.");
      return;
    }

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          formData.location
        )}`
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setFormData((prevData) => ({
          ...prevData,
          coordinates: [parseFloat(lon), parseFloat(lat)],
        }));
        setMessage("Location validated and converted to coordinates.");
      } else {
        setMessage("Invalid location. Please try again.");
      }
    } catch (error) {
      console.error("Error during forward geocoding:", error);
      setMessage("Failed to validate location. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tradeType || !formData.coordinates.length || !formData.description) {
      setMessage("All fields are required.");
      return;
    }

    try {
      setIsPosting(true);
      const token = localStorage.getItem("token");
      const dataToSubmit = {
        tradeType: formData.tradeType,
        location: formData.coordinates,
        description: formData.description,
      };

      await axios.post("http://localhost:9000/api/jobs/post-job", dataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("");
      setOpenDialog(true);
      setTimeout(() => {
        setOpenDialog(false);
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error("Error posting job:", err);
      setMessage("Failed to post job. Try again.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Post a Job</h1>
          <span>Fill in the details below to post a job</span>

          {message && <p className="message">{message}</p>}

          <input
            type="text"
            placeholder="Trade Type"
            value={formData.tradeType}
            onChange={(e) =>
              setFormData({ ...formData, tradeType: e.target.value })
            }
            required
          />

          <button
            type="button"
            className="ghost"
            onClick={detectLocation}
            disabled={isDetectingLocation}
          >
            {isDetectingLocation ? "Detecting..." : "Detect My Location"}
          </button>

          <input
            type="text"
            placeholder="Manual Location (if detection fails)"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
          <button
            type="button"
            className="ghost"
            onClick={handleManualLocation}
          >
            Validate Location
          </button>

          <textarea
            placeholder="Job Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows="5"
            required
          ></textarea>

          <button type="submit" className="ghost">
            {isPosting ? "Posting..." : "Post Job"}
          </button>
        </form>
     

        {openDialog && (
          <div className="dialog">
            <div className="dialog-content">
              <div className="loading-indicator"></div>
              <h2>Thanks for posting!</h2>
              <p>Redirecting...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobPostForm;
