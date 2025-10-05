
import { Link } from "react-router-dom";
import React, { useState } from "react";

function AddCalenders() {
const [date, setDate] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Date:", date);
    console.log("Entered Text:", text);
    alert(`Date: ${date} | Text: ${text}`);
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
            <button className="btn btn-primary">
              <i className="fas fa-plus"></i> Add New
            </button>
          </div>
        </div>

        {/* Stats Cards */}

        <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h2 className="card-title text-center mb-4">Add a Calender</h2>

            {/* Bootstrap inline form */}
            <form className="row g-2 align-items-center" onSubmit={handleSubmit}>
              {/* Date input */}
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control"
                  id="dateInput"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              {/* Text input */}
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  id="textInput"
                  placeholder="Type something here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                />
              </div>

              {/* Submit button */}
              <div className="col-md-3 d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
        

        {/* Recent Orders */}
        
      </div>
    </div>
  )
}

export default AddCalenders