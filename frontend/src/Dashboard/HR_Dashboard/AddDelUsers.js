import { Link } from "react-router-dom";
<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function AddDelUsers() {
  const [show, setShow] = useState(false);
  const [userProfiles, setUserProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [backendUp, setBackendUp] = useState(false); // ✅ Check backend

  const SPRINGBOOT_URL = "https://6908882f2d902d0651b0b8b2.mockapi.io/mysql-server-localhost/users";
  const SPRING_BOOT_URL = "http://localhost:8080"; // Replace with your ping endpoint
=======
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function AddDelUsers() {
  const [show, setShow] = useState(false);
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    designation: "",
    phone: ""
  });

<<<<<<< HEAD
  // 🧪 Check if Spring Boot server is running
  const checkBackend = async () => {
    try {
      await axios.get(SPRING_BOOT_URL);
      setBackendUp(true);
      setError(null);
    } catch (err) {
      setBackendUp(false);
      setError("Spring Boot backend is not running.");
    }
  };

  // Check backend initially and retry every 5 seconds
  useEffect(() => {
    checkBackend();
    const interval = setInterval(checkBackend, 5000); // retry every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // 🧠 Fetch all users from MockAPI only if backend is up
  useEffect(() => {
    if (!backendUp) return;

    axios.get(SPRINGBOOT_URL)
      .then((res) => setUserProfiles(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch user profiles from MockAPI.");
      });
  }, [backendUp]);

  // 🖊️ Handle input change
=======
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

<<<<<<< HEAD
  // ➕ Add user (POST request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!backendUp) {
      setError("Cannot add user: Spring Boot backend is not running.");
      return;
    }

    try {
      const res = await axios.post(SPRINGBOOT_URL, formData);
      setUserProfiles([...userProfiles, res.data]);
      setFormData({ username: "", designation: "", phone: "" });
      setShow(false);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to add user to MockAPI.");
    }
  };

  // ❌ Delete user (DELETE request)
  const handleDelete = async (id) => {
    if (!backendUp) {
      setError("Cannot delete user: Spring Boot backend is not running.");
      return;
    }

    try {
      await axios.delete(`${SPRINGBOOT_URL}/${id}`);
      setUserProfiles(userProfiles.filter((user) => user.id !== id));
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to delete user from MockAPI.");
    }
=======
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", formData);
    // 👉 Here you can call API or update state with new user
    setShow(false);
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
  };

  return (
    <div className="containers">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h1>HR<span>Panel</span></h1>
        </div>
        <div className="nav-menu">
          <div className="menu-heading">Main</div>
<<<<<<< HEAD
          <div className="nav-item">
=======
          <div className="nav-item active">
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
            <Link to="/hradmin/hradminpage">
              <i className="fas fa-chart-pie"></i>
              <span>Dashboard</span>
            </Link>
          </div>
<<<<<<< HEAD
          <div className="nav-item active">
            <Link to="/hradmin/addusers">
=======
          <div className="nav-item">
            <Link to="/hradmin/addusers" >
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
              <i className="fas fa-users"></i>
              <span>Add / Del Users</span>
            </Link>
          </div>
          <div className="nav-item">
<<<<<<< HEAD
            <Link to="/hradmin/arrangecalender">
              <i className="fas fa-calendar-alt"></i>
              <span>Arrange Calendar</span>
            </Link>
          </div>
          <div className="menu-heading">Reports</div>
          <div className="nav-item">
            <Link to="/hradmin/dailyattendance">
              <i className="fas fa-boxes"></i>
              <span>Daily Attendance</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/hradmin/dailyreport">
              <i className="fas fa-boxes"></i>
              <span>Daily Reports</span>
            </Link>
=======
            <Link to="/hradmin/arrangecalender" >
              <i className="fas fa-boxes"></i>
              <span>Arrange Calender</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/hradmin/groupchat" >
              <i className="fas fa-boxes"></i>
              <span>Group Chat</span>
            </Link>
          </div>

          <div className="menu-heading">Reports</div>
          <div className="nav-item active">
                      <Link to="/hradmin/dailyattendance">
                        <i className="fas fa-boxes"></i>
                        <span>Daily Attendance</span>
                      </Link>
                    </div>
                    <div className="nav-item">
                      <Link to="/hradmin/dailyreport">
                        <i className="fas fa-boxes"></i>
                        <span>Daily Reports</span>
                      </Link>
                    </div>

          <div className="menu-heading">Admin</div>
          <div className="nav-item">
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </div>
          <div className="nav-item">
            <i className="fas fa-bell"></i>
            <span>Notifications</span>
          </div>
          <div className="nav-item">
            <i className="fas fa-shield-alt"></i>
            <span>Security</span>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="header">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search..." />
        </div>
        <div className="header-actions">
          <div className="notification">
            <i className="fas fa-bell"></i>
            <div className="badge">3</div>
          </div>
          <div className="notification">
            <i className="fas fa-envelope"></i>
            <div className="badge">5</div>
          </div>
          <div className="user-profile">
            <div className="profile-img">JD</div>
            <div className="user-info">
              <div className="user-name">HR</div>
              <div className="user-role">Administrator</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="page-title">
          <div className="title">Users Table</div>
          <div className="action-buttons">
            <button className="btn btn-outline">
              <i className="fas fa-download"></i> Users
            </button>
<<<<<<< HEAD
            <button className="btn btn-primary" onClick={handleShow} disabled={!backendUp}>
=======
            <button className="btn btn-primary" onClick={handleShow}>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
              <i className="fas fa-plus"></i> Add New
            </button>
          </div>
        </div>

<<<<<<< HEAD
        {/* Error Message */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* User Profiles Table */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Designation</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userProfiles.length > 0 ? (
              userProfiles.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.designation}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(user.id)} disabled={!backendUp}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No user profiles found</td>
              </tr>
            )}
          </tbody>
        </Table>

=======
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
        {/* Modal with Form */}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New User</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter user name"
                  required
<<<<<<< HEAD
                  disabled={!backendUp}
=======
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="Enter designation"
                  required
<<<<<<< HEAD
                  disabled={!backendUp}
=======
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
<<<<<<< HEAD
                  disabled={!backendUp}
=======
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
<<<<<<< HEAD
              <Button variant="secondary" onClick={handleClose} disabled={!backendUp}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={!backendUp}>
=======
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
                Save User
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default AddDelUsers;
