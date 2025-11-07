import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Landingpage.css';
import aboutus from '../img/about-us-img.png';
import AOS from "aos";
import "aos/dist/aos.css";

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="modern-landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>

        <div className="hero-content">
          <div className="container">
            <div className="hero-text" data-aos="fade-up">
              <h1 className="hero-title">
                Revolutionize Your
                <span className="gradient-text"> Workforce Management</span>
              </h1>
              <p className="hero-subtitle">
                The all-in-one HR platform that empowers your team with intelligent tools, 
                seamless workflows, and powerful analytics to drive business success.
              </p>
              <div className="hero-buttons">
                <Link to="/registerpage" className="btn-primary">
                  <span>Get Started Free</span>
                  <i className="bi bi-arrow-right"></i>
                </Link>
                <Link to="/loginpage" className="btn-secondary">
                  <i className="bi bi-play-circle"></i>
                  <span>Watch Demo</span>
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Companies</span>
                </div>
                <div className="stat">
                  <span className="stat-number">1M+</span>
                  <span className="stat-label">Employees</span>
                </div>
                <div className="stat">
                  <span className="stat-number">99.9%</span>
                  <span className="stat-label">Uptime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">Everything You Need in One Platform</h2>
            <p className="section-subtitle">
              From employee onboarding to performance management, we've got your HR needs covered.
            </p>
          </div>

          <div className="features-grid">
            {[
              { icon: "bi-people-fill", title: "Employee Management", desc: "Complete lifecycle with automated workflows and digital docs." },
              { icon: "bi-calendar-check", title: "Smart Calendar", desc: "Intelligent scheduling with role-based access." },
              { icon: "bi-graph-up-arrow", title: "Analytics Dashboard", desc: "Real-time insights and custom reports." },
              { icon: "bi-shield-check", title: "Secure & Compliant", desc: "GDPR compliant with enterprise-grade security." },
              { icon: "bi-phone", title: "Mobile Ready", desc: "Access HR tools anywhere with responsive design." },
              { icon: "bi-gear-fill", title: "Easy Integration", desc: "Seamlessly connect with your existing tools." }
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                data-aos="fade-up"
                data-aos-delay={`${(index + 1) * 100}`}
              >
                <div className="feature-icon">
                  <i className={`bi ${feature.icon}`}></i>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text" data-aos="fade-right">
              <h2 className="about-title">Why Choose Team Track?</h2>
              <p className="about-description">
                We understand that managing people is the heart of any business. 
                That's why we've built an intuitive HR system with powerful features.
              </p>
              <div className="about-features">
                {[
                  "Google OAuth Integration",
                  "Role-based Access Control",
                  "Real-time Calendar Management",
                  "Advanced Analytics & Reporting"
                ].map((item, i) => (
                  <div key={i} className="about-feature">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/registerpage" className="btn-primary">
                Start Your Free Trial
              </Link>
            </div>
            <div className="about-image" data-aos="fade-left">
              <img src={aboutus} alt="HR Management Dashboard" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">Trusted by HR Teams Worldwide</h2>
            <p className="section-subtitle">
              See what our customers have to say about their experience with Team Track.
            </p>
          </div>

          <div className="testimonials-grid">
            {[
              {
                name: "Sarah Johnson",
                role: "HR Director, TechCorp",
                text: "Team Track transformed our HR operations. Google integration made onboarding seamless.",
                img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Michael Chen",
                role: "COO, RetailPlus",
                text: "The analytics dashboard gave us insights we never had. Employee satisfaction up 40%.",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Emma Rodriguez",
                role: "People Ops, StartupX",
                text: "As a growing startup, Team Track scaled with us and saved countless hours.",
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
              }
            ].map((t, i) => (
              <div
                key={i}
                className="testimonial-card"
                data-aos="fade-up"
                data-aos-delay={`${(i + 1) * 100}`}
              >
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <i className="bi bi-quote"></i>
                  </div>
                  <p className="testimonial-text">{t.text}</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img src={t.img} alt={t.name} />
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">{t.name}</h4>
                    <p className="author-role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content" data-aos="fade-up">
            <h2 className="cta-title">Ready to Transform Your HR Operations?</h2>
            <p className="cta-subtitle">
              Join thousands of companies who trust Team Track to manage their people.
            </p>
            <div className="cta-buttons">
              <Link to="/registerpage" className="btn-primary btn-large">
                Start Free Trial
              </Link>
              <Link to="/loginpage" className="btn-secondary btn-large">
                Schedule Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;