import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./donation.css";

const DonatePage = () => {
  const { ngoId } = useParams();
  const [searchParams] = useSearchParams();
  const donationType = searchParams.get("type"); // money / goods

  const user = JSON.parse(localStorage.getItem("user"));

  // Common states
  const [amount, setAmount] = useState("");
  const [items, setItems] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = () => {
    const donationData = {
      donorId: user._id,
      ngoId,
      donationType,
      amount: donationType === "money" ? amount : undefined,
      items: donationType === "goods" ? items : undefined,
      address: donationType === "goods" ? address : undefined
    };

    console.log("Donation Payload:", donationData);

    // yahin baad me API call karoge
  };

  return (
    <>
      <Header />
        <div className="py-4"></div>
      <main className="donate-page">
        <h1>Complete Your Donation</h1>

        {/* 💰 MONEY DONATION UI */}
        {donationType === "money" && (
          <div className="donate-card">
            <h2>Donate Money</h2>

            <label>Enter Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Enter amount"
            />

            <button onClick={handleSubmit}>
              Proceed to Pay
            </button>
          </div>
        )}

        {/* 📦 GOODS DONATION UI */}
        {donationType === "goods" && (
          <div className="donate-card">
            <h2>Donate Goods</h2>

            <label>Items to Donate</label>
            <textarea
              value={items}
              onChange={e => setItems(e.target.value)}
              placeholder="e.g. Clothes, Books"
            />

            <label>Pickup Address</label>
            <textarea
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Enter your address"
            />

            <button onClick={handleSubmit}>
              Schedule Delivery Agent
            </button>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default DonatePage;
