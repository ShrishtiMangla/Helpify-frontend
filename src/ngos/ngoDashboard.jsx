import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./ngoDashboard.css";

const Ngo = () => {
  const [ngo, setNgo] = useState(null);
  const [donations, setDonations] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // get NGO from localStorage
  useEffect(() => {
    const storedNgo = localStorage.getItem("user");
    if (storedNgo) {
      setNgo(JSON.parse(storedNgo));
    }
  }, []);

  // fetch donations
  useEffect(() => {
    if (!ngo) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/ngo/donations`, {
      method: "GET",
      credentials: "include",
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch donations");
        return res.json();
      })
      .then(data => {
        setDonations(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("NGO DASHBOARD ERROR 👉", err);
        setLoading(false);
      });
  }, [ngo]);

  if (!ngo) {
    return <p className="ngo-loading-text">NGO not logged in</p>;
  }

  if (loading) {
    return <p className="ngo-loading-text">Loading donations...</p>;
  }

  // filter
  const filteredDonations =
    activeFilter === "all"
      ? donations
      : donations.filter(d => d.donationType === activeFilter);

  // stats
  const totalDonations = donations.length;
  const moneyDonations = donations.filter(d => d.donationType === "money");
  const goodsDonations = donations.filter(d => d.donationType === "goods");

  const totalMoneyReceived = moneyDonations.reduce(
    (sum, d) => sum + (d.amount || 0),
    0
  );

  const uniqueDonors = new Set(
    donations.map(d => d.donorId?._id)
  ).size;

  return (
    <div className="ngo-dashboard-container-wrapper">
      <Header />
      <div className="py-8"></div>

      <main className="ngo-dashboard-container">
        {/* NGO HEADER */}
        <div className="ngo-header">
          <div className="ngo-info">
            <div className="ngo-avatar">
              {ngo.name
                ?.split(" ")
                .map(n => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div className="ngo-details">
              <h1 className="ngo-name">{ngo.name}</h1>
              <span className="ngo-type">Verified NGO ✓</span>

              <div className="ngo-stats">
                <div className="ngo-stat-item">
                  <span className="ngo-stat-value">{totalDonations}</span>
                  <span className="ngo-stat-label">Total Donations</span>
                </div>
                <div className="ngo-stat-item">
                  <span className="ngo-stat-value">
                    ₹{totalMoneyReceived.toLocaleString()}
                  </span>
                  <span className="ngo-stat-label">Money Received</span>
                </div>
                <div className="ngo-stat-item">
                  <span className="ngo-stat-value">{uniqueDonors}</span>
                  <span className="ngo-stat-label">Unique Donors</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FILTER */}
        <div className="ngo-section-header">
          <h2 className="ngo-section-title">Donations Received</h2>
          <div className="ngo-filter-tabs">
            {["all", "money", "goods"].map(type => (
              <button
                key={type}
                className={`ngo-filter-tab ${
                  activeFilter === type ? "active" : ""
                }`}
                onClick={() => setActiveFilter(type)}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* DONATION LIST */}
        <div className="ngo-donations-list">
          {filteredDonations.length ? (
            filteredDonations.map(d => (
              <div key={d._id} className="ngo-donation-item">
                <div className="ngo-donation-header">
                  <span className={`ngo-donation-type-badge ${d.donationType}`}>
                    {d.donationType === "money" ? "💰 Money" : "📦 Goods"}
                  </span>

                  <div className="ngo-donation-amount">
                    {d.donationType === "money"
                      ? `₹${d.amount?.toLocaleString()}`
                      : d.items}
                  </div>
                </div>

                <div className="ngo-donation-details">
                  <div className="ngo-detail-item">
                    <span className="ngo-detail-label">Donor</span>
                    <span className="ngo-detail-value">
                      👤 {d.donorId?.username}
                    </span>
                    <span className="ngo-detail-value">
                      📧 {d.donorId?.email}
                    </span>
                  </div>

                  <div className="ngo-detail-item">
                    <span className="ngo-detail-label">Agent</span>
                    {d.agentId ? (
                      <>
                        <span className="ngo-detail-value">
                          🚚 {d.agentId.name}
                        </span>
                        <span className="ngo-detail-value">
                          📞 {d.agentId.phone}
                        </span>
                      </>
                    ) : (
                      <span className="ngo-detail-value">Not Assigned</span>
                    )}
                  </div>

                  <div className="ngo-detail-item">
                    <span className="ngo-detail-label">Status</span>
                    <span className={`ngo-status-badge ${d.status}`}>
                      {d.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="ngo-empty-state">
              <p>No donations found</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Ngo;
