import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./deliveryAgentDashboard.css";

const DeliveryAgentDashboard = () => {
  const [agent, setAgent] = useState(null);
  const [activeTab, setActiveTab] = useState('completed'); // completed or scheduled
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const storedAgent = localStorage.getItem("user");
    if (storedAgent) {
      setAgent(JSON.parse(storedAgent));
    }
  }, []);

  // Sample completed deliveries data
  const completedDeliveries = [
    {
      id: 'DN12345',
      type: 'money',
      title: 'Monthly Food Distribution Program',
      donor: 'Rajesh Kumar',
      donorContact: '+91-9876543210',
      ngo: 'Hope Foundation',
      ngoContact: '+91-9876543220',
      date: 'Jan 15, 2026',
      deliveryDate: 'Jan 16, 2026',
      amount: '₹5,000',
      status: 'completed',
      pickupLocation: 'Sector 15, Noida',
      deliveryLocation: 'Sector 62, Noida'
    },
    {
      id: 'DN12344',
      type: 'goods',
      title: 'Educational Books & Stationery',
      donor: 'Priya Singh',
      donorContact: '+91-9876543211',
      ngo: "Children's Charity",
      ngoContact: '+91-9876543221',
      date: 'Jan 10, 2026',
      deliveryDate: 'Jan 12, 2026',
      amount: '50 items',
      status: 'completed',
      pickupLocation: 'Dwarka, Delhi',
      deliveryLocation: 'Connaught Place, Delhi'
    },
    {
      id: 'DN12342',
      type: 'goods',
      title: 'Winter Clothing Collection',
      donor: 'Suresh Reddy',
      donorContact: '+91-9876543212',
      ngo: 'Warmth for All',
      ngoContact: '+91-9876543222',
      date: 'Dec 28, 2025',
      deliveryDate: 'Dec 30, 2025',
      amount: '25 items',
      status: 'completed',
      pickupLocation: 'Gurgaon Sector 14',
      deliveryLocation: 'Mehrauli, Delhi'
    },
    {
      id: 'DN12341',
      type: 'money',
      title: 'Emergency Relief Fund',
      donor: 'Meena Iyer',
      donorContact: '+91-9876543213',
      ngo: 'Disaster Relief Org',
      ngoContact: '+91-9876543223',
      date: 'Dec 20, 2025',
      deliveryDate: 'Dec 21, 2025',
      amount: '₹15,000',
      status: 'completed',
      pickupLocation: 'Vasant Kunj, Delhi',
      deliveryLocation: 'Saket, Delhi'
    },
    {
      id: 'DN12340',
      type: 'goods',
      title: 'Food Supplies',
      donor: 'Arjun Malhotra',
      donorContact: '+91-9876543214',
      ngo: 'Food Bank India',
      ngoContact: '+91-9876543224',
      date: 'Dec 15, 2025',
      deliveryDate: 'Dec 17, 2025',
      amount: '100 items',
      status: 'completed',
      pickupLocation: 'Rohini, Delhi',
      deliveryLocation: 'Karol Bagh, Delhi'
    }
  ];

  // Sample scheduled deliveries data
  const scheduledDeliveries = [
    {
      id: 'DN12346',
      type: 'money',
      title: 'Health Care Support Fund',
      donor: 'Vikram Sharma',
      donorContact: '+91-9876543215',
      ngo: 'Health First Foundation',
      ngoContact: '+91-9876543225',
      scheduledDate: 'Jan 20, 2026',
      scheduledTime: '10:00 AM',
      amount: '₹12,000',
      status: 'scheduled',
      priority: 'high',
      pickupLocation: 'Greater Kailash, Delhi',
      deliveryLocation: 'Lajpat Nagar, Delhi'
    },
    {
      id: 'DN12347',
      type: 'goods',
      title: 'School Supplies Donation',
      donor: 'Sneha Kapoor',
      donorContact: '+91-9876543216',
      ngo: 'Education for All',
      ngoContact: '+91-9876543226',
      scheduledDate: 'Jan 21, 2026',
      scheduledTime: '2:00 PM',
      amount: '75 items',
      status: 'scheduled',
      priority: 'medium',
      pickupLocation: 'Sarita Vihar, Delhi',
      deliveryLocation: 'Nehru Place, Delhi'
    },
    {
      id: 'DN12348',
      type: 'money',
      title: 'Animal Welfare Fund',
      donor: 'Ramesh Gupta',
      donorContact: '+91-9876543217',
      ngo: 'Animal Care Society',
      ngoContact: '+91-9876543227',
      scheduledDate: 'Jan 22, 2026',
      scheduledTime: '11:30 AM',
      amount: '₹8,500',
      status: 'scheduled',
      priority: 'low',
      pickupLocation: 'Pitampura, Delhi',
      deliveryLocation: 'Model Town, Delhi'
    },
    {
      id: 'DN12349',
      type: 'goods',
      title: 'Medical Equipment Donation',
      donor: 'Anjali Verma',
      donorContact: '+91-9876543218',
      ngo: 'Health Care Trust',
      ngoContact: '+91-9876543228',
      scheduledDate: 'Jan 23, 2026',
      scheduledTime: '9:00 AM',
      amount: '15 items',
      status: 'scheduled',
      priority: 'high',
      pickupLocation: 'Janakpuri, Delhi',
      deliveryLocation: 'Rajouri Garden, Delhi'
    },
    {
      id: 'DN12350',
      type: 'goods',
      title: 'Blanket Distribution',
      donor: 'Kiran Kumar',
      donorContact: '+91-9876543219',
      ngo: 'Winter Relief Org',
      ngoContact: '+91-9876543229',
      scheduledDate: 'Jan 24, 2026',
      scheduledTime: '3:30 PM',
      amount: '40 items',
      status: 'scheduled',
      priority: 'medium',
      pickupLocation: 'Shahdara, Delhi',
      deliveryLocation: 'Mayur Vihar, Delhi'
    }
  ];

  const currentDeliveries = activeTab === 'completed' ? completedDeliveries : scheduledDeliveries;
  
  const filteredDeliveries = currentDeliveries.filter(delivery => 
    activeFilter === 'all' || delivery.type === activeFilter
  );

  // Calculate statistics
  const totalCompleted = completedDeliveries.length;
  const totalScheduled = scheduledDeliveries.length;
  const totalDeliveries = totalCompleted + totalScheduled;

  if (!agent) {
    return <p className="agent-loading-text">Loading...</p>;
  }

  return (
    <div className="agent-dashboard-container-wrapper">
      <Header />
    <div className="py-8"></div>
      <main className="agent-dashboard-container">
        {/* Agent Profile Header */}
        <div className="agent-header">
          <div className="agent-info">
            <div className="agent-avatar">
              {agent.name ? agent.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'DA'}
            </div>
            <div className="agent-details">
              <h1 className="agent-name">{agent.name?.charAt(0).toUpperCase() + agent.name?.slice(1)}</h1>
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

        {/* Main Tabs */}
        <div className="agent-tabs-container">
          <div className="agent-main-tabs">
            <button 
              className={`agent-main-tab ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              ✅ Completed Deliveries
            </button>
            <button 
              className={`agent-main-tab ${activeTab === 'scheduled' ? 'active' : ''}`}
              onClick={() => setActiveTab('scheduled')}
            >
              📅 Scheduled Deliveries
            </button>
          </div>
        </div>

        {/* Deliveries Section */}
        <div className="agent-section-header">
          <h2 className="agent-section-title">
            {activeTab === 'completed' ? 'Completed Deliveries' : 'Scheduled Deliveries'}
          </h2>
          <div className="agent-filter-tabs">
            <button 
              className={`agent-filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`agent-filter-tab ${activeFilter === 'money' ? 'active' : ''}`}
              onClick={() => setActiveFilter('money')}
            >
              Money
            </button>
            <button 
              className={`agent-filter-tab ${activeFilter === 'goods' ? 'active' : ''}`}
              onClick={() => setActiveFilter('goods')}
            >
              Goods
            </button>
          </div>
        </div>

        <div className="agent-deliveries-list">
          {filteredDeliveries.length > 0 ? (
            filteredDeliveries.map(delivery => (
              <div key={delivery.id} className="agent-delivery-item">
                <div className="agent-delivery-header">
                  <div className="agent-delivery-main">
                    {activeTab === 'scheduled' && (
                      <div className="scheduled-delivery-time">
                        🕒 {delivery.scheduledDate} at {delivery.scheduledTime}
                      </div>
                    )}
                    <span className={`agent-delivery-type-badge ${delivery.type}`}>
                      {delivery.type === 'money' ? '💵 Money' : '📦 Goods'}
                    </span>
                    {activeTab === 'scheduled' && (
                      <span className={`priority-badge ${delivery.priority}`} style={{ marginLeft: '0.5rem' }}>
                        {delivery.priority} Priority
                      </span>
                    )}
                    <h4 className="agent-delivery-title">{delivery.title}</h4>
                    <div className="agent-delivery-route">
                      <span>📍 {delivery.pickupLocation}</span>
                      <span className="agent-delivery-route-arrow">→</span>
                      <span>🏢 {delivery.deliveryLocation}</span>
                    </div>
                  </div>
                  <div className="agent-delivery-amount">{delivery.amount}</div>
                </div>

                <div className="agent-delivery-details">
                  <div className="agent-detail-item">
                    <span className="agent-detail-label">Donor Details</span>
                    <span className="agent-detail-value">
                      👤 {delivery.donor}
                    </span>
                    <span className="agent-detail-value" style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      📞 {delivery.donorContact}
                    </span>
                  </div>

                  <div className="agent-detail-item">
                    <span className="agent-detail-label">NGO Details</span>
                    <span className="agent-detail-value">
                      🏢 {delivery.ngo}
                    </span>
                    <span className="agent-detail-value" style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      📞 {delivery.ngoContact}
                    </span>
                  </div>

                  <div className="agent-detail-item">
                    <span className="agent-detail-label">
                      {activeTab === 'completed' ? 'Delivery Info' : 'Schedule'}
                    </span>
                    {activeTab === 'completed' ? (
                      <>
                        <span className="agent-detail-value">
                          📅 Picked: {delivery.date}
                        </span>
                        <span className="agent-detail-value" style={{ fontSize: '0.85rem', color: '#64748b' }}>
                          ✅ Delivered: {delivery.deliveryDate}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="agent-detail-value">
                          📅 {delivery.scheduledDate}
                        </span>
                        <span className="agent-detail-value" style={{ fontSize: '0.85rem', color: '#64748b' }}>
                          🕒 {delivery.scheduledTime}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="agent-detail-item">
                    <span className="agent-detail-label">Status</span>
                    <span className={`agent-status-badge ${delivery.status}`}>
                      {delivery.status === 'completed' ? '✓ Completed' : 
                       delivery.status === 'scheduled' ? '📅 Scheduled' : 
                       '🚚 In Progress'}
                    </span>
                    <span className="agent-detail-value" style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      🆔 #{delivery.id}
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