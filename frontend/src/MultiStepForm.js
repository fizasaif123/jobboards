import React, { useState } from "react";
import "./styles.css";

const MultiStepForm = ({ onClose }) => {
  const [showForm, setShowForm] = useState(true); // State variable to track form visibility
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // State variable to track form submission

  const handleNext = (data, stepErrors = {}) => {
    setFormData({ ...formData, [`step${step}`]: data });
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3003/multi-step-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log("Form data saved successfully");
        setSubmitted(true); // Update state to indicate form submission
      } else {
        console.error("Failed to save form data");
      }
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  const Step1 = ({ onNext }) => {
    const [workType, setWorkType] = useState("");
    const [error, setError] = useState("");

    const handleContinue = () => {
      if (!workType) {
        setError("Please select a work type");
        return;
      }
      setError("");
      onNext(workType);
    };

    return (
      <div>
        <h2>Step 1: What type of tradesperson do you need? </h2>

        <select value={workType} onChange={(e) => setWorkType(e.target.value)} className="text-black">
  <option value="">Select...</option>
  <option value="bricklayer">Bricklayer</option>
  <option value="carpenter">Carpenter</option>
  <option value="cleaner">Cleaner</option>
  <option value="drywall installer">Drywall Installer</option>
  <option value="electrician">Electrician</option>
  <option value="floor installer">Floor Installer</option>
  <option value="gas engineer">Gas Engineer</option>
  <option value="general contractor">General Contractor</option>
  <option value="glazier">Glazier</option>
  <option value="hvac technician">HVAC Technician</option>
  <option value="installation contractors">Installation Contractors</option>
  <option value="landscaper">Landscaper</option>
  <option value="locksmith">Locksmith</option>
  <option value="mechanic">Mechanic</option>
  <option value="other">Other</option>
  <option value="painter & decorator">Painter & Decorator</option>
  <option value="pest control specialist">Pest Control Specialist</option>
  <option value="plumber">Plumber</option>
  <option value="roofer">Roofer</option>
  <option value="septic system installers">Septic System Installers</option>
  <option value="security officer">Security Officer</option>
  <option value="solar panel installers">Solar Panel Installers</option>
  <option value="stone masons">Stone Masons</option>
  <option value="training provider">Training Provider</option>
  <option value="welder">Welder</option>
</select>
        {error && <p className="error-message">{error}</p>}
        <div style={{ textAlign: "right" }}>
          <button onClick={handleContinue}>Continue</button>
        </div>
      </div>
    );
  };

  const Step2 = ({ onNext }) => {
    const [serviceTime, setServiceTime] = useState("");
    const [error, setError] = useState("");

    const handleContinue = () => {
      if (!serviceTime) {
        setError("Please select a service completion time");
        return;
      }
      setError("");
      onNext(serviceTime);
    };

    return (
      <div>
        <h2>Step 2:When do you want this service completed?</h2>
        <select
          value={serviceTime}
          onChange={(e) => setServiceTime(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="asap">As soon as possible</option>
          <option value="fewDays">Within the next few days</option>
          <option value="fewWeeks">Within the next few weeks</option>
          <option value="fewMonths">Within the next few months</option>
          <option value="noDate">I don't have a specific date in mind</option>
          <option value="other">Other</option>
        </select>
        {error && <p className="error-message">{error}</p>}
        <div style={{ textAlign: "right" }}>
          <button onClick={handleContinue}>Continue</button>
        </div>
      </div>
    );
  };

  const Step3 = ({ onNext }) => {
    const [propertyType, setPropertyType] = useState("");
    const [error, setError] = useState("");

    const handleContinue = () => {
      if (!propertyType) {
        setError("Please select a property type");
        return;
      }
      setError("");
      onNext(propertyType);
    };

    return (
      <div>
        <h2>Step 3: Type of Property</h2>
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="flat">Flat or Apartment</option>
          <option value="house">House</option>
          <option value="commercial">Commercial Property</option>
          <option value="bungalow">Bungalow</option>
          <option value="other">Other</option>
        </select>
        {error && <p className="error-message">{error}</p>}
        <div style={{ textAlign: "right" }}>
          <button onClick={handleContinue}>Continue</button>
        </div>
      </div>
    );
  };

  const Step4 = ({ onNext }) => {
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [postcode, setPostcode] = useState("");
    const [error, setError] = useState("");

    const handleContinue = () => {
      if (!street || !city || !postcode) {
        setError("Please enter all address fields");
        return;
      }
      setError("");
      const address = {
        street,
        city,
        postcode,
      };
      onNext(address);
    };

    return (
      <div>
        <h2>Step 4: Address</h2>
        <h3>Enter the address where you want work to be done</h3>
        <div>
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Enter street"
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
        </div>
        <div>
          <label htmlFor="postcode">Postcode:</label>
          <input
            type="text"
            id="postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="Enter postcode"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div style={{ textAlign: "right" }}>
          <button onClick={handleContinue}>Continue</button>
        </div>
      </div>
    );
  };

  const Step5 = ({ onNext }) => {
    const [email1, setEmail1] = useState("");
    const [email2, setEmail2] = useState("");
    const [error, setError] = useState("");

    const handleContinue = () => {
      if (!email1 || !email2) {
        setError("Please enter both email addresses");
        return;
      }
      if (email1 !== email2) {
        setError("Email addresses do not match");
        return;
      }
      setError("");
      onNext({ email1, email2 });
    };

    return (
      <div>
        <h2>Step 5: Enter contact detail you would like quote sent to?</h2>
        <input
          type="email"
          value={email1}
          onChange={(e) => setEmail1(e.target.value)}
          placeholder="Enter email address"
        />
        <input
          type="email"
          value={email2}
          onChange={(e) => setEmail2(e.target.value)}
          placeholder="Re-enter email address"
        />
        {error && <p className="error-message">{error}</p>}
        <div style={{ textAlign: "right" }}>
         
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 onNext={handleNext} />;
      case 2:
        return <Step2 onNext={handleNext} />;
      case 3:
        return <Step3 onNext={handleNext} />;
      case 4:
        return <Step4 onNext={handleNext} />;
      case 5:
        return <Step5 onNext={handleNext} />;
      default:
        return null;
    }
  };

  const handleCloseForm = () => {
    setShowForm(false); // Hide the form
    onClose(); // Call any close callback if needed
  };

  return (
    <>
      {showForm && (
        <div className="multi-step-form absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="progress-indicator">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i + 1}
                className={`step ${i + 1 === step ? "active" : ""}`}
              >
                {/* No text needed */}
              </div>
            ))}
          </div>
          <button className="close-button" onClick={handleCloseForm}>
            X
          </button>
          {submitted ? ( // Render success message if form is submitted
            <div className="success-message">
              <span role="img" aria-label="green tick">&#9989;</span>
              <p>Thank you for submitting!</p>
            </div>
          ) : (
            // Render form steps if form is not submitted
            <>
              {renderStep()}
              <div className="button-container">
                {step > 1 && (
                  <button className="back-button" onClick={handleBack}>
                    Back
                  </button>
                )}
                {step === 5 && (
                  <button className="submit-button" onClick={handleSubmit}>
                    Submit
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MultiStepForm;