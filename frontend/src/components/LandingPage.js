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
            <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-icon">
                <i className="bi bi-people-fill"></i>
              </div>
              <h3 className="feature-title">Employee Management</h3>
              <p className="feature-description">
                Complete employee lifecycle management with automated workflows and digital document handling.
              </p>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-icon">
                <i className="bi bi-calendar-check"></i>
              </div>
              <h3 className="feature-title">Smart Calendar</h3>
              <p className="feature-description">
                Intelligent scheduling with role-based access control for seamless team coordination.
              </p>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-icon">
                <i className="bi bi-graph-up-arrow"></i>
              </div>
              <h3 className="feature-title">Analytics Dashboard</h3>
              <p className="feature-description">
                Real-time insights and custom reports to track performance and workforce metrics.
              </p>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
              <div className="feature-icon">
                <i className="bi bi-shield-check"></i>
              </div>
              <h3 className="feature-title">Secure & Compliant</h3>
              <p className="feature-description">
                Enterprise-grade security with GDPR compliance and role-based access control.
              </p>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="500">
              <div className="feature-icon">
                <i className="bi bi-phone"></i>
              </div>
              <h3 className="feature-title">Mobile Ready</h3>
              <p className="feature-description">
                Access your HR tools anywhere with our responsive mobile-first design.
              </p>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="600">
              <div className="feature-icon">
                <i className="bi bi-gear-fill"></i>
              </div>
              <h3 className="feature-title">Easy Integration</h3>
              <p className="feature-description">
                Seamlessly integrate with your existing tools and workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container-fluidss">
          <div className="about-content">
            <div className="about-text" data-aos="fade-right">
              <h2 className="about-title">Why Choose Team Track ?</h2>
              <p className="about-description">
                We understand that managing people is the most important part of any business. 
                That's why we've built a comprehensive HR management system that combines 
                powerful features with an intuitive interface.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Google OAuth Integration</span>
                </div>
                <div className="about-feature">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Role-based Access Control</span>
                </div>
                <div className="about-feature">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Real-time Calendar Management</span>
                </div>
                <div className="about-feature">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Advanced Analytics & Reporting</span>
                </div>
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
            <div className="testimonial-card" data-aos="fade-up" data-aos-delay="100">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="bi bi-quote"></i>
                </div>
                <p className="testimonial-text">
                  "Team Track transformed our HR operations completely. The Google integration 
                  made onboarding seamless, and the calendar feature is a game-changer."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" alt="Sarah Johnson" />
                </div>
                <div className="author-info">
                  <h4 className="author-name">Sarah Johnson</h4>
                  <p className="author-role">HR Director, TechCorp</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card" data-aos="fade-up" data-aos-delay="200">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="bi bi-quote"></i>
                </div>
                <p className="testimonial-text">
                  "The role-based access control and analytics dashboard gave us insights 
                  we never had before. Employee satisfaction increased by 40% in just 3 months."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Michael Chen" />
                </div>
                <div className="author-info">
                  <h4 className="author-name">Michael Chen</h4>
                  <p className="author-role">COO, RetailPlus</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card" data-aos="fade-up" data-aos-delay="300">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="bi bi-quote"></i>
                </div>
                <p className="testimonial-text">
                  "As a growing startup, we needed scalable HR tools. Team Track grew with us 
                  and saved us countless hours with its intuitive interface."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" alt="Emma Rodriguez" />
                </div>
                <div className="author-info">
                  <h4 className="author-name">Emma Rodriguez</h4>
                  <p className="author-role">People Ops, StartupX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content" data-aos="fade-up">
            <h2 className="cta-title">Ready to Transform Your HR Operations?</h2>
            <p className="cta-subtitle">
              Join thousands of companies who trust Team Track to manage their most valuable asset - their people.
            </p>
            <div className="cta-buttons">
              <Link to="/registerpage" className="btn-primary btn-large">
                Start Free Trial
              </Link>
              <Link to="/loginpage" className="btn-secondary btn-large">
                Schedule Demo
              </Link>
              <Link to="/test-auth" className="btn-secondary btn-large" style={{marginLeft: '10px', backgroundColor: '#ff6b35'}}>
                🔧 Test Auth
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
