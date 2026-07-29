import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./ngoList.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const NgoList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pickupAddress, setPickupAddress] = useState("");
  const [item, setItem] = useState("");
  const [ngoPreference, setNgoPreference] = useState("Education");

  const donationType = searchParams.get("type"); // money | goods | null

  useEffect(() => {
    // Goods donation ke liye pehle kuch mat dikhao
    if (donationType === "goods") {
      setNgos([]);
      return;
    }

    // Money donation ke liye saare NGOs fetch karo
    const fetchNGOs = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/ngo/`
        );

        const data = await response.json();

        setNgos(data.ngos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNGOs();
  }, [donationType]);

  const handleRecommend = async () => {

    if (donationType !== "goods") {
      return;
    }

    if (!pickupAddress || !item || !ngoPreference) {
      alert("Please fill all the fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/ngo/recommendations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pickupAddress,
            item,
            ngoPreference,
          }),
        }
      );

      const data = await response.json();
      setNgos(data.ngos);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="ngo-page-wrapper">
      <Header />
      <div className="py-6"></div>

      <main className="ngo-page">
        {donationType === "goods" && (
          <div className="ngo-filter-card">
            <div className="ngo-search-container">
              <div className="input-group">
                <label>Pickup Address</label>
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  className="ngo-search"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Item to Donate</label>
                <input
                  type="text"
                  placeholder="Books, Clothes, Food..."
                  className="ngo-search"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>NGO Preference</label>
                <select name="preference" className="ngo-select"
                  value={ngoPreference} onChange={(e) => setNgoPreference(e.target.value)}>
                  <option>Education</option>
                  <option>Healthcare</option>
                  <option>Women Empowerment</option>
                  <option>Rural Development & Poverty Alleviation</option>
                  <option>Environment & Wildlife</option>
                  <option>Child Welfare</option>
                  <option>Disability Support</option>
                  <option>Disaster Relief & Humanitarian</option>
                </select>
              </div>

              <button className="ngo-recommend-btn" onClick={handleRecommend}>
                Recommend NGOs
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="loading-text">Loading NGOs...</p>
        ) : (
          <div className="ngo-grid">
            {ngos.map((ngo) => (
              <div key={ngo._id} className="ngo-card">
                <div className="ngo-avatar">
                  {ngo.name
                    ? ngo.name.split(" ").map(w => w[0]).join("").slice(0, 2)
                    : "NG"}
                </div>

                <h3 className="ngo-name">{ngo.name}</h3>
                <p className="ngo-category">{ngo.category}</p>
                <p className="ngo-address">{ngo.address}</p>

                {donationType && (
                  <button onClick={() => navigate(`/donate/${ngo._id}?type=${donationType}`)} className="ngo-donate-btn">
                    Donate
                  </button>
                )}

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
