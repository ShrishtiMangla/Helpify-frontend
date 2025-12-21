import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/api";
import { toast } from 'react-hot-toast';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: ""
  })
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password, role } = loginData;

    if (!role) {
      toast.error("Please select a role");
      return;
    }

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      const res = await API.post(
        "/api/auth/login",
        loginData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Login Successful");
        console.log("LOGIN RESPONSE 👉", res);

        const userRole = res.data.role; //ye backend se aayega

        if (userRole === "user") navigate("/user/dashboard");
        if (userRole === "ngo") navigate("/ngo/dashboard");
        if (userRole === "agent") navigate("/agent/dashboard");
        if (userRole === "admin") navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log("LOGIN ERROR 👉", error);
      toast.error(error.response?.data?.message || "Login failed");
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-blue-50 px-4">

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-3xl font-bold text-slate-900 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-slate-500 text-center mb-8">
          Login to continue making an impact
        </p>
        {/* ROLE SELECTOR */}
        <div className="flex justify-center gap-3 mb-6">
          {[
            { key: "user", label: "User" },
            { key: "ngo", label: "NGO" },
            { key: "agent", label: "Delivery Agent" },
            { key: "admin", label: "Admin" }
          ].map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setLoginData({ ...loginData, role: r.key })}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition
                ${loginData.role === r.key
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
                }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
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
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-slate-600 text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
