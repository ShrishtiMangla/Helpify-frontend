import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./userDashboard.css";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // 🔹 Load logged-in user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔹 Fetch user donations (PROTECTED ROUTE)
  useEffect(() => {
    if (!user) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/user/donations`, {
      method: "GET",
      credentials: "include", // 🔥 sends JWT cookie
    })
      .then(res => res.json())
      .then(data => {
        setDonations(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (!user || loading) {
    return <p className="loading-text">Loading...</p>;
  }

  /* =====================
     🔢 DYNAMIC STATS
  ====================== */
  const totalDonations = donations.length;

  const totalContributed = donations
    .filter(d => d.donationType === "money")
    .reduce((sum, d) => sum + (d.amount || 0), 0);

  const ngosSupported = new Set(
    donations.map(d => d.ngoId?._id)
  ).size;

  /* =====================
     🔍 FILTER DONATIONS
  ====================== */
  const filteredDonations =
    activeFilter === "all"
      ? donations
      : donations.filter(d => d.donationType === activeFilter);

  return (
    <div className="dashboard-container-wrapper">
      <Header />
      <div className="py-8"></div>

      <main className="dashboard-container">
        {/* ================= USER HEADER ================= */}
        <div className="user-header">
          <div className="user-info">
            <div className="user-avatar">
              {user.username
                ?.split(" ")
                .map(n => n[0])
                .join("")
                .toUpperCase()}
            </div>

            <div className="user-details">
              <h1 className="user-name">
                Welcome {user.username}
              </h1>

              <p className="user-subtext">
                Making a difference, one contribution at a time
              </p>

              <div className="user-stats">
                <div className="stat-item">
                  <span className="stat-value">{totalDonations}</span>
                  <span className="stat-label">Total Donations</span>
                </div>

                <div className="stat-item">
                  <span className="stat-value">
                    ₹{totalContributed.toLocaleString()}
                  </span>
                  <span className="stat-label">Total Contributed</span>
                </div>

                <div className="stat-item">
                  <span className="stat-value">{ngosSupported}</span>
                  <span className="stat-label">NGOs Supported</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ACTION CARDS ================= */}
        <div className="action-cards">
          <div className="action-card">
            <div className="card-icon">📦</div>
            <h3 className="card-title">Donate Goods</h3>
            <p className="card-description">
              Contribute items like clothes, books, food, or essentials.
            </p>
            <button
              className="btn-action"
              onClick={() => navigate("/ngos?type=goods")}
            >
              Donate Goods
            </button>
          </div>

          <div className="action-card">
            <div className="card-icon">💰</div>
            <h3 className="card-title">Donate Money</h3>
            <p className="card-description">
              Make secure financial contributions to verified NGOs.
            </p>
            <button
              className="btn-action"
              onClick={() => navigate("/ngos?type=money")}
            >
              Donate Money
            </button>
          </div>
        </div>

        {/* ================= DONATION HISTORY ================= */}
        <div className="section-header">
          <h2 className="section-title">Your Donation History</h2>

          <div className="filter-tabs">
            {["all", "money", "goods"].map(type => (
              <button
                key={type}
                className={`filter-tab ${
                  activeFilter === type ? "active" : ""
                }`}
                onClick={() => setActiveFilter(type)}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="donations-list">
          {filteredDonations.length ? (
            filteredDonations.map(d => (
              <div key={d._id} className="donation-item">
                <div className={`donation-type ${d.donationType}`}>
                  {d.donationType === "money" ? "💰" : "📦"}
                </div>

                <div className="donation-details">
                  <h4 className="donation-title">
                    {d.donationType === "money"
                      ? "Money Donation"
                      : d.items}
                  </h4>

                  <div className="donation-meta">
                    <span>🏢 {d.ngoId?.name}</span>
                    <span>
                      📅 {new Date(d.createdAt).toLocaleDateString()}
                    </span>
                    <span>🆔 #{d._id.slice(-6)}</span>
                  </div>
                </div>

                <div className="donation-amount-container">
                  <div className="donation-amount">
                    {d.donationType === "money"
                      ? `₹${d.amount}`
                      : "Goods"}
                  </div>

                  <span className={`status-badge ${d.status}`}>
                    {d.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <p>No donations found</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;
