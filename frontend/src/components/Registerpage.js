import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registerpage.css';
import authService from '../services/authService';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'EMPLOYEE',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await authService.register({
        email: formData.email,
        password: formData.password,
        role: formData.role,
        name: formData.name,
        authProvider: 'LOCAL'
      });

      if (result.success) {
        navigate('/loginpage', {
          state: {
            message: 'Registration successful! Please sign in with your credentials.'
          }
        });
      } else {
        if (result.error.includes('already exists')) {
          setErrors({
            general: result.error + ' Please try logging in instead or use a different email.',
            showLoginLink: true
          });
        } else {
          setErrors({ general: result.error || 'Registration failed. Please try again.' });
        }
      }
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (!formData.role) {
      setErrors({ role: 'Please select a role first' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const googleUser = await simulateGoogleSignUp();
      const result = await authService.googleLogin(googleUser.idToken, formData.role);

      if (result.success) {
        navigate(authService.getRedirectPath());
      } else {
        setErrors({ general: result.error || 'Google sign-up failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'Google sign-up failed. Please try again.' });
      console.error('Google sign-up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateGoogleSignUp = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          idToken: 'mock-google-id-token',
          email: 'newuser@example.com',
          name: 'New User'
        });
      }, 1000);
    });
  };

  return (
    <div className="modern-register-container">
      <div className="register-left-panel">
        <div className="register-background">
          <div className="register-overlay"></div>
          <div className="floating-elements">
            <div className="element element-1"></div>
            <div className="element element-2"></div>
            <div className="element element-3"></div>
          </div>
        </div>
        <div className="register-content">
          <h1 className="register-brand">Join Team Track</h1>
          <p className="register-tagline">
            Start your journey with the most comprehensive HR management platform
          </p>
          <div className="register-benefits">
            <div className="benefit-item">
              <i className="bi bi-check-circle-fill"></i>
              <span>Free 30-day trial</span>
            </div>
            <div className="benefit-item">
              <i className="bi bi-check-circle-fill"></i>
              <span>No credit card required</span>
            </div>
            <div className="benefit-item">
              <i className="bi bi-check-circle-fill"></i>
              <span>Setup in minutes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="register-right-panel">
        <div className="register-form-container">
          <div className="register-header">
            <h2 className="register-title">Create Account</h2>
            <p className="register-subtitle">Get started with your free account today</p>
          </div>

          {errors.general && (
            <div className="error-message">
              <i className="bi bi-exclamation-circle"></i>
              <span>{errors.general}</span>
              {errors.showLoginLink && (
                <div style={{ marginTop: '10px' }}>
                  <Link
                    to="/loginpage"
                    className="login-link"
                    style={{
                      color: '#4CAF50',
                      textDecoration: 'underline',
                      fontWeight: 'bold'
                    }}
                  >
                    Click here to sign in instead
                  </Link>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? 'error' : ''}
                  placeholder="Choose a username"
                />
                {errors.username && <span className="error-text">{errors.username}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'error' : ''}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="role-selection">
              <label className="role-label">I am a:</label>
              <div className="role-buttons">
                <button
                  type="button"
                  className={`role-btn ${formData.role === 'EMPLOYEE' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, role: 'EMPLOYEE' }))}
                >
                  <i className="bi bi-person-fill"></i>
                  <span>Employee</span>
                </button>
                <button
                  type="button"
                  className={`role-btn ${formData.role === 'HR' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, role: 'HR' }))}
                >
                  <i className="bi bi-briefcase-fill"></i>
                  <span>HR Manager</span>
                </button>
              </div>
              {errors.role && <span className="error-text">{errors.role}</span>}
            </div>

            <button type="submit" className="register-btn" disabled={isLoading}>
              {isLoading ? <div className="spinner"></div> : <i className="bi bi-person-plus-fill"></i>}
              <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <button
            className="google-signup-btn"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
          >
            {isLoading ? <div className="spinner"></div> : <i className="bi bi-google"></i>}
            <span>{isLoading ? 'Signing up...' : 'Sign up with Google'}</span>
          </button>

          <div className="register-footer">
            <p>
              Already have an account?{' '}
              <Link to="/loginpage" className="login-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
