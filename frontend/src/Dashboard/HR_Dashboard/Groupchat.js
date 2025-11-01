import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Groupchat.css";

function Groupchat() {
  const [messages, setMessages] = useState([
    { id: 1, user: "HR", text: "Hello team, please update your status." },
    { id: 2, user: "John Doe", text: "I am present today." },
    { id: 3, user: "Jane Smith", text: "I will be late today." }
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      user: "You",
      text: newMessage
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
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
              <i className="fas fa-boxes"></i>
              <span>Arrange Calender</span>
            </Link>
          </div>
          <div className="nav-item active">
            <Link to="/hradmin/groupchat">
              <i className="fas fa-comments"></i>
              <span>Group Chat</span>
            </Link>
          </div>

          <div className="menu-heading">Reports</div>
          <div className="nav-item">
            <Link to="/hradmin/dailyattendance">
              <i className="fas fa-chart-line"></i>
              <span>Daily Attendance</span>
            </Link>
          </div>
          <div className="nav-item">
           <Link to="/hradmin/dailyreport">
              <i className="fas fa-chart-line"></i>
              <span>Daily Report</span>
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

      {/* Main Chat Content */}
      <div className="main-content">
        <div className="page-title">
          <div className="title">Group Chat</div>
        </div>

        <div className="chat-box">
          <div className="messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.user === "You" ? "sent" : "received"}`}
              >
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="chat-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>
              <i className="fas fa-paper-plane">Send</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Groupchat;
