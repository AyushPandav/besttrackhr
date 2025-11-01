import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function AddDelUsers() {
  const [show, setShow] = useState(false);
  const [userProfiles, setUserProfiles] = useState([]);
  const [error, setError] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    designation: "",
    phone: ""
  });

  // Fetch user profiles from localStorage on component mount
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem('userProfiles');
      if (storedUsers) {
        setUserProfiles(JSON.parse(storedUsers));
      }
    } catch (err) {
      setError('Failed to fetch user profiles from localStorage.');
      console.error('Error fetching user profiles:', err);
    }
  }, []);

  // Save user profiles to localStorage whenever userProfiles change
  useEffect(() => {
    try {
      localStorage.setItem('userProfiles', JSON.stringify(userProfiles));
    } catch (err) {
      setError('Failed to save user profiles to localStorage.');
      console.error('Error saving user profiles:', err);
    }
  }, [userProfiles]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newUserProfile = {
        id: Date.now(), // Use timestamp as a unique ID
        username: formData.username,
        designation: formData.designation,
        phone: formData.phone
      };
      setUserProfiles([...userProfiles, newUserProfile]);
      setFormData({ username: "", designation: "", phone: "" });
      setShow(false);
      setError(null);
    } catch (err) {
      setError('Failed to add user profile. Please try again.');
      console.error('Error adding user profile:', err);
    }
  };

  const handleDelete = (id) => {
    try {
      setUserProfiles(userProfiles.filter(user => user.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete user profile. Please try again.');
      console.error('Error deleting user profile:', err);
    }
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
          <div className="nav-item">
            <Link to="/hradmin/hradminpage">
              <i className="fas fa-chart-pie"></i>
              <span>Dashboard</span>
            </Link>
          </div>
          <div className="nav-item active">
            <Link to="/hradmin/addusers">
              <i className="fas fa-users"></i>
              <span>Add / Del Users</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/hradmin/arrangecalender">
              <i className="fas fa-calendar-alt"></i>
              <span>Arrange Calendar</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/hradmin/groupchat">
              <i className="fas fa-boxes"></i>
              <span>Group Chat</span>
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
            <button className="btn btn-primary" onClick={handleShow}>
              <i className="fas fa-plus"></i> Add New
            </button>
          </div>
        </div>

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
                    <Button variant="danger" onClick={() => handleDelete(user.id)}>
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
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
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