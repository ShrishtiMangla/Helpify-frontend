import { Routes, Route } from "react-router-dom";
import LandingPage from "./Home/LandingPage";
import Login from "./Home/loginPage";
import Signup from "./Home/signupPage";
import User from "./Users/userDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user/dashboard" element={<User />} />
    
    </Routes>
  );
}

export default App;
