import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./deliveryAgentDashboard.css";

const DeliveryAgentDashboard = () => {
  const [agent, setAgent] = useState(null);
  const [donations, setDonations] = useState([]);
  const [activeTab, setActiveTab] = useState("completed");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // get logged-in agent
  useEffect(() => {
    const storedAgent = localStorage.getItem("user");
    if (storedAgent) {
      setAgent(JSON.parse(storedAgent));
    }
  }, []);

useEffect(() => {
  if (!agent) return;

  fetch(`${import.meta.env.VITE_API_URL}/api/agent/donations`, {
    method: "GET",
    credentials: "include", // ✅ THIS SENDS COOKIES
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
}, [agent]);



  if (!agent || loading) {
    return <p className="agent-loading-text">Loading...</p>;
  }

  // 🔹 split by status
  const completedDeliveries = donations.filter(
    d => d.status === "completed"
  );

  const scheduledDeliveries = donations.filter(
    d => d.status === "pending" || d.status === "scheduled"
  );

  const currentDeliveries =
    activeTab === "completed"
      ? completedDeliveries
      : scheduledDeliveries;

  // 🔹 filter by type
  const filteredDeliveries = currentDeliveries.filter(
    d => activeFilter === "all" || d.donationType === activeFilter
  );

  // 🔹 stats
  const totalCompleted = completedDeliveries.length;
  const totalScheduled = scheduledDeliveries.length;
  const totalDeliveries = totalCompleted + totalScheduled;

  return (
    <div className="agent-dashboard-container-wrapper">
      <Header />
      <div className="py-8"></div>

      <main className="agent-dashboard-container">
        {/* Agent Profile Header */}
        <div className="agent-header">
          <div className="agent-info">
            <div className="agent-avatar">
              {agent.name
                ? agent.name
                    .split(" ")
                    .map(n => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)
                : "DA"}
            </div>

            <div className="agent-details">
              <h1 className="agent-name">
                {agent.name?.charAt(0).toUpperCase() + agent.name?.slice(1)}
              </h1>

              <span className="agent-badge">
                🚚 Active Delivery Agent • Verified ✓
              </span>

              <div className="agent-stats">
                <div className="agent-stat-item">
                  <span className="agent-stat-value">{totalDeliveries}</span>
                  <span className="agent-stat-label">Total Deliveries</span>
                </div>
                <div className="agent-stat-item">
                  <span className="agent-stat-value">{totalCompleted}</span>
                  <span className="agent-stat-label">Completed</span>
                </div>
                <div className="agent-stat-item">
                  <span className="agent-stat-value">{totalScheduled}</span>
                  <span className="agent-stat-label">Scheduled</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="agent-quick-stats">
          <div className="agent-stat-card completed">
            <div className="agent-stat-card-header">
              <div className="agent-stat-card-icon completed">✅</div>
            </div>
            <div className="agent-stat-card-value">{totalCompleted}</div>
            <div className="agent-stat-card-label">Completed Deliveries</div>
          </div>

          <div className="agent-stat-card pending">
            <div className="agent-stat-card-header">
              <div className="agent-stat-card-icon pending">📅</div>
            </div>
            <div className="agent-stat-card-value">{totalScheduled}</div>
            <div className="agent-stat-card-label">Scheduled Deliveries</div>
          </div>

          <div className="agent-stat-card total">
            <div className="agent-stat-card-header">
              <div className="agent-stat-card-icon total">📦</div>
            </div>
            <div className="agent-stat-card-value">{totalDeliveries}</div>
            <div className="agent-stat-card-label">Total Assignments</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="agent-tabs-container">
          <div className="agent-main-tabs">
            <button
              className={`agent-main-tab ${
                activeTab === "completed" ? "active" : ""
              }`}
              onClick={() => setActiveTab("completed")}
            >
              ✅ Completed Deliveries
            </button>

            <button
              className={`agent-main-tab ${
                activeTab === "scheduled" ? "active" : ""
              }`}
              onClick={() => setActiveTab("scheduled")}
            >
              📅 Scheduled Deliveries
            </button>
          </div>
        </div>

        {/* Deliveries */}
        <div className="agent-section-header">
          <h2 className="agent-section-title">
            {activeTab === "completed"
              ? "Completed Deliveries"
              : "Scheduled Deliveries"}
          </h2>

          <div className="agent-filter-tabs">
            {["all", "money", "goods"].map(type => (
              <button
                key={type}
                className={`agent-filter-tab ${
                  activeFilter === type ? "active" : ""
                }`}
                onClick={() => setActiveFilter(type)}
              >
                {type === "all" ? "All" : type}
              </button>
            ))}
          </div>
        </div>

        <div className="agent-deliveries-list">
          {filteredDeliveries.length > 0 ? (
            filteredDeliveries.map(d => (
              <div key={d._id} className="agent-delivery-item">
                <div className="agent-delivery-header">
                  <div className="agent-delivery-main">
                    {activeTab === "scheduled" && (
                      <div className="scheduled-delivery-time">
                        🕒 {d.scheduledDate} at {d.scheduledTime}
                      </div>
                    )}

                    <span
                      className={`agent-delivery-type-badge ${d.donationType}`}
                    >
                      {d.donationType === "money" ? "💵 Money" : "📦 Goods"}
                    </span>

                    <h4 className="agent-delivery-title">
                      Donation #{d._id.slice(-6)}
                    </h4>

                    <div className="agent-delivery-route">
                      <span>📍 {d.pickupLocation}</span>
                      <span className="agent-delivery-route-arrow">→</span>
                      <span>🏢 {d.deliveryLocation}</span>
                    </div>
                  </div>

                  <div className="agent-delivery-amount">{d.amount}</div>
                </div>

                <div className="agent-delivery-details">
                  <div className="agent-detail-item">
                    <span className="agent-detail-label">Donor Details</span>
                    <span className="agent-detail-value">
                      👤 {d.donorId?.name}
                    </span>
                    <span className="agent-detail-value">
                      📞 {d.donorId?.phone}
                    </span>
                  </div>

                  <div className="agent-detail-item">
                    <span className="agent-detail-label">NGO Details</span>
                    <span className="agent-detail-value">
                      🏢 {d.ngoId?.name}
                    </span>
                    <span className="agent-detail-value">
                      📞 {d.ngoId?.phone}
                    </span>
                  </div>

                  <div className="agent-detail-item">
                    <span className="agent-detail-label">Status</span>
                    <span className={`agent-status-badge ${d.status}`}>
                      {d.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="agent-empty-state">
              <div className="agent-empty-state-icon">📭</div>
              <p>No deliveries found for this filter</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DeliveryAgentDashboard;
