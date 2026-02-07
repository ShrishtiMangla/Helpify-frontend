import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./userDashboard.css";
import { useNavigate } from "react-router-dom";


const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Sample donations data
  const donations = [
    {
      id: 'DN12345',
      type: 'money',
      title: 'Monthly Food Distribution Program',
      ngo: 'Hope Foundation',
      date: 'Jan 15, 2026',
      amount: '₹5,000',
      status: 'completed',
      icon: '💵'
    },
    {
      id: 'DN12344',
      type: 'goods',
      title: 'Educational Books & Stationery',
      ngo: "Children's Charity",
      date: 'Jan 10, 2026',
      amount: '50 items',
      status: 'completed',
      icon: '📚'
    },
    {
      id: 'DN12343',
      type: 'money',
      title: 'Medical Aid Fund',
      ngo: 'Health Care Trust',
      date: 'Jan 5, 2026',
      amount: '₹10,000',
      status: 'processing',
      icon: '💵'
    },
    {
      id: 'DN12342',
      type: 'goods',
      title: 'Winter Clothing Collection',
      ngo: 'Warmth for All',
      date: 'Dec 28, 2025',
      amount: '25 items',
      status: 'completed',
      icon: '👕'
    },
    {
      id: 'DN12341',
      type: 'money',
      title: 'Emergency Relief Fund',
      ngo: 'Disaster Relief Org',
      date: 'Dec 20, 2025',
      amount: '₹15,000',
      status: 'completed',
      icon: '💵'
    }
  ];

  const filteredDonations = donations.filter(donation =>
    activeFilter === 'all' || donation.type === activeFilter
  );

  if (!user) {
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <div className="dashboard-container-wrapper">
      <Header />
      <div className="py-8"></div>
      <main className="dashboard-container ">
        {/* User Profile Header */}
        <div className="user-header">
          <div className="user-info">
            <div className="user-avatar">
              {user?.username
                ?.split(" ")
                .map(n => n[0])
                .join("")
                .toUpperCase()}
            </div>

            <div className="user-details">
              <h1 className="user-name">
                Welcome {user?.username?.charAt(0).toUpperCase() + user?.username?.slice(1)}
              </h1>


              <p className="user-subtext">
                Making a difference, one contribution at a time
              </p>
              <div className="user-stats">
                <div className="stat-item">
                  <span className="stat-value">{user.totalDonations || 12}</span>
                  <span className="stat-label">Total Donations</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">₹{user.totalContributed || '45,000'}</span>
                  <span className="stat-label">Total Contributed</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{user.ngosSupported || 8}</span>
                  <span className="stat-label">NGOs Supported</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Donation Action Cards */}
        <div className="action-cards">
          <div className="action-card" onClick={() => console.log('Donate Goods')}>
            <div className="card-icon">📦</div>
            <h3 className="card-title">Donate Goods</h3>
            <p className="card-description">
              Contribute items like clothes, books, food, or other essentials to help those in need.
            </p>
            <button 
            onClick={()=>navigate("/ngos?type=goods")} className="btn-action">Donate Goods</button>
          </div>

          <div className="action-card" onClick={() => console.log('Donate Money')}>
            <div className="card-icon">💰</div>
            <h3 className="card-title">Donate Money</h3>
            <p className="card-description">
              Make a secure financial contribution to verified NGOs and track where your money goes.
            </p>
            <button
            onClick={()=>navigate("/ngos?type=money")} className="btn-action">Donate Money</button>
          </div>
        </div>

        {/* Past Donations Section */}
        <div className="section-header">
          <h2 className="section-title">Your Donation History</h2>
          <div className="filter-tabs">
            <button
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-tab ${activeFilter === 'money' ? 'active' : ''}`}
              onClick={() => setActiveFilter('money')}
            >
              Money
            </button>
            <button
              className={`filter-tab ${activeFilter === 'goods' ? 'active' : ''}`}
              onClick={() => setActiveFilter('goods')}
            >
              Goods
            </button>
          </div>
        </div>

        <div className="donations-list">
          {filteredDonations.length > 0 ? (
            filteredDonations.map(donation => (
              <div key={donation.id} className="donation-item">
                <div className={`donation-type ${donation.type}`}>
                  {donation.icon}
                </div>
                <div className="donation-details">
                  <h4 className="donation-title">{donation.title}</h4>
                  <div className="donation-meta">
                    <span>🏢 {donation.ngo}</span>
                    <span>📅 {donation.date}</span>
                    <span>🆔 #{donation.id}</span>
                  </div>
                </div>
                <div className="donation-amount-container">
                  <div className="donation-amount">{donation.amount}</div>
                  <span className={`status-badge ${donation.status}`}>
                    {donation.status === 'completed' ? '✓ Completed' : '⏳ Processing'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <p>No donations found for this filter</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;