import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const contact = () => {
  return (
    <>
      <Header />
      <style>{`
        .contact-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 5rem 2rem 6rem 2rem;
          color: #111;
          background: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }

        .contact-hero {
          margin-bottom: 5rem;
        }

        .contact-badge {
          display: inline-block;
          font-size: 0.8rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 1.2rem;
          color: #666;
          font-weight: 600;
        }

        .contact-hero h1 {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.15;
          margin-bottom: 1.5rem;
          color: #000;
          letter-spacing: -1.5px;
        }

        .contact-hero p {
          font-size: 1.15rem;
          max-width: 700px;
          line-height: 1.8;
          color: #555;
          font-weight: 400;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-bottom: 4.5rem;
          padding-bottom: 4.5rem;
          border-bottom: 1px solid #e8e8e8;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .info-item h2 {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #000;
          letter-spacing: -0.5px;
        }

        .info-item p {
          font-size: 1.05rem;
          line-height: 1.85;
          color: #444;
          margin: 0;
        }

        .info-item a {
          color: #000;
          text-decoration: none;
          border-bottom: 1px solid #000;
          transition: opacity 0.2s ease;
        }

        .info-item a:hover {
          opacity: 0.6;
        }

        .contact-form {
          background: #fafafa;
          padding: 2.5rem;
          border: 1px solid #e8e8e8;
        }

        .contact-form h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: #000;
          letter-spacing: -0.5px;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #333;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.9rem 1rem;
          font-size: 1rem;
          border: 1px solid #ddd;
          background: #fff;
          color: #333;
          font-family: inherit;
          transition: border-color 0.2s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #000;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 140px;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          background: #000;
          color: #fff;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .submit-btn:hover {
          background: #333;
        }

        .contact-section {
          margin-bottom: 4.5rem;
          padding-bottom: 4.5rem;
          border-bottom: 1px solid #e8e8e8;
        }

        .contact-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .contact-section h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #000;
          letter-spacing: -0.5px;
        }

        .contact-section p {
          font-size: 1.05rem;
          line-height: 1.85;
          color: #444;
          max-width: 800px;
        }

        .faq-list {
          list-style: none;
          padding-left: 0;
          margin-top: 1.8rem;
        }

        .faq-item {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #f0f0f0;
        }

        .faq-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .faq-question {
          font-size: 1.1rem;
          font-weight: 600;
          color: #000;
          margin-bottom: 0.5rem;
        }

        .faq-answer {
          font-size: 1.05rem;
          line-height: 1.85;
          color: #444;
        }

        @media (max-width: 768px) {
          .contact-container {
            padding: 3rem 1.5rem;
          }

          .contact-hero h1 {
            font-size: 2.5rem;
            letter-spacing: -1px;
          }

          .contact-hero p {
            font-size: 1.05rem;
          }

          .contact-content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .contact-form {
            padding: 2rem 1.5rem;
          }

          .contact-section h2,
          .contact-form h2 {
            font-size: 1.75rem;
          }
        }
      `}</style>

      <main className="contact-container">
        {/* HERO */}
        <div className="py-4"></div>
        <section className="contact-hero">
          <span className="contact-badge">Contact Us</span>
          <h1>
            Get In Touch
          </h1>
          <p>
            Have questions or want to learn more about Helpify? We're here to help. 
            Reach out to us and we'll get back to you as soon as possible.
          </p>
        </section>

        {/* CONTACT INFO & FORM */}
        <div className="contact-content">
          {/* CONTACT INFORMATION */}
          <div className="contact-info">
            <div className="info-item">
              <h2>Email</h2>
              <p>
                <a href="mailto:support@helpify.com">support@helpify.com</a>
              </p>
            </div>

            <div className="info-item">
              <h2>Phone</h2>
              <p>
                <a href="tel:+911234567890">+91 123 456 7890</a>
              </p>
            </div>

            <div className="info-item">
              <h2>Address</h2>
              <p>
                123 Charity Lane<br />
                Mumbai, Maharashtra 400001<br />
                India
              </p>
            </div>

            <div className="info-item">
              <h2>Business Hours</h2>
              <p>
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="contact-form">
            <h2>Send a Message</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your full name"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="your@email.com"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  placeholder="What is this about?"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder="Tell us more..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ SECTION */}
        <section className="contact-section">
          <h2>Frequently Asked Questions</h2>
          <ul className="faq-list">
            <li className="faq-item">
              <div className="faq-question">How do I donate through Helpify?</div>
              <div className="faq-answer">
                Simply browse our verified NGOs, select the one you'd like to support, 
                and choose whether to donate money or goods. Follow the simple checkout 
                process and track your donation from start to finish.
              </div>
            </li>

            <li className="faq-item">
              <div className="faq-question">Are all NGOs on Helpify verified?</div>
              <div className="faq-answer">
                Yes, every NGO on our platform goes through a thorough verification 
                process to ensure legitimacy and transparency. We only partner with 
                organizations that meet our strict criteria.
              </div>
            </li>

            <li className="faq-item">
              <div className="faq-question">Is there a fee for using Helpify?</div>
              <div className="faq-answer">
                No, Helpify is completely free for donors. We don't charge any delivery 
                fees, and 100% of your donation goes to the NGO you choose.
              </div>
            </li>

            <li className="faq-item">
              <div className="faq-question">How does the pickup service work?</div>
              <div className="faq-answer">
                After you schedule a donation of goods, our delivery agents will 
                coordinate with you for a convenient pickup time at your doorstep. 
                You'll receive tracking updates throughout the process.
              </div>
            </li>
          </ul>
        </section>

        {/* SUPPORT */}
        <section className="contact-section">
          <h2>Need More Help?</h2>
          <p>
            If you couldn't find the answer you're looking for, don't hesitate to 
            reach out. Our support team is ready to assist you with any questions 
            or concerns about donations, NGO verification, or platform usage.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default contact;