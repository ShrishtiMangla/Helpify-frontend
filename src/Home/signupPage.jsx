import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../api/api";

const SignupPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    category: ""
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!role) {
    toast.error("Please select a role");
    return;
  }

  let payload = {};

  if (role === "user") {
    payload = {
      username: form.username,
      email: form.email,
      password: form.password
    };
  }

  if (role === "admin") {
    payload = {
      name: form.name,
      email: form.email,
      password: form.password
    };
  }

  if (role === "agent") {
    payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password
    };
  }

  if (role === "ngo") {
    if (!form.category) {
      toast.error("Please select NGO category");
      return;
    }

    payload = {
      name: form.name,
      address: form.address,
      email: form.email,
      password: form.password,
      category: form.category
    };
  }

  try {
    const res = await API.post(`/api/${role}/register`, payload);

    if (res.data.success) {
      toast.success("Signup successful");
      navigate("/login");
    }
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.message || "Signup failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient from-slate-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-10 -mt-12">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-2">
          Create Account
        </h2>
        <p className="text-slate-500 text-center mb-8">
          Sign up to start making an impact
        </p>

        {/* ROLE SELECTOR */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {["user", "ngo", "agent", "admin"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition
                ${role === r
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
                }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* USER */}
          {role === "user" && (
            <>
              <Input label="Username" onChange={(e)=>setForm({...form,username:e.target.value})} />
              <Input label="Email" type="email" onChange={(e)=>setForm({...form,email:e.target.value})} />
              <Input label="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})} />
            </>
          )}

          {/* ADMIN */}
          {role === "admin" && (
            <>
              <Input label="Name" onChange={(e)=>setForm({...form,name:e.target.value})} />
              <Input label="Email" type="email" onChange={(e)=>setForm({...form,email:e.target.value})} />
              <Input label="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})} />
            </>
          )}

          {/* AGENT */}
          {role === "agent" && (
            <>
              <Input label="Name" onChange={(e)=>setForm({...form,name:e.target.value})} />
              <Input label="Email" type="email" onChange={(e)=>setForm({...form,email:e.target.value})} />
              <Input label="Phone" onChange={(e)=>setForm({...form,phone:e.target.value})} />
              <Input label="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})} />
            </>
          )}

          {/* NGO */}
          {role === "ngo" && (
            <>
              <Input label="NGO Name" onChange={(e)=>setForm({...form,name:e.target.value})} />
              <Input label="Address" onChange={(e)=>setForm({...form,address:e.target.value})} />
              <Input label="Email" type="email" onChange={(e)=>setForm({...form,email:e.target.value})} />
              <Input label="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})} />

              <select
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50"
                onChange={(e)=>setForm({...form,category:e.target.value})}
              >
                <option value="">Select Category</option>
                <option>Education</option>
                <option>Healthcare</option>
                <option>Women Empowerment</option>
                <option>Environment & Wildlife</option>
                <option>Rural Development & Poverty Alleviation</option>
                <option>Child Welfare</option>
                <option>Disability Support</option>
                <option>Disaster Relief & Humanitarian</option>
              </select>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition"
          >
            Create Account
          </button>
        </form>

        {/* FOOTER */}
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

export default SignupPage;

/* Input Component */
const Input = ({ label, type = "text", ...props }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      {...props}
      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50
      focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);
