import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function AddCalender() {
  const [date, setDate] = useState("");
  const [text, setText] = useState("");
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [backendUp, setBackendUp] = useState(false); // ✅ Check backend

  const SPRINGBOOT_URL =
    "https://6908882f2d902d0651b0b8b2.mockapi.io/mysql-server-localhost/AddCalender";
  const SPRING_BOOT_URL = "http://localhost:8080"; // Replace with your ping endpoint

  // 🧪 Check if Spring Boot server is running
  const checkBackend = async () => {
    try {
      await axios.get(SPRING_BOOT_URL);
      setBackendUp(true);
      setError(null);
    } catch (err) {
      setBackendUp(false);
      setError("Spring Boot backend is not running. MockAPI actions disabled.");
    }
  };

  // Check backend initially and retry every 5 seconds
  useEffect(() => {
    checkBackend();
    const interval = setInterval(checkBackend, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🧠 Load events from MockAPI only if backend is up
  const loadEvents = async () => {
    if (!backendUp) return;
    try {
      const res = await axios.get(SPRINGBOOT_URL);
      setEvents(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch events from Backend.");
    }
  };

  useEffect(() => {
    loadEvents();
  }, [backendUp]);

  // Handle form submission to add a new event
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!backendUp) {
      setError("Cannot add event: Spring Boot backend is not running.");
      return;
    }

    try {
      const newEvent = {
        date,
        description: text,
      };
      const res = await axios.post(SPRINGBOOT_URL, newEvent);
      setEvents([...events, res.data]);
      setDate("");
      setText("");
      setError(null);
      alert("Event added successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to add event to MockAPI.");
    }
  };

  // Handle event deletion
  const handleDelete = async (id) => {
    if (!backendUp) {
      setError("Cannot delete event: Spring Boot backend is not running.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`${SPRINGBOOT_URL}/${id}`);
        setEvents(events.filter((event) => event.id !== id));
        setError(null);
        alert("Event deleted successfully!");
      } catch (err) {
        console.error(err);
        setError("Failed to delete event from Spring Boot.");
      }
    }
  };

  return (
    <div className="containers">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
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
          <div className="title">Arrange Calendar</div>
        </div>

        {/* Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Add Event Form */}
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4">
                  Add Calendar Event
                </h2>
                <form
                  className="row g-2 align-items-center"
                  onSubmit={handleSubmit}
                >
                  <div className="col-md-4">
                    <input
                      type="date"
                      className="form-control"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      disabled={!backendUp}
                    />
                  </div>
                  <div className="col-md-5">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter event description (e.g., Holiday)"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      required
                      disabled={!backendUp}
                    />
                  </div>
                  <div className="col-md-3 d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={!backendUp}
                    >
                      Add Event
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Events Table */}
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="card-title">Calendar Events</h2>
                {events.length === 0 ? (
                  <p>No events found.</p>
                ) : (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event) => (
                        <tr key={event.id}>
                          <td>{event.date}</td>
                          <td>{event.description}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(event.id)}
                              disabled={!backendUp}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCalender;
