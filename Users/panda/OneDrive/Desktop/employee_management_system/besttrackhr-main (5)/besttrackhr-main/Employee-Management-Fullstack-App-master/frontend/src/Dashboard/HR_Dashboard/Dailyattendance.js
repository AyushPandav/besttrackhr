import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Dailyattendance() {
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState(null);

  // Fetch users and attendance on mount and when date changes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/attendance/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users. Please try again.");
        console.error(err);
      }
    };

    const fetchAttendance = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8080/api/attendance?date=${selectedDate}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAttendance(response.data);
      } catch (err) {
        setError("Failed to fetch attendance. Please try again.");
        console.error(err);
      }
    };

    fetchUsers();
    fetchAttendance();
  }, [selectedDate]);

  // Handle status change
  const handleStatusChange = async (userId, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/attendance/hr",
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId, date: selectedDate, status },
        }
      );
      setAttendance((prev) =>
        prev.some((att) => att.user.id === userId && att.date === selectedDate)
          ? prev.map((att) =>
              att.user.id === userId && att.date === selectedDate ? response.data : att
            )
          : [...prev, response.data]
      );
      alert("Attendance updated successfully!");
    } catch (err) {
      setError("Failed to update attendance. Please try again.");
      console.error(err);
    }
  };

  // Merge users and attendance data
  const mergedData = users.map((user) => {
    const att = attendance.find((a) => a.user.id === user.id && a.date === selectedDate);
    return {
      id: user.id,
      name: user.name,
      designation: user.role === "HR" ? "HR Manager" : "Employee",
      status: att ? att.status : "Not Marked",
    };
  });

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
          <div className="nav-item active">
            <Link to="/hradmin/dailyattendance">
              <i className="fas fa-check-circle"></i>
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

        {/* Date Picker */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="dateInput" className="form-label">Select Date</label>
            <input
              type="date"
              className="form-control"
              id="dateInput"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

        {/* Attendance Table */}
        <div className="attendance-table">
          {error && <div className="alert alert-danger">{error}</div>}
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
              {mergedData.length === 0 ? (
                <tr>
                  <td colSpan="4">No users found.</td>
                </tr>
              ) : (
                mergedData.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.designation}</td>
                    <td>
                      <select
                        className="form-select"
                        value={emp.status}
                        onChange={(e) => handleStatusChange(emp.id, e.target.value)}
                        disabled={localStorage.getItem("role") !== "HR"}
                      >
                        <option value="Not Marked">Not Marked</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dailyattendance;