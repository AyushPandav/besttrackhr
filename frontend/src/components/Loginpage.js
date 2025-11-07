import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Loginpage.css';
import authService from '../services/authService';

const Loginpage = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setError('');
  };

  const handleGoogleSignIn = async () => {
    if (!selectedRole) {
      setError('Please select your role first');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate Google OAuth (Replace with real Google Identity Services in production)
      const googleUser = await simulateGoogleSignIn();

      const result = await authService.googleLogin(googleUser.idToken, selectedRole);

      if (result.success) {
        const redirectPath = authService.getRedirectPath();
        navigate(redirectPath);
      } else {
        setError(result.error || 'Google sign-in failed. Please try again.');
      }
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
      console.error('Google OAuth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate Google Sign-In (Replace with Google Identity Services)
  const simulateGoogleSignIn = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          idToken: 'mock-google-id-token-12345',
          email: 'user@example.com',
          name: 'John Doe',
          picture: 'https://via.placeholder.com/100'
        });
      }, 1200);
    });
  };

  const handleTraditionalLogin = () => {
    if (!selectedRole) {
      setError('Please select your role first');
      return;
    }
    navigate('/login', { state: { role: selectedRole } });
  };

  return (
    <div className="modern-login-container">
      {/* Left Panel - Branding & Features */}
      <div className="login-left-panel">
        <div className="login-background">
          <div className="login-overlay"></div>
          <div className="floating-elements">
            <div className="element element-1"></div>
            <div className="element element-2"></div>
            <div className="element element-3"></div>
          </div>
        </div>

        <div className="login-content">
          <h1 className="login-brand">
            <span className="gradient-text">Team Track</span>
          </h1>
          <p className="login-tagline">
            Streamline your workforce management with our intelligent HR platform
          </p>

          <div className="login-features">
            <div className="feature-item">
              <i className="bi bi-shield-check"></i>
              <span>Secure & Compliant</span>
            </div>
            <div className="feature-item">
              <i className="bi bi-people-fill"></i>
              <span>Role-based Access</span>
            </div>
            <div className="feature-item">
              <i className="bi bi-graph-up-arrow"></i>
              <span>Real-time Analytics</span>
            </div>
            <div className="feature-item">
              <i className="bi bi-phone"></i>
              <span>Mobile Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="login-right-panel">
        <div className="login-form-container">
          <div className="login-header">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Choose your role to continue</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <span>{error}</span>
            </div>
          )}

          {/* Role Selection */}
          <div className="role-selection">
            <h3 className="role-title">I am a:</h3>
            <div className="role-buttons">
              <button
                className={`role-btn ${selectedRole === 'EMPLOYEE' ? 'active' : ''}`}
                onClick={() => handleRoleSelection('EMPLOYEE')}
                disabled={isLoading}
              >
                <i className="bi bi-person-fill"></i>
                <span>Employee</span>
              </button>

              <button
                className={`role-btn ${selectedRole === 'HR' ? 'active' : ''}`}
                onClick={() => handleRoleSelection('HR')}
                disabled={isLoading}
              >
                <i className="bi bi-briefcase-fill"></i>
                <span>HR Manager</span>
              </button>
            </div>
          </div>

          {/* Login Options */}
          <div className="login-options">
            {/* Google Sign-In */}
            <button
              className="google-signin-btn"
              onClick={handleGoogleSignIn}
              disabled={!selectedRole || isLoading}
            >
              {isLoading ? (
                <div className="spinner">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              ) : (
                <i className="bi bi-google"></i>
              )}
              <span>
                {isLoading ? 'Signing in...' : 'Continue with Google'}
              </span>
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            {/* Traditional Login */}
            <button
              className="traditional-login-btn"
              onClick={handleTraditionalLogin}
              disabled={isLoading}
            >
              <i className="bi bi-envelope-fill"></i>
              <span>Sign in with Email</span>
            </button>
          </div>

          {/* Footer */}
          <div className="login-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/registerpage" className="signup-link">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;