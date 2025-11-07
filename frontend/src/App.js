import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
=======
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
import { Container } from '@mui/material';
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
<<<<<<< HEAD
import TestAuth from './components/TestAuth';
import AddCalender from './Dashboard/HR_Dashboard/AddCalender';
=======
import AddCalenders from './Dashboard/HR_Dashboard/AddCalender';
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
import Dailyattendance from './Dashboard/HR_Dashboard/Dailyattendance';
import Groupchat from './Dashboard/HR_Dashboard/Groupchat';
import Dailyreport from './Dashboard/HR_Dashboard/Dailyreport';
import Employeepage from './Dashboard/EmpDashboard/Employeepage';
<<<<<<< HEAD
import { jwtDecode } from 'jwt-decode';
import Aboutpage from './components/Aboutpage';
import EmpDailyReport from './Dashboard/EmpDashboard/EmpDailyReport';
import EmpTimer from './Dashboard/EmpDashboard/EmpTImer';
import EmpYearCalender from './Dashboard/EmpDashboard/EmpYearCalender';

// Protected Route component to check authentication and role
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    // Check if the user has the required role (if specified)
    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  } catch (error) {
    // Invalid token, redirect to login
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
};
=======
import About from './Basicpages/About';
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d

const AppContent = () => {
  const location = useLocation();

  // Pages where Navbar & Footer should be hidden
<<<<<<< HEAD
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
=======
  const hideLayout = ["/loginpage", "/registerpage", "/hradmin/hradminpage", "/hradmin/addusers", "/hradmin/arrangecalender", "/hradmin/dailyattendance", "/hradmin/groupchat", "/hradmin/dailyreport", "/employee/emppage"].includes(location.pathname);
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d

  return (
    <>
      {!hideLayout && <Navbar />}
      <Container>
        <Routes>
          <Route path="/" element={<LandingPage />} />
<<<<<<< HEAD
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loginpage" element={<Loginpage />} />
          <Route path="/registerpage" element={<RegisterPage />} />
          <Route path="/verify-username" element={<VerifyUsername />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/test-auth" element={<TestAuth />} />
          <Route path="/about" element={<Aboutpage/>}/>
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/employees"
            element={<ProtectedRoute><EmployeeList /></ProtectedRoute>}
          />
          <Route
            path="/add-employee"
            element={<ProtectedRoute><EmployeeForm /></ProtectedRoute>}
          />
          <Route
            path="/edit-employee/:id"
            element={<ProtectedRoute><EmployeeForm /></ProtectedRoute>}
          />
          <Route
            path="/departments"
            element={<ProtectedRoute><DepartmentList /></ProtectedRoute>}
          />
          <Route
            path="/add-department"
            element={<ProtectedRoute><DepartmentForm /></ProtectedRoute>}
          />
          <Route
            path="/edit-department/:id"
            element={<ProtectedRoute><DepartmentForm /></ProtectedRoute>}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute><Profile /></ProtectedRoute>}
          />
          <Route
            path="/employee/emppage"
            element={<ProtectedRoute><Employeepage /></ProtectedRoute>}
          />
          <Route
            path="/employee/empcalender"
            element={<ProtectedRoute><EmpYearCalender /></ProtectedRoute>}
          />
          
          {/* HR-specific Protected Routes */}
          <Route
            path="/hradmin/hradminpage"
            element={
              <ProtectedRoute requiredRole="HR">
                <Hrhomepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hradmin/addusers"
            element={
              <ProtectedRoute requiredRole="HR">
                <AddDelUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hradmin/arrangecalender"
            element={
              <ProtectedRoute requiredRole="HR">
                <AddCalender />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hradmin/dailyattendance"
            element={
              <ProtectedRoute requiredRole="HR">
                <Dailyattendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hradmin/groupchat"
            element={
              <ProtectedRoute requiredRole="HR">
                <Groupchat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hradmin/dailyreport"
            element={
              <ProtectedRoute requiredRole="HR">
                <Dailyreport />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee/empdailyreport"
            element={
              <ProtectedRoute>
                <EmpDailyReport/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee/emptimer"
            element={
              <ProtectedRoute>
                <EmpTimer/>
              </ProtectedRoute>
            }
          />
          
          {/* Deprecated Routes (optional: remove if not needed) */}
          <Route
            path="/hradminpage"
            element={
              <ProtectedRoute requiredRole="HR">
                <Navigate to="/hradmin/hradminpage" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addusers"
            element={
              <ProtectedRoute requiredRole="HR">
                <Navigate to="/hradmin/addusers" replace />
              </ProtectedRoute>
            }
          />
          
=======

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/add-employee" element={<EmployeeForm />} />
          <Route path="/edit-employee/:id" element={<EmployeeForm />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/add-department" element={<DepartmentForm />} />
          <Route path="/edit-department/:id" element={<DepartmentForm />} />
          <Route path="/verify-username" element={<VerifyUsername />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loginpage" element={<Loginpage />} />

          <Route path="/about-us" element={<About/>} />
          <Route path="/registerpage" element={<RegisterPage/>} />
          <Route path="/hradmin/hradminpage" element={<Hrhomepage/>} />
          <Route path='/hradmin/addusers' element={<AddDelUsers/>}  />
          <Route path='/hradmin/arrangecalender' element={<AddCalenders/>}  />
          <Route path="/hradmin/dailyattendance" element={<Dailyattendance/>} />
          <Route path="/hradmin/groupchat" element={<Groupchat/>} />
          <Route path="/hradmin/dailyreport" element={<Dailyreport/>} />
          <Route path="/employee/emppage" element={<Employeepage/>} />
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
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

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
