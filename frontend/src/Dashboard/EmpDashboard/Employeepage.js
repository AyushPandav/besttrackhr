import React from "react";
import { Link } from "react-router-dom";
import "./Employeepage.css";

// ✅ Imported images
import reportimg from "../../img/daily-report.png";
import chatimg from "../../img/group-chat.png";
import setting from "../../img/settings.png";
import workcal from "../../img/work-calender.png";
import worktimer from "../../img/work-timer.png";
import profile from "../../img/profile.png";


function Employeepage() {
  return (
    <div className="employee-page">
      <h1 className="title">Employee Dashboard</h1>
      <p className="subtitle">Quick Access to Your Tools</p>

      <div className="circle-container">
<<<<<<< HEAD
        <Link to="/employee/empdailyreport" className="circle">
=======
        <Link to="/daily-report" className="circle">
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
          <img src={reportimg} alt="Daily Report" />
          <span>Daily Report</span>
        </Link>

<<<<<<< HEAD

        <Link to="/employee/emptimer" className="circle">
=======
        <Link to="/group-chat" className="circle">
          <img src={chatimg} alt="Group Chat" />
          <span>Group Chat</span>
        </Link>

        <Link to="/timer" className="circle">
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
          <img src={worktimer} alt="Work Timer" />
          <span>Work Timer</span>
        </Link>

<<<<<<< HEAD
        <Link to="/employee/empcalender" className="circle">
=======
        <Link to="/calendar" className="circle">
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
          <img src={workcal} alt="Calendar" />
          <span>Calendar</span>
        </Link>

        <Link to="/profile" className="circle">
          <img src={profile} alt="Profile" />
          <span>Profile</span>
        </Link>
<<<<<<< HEAD
=======

        <Link to="/settings" className="circle">
          <img src={setting} alt="Settings" />
          <span>Settings</span>
        </Link>
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
      </div>
    </div>
  );
}

export default Employeepage;
