import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Eye, EyeOff, Shield, CheckCircle, User, Briefcase, GraduationCap, Lock } from "lucide-react";

const STEPS = [
  { num: 1, label: "Basic Info",        icon: <User size={15} /> },
  { num: 2, label: "Personal Details",  icon: <Briefcase size={15} /> },
  { num: 3, label: "Education",         icon: <GraduationCap size={15} /> },
];

export default function Register() {
  const [step, setStep]       = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm]       = useState({
    firstName: "", lastName: "", email: "", mobile: "", password: "",
    day: "", month: "", year: "", category: "", state: "",
    qualification: "", field: "", institution: "", agree: false,
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const pct = Math.round((step / 3) * 100);

  const inputCls = "w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition placeholder-gray-400";
  const selectCls = "w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition text-gray-700 appearance-none cursor-pointer";

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT SIDEBAR ── */}
      <div className="hidden lg:flex flex-col w-72 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 text-white p-8 shrink-0 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        
        {/* Logo */}
        <div className="mb-12 relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-lg">🏛️</span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">Gov Career</h2>
          </div>
          <p className="text-xs text-blue-200 uppercase tracking-widest font-medium">Official Government Portal</p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-2 mb-12 relative z-10">
          {STEPS.map((s) => {
            const done   = step > s.num;
            const active = step === s.num;
            return (
              <div key={s.num} className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                active ? "bg-white/20 shadow-lg backdrop-blur-sm scale-105" : done ? "bg-white/10" : "bg-white/5"
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-all duration-300 shadow-md ${
                  done ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white scale-110" : 
                  active ? "bg-white text-blue-700 scale-110" : 
                  "bg-white/10 text-blue-300"
                }`}>
                  {done ? <CheckCircle size={15} strokeWidth={2.5} /> : s.icon}
                </div>
                <span className={`text-sm font-semibold transition-all ${
                  active ? "text-white" : done ? "text-blue-100" : "text-blue-300"
                }`}>{s.label}</span>
                {active && (
                  <div className="absolute right-3 w-1.5 h-6 bg-white rounded-full shadow-lg" />
                )}
              </div>
            );
          })}
        </div>

        {/* Step-specific content */}
        <div className="flex-1 relative z-10">
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              {[
                { icon: "📊", title: "5,000+ Active Roles",    desc: "Direct access to federal and state career opportunities.", color: "from-blue-500/20 to-indigo-500/20" },
                { icon: "🔔", title: "Personalized Alerts",    desc: "AI-driven matching based on your unique profile skills.", color: "from-purple-500/20 to-pink-500/20" },
                { icon: "✅", title: "Official Trust",          desc: "Verified by the Civil Service Commission.", color: "from-green-500/20 to-emerald-500/20" },
              ].map((item, i) => (
                <div key={i} className={`bg-gradient-to-br ${item.color} backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all hover:scale-105 hover:shadow-xl`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl backdrop-blur-sm">
                      {item.icon}
                    </div>
                    <p className="text-sm font-bold">{item.title}</p>
                  </div>
                  <p className="text-xs text-blue-100 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center text-center animate-fadeIn">
              <div className="w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mb-5 backdrop-blur-sm border border-white/10 shadow-xl">
                <Shield size={40} className="text-blue-200" strokeWidth={1.5} />
              </div>
              <h3 className="font-extrabold text-2xl leading-tight mb-2">Securing your<br />digital identity.</h3>
              <p className="text-xs text-blue-200 mb-6">Your data is protected with military-grade encryption</p>
              <div className="flex flex-col gap-4 text-left w-full">
                {[
                  { title: "Identity Verification", desc: "Cross-referenced with national registries.", icon: "🔐" },
                  { title: "Smart Eligibility",     desc: "Personalized program recommendations.", icon: "🎯" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0 text-base">{item.icon}</div>
                    <div>
                      <p className="text-sm font-bold flex items-center gap-2">
                        {item.title}
                        <CheckCircle size={13} className="text-green-400" />
                      </p>
                      <p className="text-xs text-blue-200 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fadeIn">
              <h3 className="font-extrabold text-2xl leading-tight mb-3">
                Empowering your{" "}
                <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">career journey</span>{" "}
                in public service.
              </h3>
              <p className="text-sm text-blue-200 mb-6 leading-relaxed">
                You're one step away from joining <strong className="text-white">50,000+</strong> professionals making a real impact.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "👥", title: "Join the Community",    desc: "Connect with peers across 400 government departments.", color: "from-violet-500/20 to-purple-500/20" },
                  { icon: "🎓", title: "Verified Credentials",  desc: "Your qualifications are instantly recognized by recruiters.", color: "from-cyan-500/20 to-blue-500/20" },
                ].map((item, i) => (
                  <div key={i} className={`flex items-start gap-3 bg-gradient-to-br ${item.color} rounded-2xl p-4 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all hover:scale-105`}>
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 text-xl backdrop-blur-sm">{item.icon}</div>
                    <div>
                      <p className="text-sm font-bold">{item.title}</p>
                      <p className="text-xs text-blue-100 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
          <div className="flex justify-between text-xs text-blue-200 mb-3">
            <span className="font-medium">Profile Completion</span>
            <span className="font-extrabold text-white text-sm">{pct}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div className="h-full bg-gradient-to-r from-blue-400 via-cyan-300 to-green-400 rounded-full transition-all duration-700 shadow-lg" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {/* ── RIGHT FORM ── */}
      <div className="flex-1 bg-[#f8f8f6] flex items-center justify-center p-8">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

          {/* Step indicator */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
              {step === 1 ? "Getting Started" : `Step 0${step}/03`}
            </span>
            <span className="text-sm font-extrabold text-blue-700">{pct}%</span>
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-blue-700 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Basic Information</h2>
              <p className="text-sm text-gray-500 mb-6">Create your official government portal account.</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">First Name</label>
                  <input value={form.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="John" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Last Name</label>
                  <input value={form.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Doe" className={inputCls} />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Official Email Address</label>
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="john.doe@government.gov" className={inputCls} />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Mobile Number</label>
                <input type="tel" value={form.mobile} onChange={(e) => set("mobile", e.target.value)} placeholder="+1 (555) 000-0000" className={inputCls} />
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Secure Password</label>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="••••••••••••" className={inputCls + " pr-11"} />
                  <button onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${form.password.length > 10 ? "w-full bg-green-500" : form.password.length > 6 ? "w-2/3 bg-yellow-400" : form.password.length > 0 ? "w-1/3 bg-red-400" : "w-0"}`} />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Strength: <strong className={form.password.length > 10 ? "text-green-600" : form.password.length > 6 ? "text-yellow-600" : "text-red-500"}>
                    {form.password.length > 10 ? "Strong" : form.password.length > 6 ? "Good" : form.password.length > 0 ? "Weak" : "—"}
                  </strong> — Include a symbol and a number.
                </p>
              </div>

              <button onClick={() => setStep(2)} className="w-full bg-blue-700 hover:bg-blue-800 active:scale-95 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition shadow-md shadow-blue-200">
                Next: Personal Details <ArrowRight size={16} />
              </button>

              <p className="text-center text-sm text-gray-500 mt-5">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
              </p>

              <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-400">
                <Lock size={11} />
                <span className="tracking-widest uppercase">By continuing, you agree to the Civic Connect Terms of Service and Privacy Policy. Data is encrypted according to FIPS 140-3 standards.</span>
              </div>
            </>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Personal Details</h2>
              <p className="text-sm text-gray-500 mb-6">Please provide accurate information as per your official documents.</p>

              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-600 mb-1.5">📅 Date of Birth</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key: "day",   placeholder: "Day",   options: [...Array(31)].map((_, i) => i + 1) },
                    { key: "month", placeholder: "Month", options: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] },
                    { key: "year",  placeholder: "Year",  options: [...Array(60)].map((_, i) => 2006 - i) },
                  ].map((s) => (
                    <select key={s.key} value={form[s.key]} onChange={(e) => set(s.key, e.target.value)} className={selectCls}>
                      <option value="">{s.placeholder}</option>
                      {s.options.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-600 mb-1.5">🎯 Application Category</label>
                <select value={form.category} onChange={(e) => set("category", e.target.value)} className={selectCls}>
                  <option value="">Select category</option>
                  {["General", "OBC", "SC", "ST", "EWS"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="mb-7">
                <label className="block text-xs font-bold text-gray-600 mb-1.5">📍 Residential State</label>
                <select value={form.state} onChange={(e) => set("state", e.target.value)} className={selectCls}>
                  <option value="">Choose your state</option>
                  {["Delhi","Maharashtra","Karnataka","Tamil Nadu","Uttar Pradesh","Rajasthan","Gujarat","West Bengal"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex items-center gap-2 px-5 py-3 border-2 border-gray-200 rounded-xl font-semibold text-sm text-gray-700 hover:bg-gray-50 transition">
                  <ArrowLeft size={15} /> Back
                </button>
                <button onClick={() => setStep(3)} className="flex-1 bg-blue-700 hover:bg-blue-800 active:scale-95 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-md shadow-blue-200">
                  Next: Education <ArrowRight size={16} />
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 mt-5 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Shield size={11} /> Support Line</span>
                <span className="flex items-center gap-1"><Lock size={11} /> 256-bit Encryption</span>
              </div>
            </>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Academic Profile</h2>
              <p className="text-sm text-gray-500 mb-6">Share your educational background to unlock relevant career opportunities.</p>

              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Highest Qualification</label>
                <select value={form.qualification} onChange={(e) => set("qualification", e.target.value)} className={selectCls}>
                  <option value="">Select qualification...</option>
                  {["10th Pass","12th Pass","Diploma","Bachelor's Degree","Master's Degree","PhD"].map((q) => <option key={q}>{q}</option>)}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Field of Study</label>
                <input value={form.field} onChange={(e) => set("field", e.target.value)} placeholder="e.g. Computer Science, Public Policy" className={inputCls} />
              </div>

              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Institution</label>
                <input value={form.institution} onChange={(e) => set("institution", e.target.value)} placeholder="Enter university or college name" className={inputCls} />
              </div>

              <label className="flex items-start gap-3 mb-7 cursor-pointer group">
                <input type="checkbox" checked={form.agree} onChange={(e) => set("agree", e.target.checked)} className="mt-0.5 accent-blue-700 w-4 h-4 shrink-0" />
                <span className="text-xs text-gray-500 leading-relaxed">
                  I confirm that the information provided is accurate and I agree to the{" "}
                  <span className="text-blue-600 underline cursor-pointer">Terms of Service</span> and{" "}
                  <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>.
                </span>
              </label>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex items-center gap-2 px-5 py-3 border-2 border-gray-200 rounded-xl font-semibold text-sm text-gray-700 hover:bg-gray-50 transition">
                  <ArrowLeft size={15} /> Back
                </button>
                <button disabled={!form.agree} className="flex-1 bg-blue-700 hover:bg-blue-800 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition shadow-md shadow-blue-200">
                  Create Account
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 mt-5 flex items-center justify-center gap-1">
                <Shield size={11} /> Need help?{" "}
                <span className="text-blue-600 underline cursor-pointer">Contact Support</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
