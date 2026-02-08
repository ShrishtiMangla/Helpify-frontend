import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./moneydonation.css";
import { useNavigate } from "react-router-dom";

const DonatePage = () => {
    const { ngoId } = useParams();
    const [searchParams] = useSearchParams();
    const donationType = searchParams.get("type"); // money / goods

    const user = JSON.parse(localStorage.getItem("user"));

    // Common states
    const [amount, setAmount] = useState("");
    const [items, setItems] = useState("");
    const [address, setAddress] = useState("");


    const navigate = useNavigate();

    const handleGoodsDonation = async () => {
    if (!items || !address) {
        alert("Please fill all details");
        return;
    }

    try {
        const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/donations/goods`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            donorId: user._id,
            ngoId,
            items,
            address
            })
        }
        );

        const data = await res.json();

        alert("Delivery agent will reach you in 3–5 working days 🚚");

        // 👉 Navigate to tracking page
        navigate(`/track/${data.donationId}`);

    } catch (error) {
        console.error(error);
        alert("Failed to schedule delivery");
    }
    };


    const saveDonation = async (paymentId) => {
    try {
        const donationData = {
        donorId: user._id,
        ngoId,
        donationType: "money",
        amount,
        status: "completed"
        };

        await fetch(`${import.meta.env.VITE_API_URL}/api/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData)
        });

        alert("Donation Successful ❤️");

    } catch (error) {
        console.error(error);
        alert("Failed to save donation");
    }
    };

        
    const openRazorpay = (order) => {
        const options = {
            key: "rzp_test_SDEDH4UJzGXYoy", // 👈 YOUR TEST KEY ID
            amount: order.amount,
            currency: "INR",
            name: "Helpify",
            description: "Donation Payment",
            order_id: order.id,

            handler: function (response) {
            console.log("Payment Success:", response);

            // STEP 4 yahin call hoga 👇
            saveDonation(response.razorpay_payment_id);
            },

            theme: {
            color: "#0f172a"
            }
        };

    const rzp = new window.Razorpay(options);
    rzp.open();
    };

    const handleSubmit = async () => {
    if (!amount || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    try {
        // 1️⃣ Create order from backend
        const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount })
        }
        );

        const order = await res.json();

        // 2️⃣ Open Razorpay checkout
        openRazorpay(order);

    } catch (error) {
        console.error(error);
        alert("Payment initiation failed");
    }
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

            <button onClick={handleGoodsDonation}>
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
