import { useEffect, useState } from "react";
import API from "../api/api";

const UserDashboard = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    API.get("/donations/user")
      .then(res => setDonations(res.data))
      .catch(err => console.log(err));
  }, []);

  return <div>User Donations</div>;
};

export default UserDashboard;
