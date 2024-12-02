import React from 'react'
import './ClientSignIn.css'; // Import your CSS file
import { Link } from 'react-router-dom';
const TradesSignIn = () => {
  return (
    
      <div className='flex items-center justify-center py-8'>
        <div className={`form-wrapper right-panel-active`}>
        
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Login</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>Login</button>
            <div className='pt-4 text-base auth-footer'>
            Haven't account? <Link to="/register" className='!text-[#eeb408] font-bold'>Register</Link>
          </div>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <Link to="/register" ><button className="ghost">Register</button></Link>
              
            </div>
          </div>
        </div>
      </div>
  
      </div>
    
  )
}

export default TradesSignIn