<<<<<<< HEAD
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Dailyreport() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const SPRING_BOOT_URL = "https://6908f1ab2d902d0651b237fc.mockapi.io/daily-report"; // Using your mock API

  // Fetch reports from MockAPI
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(SPRING_BOOT_URL);
        if (!response.ok) throw new Error("Failed to fetch reports");
        const data = await response.json();
        setReports(data);
      } catch (err) {
        setError("Failed to fetch reports. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);
=======

import { Link } from "react-router-dom";
import React, { useState } from "react";

function Dailyreport() {
const [date, setDate] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Date:", date);
    console.log("Entered Text:", text);
    alert(`Date: ${date} | Text: ${text}`);
  };
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d

  return (
    <div className="containers">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
<<<<<<< HEAD
          <h1>
            HR<span>Panel</span>
          </h1>
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
              <i className="fas fa-boxes"></i>
              <span>Arrange Calender</span>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/hradmin/dailyattendance">
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
          <div className="nav-item active">
            <Link to="/hradmin/dailyreport">
              <i className="fas fa-boxes"></i>
              <span>Daily Reports</span>
            </Link>
=======
          <h1>HR<span>Panel</span></h1>
        </div>
        <div className="nav-menu">
          <div className="menu-heading">Main</div>
          <div className="nav-item active">
                      <Link to="/hradmin/hradminpage">
                                <i className="fas fa-chart-pie"></i>
                                <span>Dashboard</span>
                              </Link>
                    </div>
                    <div className="nav-item">
                      <Link to="/hradmin/addusers" >
                                <i className="fas fa-users"></i>
                                <span>Add / Del Users</span>
                              </Link>
                    </div>
                    <div className="nav-item">
                      <Link to="/hradmin/arrangecalender" >
                                <i className="fas fa-boxes"></i>
                                <span>Arrange Calender</span>
                              </Link>
                    </div>
                    <div className="nav-item">
                      <Link to="/hradmin/dailyattendance" >
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
          <div className="title">Daily Reports</div>
          <div className="action-buttons">
            <button className="btn btn-outline">
              <i className="fas fa-download"></i> Users
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-plus"></i> Add New
            </button>
          </div>
        </div>

<<<<<<< HEAD
        {/* Daily Reports Table */}
        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h2 className="card-title mb-3">Employee Daily Reports</h2>

            {loading && <p>Loading reports...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && reports.length === 0 && <p>No reports found.</p>}

            {!loading && reports.length > 0 && (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Task</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.name}</td>
                      <td>{report.email}</td>
                      <td>{report.task}</td>
                      <td>{report.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dailyreport;
=======
        {/* Stats Cards */}

        

        {/* Recent Orders */}
        
      </div>
    </div>
  )
}

export default Dailyreport
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
