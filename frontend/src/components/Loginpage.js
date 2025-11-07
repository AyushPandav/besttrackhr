import React, { useState } from 'react';
import './Loginpage.css';


const Loginpage = () => {
  return (
   <div className="login-container">
      <div className="left-panel"></div>
      <div className="right-panel">
        <h1 className="sign-in-title">Sign in as</h1>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nunc justo.
        </p>
        <button className="employee-btn">EMPLOYEE</button>
        <button className="hr-btn">HR</button>
        <div className="dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;