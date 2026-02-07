import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./ngoDashboard.css";

const Ngo = () => {
  const [ngo, setNgo] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const storedNgo = localStorage.getItem("user");
    if (storedNgo) {
      setNgo(JSON.parse(storedNgo));
    }
  }, []);

  // Sample donations received data
  const donations = [
    {
      id: 'DN12345',
      type: 'money',
      title: 'Monthly Food Distribution Program',
      donor: 'Rajesh Kumar',
      donorEmail: 'rajesh.kumar@email.com',
      date: 'Jan 15, 2026',
      amount: '₹5,000',
      status: 'delivered',
      deliveryAgent: 'Amit Sharma',
      agentContact: '+91-9876543210',
      deliveryDate: 'Jan 16, 2026'
    },
    {
      id: 'DN12344',
      type: 'goods',
      title: 'Educational Books & Stationery',
      donor: 'Priya Singh',
      donorEmail: 'priya.singh@email.com',
      date: 'Jan 10, 2026',
      amount: '50 items',
      status: 'delivered',
      deliveryAgent: 'Vikram Patel',
      agentContact: '+91-9876543211',
      deliveryDate: 'Jan 12, 2026'
    },
    {
      id: 'DN12343',
      type: 'money',
      title: 'Medical Aid Fund',
      donor: 'Anita Desai',
      donorEmail: 'anita.desai@email.com',
      date: 'Jan 5, 2026',
      amount: '₹10,000',
      status: 'processing',
      deliveryAgent: 'Rohit Verma',
      agentContact: '+91-9876543212',
      deliveryDate: 'Pending'
    },
    {
      id: 'DN12342',
      type: 'goods',
      title: 'Winter Clothing Collection',
      donor: 'Suresh Reddy',
      donorEmail: 'suresh.reddy@email.com',
      date: 'Dec 28, 2025',
      amount: '25 items',
      status: 'delivered',
      deliveryAgent: 'Kiran Kumar',
      agentContact: '+91-9876543213',
      deliveryDate: 'Dec 30, 2025'
    },
    {
      id: 'DN12341',
      type: 'money',
      title: 'Emergency Relief Fund',
      donor: 'Meena Iyer',
      donorEmail: 'meena.iyer@email.com',
      date: 'Dec 20, 2025',
      amount: '₹15,000',
      status: 'delivered',
      deliveryAgent: 'Deepak Joshi',
      agentContact: '+91-9876543214',
      deliveryDate: 'Dec 21, 2025'
    },
    {
      id: 'DN12340',
      type: 'goods',
      title: 'Food Supplies',
      donor: 'Arjun Malhotra',
      donorEmail: 'arjun.m@email.com',
      date: 'Dec 15, 2025',
      amount: '100 items',
      status: 'delivered',
      deliveryAgent: 'Sandeep Rao',
      agentContact: '+91-9876543215',
      deliveryDate: 'Dec 17, 2025'
    },
    {
      id: 'DN12339',
      type: 'money',
      title: 'Education Scholarship Fund',
      donor: 'Kavita Nair',
      donorEmail: 'kavita.nair@email.com',
      date: 'Dec 10, 2025',
      amount: '₹8,000',
      status: 'delivered',
      deliveryAgent: 'Manoj Singh',
      agentContact: '+91-9876543216',
      deliveryDate: 'Dec 11, 2025'
    }
  ];

  const filteredDonations = donations.filter(donation => 
    activeFilter === 'all' || donation.type === activeFilter
  );

  // Calculate statistics
  const totalDonations = donations.length;
  const totalMoneyDonations = donations.filter(d => d.type === 'money').length;
  const totalGoodsDonations = donations.filter(d => d.type === 'goods').length;
  const uniqueDonors = [...new Set(donations.map(d => d.donor))].length;
  
  const totalMoneyReceived = donations
    .filter(d => d.type === 'money')
    .reduce((sum, d) => sum + parseInt(d.amount.replace(/[₹,]/g, '')), 0);

  if (!ngo) {
    return <p className="ngo-loading-text">Loading...</p>;
  }

  return (
    <div className="ngo-dashboard-container-wrapper">
      <Header />
    <div className="py-8"></div>
      <main className="ngo-dashboard-container">
        {/* NGO Profile Header */}
        <div className="ngo-header">
          <div className="ngo-info">
            <div className="ngo-avatar">
              {ngo.name ? ngo.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'NG'}
            </div>
            <div className="ngo-details">
              <h1 className="ngo-name">{ngo.name?.charAt(0).toUpperCase() + ngo.name?.slice(1)}</h1>
              <span className="ngo-type">
                {ngo.type || 'Non-Profit Organization'} • Verified ✓
              </span>
              <div className="ngo-stats">
                <div className="ngo-stat-item">
                  <span className="ngo-stat-value">{totalDonations}</span>
                  <span className="ngo-stat-label">Total Donations</span>
                </div>
                <div className="ngo-stat-item">
                  <span className="ngo-stat-value">₹{totalMoneyReceived.toLocaleString()}</span>
                  <span className="ngo-stat-label">Total Received</span>
                </div>
                <div className="ngo-stat-item">
                  <span className="ngo-stat-value">{uniqueDonors}</span>
                  <span className="ngo-stat-label">Active Donors</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="quick-stats">
          <div className="stat-card money">
            <div className="stat-card-header">
              <div className="stat-card-icon money">💰</div>
            </div>
            <div className="stat-card-value">₹{totalMoneyReceived.toLocaleString()}</div>
            <div className="stat-card-label">Money Donations ({totalMoneyDonations})</div>
          </div>

          <div className="stat-card goods">
            <div className="stat-card-header">
              <div className="stat-card-icon goods">📦</div>
            </div>
            <div className="stat-card-value">{totalGoodsDonations}</div>
            <div className="stat-card-label">Goods Donations Received</div>
          </div>

          <div className="stat-card users">
            <div className="stat-card-header">
              <div className="stat-card-icon users">👥</div>
            </div>
            <div className="stat-card-value">{uniqueDonors}</div>
            <div className="stat-card-label">Unique Donors</div>
          </div>
        </div>

        {/* Donations Received Section */}
        <div className="ngo-section-header">
          <h2 className="ngo-section-title">Donations Received</h2>
          <div className="ngo-filter-tabs">
            <button 
              className={`ngo-filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`ngo-filter-tab ${activeFilter === 'money' ? 'active' : ''}`}
              onClick={() => setActiveFilter('money')}
            >
              Money
            </button>
            <button 
              className={`ngo-filter-tab ${activeFilter === 'goods' ? 'active' : ''}`}
              onClick={() => setActiveFilter('goods')}
            >
              Goods
            </button>
          </div>
        </div>

        <div className="ngo-donations-list">
          {filteredDonations.length > 0 ? (
            filteredDonations.map(donation => (
              <div key={donation.id} className="ngo-donation-item">
                <div className="ngo-donation-header">
                  <div className="ngo-donation-main">
                    <span className={`ngo-donation-type-badge ${donation.type}`}>
                      {donation.type === 'money' ? '💵 Money' : '📦 Goods'}
                    </span>
                    <h4 className="ngo-donation-title">{donation.title}</h4>
                  </div>
                  <div className="ngo-donation-amount">{donation.amount}</div>
                </div>

                <div className="ngo-donation-details">
                  <div className="ngo-detail-item">
                    <span className="ngo-detail-label">Donor</span>
                    <span className="ngo-detail-value">
                      👤 {donation.donor}
                    </span>
                    <span className="ngo-detail-value" style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      📧 {donation.donorEmail}
                    </span>
                  </div>

                  <div className="ngo-detail-item">
                    <span className="ngo-detail-label">Delivery Agent</span>
                    <span className="ngo-detail-value">
                      🚚 {donation.deliveryAgent}
                    </span>
                    <span className="ngo-detail-value" style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      📞 {donation.agentContact}
                    </span>
                  </div>

                  <div className="ngo-detail-item">
                    <span className="ngo-detail-label">Dates</span>
                    <span className="ngo-detail-value">
                      📅 Donated: {donation.date}
                    </span>
                    <span className="ngo-detail-value" style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      🚚 Delivered: {donation.deliveryDate}
                    </span>
                  </div>

                  <div className="ngo-detail-item">
                    <span className="ngo-detail-label">Status</span>
                    <span className={`ngo-status-badge ${donation.status}`}>
                      {donation.status === 'delivered' ? '✓ Delivered' : 
                       donation.status === 'processing' ? '⏳ Processing' : 
                       '✓ Completed'}
                    </span>
                    <span className="ngo-detail-value" style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      🆔 #{donation.id}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="ngo-empty-state">
              <div className="ngo-empty-state-icon">📭</div>
              <p>No donations found for this filter</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Ngo;