import React from 'react'
import './ClientSignIn.css'; // Import your CSS file
import { Link } from 'react-router-dom'

const TradesSignUp = () => {
  return (
    <div className='flex items-center justify-center py-8'>
      <div className={`form-wrapper`}>
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Full Name" />
          <select name="trade" className="form-input">
  <option value="">Select trade</option>
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
<input type="file" placeholder="Proof of ID" />
<input type="text" placeholder="Business Name" />
<input type="email" placeholder="Email" />
<input type="password" placeholder="Password" />
          <button>Register</button>
          <div className='pt-4 text-base auth-footer'>
            Already registered? <Link to="/login" className='!text-[#eeb408] font-bold'>Login</Link>
          </div>
        </form>
      </div>
      
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <Link to="/login"><button className="ghost" >Login</button></Link>
          </div>
          
        </div>
      </div>
    </div>

    </div>
  )
}

export default TradesSignUp