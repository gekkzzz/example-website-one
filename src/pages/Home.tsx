import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const titles = ['gekkzzz', 'a developer', 'a data analyst', 'a video essayist'];
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 2200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [titles.length]);

  return (
    <div className="home">
      <section className="intro-sequence">
        <section className="hero">
          <div className="hero-content">
            <p className="hero-kicker">Welcome</p>
            <h1 className="hero-title">
              I am
              <span className="rotating-title">
                <span key={titles[titleIndex]} className="title-current">
                  {titles[titleIndex]}
                </span>
              </span>
            </h1>
            <a href="https://github.com/gekkzzz" target="_blank" rel="noreferrer" className="cta-button">
              View Work
            </a>
          </div>
        </section>
      </section>

      <section id="about" className="about-section">
        <div className="section-content">
          <h2 className="section-title">Design-led. Performance-first.</h2>
          <p className="section-description">
            I build products, analyze data, and ship practical ideas quickly. My work blends clear UX, frontend engineering, and analytical thinking.
          </p>
        </div>
      </section>

      <section className="specializations">
        <div className="specs-grid">
          <div className="spec-item">
            <h3 className="spec-icon">01</h3>
            <h4>Frontend Development</h4>
            <p>Modern React architecture, scalable TypeScript patterns, and maintainable component systems.</p>
          </div>
          <div className="spec-item">
            <h3 className="spec-icon">02</h3>
            <h4>Performance</h4>
            <p>Fast load times, smooth interactions, and robust Core Web Vitals across real-world devices.</p>
          </div>
          <div className="spec-item">
            <h3 className="spec-icon">03</h3>
            <h4>Interface Craft</h4>
            <p>Intentional typography, spacing, and motion that communicate quality and confidence.</p>
          </div>
          <div className="spec-item">
            <h3 className="spec-icon">04</h3>
            <h4>Responsive Systems</h4>
            <p>Layouts that adapt naturally to every screen while preserving hierarchy and readability.</p>
          </div>
        </div>
      </section>

      <section className="tech-section">
        <div className="section-content">
          <h2 className="section-title">Tech Stack</h2>
          <div className="tech-list">
            <div className="tech-category">
              <h4>Interface</h4>
              <ul>
                <li>React</li>
                <li>TypeScript</li>
                <li>CSS</li>
                <li>HTML</li>
              </ul>
            </div>
            <div className="tech-category">
              <h4>Platform</h4>
              <ul>
                <li>Node.js</li>
                <li>REST APIs</li>
                <li>JavaScript</li>
              </ul>
            </div>
            <div className="tech-category">
              <h4>Workflow</h4>
              <ul>
                <li>Vite</li>
                <li>Git</li>
                <li>Figma</li>
                <li>GitHub Actions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="section-content">
          <h2 className="section-title">Ready To Build Something Great?</h2>
          <p className="section-description">
            If you are launching a new product or refining an existing one, I can help you ship a faster, cleaner experience.
          </p>
          <Link to="/contact" className="cta-button cta-large">
            Start A Conversation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

