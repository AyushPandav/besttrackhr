import React from "react";
import "./Registerpage.css"; // 👈 put your styles here

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className="hero-background"></div>
      <div className="auth-form">
        <h1 className="form-title">REGISTER</h1>

        <div className="form-field">
          <input type="text" placeholder="E-mail or Username" />
        </div>

         <div className="form-field">
          <input type="tel" placeholder="Enter the password" />
        </div>

        <div className="form-field">
  <label>
    <input type="radio" name="role" value="employee" defaultChecked />
    Employee
  </label>
  <label style={{ marginLeft: '1rem' }}>
    <input type="radio" name="role" value="hr" />
    HR
  </label>
</div>

        <button className="primary-button">NEXT</button>

        <div className="divider-line">
          <span className="divider-text">OR WITH</span>
        </div>

        <div className="social-container">
          <button className="social-button">SIGN UP</button>
          <button className="social-button">SIGN UP</button>
        </div>

        <a href="/loginpage" className="login-link">
          Have an account? Sign in
        </a>
      </div>
    </div>
  );
};

export default RegisterPage;
