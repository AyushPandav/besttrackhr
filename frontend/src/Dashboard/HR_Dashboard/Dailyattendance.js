import { Link } from "react-router-dom";
<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import axios from "axios";

const WORK_TIMER_URL = "https://6908f1ab2d902d0651b237fc.mockapi.io/Work-timer";

function Dailyattendance() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);

  // Fetch work timer records
  const fetchRecords = async () => {
    try {
      const response = await axios.get(WORK_TIMER_URL);
      setRecords(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching work timer records:", err);
      setError("Failed to fetch work timer records.");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`${WORK_TIMER_URL}/${id}`);
      alert("Record deleted successfully!");
      fetchRecords();
    } catch (err) {
      console.error("Error deleting record:", err);
      alert("Failed to delete record.");
    }
=======
import React, { useState } from "react";

function Dailyattendance() {
  // Example static data
  const [attendance, setAttendance] = useState([
    { id: 1, name: "John Doe", designation: "Software Engineer", status: "Present" },
    { id: 2, name: "Jane Smith", designation: "UI/UX Designer", status: "Absent" },
    { id: 3, name: "Mike Johnson", designation: "HR Manager", status: "Present" },
    { id: 4, name: "Emily Davis", designation: "Intern", status: "Late" }
  ]);

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setAttendance((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, status: newStatus } : emp
      )
    );
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
          <div className="nav-item">
            <Link to="/hradmin/hradminpage">
              <i className="fas fa-chart-pie"></i>
              <span>Dashboard</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/hradmin/addusers">
              <i className="fas fa-users"></i>
              <span>Add / Del Users</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/hradmin/arrangecalender">
<<<<<<< HEAD
              <i className="fas fa-calendar-alt"></i>
              <span>Arrange Calendar</span>
            </Link>
          </div>
          <div className="menu-heading">Reports</div>
          <div className="nav-item active">
            <Link to="/hradmin/dailyattendance">
              <i className="fas fa-check-circle"></i>
=======
              <i className="fas fa-boxes"></i>
              <span>Arrange Calender</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/hradmin/groupchat">
              <i className="fas fa-boxes"></i>
              <span>Group Chat</span>
            </Link>
          </div>

          <div className="menu-heading">Reports</div>
          <div className="nav-item active">
            <Link to="/hradmin/dailyattendance">
              <i className="fas fa-boxes"></i>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
              <span>Daily Attendance</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/hradmin/dailyreport">
              <i className="fas fa-boxes"></i>
              <span>Daily Reports</span>
            </Link>
          </div>
<<<<<<< HEAD
=======

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
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
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
<<<<<<< HEAD
          <div className="title">Work Timer Records</div>
        </div>

        <div className="attendance-table">
          {error && <div className="alert alert-danger">{error}</div>}
          {records.length === 0 ? (
            <p>No work timer records found.</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Worked Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>{record.id}</td>
                    <td>{record.name}</td>
                    <td>{record.workedTime}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(record.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
=======
          <div className="title">Daily Attendance</div>
          <div className="action-buttons">
            <button className="btn btn-outline">
              <i className="fas fa-download"></i> Export
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-plus"></i> Mark Attendance
            </button>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="attendance-table">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.designation}</td>
                  <td>
                    <select
                      className="form-select"
                      value={emp.status}
                      onChange={(e) =>
                        handleStatusChange(emp.id, e.target.value)
                      }
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Late">Late</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
        </div>
      </div>
    </div>
  );
}

export default Dailyattendance;
