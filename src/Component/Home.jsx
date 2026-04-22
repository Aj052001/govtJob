import React from "react";
import {LayoutDashboard, FileText, BarChart2, BookOpen, Settings, Calendar, User, MapPin, Info, ShieldCheck, Clock,} from "lucide-react" 
import { useApp } from "../context/AppContext";

const Home = () => {
  
   const { user, jobs, notifications} = useApp();

  return (
    <div className="bg-[#f5f7fb] min-h-screen">
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-6">

        {/* ================= LEFT (FIXED) ================= */}
        <div className="w-full lg:w-[260px] space-y-5 lg:fixed lg:left-20 lg:top-24 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">

          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="h-20 bg-blue-700 relative">
              <img
                src={user.avatar}
                alt="profile"
                className="w-16 h-16 rounded-full border-4 border-white absolute -bottom-8 left-1/2 -translate-x-1/2"
              />
            </div>

            <div className="mt-10 text-center px-4 pb-5">
              <h2 className="font-semibold text-gray-900">{user.name}</h2>
              <p className="text-xs text-gray-500">
                {user.education}
              </p>

              <button className="mt-3 w-full border border-blue-600 text-blue-600 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition">
                View Full Profile
              </button>
            </div>

            <div className="border-t px-4 py-3 text-sm space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Eligible jobs count</span>
                <span className="text-blue-700 font-bold">{user.eligibleCount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Saved jobs</span>
                <span className="text-blue-700 font-bold">{user.savedCount}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-2 shadow-sm border">
            {[
              { icon: <LayoutDashboard size={18} />, label: "Dashboard", active: true },
              { icon: <FileText size={18} />, label: "Applications" },
              { icon: <BarChart2 size={18} />, label: "Performance" },
              { icon: <BookOpen size={18} />, label: "Resources" },
              { icon: <Settings size={18} />, label: "Settings" },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
                  item.active
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.icon}
                <span className="text-sm font-semibold">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CENTER ================= */}
        <div className="flex-1 lg:ml-[300px] lg:mr-[310px] space-y-5">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-white px-5 py-3 rounded-xl border">
            <h2 className="font-semibold text-gray-900">
              Recommended for you
            </h2>

            <div className="flex bg-gray-200 rounded-full p-1 text-xs font-bold w-fit">
              <button className="bg-blue-600 text-white px-4 py-1 rounded-full">
                Latest
              </button>
              <button className="px-4 text-gray-500">
                Closing Soon
              </button>
            </div>
          </div>

          {jobs.map((job, i) => (
            <div
              key={i}
              className={`bg-white p-5 rounded-2xl shadow-sm border border-gray-200 ${job.border || ""}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="p-3 bg-gray-100 rounded-lg border">
                    {job.icon}
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {job.org}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-bold ${
                    job.statusStyle || "bg-green-100 text-green-700"
                  }`}
                >
                  {job.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 mt-4 text-sm text-gray-600">
                <div className="flex gap-2 items-center">
                  <Calendar size={14} className="text-gray-400" />
                  Last Date: <b>{job.date}</b>
                </div>

                <div className="flex gap-2 items-center">
                  <User size={14} className="text-gray-400" />
                  Age Limit: <b>{job.age}</b>
                </div>

                {job.location && (
                  <div className="flex gap-2 items-center">
                    <MapPin size={14} className="text-gray-400" />
                    Location: <b>{job.location}</b>
                  </div>
                )}

                {job.pay && (
                  <div className="flex gap-2 items-center">
                    💰 Pay Level: <b>{job.pay}</b>
                  </div>
                )}
              </div>

              {job.note && (
                <p className="text-xs text-gray-400 mt-3 mb-3">
                  {job.note}
                </p>
              )}

              <div className="border-t my-3"></div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full w-fit">
                  2k+
                </div>

                <button className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 w-full sm:w-auto">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= RIGHT (FIXED) ================= */}
        <div className="w-full lg:w-[280px] space-y-5 lg:fixed lg:right-20 lg:top-24 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">

          <div className="bg-white p-4 rounded-2xl shadow-sm border">
            <h3 className="font-semibold mb-4 text-gray-900">
              Notification
            </h3>

            {notifications.map((item, i) => (
              <div key={i} className="flex gap-3 mb-4">
                <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${item.color}`}></div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

            <button className="text-blue-600 text-xs font-bold uppercase">
              View All Notifications
            </button>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border">
            <h3 className="font-semibold mb-3 text-gray-900">
              Exam Prep Kit
            </h3>

            {[
              { icon: <BarChart2 size={18} className="text-blue-700" />, label: "Smart Analysis" },
              { icon: <BookOpen size={18} className="text-blue-700" />, label: "Past Papers" },
              { icon: <Clock size={18} className="text-blue-700" />, label: "Daily Quiz" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg mb-2 hover:bg-gray-200 transition"
              >
                {item.icon}
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="text-xs text-gray-400 space-y-2">
            <div className="flex gap-3 flex-wrap">
              <span>About</span>
              <span>Accessibility</span>
              <span>Help Center</span>
              <span>Privacy & Terms</span>
            </div>
            <p className="text-blue-700 font-semibold">
              GovPrep Pro © 2023
            </p>
          </div>
        </div>

      </div>
    </div>
  ) 
} 

export default Home