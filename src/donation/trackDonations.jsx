import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./trackDonations.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const TrackDonation = () => {
  const { donationId } = useParams();
  const [donation, setDonation] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/donations/${donationId}`)
      .then(res => res.json())
      .then(setDonation);
  }, []);

  if (!donation) return <p className="loading">Loading...</p>;

  return (
    <>
    <div className="track-page">
         <Header />
      <div className="track-card">
        <h2>Delivery Status</h2>

        <div className="status-box">
          <span>Current Status</span>
          <strong>{donation.status}</strong>
        </div>

        <div className="agent-section">
          <h3>Delivery Agent</h3>

          <div className="agent-card">
            <p>
              Name: <span>{donation.agentId.name}</span>
            </p>
            <p>
              Phone: <span>{donation.agentId.phone}</span>
            </p>
          </div>
        </div>
      </div>
        
    </div>
    <Footer />
    </>
    
    
  );
};

export default TrackDonation;
