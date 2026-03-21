import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      <section className="about-hero">
        <h1>About Me</h1>
        <p className="subtitle">Developer, data analyst, and video essayist based in Liverpool.</p>
      </section>

      <section className="about-content">
        <div className="content-wrapper">
          <div className="about-section">
            <h2>Who I Am</h2>
            <p>
              Born in Wales and now based in Liverpool, I build digital products, interpret data,
              and create long-form digital content. I work best at the intersection of technical
              depth, clear communication, and practical delivery.
            </p>
            <p>
              My core stack is React and TypeScript, and I am actively expanding into backend and
              data tooling with Python, SQL, and Linux workflows.
            </p>
          </div>

          <div className="about-section">
            <h2>My Expertise</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Frontend</h3>
                <ul>
                  <li>React & TypeScript</li>
                  <li>CSS3 & Modern CSS</li>
                  <li>HTML5</li>
                  <li>Responsive Design</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Platform & Tools</h3>
                <ul>
                  <li>Node.js & Python</li>
                  <li>Git & Version Control</li>
                  <li>REST APIs & SQL</li>
                  <li>Vite & Build Tooling</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Specializations</h3>
                <ul>
                  <li>Web Animations</li>
                  <li>Interactive Experiences</li>
                  <li>Performance Optimization</li>
                  <li>Data & Policy Analysis</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>What I Do</h2>
            <div className="services-grid">
              <div className="service-card">
                <h3>Interface Engineering</h3>
                <p>Design-accurate UI implementation with careful typography, spacing, and motion.</p>
              </div>
              <div className="service-card">
                
                <h3>Performance</h3>
                <p>Fast, stable experiences optimized for real users on real networks.</p>
              </div>
              <div className="service-card">
                <h3>Product Development</h3>
                <p>Custom frontend features aligned with product goals and business outcomes.</p>
              </div>
              <div className="service-card">
                <h3>Responsive Systems</h3>
                <p>Consistent behavior and polish across desktop, tablet, and mobile.</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>My Approach</h2>
            <div className="approach">
              <div className="approach-step">
                <div className="step-number">01</div>
                <h3>Understand</h3>
                <p>Define goals, users, and constraints before writing code.</p>
              </div>
              <div className="approach-step">
                <div className="step-number">02</div>
                <h3>Design</h3>
                <p>Translate requirements into a clear, scalable interface plan.</p>
              </div>
              <div className="approach-step">
                <div className="step-number">03</div>
                <h3>Develop</h3>
                <p>Build with quality standards for reliability and speed.</p>
              </div>
              <div className="approach-step">
                <div className="step-number">04</div>
                <h3>Deliver</h3>
                <p>Ship confidently and iterate based on feedback and data.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Have A Project In Mind?</h2>
        <p>Let’s build something thoughtful, fast, and beautifully executed.</p>
        <a href="/contact" className="cta-button">
          Contact
        </a>
      </section>
    </div>
  );
};

export default About;
