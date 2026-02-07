import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./ngoList.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const NgoList = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const donationType = searchParams.get("type");


  useEffect(() => {
     fetch(`${import.meta.env.VITE_API_URL}/api/ngo`)
      .then(res => res.json())
      .then(data => {
        setNgos(data.ngos);
        setLoading(false);
        console.log("Fetched NGOs:", data.ngos);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="ngo-page-wrapper">
      <Header />
      <div className="py-6"></div>

      <main className="ngo-page">
        <h1 className="ngo-page-title">Verified NGOs</h1>
        <p className="ngo-page-subtitle">
          Choose a trusted NGO and make a meaningful contribution
        </p>

        {loading ? (
          <p className="loading-text">Loading NGOs...</p>
        ) : (
          <div className="ngo-grid">
            {ngos.map(ngo => (
              <div key={ngo._id} className="ngo-card">
                <div className="ngo-avatar">
                  {ngo.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>

                <h3 className="ngo-name">{ngo.name}</h3>
                <p className="ngo-category">{ngo.category}</p>
                <p className="ngo-address">{ngo.address}</p>

                <button onClick={()=>navigate(`/donate/${ngo._id}?type=${donationType}`)
                    } className="ngo-donate-btn">
                  Donate 
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default NgoList;
