import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./trackDonations.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const TrackDonation = () => {
  const { donationId } = useParams();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ get logged-in user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/donations/${donationId}`)
      .then(res => res.json())
      .then(data => {
        setDonation(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [donationId]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!donation) return <p className="loading">Donation not found</p>;

  return (
    <>
      <Header />

      <div className="track-page">
        <div className="track-card">
          <h2>Delivery Status</h2>

          <div className="status-box">
            <span>Current Status</span>
            <strong>{donation.status}</strong>
          </div>

          <div className="agent-section">
            <h3>Delivery Agent</h3>

            {donation.agentId ? (
              <div className="agent-card">
                <p>
                  Name: <span>{donation.agentId.name}</span>
                </p>
                <p>
                  Phone: <span>{donation.agentId.phone}</span>
                </p>
              </div>
            ) : (
              <p className="loading">Agent not assigned yet</p>
            )}
          </div>

          {/* 🔙 BACK TO LOGGED-IN USER DASHBOARD */}
          <div className="back-btn-container">
            <Link
              to={user ? "/user/dashboard" : "/login"}
              className="back-dashboard-btn"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TrackDonation;
