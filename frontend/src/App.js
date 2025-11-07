import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import DepartmentList from './components/DepartmentList';
import DepartmentForm from './components/DepartmentForm';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import VerifyUsername from './components/VerifyUsername';
import NotFoundPage from './components/NotFoundPage';
import Loginpage from './components/Loginpage';
import RegisterPage from './components/Registerpage';
import Hrhomepage from './Dashboard/HR_Dashboard/Hrhomepage';
import AddDelUsers from './Dashboard/HR_Dashboard/AddDelUsers';
import AddCalender from './Dashboard/HR_Dashboard/AddCalender';
import Dailyattendance from './Dashboard/HR_Dashboard/Dailyattendance';
import Groupchat from './Dashboard/HR_Dashboard/Groupchat';
import Dailyreport from './Dashboard/HR_Dashboard/Dailyreport';
import Employeepage from './Dashboard/EmpDashboard/Employeepage';
import Aboutpage from './components/Aboutpage';
import EmpDailyReport from './Dashboard/EmpDashboard/EmpDailyReport';
import EmpTimer from './Dashboard/EmpDashboard/EmpTImer';
import EmpYearCalender from './Dashboard/EmpDashboard/EmpYearCalender';
import TestAuth from './components/TestAuth';

// ✅ Protected Route
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    // Check for required role
    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  } catch (error) {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
};

const AppContent = () => {
  const location = useLocation();

  // Hide navbar/footer for specific pages
  const hideLayout = [
    "/loginpage",
    "/registerpage",
    "/hradminpage",
    "/addusers",
    "/test-auth",
    "/hradmin/hradminpage",
    "/hradmin/addusers",
    "/hradmin/arrangecalender",
    "/hradmin/dailyattendance",
    "/hradmin/groupchat",
    "/hradmin/dailyreport",
    "/employee/emppage",
    "/employee/empdailyreport",
    "/employee/calender",
    "/employee/worktimer",
    "/employee/emptimer",
    "/employee/empcalender"
  ].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <Container>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loginpage" element={<Loginpage />} />
          <Route path="/registerpage" element={<RegisterPage />} />
          <Route path="/verify-username" element={<VerifyUsername />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/test-auth" element={<TestAuth />} />
          <Route path="/about" element={<Aboutpage />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/employees" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
          <Route path="/add-employee" element={<ProtectedRoute><EmployeeForm /></ProtectedRoute>} />
          <Route path="/edit-employee/:id" element={<ProtectedRoute><EmployeeForm /></ProtectedRoute>} />
          <Route path="/departments" element={<ProtectedRoute><DepartmentList /></ProtectedRoute>} />
          <Route path="/add-department" element={<ProtectedRoute><DepartmentForm /></ProtectedRoute>} />
          <Route path="/edit-department/:id" element={<ProtectedRoute><DepartmentForm /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Employee Routes */}
          <Route path="/employee/emppage" element={<ProtectedRoute><Employeepage /></ProtectedRoute>} />
          <Route path="/employee/empdailyreport" element={<ProtectedRoute><EmpDailyReport /></ProtectedRoute>} />
          <Route path="/employee/emptimer" element={<ProtectedRoute><EmpTimer /></ProtectedRoute>} />
          <Route path="/employee/empcalender" element={<ProtectedRoute><EmpYearCalender /></ProtectedRoute>} />

          {/* HR Routes */}
          <Route path="/hradmin/hradminpage" element={<ProtectedRoute requiredRole="HR"><Hrhomepage /></ProtectedRoute>} />
          <Route path="/hradmin/addusers" element={<ProtectedRoute requiredRole="HR"><AddDelUsers /></ProtectedRoute>} />
          <Route path="/hradmin/arrangecalender" element={<ProtectedRoute requiredRole="HR"><AddCalender /></ProtectedRoute>} />
          <Route path="/hradmin/dailyattendance" element={<ProtectedRoute requiredRole="HR"><Dailyattendance /></ProtectedRoute>} />
          <Route path="/hradmin/groupchat" element={<ProtectedRoute requiredRole="HR"><Groupchat /></ProtectedRoute>} />
          <Route path="/hradmin/dailyreport" element={<ProtectedRoute requiredRole="HR"><Dailyreport /></ProtectedRoute>} />

          {/* Redirect old HR routes */}
          <Route path="/hradminpage" element={<Navigate to="/hradmin/hradminpage" replace />} />
          <Route path="/addusers" element={<Navigate to="/hradmin/addusers" replace />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
