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
        <Link to="/employee/empdailyreport" className="circle">
          <img src={reportimg} alt="Daily Report" />
          <span>Daily Report</span>
        </Link>

        <Link to="/employee/emptimer" className="circle">
          <img src={worktimer} alt="Work Timer" />
          <span>Work Timer</span>
        </Link>

        <Link to="/employee/empcalender" className="circle">
          <img src={workcal} alt="Calendar" />
          <span>Calendar</span>
        </Link>

        <Link to="/profile" className="circle">
          <img src={profile} alt="Profile" />
          <span>Profile</span>
        </Link>

        <Link to="/settings" className="circle">
          <img src={setting} alt="Settings" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}

export default Employeepage;
