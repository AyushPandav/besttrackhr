import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

const AppContent = () => {
  const location = useLocation();

  // Pages where Navbar & Footer should be hidden
  const hideLayout = ["/loginpage", "/registerpage", "/hradminpage", "/addusers"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <Container>
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
          <Route path="/registerpage" element={<RegisterPage/>} />
          <Route path="/hradminpage" element={<Hrhomepage/>} />
          <Route path='/addusers' element={<AddDelUsers/>}  />
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
