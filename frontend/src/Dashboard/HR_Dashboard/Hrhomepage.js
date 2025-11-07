<<<<<<< HEAD
import React from 'react';
=======
import React from 'react'
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
import "./Hrhomepage.css";
import { Link } from "react-router-dom";

function Hrhomepage() {
  return (
    <div className="containers">
      {/* Sidebar */}
      <div className="sidebar">
<<<<<<< HEAD
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
                <div className="nav-item active">
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
                </div>                
              </div>
            </div>
=======
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
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d

      {/* Header */}
      <div className="header">
        <div className="search-bar">
          <i className="fas fa-search"></i>
<<<<<<< HEAD
          <input type="text" placeholder="Search Employees..." />
=======
          <input type="text" placeholder="Search..." />
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
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
<<<<<<< HEAD
            <div className="profile-img">HR</div>
            <div className="user-info">
              <div className="user-name">HR Admin</div>
=======
            <div className="profile-img">JD</div>
            <div className="user-info">
              <div className="user-name">HR</div>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
              <div className="user-role">Administrator</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="page-title">
<<<<<<< HEAD
          <div className="title">Employee Dashboard</div>
          <div className="action-buttons">
            <button className="btn btn-outline">
              <i className="fas fa-download"></i> Export Data
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-user-plus"></i> Add Employee
=======
          <div className="title">Dashboard</div>
          <div className="action-buttons">
            <button className="btn btn-outline">
              <i className="fas fa-download"></i> Export
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-plus"></i> Add New
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="stat-card">
            <div className="card-header">
              <div>
                <div className="card-value">1,504</div>
<<<<<<< HEAD
                <div className="card-label">Total Employees</div>
=======
                <div className="card-label">Total Users</div>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
              </div>
              <div className="card-icon purple">
                <i className="fas fa-users"></i>
              </div>
            </div>
            <div className="card-change positive">
              <i className="fas fa-arrow-up"></i>
              <span>12.5% from last month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="card-header">
              <div>
<<<<<<< HEAD
                <div className="card-value">45</div>
                <div className="card-label">Leave Requests</div>
              </div>
              <div className="card-icon blue">
                <i className="fas fa-umbrella-beach"></i>
=======
                <div className="card-value">$12,750</div>
                <div className="card-label">Total Revenue</div>
              </div>
              <div className="card-icon blue">
                <i className="fas fa-dollar-sign"></i>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
              </div>
            </div>
            <div className="card-change positive">
              <i className="fas fa-arrow-up"></i>
              <span>8.2% from last month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="card-header">
              <div>
                <div className="card-value">324</div>
<<<<<<< HEAD
                <div className="card-label">Pending Tasks</div>
              </div>
              <div className="card-icon green">
                <i className="fas fa-tasks"></i>
=======
                <div className="card-label">Total Orders</div>
              </div>
              <div className="card-icon green">
                <i className="fas fa-shopping-cart"></i>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
              </div>
            </div>
            <div className="card-change negative">
              <i className="fas fa-arrow-down"></i>
              <span>3.1% from last month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="card-header">
              <div>
<<<<<<< HEAD
                <div className="card-value">92%</div>
                <div className="card-label">Engagement Rate</div>
              </div>
              <div className="card-icon orange">
                <i className="fas fa-chart-bar"></i>
=======
                <div className="card-value">85%</div>
                <div className="card-label">Conversion Rate</div>
              </div>
              <div className="card-icon orange">
                <i className="fas fa-chart-line"></i>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
              </div>
            </div>
            <div className="card-change positive">
              <i className="fas fa-arrow-up"></i>
              <span>4.6% from last month</span>
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Recent Employee Tasks */}
        <div className="table-card">
          <div className="card-title">
            <h3><i className="fas fa-tasks"></i> Recent Employee Tasks</h3>
=======
        {/* Recent Orders */}
        <div className="table-card">
          <div className="card-title">
            <h3><i className="fas fa-shopping-bag"></i> Recent Orders</h3>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
            <button className="btn btn-outline btn-sm">
              <i className="fas fa-eye"></i> View All
            </button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
<<<<<<< HEAD
                <th>Task ID</th>
                <th>Employee</th>
                <th>Date</th>
                <th>Department</th>
=======
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
<<<<<<< HEAD
                <td>#TSK-001</td>
                <td>Tanish Jaiswal</td>
                <td>15 Mar 2025</td>
                <td>Engineering</td>
=======
                <td>#ORD-001</td>
                <td>John Smith</td>
                <td>15 Mar 2025</td>
                <td>$125.00</td>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
                <td>
                  <span className="status active">
                    <i className="fas fa-check-circle"></i> Completed
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm">
                    <i className="fas fa-eye"></i> View
                  </button>
                </td>
              </tr>
              <tr>
<<<<<<< HEAD
                <td>#TSK-002</td>
                <td>Maaz Mukadam</td>
                <td>14 Mar 2025</td>
                <td>Marketing</td>
=======
                <td>#ORD-002</td>
                <td>Emma Johnson</td>
                <td>14 Mar 2025</td>
                <td>$245.99</td>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
                <td>
                  <span className="status pending">
                    <i className="fas fa-clock"></i> Pending
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm">
                    <i className="fas fa-eye"></i> View
                  </button>
                </td>
              </tr>
              <tr>
<<<<<<< HEAD
                <td>#TSK-003</td>
                <td>Piyush Patil</td>
                <td>13 Mar 2025</td>
                <td>Sales</td>
=======
                <td>#ORD-003</td>
                <td>Michael Brown</td>
                <td>13 Mar 2025</td>
                <td>$79.50</td>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
                <td>
                  <span className="status active">
                    <i className="fas fa-check-circle"></i> Completed
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm">
                    <i className="fas fa-eye"></i> View
                  </button>
                </td>
              </tr>
              <tr>
<<<<<<< HEAD
                <td>#TSK-004</td>
                <td>Ayush Pandav</td>
                <td>12 Mar 2025</td>
                <td>HR</td>
=======
                <td>#ORD-004</td>
                <td>Sarah Davis</td>
                <td>12 Mar 2025</td>
                <td>$350.00</td>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
                <td>
                  <span className="status cancelled">
                    <i className="fas fa-times-circle"></i> Cancelled
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm">
                    <i className="fas fa-eye"></i> View
                  </button>
                </td>
              </tr>
              <tr>
<<<<<<< HEAD
                <td>#TSK-005</td>
                <td>Sai Raj Lad</td>
                <td>11 Mar 2025</td>
                <td>Finance</td>
=======
                <td>#ORD-005</td>
                <td>David Wilson</td>
                <td>11 Mar 2025</td>
                <td>$185.25</td>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
                <td>
                  <span className="status active">
                    <i className="fas fa-check-circle"></i> Completed
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm">
                    <i className="fas fa-eye"></i> View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
<<<<<<< HEAD
  );
}

export default Hrhomepage;
=======
  )
}

export default Hrhomepage
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
