// import { Box, Typography, Button, Container, Grid, Card, CardContent, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import './Landingpage.css';
import aboutus from '../img/about-us-img.png'
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the CSS

const LandingPage = () => {
  // const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  // // Animation styles for subtle drop-down effect
  // const animationStyle = {
  //   animation: 'dropDown 0.8s ease forwards',
  //   opacity: 0,
  //   '@keyframes dropDown': {
  //     '0%': { transform: 'translateY(-20px)', opacity: 0 },
  //     '100%': { transform: 'translateY(0)', opacity: 1 },
  //   },
  // };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true,     // Animation happens only once
    });
  }, []);

  return (


    //     <div className="relative z-10">

    //   <div className="hero-gradient text-white">
    //     <div className="container hero-container">
    //       <div className="text-center" data-aos="fade-up">
    //         <h1 className="hero-title">
    //           Revolutionize Your Workforce Management
    //         </h1>
    //         <p className="hero-subtitle">
    //           EmpowerHR is the all-in-one platform to manage, engage, and grow your team with intuitive tools and analytics.
    //         </p>
    //         <div className="hero-buttons">
    //           <a href="#" className="btn-get-started">Get Started</a>
    //           <a href="#" className="btn-live-demo">Live Demo</a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>


    //   <div className="features-section">
    //     <div className="container">
    //       <div className="text-center" data-aos="fade-up">
    //         <h2 className="section-title">Everything You Need in One Platform</h2>
    //         <p className="section-subtitle">
    //           From onboarding to retirement, we've got your HR needs covered with powerful features.
    //         </p>
    //       </div>

    //       <div className="features-grid">

    //         <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
    //           <div className="feature-icon">
    //             <i data-feather="user-plus"></i>
    //           </div>
    //           <div className="feature-content">
    //             <h3 className="feature-title">Employee Onboarding</h3>
    //             <p className="feature-text">
    //               Streamline new hire processes with automated workflows and digital document management.
    //             </p>
    //           </div>
    //         </div>


    //         <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
    //           <div className="feature-icon">
    //             <i data-feather="clock"></i>
    //           </div>
    //           <div className="feature-content">
    //             <h3 className="feature-title">Time & Attendance</h3>
    //             <p className="feature-text">
    //               Accurate tracking with geofencing, facial recognition, and mobile clock-in options.
    //             </p>
    //           </div>
    //         </div>


    //         <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
    //           <div className="feature-icon">
    //             <i data-feather="dollar-sign"></i>
    //           </div>
    //           <div className="feature-content">
    //             <h3 className="feature-title">Payroll Processing</h3>
    //             <p className="feature-text">
    //               Automated payroll calculations with tax compliance and direct deposit capabilities.
    //             </p>
    //           </div>
    //         </div>


    //         <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
    //           <div className="feature-icon">
    //             <i data-feather="bar-chart-2"></i>
    //           </div>
    //           <div className="feature-content">
    //             <h3 className="feature-title">Performance Analytics</h3>
    //             <p className="feature-text">
    //               Real-time dashboards and custom reports to track KPIs and workforce metrics.
    //             </p>
    //           </div>
    //         </div>


    //         <div className="feature-card" data-aos="fade-up" data-aos-delay="500">
    //           <div className="feature-icon">
    //             <i data-feather="award"></i>
    //           </div>
    //           <div className="feature-content">
    //             <h3 className="feature-title">Talent Development</h3>
    //             <p className="feature-text">
    //               Learning management system with certification tracking and skill gap analysis.
    //             </p>
    //           </div>
    //         </div>


    //         <div className="feature-card" data-aos="fade-up" data-aos-delay="600">
    //           <div className="feature-icon">
    //             <i data-feather="message-square"></i>
    //           </div>
    //           <div className="feature-content">
    //             <h3 className="feature-title">Employee Engagement</h3>
    //             <p className="feature-text">
    //               Surveys, recognition tools, and feedback systems to boost morale and retention.
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>


    //   <div className="testimonials-section">
    //     <div className="container">
    //       <div className="text-center" data-aos="fade-up">
    //         <h2 className="section-title">Trusted by HR Teams Worldwide</h2>
    //       </div>
    //       <div className="testimonials-grid">

    //         <div className="testimonial-card" data-aos="fade-up" data-aos-delay="100">
    //           <div className="testimonial-header">
    //             <img className="avatar" src="http://static.photos/people/200x200/1" alt="Sarah Johnson" />
    //             <div className="testimonial-info">
    //               <h4 className="testimonial-name">Sarah Johnson</h4>
    //               <p className="testimonial-role">HR Director, TechCorp</p>
    //             </div>
    //           </div>
    //           <p className="testimonial-text">
    //             "EmpowerHR reduced our onboarding time by 70% and eliminated all paperwork. Our new hires love the experience!"
    //           </p>
    //         </div>


    //         <div className="testimonial-card" data-aos="fade-up" data-aos-delay="200">
    //           <div className="testimonial-header">
    //             <img className="avatar" src="http://static.photos/people/200x200/2" alt="Michael Chen" />
    //             <div className="testimonial-info">
    //               <h4 className="testimonial-name">Michael Chen</h4>
    //               <p className="testimonial-role">COO, RetailPlus</p>
    //             </div>
    //           </div>
    //           <p className="testimonial-text">
    //             "The analytics dashboard gave us insights we never had before. We've improved retention by 40% in six months."
    //           </p>
    //         </div>


    //         <div className="testimonial-card" data-aos="fade-up" data-aos-delay="300">
    //           <div className="testimonial-header">
    //             <img className="avatar" src="http://static.photos/people/200x200/3" alt="Emma Rodriguez" />
    //             <div className="testimonial-info">
    //               <h4 className="testimonial-name">Emma Rodriguez</h4>
    //               <p className="testimonial-role">People Ops, StartupX</p>
    //             </div>
    //           </div>
    //           <p className="testimonial-text">
    //             "As a growing startup, we needed scalable HR tools. EmpowerHR grew with us and saved us countless hours."
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>


    //   <div className="cta-section">
    //     <div className="container cta-container">
    //       <div className="text-center" data-aos="fade-up">
    //         <h2 className="cta-title">Ready to transform your HR operations?</h2>
    //         <p className="cta-subtitle">
    //           Join thousands of companies who trust EmpowerHR to manage their most valuable asset - their people.
    //         </p>
    //         <div className="cta-buttons">
    //           <a href="#" className="btn-free-trial">Start Free Trial</a>
    //           <a href="#" className="btn-schedule-demo">Schedule Demo</a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>



    // </div>
    <div>

      <div className='row landing-page'>
        <div className='col-lg-6 '>
          <h2 className='font-bold' data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
            Best HR <br/> TOOL
          </h2>
          <p className='landing-para' data-aos="fade-up" data-aos-duration="3000">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          </p>
          <button className='buy-now-btn' data-aos="fade-up" data-aos-duration="3000">
            Buy Now
          </button>
          <div className='cnt-now' data-aos="fade-up" data-aos-duration="3000">
            <div className='cnt-btns'>
              <i className='bi bi-telephone icon-r'></i>
              <p>
                +123-456-7890
              </p>
            </div>
            <div className='cnt-btns'>
              <i className="bi bi-telephone icon-r"></i>
              <p>
                hello@reallygreatsite.com
              </p>
            </div>
          </div>
        </div>
        <div className='col-lg-6'>

        </div>

      </div>
      <div className='row' data-aos="fade-up" data-aos-duration="3000">
        <div className='col-lg-6 about-img'>
            <img src={aboutus} alt="House image" height={600} width={600} />
        </div>
        <div className='col-lg-6 about-section'>
           <div className='about-us head'>
            <h2>
            About US
           </h2>
           </div>
           <div className='about-us para'>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
           </div>
           <div className='about-us button'>
            <button className='see-price-btn'>
               See Pricing
            </button>
           </div>


        </div>
      </div>

<div className="pricing-section mt-5 mb-5" data-aos="fade-up" data-aos-duration="2000">
      <h1>PRICING PLANS</h1>
      <p>
        We offer flexible pricing to suit your needs, whether you're just
        starting out or scaling up. Choose the plan that's right for you.
      </p>

      <div className="plans">
        <div className="plan">
          <h2>Basic Plan</h2>
          <p className="price">$9/month</p>
          <ul>
            <li>5GB storage</li>
            <li>1 user</li>
            <li>Email support</li>
            <li>Basic analytics</li>
            <li>Great for freelancers or small personal projects</li>
          </ul>
          <button>TRY 1 MONTH</button>
        </div>

        <div className="plan">
          <h2>Standard Plan</h2>
          <p className="price">$29/month</p>
          <ul>
            <li>20GB storage</li>
            <li>5 users</li>
            <li>Priority email support</li>
            <li>Advanced analytics</li>
            <li>Ideal for growing teams or small businesses</li>
          </ul>
          <button>CHOOSE</button>
        </div>

        <div className="plan">
          <h2>Premium Plan</h2>
          <p className="price">$79/month</p>
          <ul>
            <li>1000GB storage</li>
            <li>Unlimited users</li>
            <li>24/7 support</li>
            <li>Advanced features and integrations</li>
            <li>Perfect for large teams or enterprises</li>
          </ul>
          <button>CHOOSE</button>
        </div>

        <div className="plan custom-plan">
          <h2>Custom Plan</h2>
          <p className="price">Contact Us</p>
          <ul>
            <li>Custom storage and users</li>
            <li>Dedicated account manager</li>
            <li>Tailored solutions</li>
            <li>Ideal for large organizations with specific needs</li>
          </ul>
          <button>CHOOSE</button>
        </div>
      </div>
    </div>

      <div className="accordion">
      <h1>Frequently Asked Questions</h1>

      <div className="accordion-item">
        <input type="checkbox" id="accordion1" name="faq" />
        <label htmlFor="accordion1" className="accordion-item-title">
          <span className="icon"></span>
          What is SEO, and why is it important for online businesses?
        </label>
        <div className="accordion-item-desc">
          SEO, or Search Engine Optimization, is the practice of optimizing a
          website...
        </div>
      </div>

      <div className="accordion-item">
        <input type="checkbox" id="accordion2" name="faq" />
        <label htmlFor="accordion2" className="accordion-item-title">
          <span className="icon"></span>
          How long does it take to see results from SEO?
        </label>
        <div className="accordion-item-desc">
          The time frame varies, but typically, SEO results can be seen within
          3–6 months depending on competition and strategy.
        </div>
      </div>

      

      <div className="accordion-item">
        <input type="checkbox" id="accordion3" name="faq" />
        <label htmlFor="accordion3" className="accordion-item-title">
          <span className="icon"></span>
          What’s the difference between on-page and off-page SEO?
        </label>
        <div className="accordion-item-desc">
          On-page SEO refers to optimizing elements within your website, while
          off-page SEO refers to external factors like backlinks.
        </div>
      </div>

      <div className="accordion-item">
        <input type="checkbox" id="accordion4" name="faq" />
        <label htmlFor="accordion4" className="accordion-item-title">
          <span className="icon"></span>
          What’s the difference between on-page and off-page SEO?
        </label>
        <div className="accordion-item-desc">
          On-page SEO refers to optimizing elements within your website, while
          off-page SEO refers to external factors like backlinks.
        </div>
      </div>

      <div className="accordion-item">
        <input type="checkbox" id="accordion5" name="faq" />
        <label htmlFor="accordion5" className="accordion-item-title">
          <span className="icon"></span>
          What’s the difference between on-page and off-page SEO?
        </label>
        <div className="accordion-item-desc">
          On-page SEO refers to optimizing elements within your website, while
          off-page SEO refers to external factors like backlinks.
        </div>
      </div>
    </div>
    </div>
  );
};

export default LandingPage;
