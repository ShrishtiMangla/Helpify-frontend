import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const[loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with data:", loginData);
    // Implement login logic here
    //post request to backend with loginData

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-blue-50 px-4">
      
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-slate-500 text-center mb-8">
          Login to continue making an impact
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value = {loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
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
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
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
