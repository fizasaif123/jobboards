// App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Pages/Home";
import TermsPage from "./Pages/Terms";
import AboutPage from "./Pages/About";
import PrivacyPage from "./Pages/Privacy";
import DirectoryPage from "./Pages/Directory";
import ContactUsPage from "./Pages/ContactUs";
import "./styles.css";
import TradesSignIn from "./Pages/TradesSignIn";
import TradesSignUp from "./Pages/TradesSignUp";
import ClientSignUp from "./Pages/ClientSignUp";
import ClientSignIn from "./Pages/ClientSignIn";
import Dashboard from "./Pages/Dashboard";
import JobPostForm from "./Pages/JobPostForm";


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Terms" element={<TermsPage />} />
        <Route path="/Privacy" element={<PrivacyPage />} />
        <Route path="/Directory" element={<DirectoryPage />} />
        <Route path="/ContactUs" element={<ContactUsPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<TradesSignIn />} />
        <Route path="/register" element={<TradesSignUp />} />
        <Route path="/signin" element={<ClientSignIn />} />
        <Route path="/signup" element={<ClientSignUp />} />
        <Route path="/post-job" element={<JobPostForm/>} />
       
        
        
      </Routes>
      <Footer />
      {/* <MultiStepForm onClose={() => {}} /> */}
    </div>
  );
}

export default App;
