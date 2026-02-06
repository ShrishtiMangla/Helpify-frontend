import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState('completed'); // completed, pending, or payments
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const storedAdmin = localStorage.getItem("user");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
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
      agent: 'Amit Singh',
      agentContact: '+91-9876543230',
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
      agent: 'Rahul Verma',
      agentContact: '+91-9876543231',
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
      agent: 'Vikram Sharma',
      agentContact: '+91-9876543232',
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
      agent: 'Karan Patel',
      agentContact: '+91-9876543233',
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
      agent: 'Neha Gupta',
      agentContact: '+91-9876543234',
      date: 'Dec 15, 2025',
      deliveryDate: 'Dec 17, 2025',
      amount: '100 items',
      status: 'completed',
      pickupLocation: 'Rohini, Delhi',
      deliveryLocation: 'Karol Bagh, Delhi'
    }
  ];

  // Sample pending deliveries data
  const pendingDeliveries = [
    {
      id: 'DN12346',
      type: 'money',
      title: 'Health Care Support Fund',
      donor: 'Vikram Sharma',
      donorContact: '+91-9876543215',
      ngo: 'Health First Foundation',
      ngoContact: '+91-9876543225',
      agent: 'Assigned to: Ravi Kumar',
      agentContact: '+91-9876543235',
      submittedDate: 'Jan 18, 2026',
      amount: '₹12,000',
      status: 'pending',
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
      agent: 'Assigned to: Pooja Mehta',
      agentContact: '+91-9876543236',
      submittedDate: 'Jan 19, 2026',
      amount: '75 items',
      status: 'pending',
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
      agent: 'Awaiting Assignment',
      agentContact: 'N/A',
      submittedDate: 'Jan 19, 2026',
      amount: '₹8,500',
      status: 'pending',
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
      agent: 'Assigned to: Sanjay Rao',
      agentContact: '+91-9876543237',
      submittedDate: 'Jan 20, 2026',
      amount: '15 items',
      status: 'pending',
      pickupLocation: 'Janakpuri, Delhi',
      deliveryLocation: 'Rajouri Garden, Delhi'
    }
  ];

  // Sample payments data
  const payments = [
    {
      id: 'PAY12345',
      type: 'money',
      title: 'Monthly Food Distribution Payment',
      donor: 'Rajesh Kumar',
      ngo: 'Hope Foundation',
      agent: 'Amit Singh',
      deliveryId: 'DN12345',
      amount: '₹5,000',
      paymentDate: 'Jan 16, 2026',
      status: 'completed',
      paymentMethod: 'UPI',
      transactionId: 'TXN789456123'
    },
    {
      id: 'PAY12344',
      type: 'money',
      title: 'Emergency Relief Fund Payment',
      donor: 'Meena Iyer',
      ngo: 'Disaster Relief Org',
      agent: 'Karan Patel',
      deliveryId: 'DN12341',
      amount: '₹15,000',
      paymentDate: 'Dec 21, 2025',
      status: 'completed',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN456789321'
    },
    {
      id: 'PAY12346',
      type: 'money',
      title: 'Health Care Support Payment',
      donor: 'Vikram Sharma',
      ngo: 'Health First Foundation',
      agent: 'Ravi Kumar',
      deliveryId: 'DN12346',
      amount: '₹12,000',
      paymentDate: 'Pending',
      status: 'pending',
      paymentMethod: 'UPI',
      transactionId: 'Awaiting Delivery Completion'
    },
    {
      id: 'PAY12348',
      type: 'money',
      title: 'Animal Welfare Fund Payment',
      donor: 'Ramesh Gupta',
      ngo: 'Animal Care Society',
      agent: 'Not Assigned',
      deliveryId: 'DN12348',
      amount: '₹8,500',
      paymentDate: 'Pending',
      status: 'pending',
      paymentMethod: 'Bank Transfer',
      transactionId: 'Awaiting Agent Assignment'
    }
  ];

  // Get current data based on active tab
  const getCurrentData = () => {
    switch(activeTab) {
      case 'completed':
        return completedDeliveries;
      case 'pending':
        return pendingDeliveries;
      case 'payments':
        return payments;
      default:
        return [];
    }
  };

  const currentData = getCurrentData();
  
  const filteredData = currentData.filter(item => 
    activeFilter === 'all' || item.type === activeFilter
  );

  // Calculate statistics
  const totalCompleted = completedDeliveries.length;
  const totalPending = pendingDeliveries.length;
  const totalDeliveries = totalCompleted + totalPending;
  const totalPayments = payments.filter(p => p.status === 'completed').length;
  const pendingPayments = payments.filter(p => p.status === 'pending').length;

  if (!admin) {
    return <p className="admin-loading-text">Loading...</p>;
  }

  return (
    <div className="admin-dashboard-container-wrapper">
      <Header />
    <div className="py-8"></div>
      <main className="admin-dashboard-container">
        {/* Admin Profile Header */}
        <div className="admin-header">
          <div className="admin-info">
            <div className="admin-avatar">
              {admin.name ? admin.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'AD'}
            </div>
            <div className="admin-details">
              <h1 className="admin-name">{admin.name?.charAt(0).toUpperCase() + admin.name?.slice(1)}</h1>
              <span className="admin-badge">
                👑 System Administrator • Full Access ✓
              </span>
              <div className="admin-stats">
                <div className="admin-stat-item">
                  <span className="admin-stat-value">{totalDeliveries}</span>
                  <span className="admin-stat-label">Total Deliveries</span>
                </div>
                <div className="admin-stat-item">
                  <span className="admin-stat-value">{totalCompleted}</span>
                  <span className="admin-stat-label">Completed</span>
                </div>
                <div className="admin-stat-item">
                  <span className="admin-stat-value">{totalPending}</span>
                  <span className="admin-stat-label">Pending</span>
                </div>
                <div className="admin-stat-item">
                  <span className="admin-stat-value">{totalPayments}</span>
                  <span className="admin-stat-label">Payments Processed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="admin-quick-stats">
          <div className="admin-stat-card completed">
            <div className="admin-stat-card-header">
              <div className="admin-stat-card-icon completed">✅</div>
            </div>
            <div className="admin-stat-card-value">{totalCompleted}</div>
            <div className="admin-stat-card-label">Completed Deliveries</div>
          </div>

          <div className="admin-stat-card pending">
            <div className="admin-stat-card-header">
              <div className="admin-stat-card-icon pending">⏳</div>
            </div>
            <div className="admin-stat-card-value">{totalPending}</div>
            <div className="admin-stat-card-label">Pending Deliveries</div>
          </div>

          <div className="admin-stat-card total">
            <div className="admin-stat-card-header">
              <div className="admin-stat-card-icon total">📦</div>
            </div>
            <div className="admin-stat-card-value">{totalDeliveries}</div>
            <div className="admin-stat-card-label">Total Deliveries</div>
          </div>

          <div className="admin-stat-card payments">
            <div className="admin-stat-card-header">
              <div className="admin-stat-card-icon payments">💰</div>
            </div>
            <div className="admin-stat-card-value">{totalPayments}/{payments.length}</div>
            <div className="admin-stat-card-label">Payments Completed</div>
          </div>
        </div>

        {/* Main Tabs */}
        <div className="admin-tabs-container">
          <div className="admin-main-tabs">
            <button 
              className={`admin-main-tab ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              ✅ Completed Deliveries
            </button>
            <button 
              className={`admin-main-tab ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              ⏳ Pending Deliveries
            </button>
            <button 
              className={`admin-main-tab ${activeTab === 'payments' ? 'active' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              💰 Payments
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="admin-section-header">
          <h2 className="admin-section-title">
            {activeTab === 'completed' ? 'Completed Deliveries' : 
             activeTab === 'pending' ? 'Pending Deliveries' : 'Payment Transactions'}
          </h2>
          <div className="admin-filter-tabs">
            <button 
              className={`admin-filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`admin-filter-tab ${activeFilter === 'money' ? 'active' : ''}`}
              onClick={() => setActiveFilter('money')}
            >
              Money
            </button>
            <button 
              className={`admin-filter-tab ${activeFilter === 'goods' ? 'active' : ''}`}
              onClick={() => setActiveFilter('goods')}
            >
              Goods
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="admin-deliveries-list">
          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <div key={item.id} className="admin-delivery-item">
                <div className="admin-delivery-header">
                  <div className="admin-delivery-main">
                    <span className={`admin-delivery-type-badge ${item.type}`}>
                      {item.type === 'money' ? '💵 Money' : '📦 Goods'}
                    </span>
                    <h4 className="admin-delivery-title">{item.title}</h4>
                    {activeTab !== 'payments' && (
                      <div className="admin-delivery-route">
                        <span>📍 {item.pickupLocation}</span>
                        <span className="admin-delivery-route-arrow">→</span>
                        <span>🏢 {item.deliveryLocation}</span>
                      </div>
                    )}
                  </div>
                  <div className="admin-delivery-amount">
                    {activeTab === 'payments' ? (
                      <span className="payment-amount">{item.amount}</span>
                    ) : (
                      item.amount
                    )}
                  </div>
                </div>

                <div className="admin-delivery-details">
                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Donor Details</span>
                    <span className="admin-detail-value">
                      👤 {item.donor}
                    </span>
                    {item.donorContact && (
                      <span className="admin-detail-value" style={{ fontSize: '0.85rem', color: '#aaa' }}>
                        📞 {item.donorContact}
                      </span>
                    )}
                  </div>

                  <div className="admin-detail-item">
                    <span className="admin-detail-label">NGO Details</span>
                    <span className="admin-detail-value">
                      🏢 {item.ngo}
                    </span>
                    {item.ngoContact && (
                      <span className="admin-detail-value" style={{ fontSize: '0.85rem', color: '#aaa' }}>
                        📞 {item.ngoContact}
                      </span>
                    )}
                  </div>

                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Delivery Agent</span>
                    <span className="admin-detail-value">
                      🚚 {item.agent}
                    </span>
                    {item.agentContact && item.agentContact !== 'N/A' && (
                      <span className="admin-detail-value" style={{ fontSize: '0.85rem', color: '#aaa' }}>
                        📞 {item.agentContact}
                      </span>
                    )}
                  </div>

                  <div className="admin-detail-item">
                    <span className="admin-detail-label">
                      {activeTab === 'completed' ? 'Delivery Info' : 
                       activeTab === 'pending' ? 'Submission Info' : 'Payment Info'}
                    </span>
                    {activeTab === 'completed' ? (
                      <>
                        <span className="admin-detail-value">
                          📅 Picked: {item.date}
                        </span>
                        <span className="admin-detail-value" style={{ fontSize: '0.85rem', color: '#aaa' }}>
                          ✅ Delivered: {item.deliveryDate}
                        </span>
                      </>
                    ) : activeTab === 'pending' ? (
                      <>
                        <span className="admin-detail-value">
                          📅 Submitted: {item.submittedDate}
                        </span>
                        <span className="admin-detail-value" style={{ fontSize: '0.85rem', color: '#aaa' }}>
                          ⏳ Awaiting Approval
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="admin-detail-value">
                          💳 {item.paymentMethod}
                        </span>
                        <span className="admin-detail-value" style={{ fontSize: '0.85rem', color: '#aaa' }}>
                          🆔 {item.transactionId}
                        </span>
                        <span className="admin-detail-value" style={{ fontSize: '0.85rem', color: '#aaa' }}>
                          📅 {item.paymentDate}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="admin-detail-item">
                    <span className="admin-detail-label">Status</span>
                    {activeTab === 'payments' ? (
                      <span className={`payment-status ${item.status}`}>
                        {item.status === 'completed' ? '✓ Payment Completed' : '⏳ Payment Pending'}
                      </span>
                    ) : (
                      <span className={`admin-status-badge ${item.status}`}>
                        {item.status === 'completed' ? '✓ Completed' : 
                         item.status === 'pending' ? '⏳ Pending Approval' : 
                         '🚚 In Progress'}
                      </span>
                    )}
                    <span className="admin-detail-value" style={{ fontSize: '0.85rem', color: '#aaa' }}>
                      🆔 #{item.id}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="admin-empty-state">
              <div className="admin-empty-state-icon">📭</div>
              <p>No {activeTab} {activeFilter !== 'all' ? activeFilter : ''} data found</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;