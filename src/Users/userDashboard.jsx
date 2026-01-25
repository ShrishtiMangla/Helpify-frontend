import React, { useEffect, useState } from "react";
import Header from "../Home/components/Header";

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      
    <Header />

      {/* Dashboard */}
      <div className="max-w-5xl mx-auto mt-16 px-6">
        <h2 className="text-4xl font-bold text-gray-900">
          Welcome, {user.name} 👋
        </h2>

        <p className="mt-2 text-gray-600">
          {user.email}
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold">Your Donations</h3>
            <p className="text-gray-500 mt-2">Track all your contributions</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold">NGOs Supported</h3>
            <p className="text-gray-500 mt-2">View NGOs you helped</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold">Impact Reports</h3>
            <p className="text-gray-500 mt-2">See how your help was used</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
