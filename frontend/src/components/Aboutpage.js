import React from 'react'
import "./Aboutpage.css";

function Aboutpage() {
  return (
    <>
      {/* Hero Section */}
      <header className="gradient-bg hero">
        <div className="container text-center">
          <h1>About Our HR Revolution</h1>
          <p>
            Sculpting perfect teams with cutting-edge employee management since
            2018
          </p>
          <div className="pulse-animation">
            <a href="#">Meet The Team</a>
          </div>
        </div>
      </header>

      {/* About Content */}
      <section className="about-content">
        <div className="container-fluids">
          <div className="about-flex d-flex flex-wrap align-items-center">
            <div className="about-image">
              <img
                src="http://static.photos/office/1024x576/42"
                alt="Office Team"
                className="img-fluid"
              />
            </div>
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Founded in a small coworking space by three HR professionals
                frustrated with outdated systems, TeamSculpt was born from the
                need to modernize employee management. What started as a simple
                time-tracking app has evolved into a comprehensive HR platform
                serving over 5,000 businesses worldwide.
              </p>
              <p>
                Our mission is to transform HR from paperwork-heavy to
                people-focused. We believe when you take care of the
                administrative burdens, HR teams can focus on what really
                matters - the humans behind the employee numbers.
              </p>
              <div className="about-stats d-flex flex-wrap">
                <div className="stat-item">
                  <i className="fas fa-award"></i>
                  <span>HR Innovation Award 2022</span>
                </div>
                <div className="stat-item">
                  <i className="fas fa-globe"></i>
                  <span>Used in 48 countries</span>
                </div>
                <div className="stat-item">
                  <i className="fas fa-users"></i>
                  <span>1.2M+ employees managed</span>
                </div>
                <div className="stat-item">
                  <i className="fas fa-microchip"></i>
                  <span>AI-powered analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="text-center mb-5">Our Core Values</h2>
          <div className="values-grid d-flex flex-wrap justify-content-center">
            <div className="value-item">
              <div className="value-card">
                <i className="fas fa-heart"></i>
                <h3>People First</h3>
                <p>
                  We build tools that serve people, not the other way around.
                  Every feature is designed with real human needs in mind.
                </p>
              </div>
            </div>
            <div className="value-item">
              <div className="value-card">
                <i className="fas fa-bolt"></i>
                <h3>Simplicity Wins</h3>
                <p>
                  HR is complicated enough. We take complex processes and make
                  them intuitive and easy to use.
                </p>
              </div>
            </div>
            <div className="value-item">
              <div className="value-card">
                <i className="fas fa-shield-alt"></i>
                <h3>Security Built-In</h3>
                <p>
                  Employee data is sacred. We implement enterprise-grade
                  security measures at every level of our platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}

    </>
  )
}

export default Aboutpage