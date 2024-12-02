import React, { useState } from 'react';
import './ContactUs.css'; // Import the CSS file


const ContactUs = () => {
  // Define state variables to store form input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can send form data to a backend server or perform any other action
    console.log('Form submitted:', { name, email, phone, website, message });
  };

  return (
    <div className="container contactus"> {/* Add custom class name */}
      <form id="contact" onSubmit={handleSubmit}>
        <h3>Quick Contact</h3>
        <h4>Contact us today, and get reply with in 24 hours!</h4>
        <fieldset>
          <input
            placeholder="Your name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <input
            placeholder="Your Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </fieldset>
        <fieldset>
          <input
            placeholder="Your Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </fieldset>
        <fieldset>
          <input
            placeholder="Your Web Site starts with http://"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
        </fieldset>
        <fieldset>
          <textarea
            placeholder="Type your Message Here...."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </fieldset>
        <fieldset>
          <button type="submit" id="contact-submit" data-submit="...Sending">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default ContactUs;