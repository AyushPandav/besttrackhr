import React, { useState } from 'react';
import authService from '../services/authService';

const TestAuth = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message, type = 'info') => {
    setTestResults(prev => [...prev, { message, type, timestamp: new Date().toLocaleTimeString() }]);
  };

  const testRegistration = async () => {
    setLoading(true);
    addResult('Testing registration...', 'info');
    
    try {
      const testUser = {
        email: `test_${Date.now()}@example.com`,
        name: 'Test User',
        password: 'test123',
        role: 'EMPLOYEE'
      };
      
      const result = await authService.register(testUser);
      
      if (result.success) {
        addResult(`✅ Registration successful: ${result.message}`, 'success');
        return testUser;
      } else {
        if (result.error.includes('already exists')) {
          addResult(`⚠️ User already exists: ${result.error}`, 'warning');
          addResult(`💡 This is expected if you've run the test before. Trying login instead...`, 'info');
          // Try to login with the existing user
      const loginResult = await testLogin({
        username: testUser.email,
        password: testUser.password
      });
      return loginResult ? testUser : null;
        } else {
          addResult(`❌ Registration failed: ${result.error}`, 'error');
          return null;
        }
      }
    } catch (error) {
      addResult(`❌ Registration error: ${error.message}`, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async (user) => {
    setLoading(true);
    addResult('Testing login...', 'info');
    
    try {
      const result = await authService.login({
        username: user.username,
        password: user.password
      });
      
      if (result.success) {
        addResult(`✅ Login successful! Token: ${result.token.substring(0, 20)}...`, 'success');
        addResult(`✅ User role: ${result.role}`, 'success');
        return true;
      } else {
        addResult(`❌ Login failed: ${result.error}`, 'error');
        return false;
      }
    } catch (error) {
      addResult(`❌ Login error: ${error.message}`, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const testGoogleLogin = async () => {
    setLoading(true);
    addResult('Testing Google login simulation...', 'info');
    
    try {
      const result = await authService.googleLogin('fake_google_token', 'HR');
      
      if (result.success) {
        addResult(`✅ Google login successful! Token: ${result.token.substring(0, 20)}...`, 'success');
        addResult(`✅ User role: ${result.role}`, 'success');
      } else {
        addResult(`❌ Google login failed: ${result.error}`, 'error');
      }
    } catch (error) {
      addResult(`❌ Google login error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const runAllTests = async () => {
    setTestResults([]);
    addResult('🚀 Starting authentication tests...', 'info');
    
    // Test 1: Registration
    const user = await testRegistration();
    if (!user) return;
    
    // Test 2: Login
    const loginSuccess = await testLogin(user);
    if (!loginSuccess) return;
    
    // Test 3: Google Login
    await testGoogleLogin();
    
    addResult('🎉 All tests completed!', 'success');
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🔧 Authentication Test Panel</h2>
      <p>This panel helps debug authentication issues with the backend.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={runAllTests} 
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginRight: '10px'
          }}
        >
          {loading ? 'Testing...' : 'Run All Tests'}
        </button>
        
        <button 
          onClick={testGoogleLogin} 
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginRight: '10px'
          }}
        >
          Test Google Login
        </button>
        
        <button 
          onClick={clearResults}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Clear Results
        </button>
      </div>

      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '5px',
        maxHeight: '400px',
        overflowY: 'auto'
      }}>
        <h3>Test Results:</h3>
        {testResults.length === 0 ? (
          <p style={{ color: '#666' }}>No tests run yet. Click "Run All Tests" to start.</p>
        ) : (
          testResults.map((result, index) => (
            <div 
              key={index} 
              style={{ 
                marginBottom: '5px',
                padding: '5px',
                backgroundColor: result.type === 'error' ? '#ffebee' : 
                               result.type === 'success' ? '#e8f5e8' : 
                               result.type === 'warning' ? '#fff3cd' : '#e3f2fd',
                borderRadius: '3px',
                borderLeft: `4px solid ${
                  result.type === 'error' ? '#f44336' : 
                  result.type === 'success' ? '#4CAF50' : 
                  result.type === 'warning' ? '#ff9800' : '#2196F3'
                }`
              }}
            >
              <span style={{ fontSize: '12px', color: '#666' }}>[{result.timestamp}]</span> {result.message}
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
        <h4>💡 Troubleshooting Tips:</h4>
        <ul>
          <li>Make sure the backend is running on port 8080</li>
          <li>Check browser console for detailed error messages</li>
          <li>Verify database connection in backend logs</li>
          <li>Check CORS settings if you see network errors</li>
        </ul>
      </div>
    </div>
  );
};

export default TestAuth;
