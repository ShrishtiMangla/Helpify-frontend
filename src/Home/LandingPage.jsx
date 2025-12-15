import Header from "./components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import API from "../Utils/API";

const LandingPage = () => {
  useEffect(() => {
    API.get("/")
      .then((res) => {
        console.log("Backend response:", res.data);
      })
      .catch((err) => {
        console.log("API error:", err);
      });
  }, []);
  return (
    <>
      <Header />

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient from-slate-50 via-white to-blue-50 py-28 md:py-36">
        
        {/* Background accents */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center">
          
          <span className="inline-block mb-6 px-4 py-1.5 text-sm font-medium rounded-full bg-blue-100 text-blue-700">
            Verified • Transparent • Secure
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight">
            Where trust meets giving
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Helpify enables responsible giving by connecting donors with verified NGOs.
            Every contribution is traceable, securely processed, and transparently delivered —
            so you know exactly where your help goes.
          </p>

          <p className="italic text-slate-500 mb-12">
            “When trust leads the way, generosity goes further.”
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/donate/money"
              className="px-8 py-4 bg-slate-900 text-white text-base font-medium rounded-lg hover:bg-slate-800 transition"
            >
              Donate Money
            </Link>
            <Link
              to="/donate/goods"
              className="px-8 py-4 border border-slate-300 text-slate-900 text-base font-medium rounded-lg hover:bg-slate-100 transition"
            >
              Donate Goods
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Built on Trust and Transparency
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                title: "Verified NGOs",
                text: "Every partner organization undergoes rigorous verification to ensure credibility and impact.",
                img: "https://media.istockphoto.com/id/1422625306/vector/verified-check-mark-sign-logo-badge-icon-set-with-blue-color-check-accept-confirm-approve.jpg?s=1024x1024&w=is&k=20&c=weKUTGduVE23OI5KZY4ZR5kWRt0HkEmSjfjleftn4cU="
              },
              {
                title: "Doorstep Pickup",
                text: "Convenient, scheduled collection of physical donations directly from your location.",
                img: "https://media.istockphoto.com/id/621904294/photo/volunteer-accepts-canned-food-donation-at-food-drive.jpg?s=612x612&w=0&k=20&c=0x4YFXDMoAVljn6xBE-M2mR73pH79WiEil_-arN3Sqw="
              },
              {
                title: "Secure Processing",
                text: "Bank-grade encryption and compliant payment gateways for complete peace of mind.",
                img: "https://thumbs.dreamstime.com/b/black-shield-security-lock-icon-isolated-transparent-background-protection-safety-password-security-firewall-access-black-240336489.jpg"
              },
              {
                title: "Full Transparency",
                text: "Real-time updates and detailed reports on how your contribution creates change.",
                img: "https://slideuplift.com/wp-content/uploads/edd/2022/07/Tracking-Progress-PowerPoint-Template-4x3-1.jpg"
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= IMPACT GALLERY ================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Real Impact, Real Stories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <img className="rounded-xl shadow-lg h-80 w-full object-cover" src="https://media.istockphoto.com/id/1498170898/photo/volunteers-are-preparing-donation-boxes-at-the-food-and-clothes-bank.jpg?s=612x612&w=0&k=20&c=zlo5iyeFReZTpYn-UHbA3b8v_UjizrLRqUrx-0fD5x8=" />
            <img className="rounded-xl shadow-lg h-80 w-full object-cover" src="https://media.istockphoto.com/id/1347281316/vector/humanitarian-assistance-to-poor-people.jpg?s=612x612&w=0&k=20&c=9FutFBUl65jNmwNFkfcbku7XD-AAmVoAIK2bF8vFrHQ=" />
            <img className="rounded-xl shadow-lg h-80 w-full object-cover" src="https://thumbs.dreamstime.com/b/volunteers-charity-outreach-raised-helping-hands-vector-line-icon-illustration-crowd-people-ready-to-help-donate-379979663.jpg" />
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative py-20 bg-linear-to-br from-gray-900 via-gray-900 to-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Begin Your Journey of Impact Today
          </h2>
          <p className="text-xl text-gray-300">
            Join a community of mindful donors committed to meaningful, verifiable change.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient from-transparent to-blue-950 blur-md"></div>
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;
