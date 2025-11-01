import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function AddCalender() {
  const [date, setDate] = useState("");
  const [text, setText] = useState("");
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  // Function to load events from localStorage
  const loadEvents = () => {
    try {
      const storedEvents = localStorage.getItem("calendarEvents");
      const lastUpdated = localStorage.getItem("calendarEventsLastUpdated");
      const now = Date.now();
      const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds

      if (storedEvents && lastUpdated && now - parseInt(lastUpdated, 10) <= thirtyMinutes) {
        setEvents(JSON.parse(storedEvents));
      } else {
        localStorage.removeItem("calendarEvents");
        localStorage.removeItem("calendarEventsLastUpdated");
        setEvents([]);
      }
    } catch (err) {
      setError("Failed to fetch calendar events. Please try again.");
      console.error(err);
    }
  };

  // Load events on mount
  useEffect(() => {
    loadEvents();
  }, []);

  // Save events to localStorage and update timestamp whenever events change
  useEffect(() => {
    try {
      localStorage.setItem("calendarEvents", JSON.stringify(events));
      localStorage.setItem("calendarEventsLastUpdated", Date.now().toString());
    } catch (err) {
      setError("Failed to save events to localStorage.");
      console.error(err);
    }
  }, [events]);

  // Listen for storage changes (for real-time updates)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "calendarEvents" || e.key === "calendarEventsLastUpdated") {
        loadEvents();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Handle form submission to add a new event
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newEvent = {
        id: Date.now(),
        date,
        description: text,
      };
      setEvents([...events, newEvent]);
      setDate("");
      setText("");
      alert("Event added successfully!");
    } catch (err) {
      setError("Failed to add event. Please try again.");
      console.error(err);
    }
  };

  // Handle event deletion
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        setEvents(events.filter((event) => event.id !== id));
        alert("Event deleted successfully!");
      } catch (err) {
        setError("Failed to delete event. Please try again.");
        console.error(err);
      }
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
          <div className="title">Arrange Calendar</div>
          <div className="action-buttons">
            <button className="btn btn-outline">
              <i className="fas fa-download"></i> Export Events
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-plus"></i> Add New Event
            </button>
          </div>
        </div>

        {/* Add Event Form */}
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4">Add Calendar Event</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form className="row g-2 align-items-center" onSubmit={handleSubmit}>
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
                  <div className="col-md-5">
                    <input
                      type="text"
                      className="form-control"
                      id="textInput"
                      placeholder="Enter event description (e.g., Holiday)"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-3 d-grid">
                    <button type="submit" className="btn btn-primary">
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