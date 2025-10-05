import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

class AuthService {
  constructor() {
    this.token = localStorage.getItem('token');
    this.userRole = localStorage.getItem('userRole');
    this.userEmail = localStorage.getItem('userEmail');
    this.userName = localStorage.getItem('userName');
    
    // Set up axios defaults
    if (this.token) {
      this.setAuthToken(this.token);
    }
  }

  // Set authorization token for API requests
  setAuthToken(token) {
    this.token = token;
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }

  // Store user data
  setUserData(userData) {
    this.userRole = userData.role;
    this.userEmail = userData.email;
    this.userName = userData.name;
    
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userName', userData.name);
  }

  // Clear all user data
  clearUserData() {
    this.token = null;
    this.userRole = null;
    this.userEmail = null;
    this.userName = null;
    
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    delete axios.defaults.headers.common['Authorization'];
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token;
  }

  // Check if user has specific role
  hasRole(role) {
    return this.userRole === role;
  }

  // Check if user is HR
  isHR() {
    return this.hasRole('HR');
  }

  // Check if user is Employee
  isEmployee() {
    return this.hasRole('EMPLOYEE');
  }

  // Get current user data
  getCurrentUser() {
    return {
      token: this.token,
      role: this.userRole,
      email: this.userEmail,
      name: this.userName
    };
  }

  // Traditional login with username/password
  async login(credentials) {
    try {
      console.log('Attempting login with:', credentials);
      const response = await axios.post(`${API_BASE_URL}/authenticate`, {
        username: credentials.username, // This should be the email
        password: credentials.password
      });
      
      console.log('Login response:', response.data);
      
      if (response.data.token) {
        this.setAuthToken(response.data.token);
        
        // Get user role from the token
        const userRole = this.extractRoleFromToken(response.data.token) || 'EMPLOYEE';
        this.setUserData({
          role: userRole,
          email: credentials.username,
          name: credentials.username.split('@')[0] // Use email prefix as name
        });
        
        return {
          success: true,
          token: response.data.token,
          role: userRole
        };
      }
      
      throw new Error('No token received');
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        return {
          success: false,
          error: 'Invalid username or password. Please check your credentials and try again.'
        };
      } else if (error.response?.status === 404) {
        return {
          success: false,
          error: 'User not found. Please register first or check your email address.'
        };
      } else if (error.response?.data?.message) {
        return {
          success: false,
          error: error.response.data.message
        };
      } else if (error.message) {
        return {
          success: false,
          error: error.message
        };
      } else {
        return {
          success: false,
          error: 'Login failed. Please try again.'
        };
      }
    }
  }

  // Google OAuth login (simulated for now)
  async googleLogin(idToken, role) {
    try {
      console.log('Attempting Google login with role:', role);
      
      // For now, we'll simulate Google login by creating a fake user
      // In production, you would verify the Google ID token
      const mockUser = {
        email: `google_${Date.now()}@example.com`,
        name: 'Google User',
        role: role || 'EMPLOYEE'
      };
      
      // Register the user first
      const registerResponse = await this.register(mockUser);
      if (!registerResponse.success) {
        throw new Error('Failed to register Google user');
      }
      
      // Then login
      const loginResponse = await this.login({
        username: mockUser.email,
        password: 'google_oauth_password'
      });
      
      if (loginResponse.success) {
        this.setUserData({
          role: role || 'EMPLOYEE',
          email: mockUser.email,
          name: mockUser.name
        });
      }
      
      return loginResponse;
    } catch (error) {
      console.error('Google login error:', error);
      return {
        success: false,
        error: error.message || 'Google login failed'
      };
    }
  }

  // Check if user exists
  async checkUserExists(username) {
    try {
      const response = await axios.get(`${API_BASE_URL}/verify-username/${username}`);
      return {
        exists: true,
        message: response.data
      };
    } catch (error) {
      if (error.response?.status === 404) {
        return {
          exists: false,
          message: 'Username available'
        };
      }
      return {
        exists: false,
        error: error.message || 'Could not verify username'
      };
    }
  }

  // Register new user
  async register(userData) {
    try {
      console.log('Attempting registration with:', userData);
      
      // Ensure we have all required fields
      // Use email as username for consistency
      const registrationData = {
        username: userData.email, // Always use email as username
        email: userData.email,
        name: userData.name,
        password: userData.password || 'default_password',
        role: userData.role || 'EMPLOYEE'
      };
      
      const response = await axios.post(`${API_BASE_URL}/register`, registrationData);
      
      console.log('Registration response:', response.data);
      
      return {
        success: true,
        message: response.data
      };
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle specific error cases
      if (error.response?.status === 409) {
        return {
          success: false,
          error: 'User already exists. Please try logging in instead or use a different email.'
        };
      } else if (error.response?.status === 400) {
        return {
          success: false,
          error: 'Invalid data provided. Please check your information and try again.'
        };
      } else if (error.response?.data?.message) {
        return {
          success: false,
          error: error.response.data.message
        };
      } else if (error.message) {
        return {
          success: false,
          error: error.message
        };
      } else {
        return {
          success: false,
          error: 'Registration failed. Please try again.'
        };
      }
    }
  }

  // Logout user
  logout() {
    this.clearUserData();
  }

  // Extract role from JWT token (simple implementation)
  extractRoleFromToken(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch (error) {
      console.error('Error extracting role from token:', error);
      return null;
    }
  }

  // Verify token validity
  async verifyToken() {
    if (!this.token) {
      return false;
    }

    try {
      // You can add a token verification endpoint in your backend
      // For now, we'll just check if token exists and is not expired
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      if (payload.exp < currentTime) {
        this.logout();
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Token verification error:', error);
      this.logout();
      return false;
    }
  }

  // Get authorization header for API requests
  getAuthHeader() {
    return this.token ? `Bearer ${this.token}` : null;
  }

  // Check if user can access a specific route
  canAccess(requiredRole) {
    if (!this.isAuthenticated()) {
      return false;
    }

    if (requiredRole === 'HR') {
      return this.isHR();
    }

    if (requiredRole === 'EMPLOYEE') {
      return this.isEmployee();
    }

    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(this.userRole);
    }

    return true;
  }

  // Redirect based on user role
  getRedirectPath() {
    if (!this.isAuthenticated()) {
      return '/loginpage';
    }

    if (this.isHR()) {
      return '/hradminpage';
    }

    return '/dashboard';
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
