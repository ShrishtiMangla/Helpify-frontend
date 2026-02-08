import { Routes, Route } from "react-router-dom";
import LandingPage from "./Home/LandingPage";
import Login from "./Home/loginPage";
import Signup from "./Home/signupPage";
import About from "./Home/aboutpage";
import Contact from "./Home/contactPage.jsx";

import User from "./Users/userDashboard";
import Ngo from "./ngos/ngoDashboard";
import Agent from "./Delivery/deliveryAgentDashboard";
import AdminDashboard from "./Admin/adminDashboard";

import NgoList from "./ngos/ngoList";
import DonatePage from "./donation/moneydonation";
import TrackDonation from "./donation/trackDonations";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user/dashboard" element={<User />} />
      <Route path="/ngo/dashboard" element={<Ngo />} />
      <Route path = "/agent/dashboard" element={<Agent />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/ngos" element={<NgoList />} />
      <Route path="/donate/:ngoId" element={<DonatePage />} />
      <Route path="/track/:donationId" element={<TrackDonation />} />
      <Route path = "/about" element={<About/>} />
      <Route path = "/contact" element={<Contact/>} />
    </Routes>
  );
}

export default App;
