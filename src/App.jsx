import { Routes, Route } from "react-router-dom";
import LandingPage from "./Home/LandingPage";
import Login from "./Home/loginPage";
import Signup from "./Home/signupPage";
import User from "./Users/userDashboard";
import Ngo from "./ngos/ngoDashboard";
import Agent from "./Delivery/deliveryAgentDashboard";
import AdminDashboard from "./Admin/adminDashboard";

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
    
    </Routes>
  );
}

export default App;
