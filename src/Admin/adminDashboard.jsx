import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./adminDashboard.css";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [donations, setDonations] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  /* =====================
     LOAD ADMIN
  ====================== */
  useEffect(() => {
    const storedAdmin = localStorage.getItem("user");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  /* =====================
     FETCH DONATIONS (ADMIN)
  ====================== */
  useEffect(() => {
    if (!admin) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/admin/donations`, {
      method: "GET",
      credentials: "include",
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
  }, [admin]);

  if (!admin || loading) {
    return <p className="admin-loading-text">Loading...</p>;
  }

  /* =====================
     CALCULATE STATS
  ====================== */
  const totalDonations = donations.length;
  const completedDeliveries = donations.filter(d => d.status === "delivered");
  const pendingDeliveries = donations.filter(d => d.status === "pending");
  const pickedDeliveries = donations.filter(d => d.status === "picked");
  
  const moneyDonations = donations.filter(d => d.donationType === "money");
  const goodsDonations = donations.filter(d => d.donationType === "goods");
  
  const totalMoneyReceived = moneyDonations
    .filter(d => d.status === "completed")
    .reduce((sum, d) => sum + (d.amount || 0), 0);

  /* =====================
     GET DATA BY TAB
  ====================== */
  const getCurrentData = () => {
    switch (activeTab) {
      case "overview":
        return donations;
      case "completed":
        return completedDeliveries;
      case "pending":
        return [...pendingDeliveries, ...pickedDeliveries];
      case "money":
        return moneyDonations;
      case "goods":
        return goodsDonations;
      default:
        return donations;
    }
  };

  const currentData = getCurrentData();

  return (
    <div className="admin-dashboard-container-wrapper">
      <Header />
      <div className="py-8"></div>

      <main className="admin-dashboard-container">

        {/* ================= ADMIN HEADER ================= */}
        <div className="admin-header">
          <div className="admin-info">
            <div className="admin-avatar">
              {admin.name
                ?.split(" ")
                .map(n => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </div>

            <div className="admin-details">
              <h1 className="admin-name">
                {admin.name?.charAt(0).toUpperCase() + admin.name?.slice(1)}
              </h1>

              <p className="admin-badge">
                👑 System Administrator • Full Access
              </p>

              <div className="admin-stats">
                <div className="admin-stat-item">
                  <span className="admin-stat-value">{totalDonations}</span>
                  <span className="admin-stat-label">Total Donations</span>
                </div>
                <div className="admin-stat-item">
                  <span className="admin-stat-value">{completedDeliveries.length}</span>
                  <span className="admin-stat-label">Completed</span>
                </div>
                <div className="admin-stat-item">
                  <span className="admin-stat-value">{pendingDeliveries.length + pickedDeliveries.length}</span>
                  <span className="admin-stat-label">Pending</span>
                </div>
                <div className="admin-stat-item">
                  <span className="admin-stat-value">₹{totalMoneyReceived.toLocaleString()}</span>
                  <span className="admin-stat-label">Money Processed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= QUICK STATS CARDS ================= */}
        <div className="admin-quick-stats">
          <div className="admin-stat-card completed">
            <div className="admin-stat-card-header">
              <div className="admin-stat-card-icon completed">✅</div>
            </div>
            <div className="admin-stat-card-value">{completedDeliveries.length}</div>
            <div className="admin-stat-card-label">Completed Deliveries</div>
          </div>

          <div className="admin-stat-card pending">
            <div className="admin-stat-card-header">
              <div className="admin-stat-card-icon pending">⏳</div>
            </div>
            <div className="admin-stat-card-value">{pendingDeliveries.length + pickedDeliveries.length}</div>
            <div className="admin-stat-card-label">Pending Deliveries</div>
          </div>

          <div className="admin-stat-card money">
            <div className="admin-stat-card-header">
              <div className="admin-stat-card-icon money">💰</div>
            </div>
            <div className="admin-stat-card-value">{moneyDonations.length}</div>
            <div className="admin-stat-card-label">Money Donations</div>
          </div>

          <div className="admin-stat-card goods">
            <div className="admin-stat-card-header">
              <div className="admin-stat-card-icon goods">📦</div>
            </div>
            <div className="admin-stat-card-value">{goodsDonations.length}</div>
            <div className="admin-stat-card-label">Goods Donations</div>
          </div>
        </div>

        {/* ================= TABS (NO FILTER) ================= */}
        <div className="admin-tabs-container">
          <div className="admin-main-tabs">
            <button
              className={`admin-main-tab ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              📊 Overview
            </button>

            <button
              className={`admin-main-tab ${activeTab === "completed" ? "active" : ""}`}
              onClick={() => setActiveTab("completed")}
            >
              ✅ Completed
            </button>

            <button
              className={`admin-main-tab ${activeTab === "pending" ? "active" : ""}`}
              onClick={() => setActiveTab("pending")}
            >
              ⏳ Pending
            </button>

            <button
              className={`admin-main-tab ${activeTab === "money" ? "active" : ""}`}
              onClick={() => setActiveTab("money")}
            >
              💰 Money
            </button>

            <button
              className={`admin-main-tab ${activeTab === "goods" ? "active" : ""}`}
              onClick={() => setActiveTab("goods")}
            >
              📦 Goods
            </button>
          </div>
        </div>

        {/* ================= SECTION HEADER (NO FILTER) ================= */}
        <div className="admin-section-header">
          <h2 className="admin-section-title">
            {activeTab === "overview" && "All Donations"}
            {activeTab === "completed" && "Completed Deliveries"}
            {activeTab === "pending" && "Pending Deliveries"}
            {activeTab === "money" && "Money Donations"}
            {activeTab === "goods" && "Goods Donations"}
          </h2>
          
          <div className="admin-section-info">
            <span className="admin-count-badge">
              {currentData.length} {currentData.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {/* ================= DONATIONS LIST ================= */}
        <div className="admin-deliveries-list">
          {currentData.length ? (
            currentData.map(item => (
              <div key={item._id} className="admin-delivery-item">

                <div className="admin-delivery-header">
                  <div className="admin-delivery-main">
                    <div className="admin-delivery-badges">
                      <span className={`admin-delivery-type-badge ${item.donationType}`}>
                        {item.donationType === "money" ? "💰 Money" : "📦 Goods"}
                      </span>
                      <span className={`admin-status-badge ${item.status}`}>
                        {item.status === "delivered" && "✓ Delivered"}
                        {item.status === "pending" && "⏳ Pending"}
                        {item.status === "picked" && "🚚 Picked Up"}
                      </span>
                    </div>

                    <h4 className="admin-delivery-title">
                      {item.donationType === "money"
                        ? `₹${item.amount?.toLocaleString()} Donation`
                        : item.items || "Goods Donation"}
                    </h4>

                    <div className="admin-delivery-id">
                      ID: #{item._id?.slice(-8).toUpperCase()}
                    </div>
                  </div>

                  <div className="admin-delivery-amount">
                    {item.donationType === "money"
                      ? `₹${item.amount?.toLocaleString()}`
                      : "Goods"}
                  </div>
                </div>

                <div className="admin-delivery-details">

                  {/* DONOR */}
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Donor</span>
                    <span className="admin-detail-value">
                      👤 {item.donorId?.username || item.donorId?.name || "Unknown"}
                    </span>
                    {item.donorId?.email && (
                      <span className="admin-detail-value-secondary">
                        {item.donorId.email}
                      </span>
                    )}
                  </div>

                  {/* NGO */}
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">NGO</span>
                    <span className="admin-detail-value">
                      🏢 {item.ngoId?.name || "Unknown"}
                    </span>
                    {item.ngoId?.phone && (
                      <span className="admin-detail-value-secondary">
                        📞 {item.ngoId.phone}
                      </span>
                    )}
                  </div>

                  {/* AGENT */}
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Delivery Agent</span>
                    <span className="admin-detail-value">
                      {item.agentId ? (
                        <>🚚 {item.agentId.name}</>
                      ) : (
                        <span className="admin-not-assigned">Not Assigned</span>
                      )}
                    </span>
                    {item.agentId?.phone && (
                      <span className="admin-detail-value-secondary">
                        📞 {item.agentId.phone}
                      </span>
                    )}
                  </div>

                  {/* DATE */}
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Created</span>
                    <span className="admin-detail-value">
                      📅 {new Date(item.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="admin-detail-value-secondary">
                      {new Date(item.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="admin-empty-state">
              <div className="admin-empty-state-icon">📭</div>
              <p>No donations found in this category</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;