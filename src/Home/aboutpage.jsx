import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const About = () => {
  return (
    <>
      <Header />
      <style>{`
        .about-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 5rem 2rem 6rem 2rem;
          color: #111;
          background: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }

        .about-hero {
          margin-bottom: 5rem;
        }

        .about-badge {
          display: inline-block;
          font-size: 0.8rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 1.2rem;
          color: #666;
          font-weight: 600;
        }

        .about-hero h1 {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.15;
          margin-bottom: 1.5rem;
          color: #000;
          letter-spacing: -1.5px;
        }

        .about-hero p {
          font-size: 1.15rem;
          max-width: 700px;
          line-height: 1.8;
          color: #555;
          font-weight: 400;
        }

        .about-section {
          margin-bottom: 4.5rem;
          padding-bottom: 4.5rem;
          border-bottom: 1px solid #e8e8e8;
        }

        .about-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .about-section h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #000;
          letter-spacing: -0.5px;
        }

        .about-section p {
          font-size: 1.05rem;
          line-height: 1.85;
          color: #444;
          max-width: 800px;
          margin-bottom: 1.2rem;
        }

        .about-section p:last-of-type {
          margin-bottom: 0;
        }

        .about-list {
          list-style: none;
          padding-left: 0;
          margin-top: 1.8rem;
        }

        .about-list li {
          margin-bottom: 1rem;
          font-size: 1.05rem;
          line-height: 1.7;
          color: #333;
          padding-left: 0;
          transition: transform 0.2s ease;
        }

        .about-list li:hover {
          transform: translateX(5px);
        }

        .about-list li strong {
          color: #000;
          font-weight: 600;
        }

        /* Checkmark styling for difference section */
        .about-section:nth-of-type(4) .about-list li {
          padding-left: 2rem;
          position: relative;
        }

        .about-section:nth-of-type(4) .about-list li::before {
          content: '✔';
          position: absolute;
          left: 0;
          color: #000;
          font-weight: bold;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .about-container {
            padding: 3rem 1.5rem;
          }

          .about-hero h1 {
            font-size: 2.5rem;
            letter-spacing: -1px;
          }

          .about-hero p {
            font-size: 1.05rem;
          }

          .about-section h2 {
            font-size: 1.75rem;
          }

          .about-section p,
          .about-list li {
            font-size: 1rem;
          }
        }
      `}</style>

      <main className="about-container">
        <div className="py-4"></div>
        {/* HERO */}
        <section className="about-hero">
          <span className="about-badge">About Helpify</span>
          <h1>
            Bridging Hearts, <br /> Building Hope
          </h1>
          <p>
            Helpify is a transparent donation platform connecting donors,
            verified NGOs, and delivery agents to make giving simple, secure,
            and impactful.
          </p>
        </section>

        {/* MISSION */}
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We aim to remove the gap between people who want to help and NGOs
            that need support. By combining technology with trust, Helpify
            ensures every donation reaches the right hands.
          </p>
          <p>
            Whether it's money or essential goods, donors can track their
            contributions from start to finish with complete transparency.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section className="about-section">
          <h2>How Helpify Works</h2>
          <ul className="about-list">
            <li><strong>Connect:</strong> Browse verified NGOs.</li>
            <li><strong>Donate:</strong> Money or goods, securely.</li>
            <li><strong>Pickup:</strong> Doorstep pickup for goods.</li>
            <li><strong>Track:</strong> End-to-end donation tracking.</li>
          </ul>
        </section>

        {/* DIFFERENCE */}
        <section className="about-section">
          <h2>What Makes Us Different</h2>
          <ul className="about-list">
            <li>Only verified NGOs</li>
            <li>Zero delivery charges</li>
            <li>Transparent tracking</li>
            <li>Simple & secure platform</li>
          </ul>
        </section>

        {/* VISION */}
        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            We envision a world where helping others is as easy as online
            shopping — transparent, effortless, and trusted.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;