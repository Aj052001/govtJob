import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, MapPin, Shield, ArrowRight } from "lucide-react";

export default function Login() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Nav */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-100">
        <span className="text-blue-700 font-extrabold text-xl tracking-tight">GovCareer</span>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <span className="hover:text-gray-800 cursor-pointer transition">About Us</span>
          <Link to="/register" className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg text-sm font-semibold transition shadow-sm">
            Sign In
          </Link>
        </div>
      </nav>

      <div className="flex flex-1">

        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-between w-[52%] bg-[#f4f4ef] px-16 py-14">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest text-blue-600 border border-blue-200 bg-blue-50 px-3 py-1 rounded-full uppercase mb-8">
              The Authoritative Curator
            </span>
            <h1 className="text-5xl font-extrabold text-gray-900 leading-[1.15] mb-10">
              Your future in{" "}
              <span className="text-blue-600 underline decoration-blue-300 underline-offset-4">
                public service
              </span>{" "}
              starts here.
            </h1>

            <div className="flex flex-col gap-4">
              {[
                {
                  emoji: "🗂️",
                  title: "5000+ Govt Jobs Available",
                  desc: "Direct access to central and state department openings updated hourly.",
                },
                {
                  emoji: "📋",
                  title: "Free Mock Tests",
                  desc: "Assess your skills with curated practice sets designed by civil service experts.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 flex gap-4 shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl shrink-0">
                    {item.emoji}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-10">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((n) => (
                <img key={n} src={`https://i.pravatar.cc/32?img=${n}`} className="w-9 h-9 rounded-full border-2 border-white shadow-sm" />
              ))}
            </div>
            <p className="text-xs text-gray-500">
              Joined by{" "}
              <span className="text-blue-600 font-semibold underline cursor-pointer">120k+ aspirants</span>{" "}
              this month
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-1 items-center justify-center px-8 py-14 bg-white">
          <div className="w-full max-w-[400px]">

            <h2 className="text-3xl font-extrabold text-gray-900 mb-1">Welcome back</h2>
            <p className="text-sm text-gray-500 mb-7">
              Log in to manage your applications and test results.
            </p>

            {/* Smart Hint */}
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-7">
              <MapPin size={15} className="text-blue-500 mt-0.5 shrink-0" />
              <p className="text-xs text-blue-700 leading-relaxed">
                Smart Hint: We'll show jobs based on your profile preferences automatically.
              </p>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@govt-agency.gov"
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Password</label>
                <span className="text-xs text-blue-600 cursor-pointer hover:underline font-medium">Forgot?</span>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition pr-11"
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button className="w-full bg-blue-700 hover:bg-blue-800 active:scale-95 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-md shadow-blue-200 flex items-center justify-center gap-2">
              Sign In to Portal <ArrowRight size={16} />
            </button>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">or continue with</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" />
                Continue with Google
              </button>
              <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition">
                <img src="https://www.svgrepo.com/show/452234/apple.svg" className="w-4 h-4" />
                Continue with Apple
              </button>
            </div>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-bold hover:underline">
                Create Account
              </Link>
            </p>

            <div className="flex items-center justify-center gap-1.5 mt-5 text-xs text-gray-400">
              <Shield size={12} />
              <span className="tracking-widest uppercase font-medium">AES-256 Secure Login</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-8 py-3 flex justify-between items-center text-xs text-gray-400">
        <span>© 2024 GovCareer. Official Government Portal. Authorized Access Only.</span>
        <div className="flex gap-5">
          {["Privacy Policy", "Terms of Service", "Accessibility"].map((t) => (
            <span key={t} className="hover:text-gray-600 cursor-pointer transition">{t}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
