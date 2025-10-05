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
      // In a real app, you would integrate with Google OAuth
      // For now, we'll simulate the process
      const googleUser = await simulateGoogleSignIn();
      
      const result = await authService.googleLogin(googleUser.idToken, selectedRole);

      if (result.success) {
        // Navigate based on role
        navigate(authService.getRedirectPath());
      } else {
        setError(result.error || 'Google sign-in failed. Please try again.');
      }
    } catch (error) {
      setError('Google sign-in failed. Please try again.');
      console.error('Google sign-in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateGoogleSignIn = () => {
    return new Promise((resolve) => {
      // Simulate Google OAuth flow
      setTimeout(() => {
        resolve({
          idToken: 'mock-google-id-token',
          email: 'user@example.com',
          name: 'John Doe'
        });
      }, 1000);
    });
  };

  const handleTraditionalLogin = () => {
    navigate('/login');
  };

  return (
    <div className="modern-login-container">
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
          <h1 className="login-brand">Team Track</h1>
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
              <i className="bi bi-calendar-check"></i>
              <span>Smart Calendar</span>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right-panel">
        <div className="login-form-container">
          <div className="login-header">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="error-message">
              <i className="bi bi-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          <div className="role-selection">
            <h3 className="role-title">I am a:</h3>
            <div className="role-buttons">
              <button
                className={`role-btn ${selectedRole === 'EMPLOYEE' ? 'active' : ''}`}
                onClick={() => handleRoleSelection('EMPLOYEE')}
              >
                <i className="bi bi-person-fill"></i>
                <span>Employee</span>
              </button>
              <button
                className={`role-btn ${selectedRole === 'HR' ? 'active' : ''}`}
                onClick={() => handleRoleSelection('HR')}
              >
                <i className="bi bi-briefcase-fill"></i>
                <span>HR Manager</span>
              </button>
            </div>
          </div>

          <div className="login-options">
            <button
              className="google-signin-btn"
              onClick={handleGoogleSignIn}
              disabled={!selectedRole || isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
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

            <button
              className="traditional-login-btn"
              onClick={handleTraditionalLogin}
            >
              <i className="bi bi-envelope-fill"></i>
              <span>Sign in with Email</span>
            </button>
          </div>

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