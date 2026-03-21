import React, { useState } from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/contact@gekkzzz.co.uk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `Portfolio contact: ${formData.subject}`,
          _template: 'table',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setSubmitError('Message failed to send. Please email contact@gekkzzz.co.uk directly.');
    }
  };

  return (
    <div className="contact">
      <section className="contact-hero">
        <h1>Contact</h1>
        <p className="subtitle">
          Tell me what you are building and I will get back to you shortly.
        </p>
      </section>

      <section className="contact-content">
        <div className="contact-wrapper">
          <div className="contact-info">
            <div className="info-item">
              <h3>Location</h3>
              <p>Liverpool, UK</p>
            </div>
            <div className="info-item">
              <h3>Email</h3>
              <p>
                <a href="mailto:contact@gekkzzz.co.uk">contact@gekkzzz.co.uk</a>
              </p>
            </div>
            <div className="info-item">
              <h3>Profiles</h3>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/gekkzzz" target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.94 8.5v8.5H4.1V8.5h2.84ZM5.52 4A1.65 1.65 0 1 0 5.5 7.3 1.65 1.65 0 0 0 5.52 4ZM20 12.12V17h-2.83v-4.55c0-1.14-.4-1.92-1.44-1.92-.79 0-1.25.53-1.45 1.04-.08.18-.1.44-.1.7V17h-2.84s.04-7.27 0-8.02h2.84v1.14c.38-.58 1.06-1.42 2.57-1.42 1.87 0 3.25 1.22 3.25 3.84Z" />
                  </svg>
                </a>
                <a href="https://github.com/gekkzzz" target="_blank" rel="noreferrer" className="social-icon" title="GitHub" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56 0-.27-.01-1.01-.02-1.98-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.71.08-.71 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.67 1.25 3.33.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.14 1.18a10.9 10.9 0 0 1 5.72 0c2.17-1.5 3.13-1.18 3.13-1.18.62 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.35.78 1.05.78 2.11 0 1.53-.01 2.76-.01 3.13 0 .31.2.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
                  </svg>
                </a>
                <a href="https://gekkzzz.substack.com" target="_blank" rel="noreferrer" className="social-icon" title="Substack" aria-label="Substack">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 4h18v2H3V4Zm0 4h18v2H3V8Zm0 4h18v8l-9-5-9 5v-8Z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="info-item">
              <h3>Availability</h3>
              <p>Open to freelance engagements and full-time roles.</p>
            </div>
          </div>

          <div className="contact-form-wrapper">
            {submitted && (
              <div className="success-message">
                <h3>Message Sent</h3>
                <p>Thanks for reaching out. I will reply as soon as possible.</p>
              </div>
            )}

            {!submitted && (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project details"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Share goals, timeline, and scope..."
                  />
                </div>

                <button type="submit" className="submit-button">
                  Send
                </button>
                {submitError && <p className="form-error">{submitError}</p>}
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="faq-section">
        <h2>FAQ</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>What is a typical project timeline?</h3>
            <p>
              Timelines depend on scope and complexity. Most projects run between two and eight
              weeks, with clear milestones throughout.
            </p>
          </div>
          <div className="faq-item">
            <h3>Do you collaborate with remote teams?</h3>
            <p>
              Yes. I work comfortably across time zones and prioritize clear communication,
              concise documentation, and steady delivery.
            </p>
          </div>
          <div className="faq-item">
            <h3>How do you approach delivery?</h3>
            <p>
              Discovery, planning, implementation, QA, and launch. Each phase includes feedback
              loops to keep the outcome aligned with product goals.
            </p>
          </div>
          <div className="faq-item">
            <h3>Do you provide post-launch support?</h3>
            <p>
              Yes. Ongoing support can include optimization, bug fixes, and iterative feature
              enhancements after launch.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
