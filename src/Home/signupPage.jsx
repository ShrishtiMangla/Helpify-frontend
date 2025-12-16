import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "" // user | ngo | delivery
  });

  const handleSignup = (e) => {
    e.preventDefault();

    if (!signupData.role) {
      alert("Please select a role");
      return;
    }

    console.log("Signing up with data:", signupData);

    // POST /api/auth/signup
    // payload -> signupData
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-blue-50 px-4">
      
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-2">
          Create Your Account
        </h2>
        <p className="text-slate-500 text-center mb-6">
          Join Helpify and start giving with trust
        </p>

        {/* ROLE SELECTOR */}
        <div className="flex justify-center gap-3 mb-6">
          {[
            { key: "user", label: "User" },
            { key: "ngo", label: "NGO" },
            { key: "delivery", label: "Delivery Agent" }
          ].map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setSignupData({ ...signupData, role: r.key })}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition
                ${signupData.role === r.key
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
                }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={signupData.fullName}
              onChange={(e) =>
                setSignupData({ ...signupData, fullName: e.target.value })
              }
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              placeholder="Create a strong password"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-slate-600 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
