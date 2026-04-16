import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart2, 
  BookOpen, 
  Settings, 
  CheckCircle2, 
  Zap, 
  Trophy, 
  TrendingUp, 
  PenTool 
} from 'lucide-react';   

const Rank = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
      
     
      <div className="w-full lg:w-[280px]  space-y-5 p-4 lg:p-6 border-b lg:border-b-0 lg:border-r bg-white  shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="h-20 bg-blue-700 relative">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS6xF72LSS714ihYtTOD3xjbXJAbhb5pUQDg&s"
              alt="profile"
              className="w-16 h-16 rounded-full border-4 border-white absolute -bottom-8 left-1/2 -translate-x-1/2"
            />    
          </div>
          <div className="mt-10 text-center px-4 pb-5">
            <h2 className="font-semibold text-gray-900">Aryan Sharma</h2>
            <p className="text-[11px] text-gray-500">Master's in Computer Application</p>
            <button className="mt-3 w-full border border-blue-600 text-blue-600 py-2 rounded-lg text-xs font-bold hover:bg-blue-50 transition">
              View Full Profile
            </button>
          </div>
          <div className="border-t px-4 py-3 text-[12px] space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Eligible jobs count</span>
              <span className="text-blue-700 font-bold">24</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Saved jobs</span>
              <span className="text-blue-700 font-bold">12</span>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl p-2 shadow-sm border column lg:block overflow-x-auto lg:overflow-visible">
          {[
            { icon: <LayoutDashboard size={18} />, label: "Dashboard" },
            { icon: <FileText size={18} />, label: "Applications" },
            { icon: <BarChart2 size={18} />, label: "Performance", active: true },
            { icon: <BookOpen size={18} />, label: "Resources" },
            { icon: <Settings size={18} />, label: "Settings" },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-3 p-2 lg:p-3 min-w-[80px] lg:min-w-0 rounded-xl cursor-pointer whitespace-nowrap transition ${
                item.active
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {item.icon}
              <span className="text-[10px] lg:text-sm font-semibold text-center">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Performance Rankings</h1>
              <p className="text-slate-500 mt-1 text-sm sm:text-base">Detailed analysis of your standing in SSC CGL 2024 Tier 1</p>
            </div>
            <div className="flex bg-slate-200/50 p-1 rounded-xl w-full sm:w-auto">
              <button className="flex-1 sm:flex-none bg-white px-4 sm:px-5 py-2 rounded-lg shadow-sm text-sm font-bold text-slate-700">Self Performance</button>
              <button className="flex-1 sm:flex-none px-4 sm:px-5 py-2 text-sm font-bold text-slate-400">Global Board</button>
            </div>
          </header>

          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8">
            <div className="lg:col-span-8 bg-white p-5 sm:p-6 lg:p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="font-bold text-lg mb-6">Update Marks</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Select Exam</label>
                  <select className="w-full p-3 sm:p-4 bg-slate-50 rounded-2xl border-none font-medium">
                    <option>SSC CGL 2024 Tier 1</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Raw Score</label>
                  <input type="number" placeholder="168" className="w-full p-3 sm:p-4 bg-slate-50 rounded-2xl border-none font-bold" />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="w-full sm:w-auto bg-[#074D91] text-white px-6 sm:px-8 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-blue-100">
                  Calculate My Percentile
                </button>
              </div>
            </div>

            
            <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute left-0 top-0 w-1.5 h-full bg-[#074D91]"></div>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">Your Percentile</p>
               
               <div className="relative w-28 sm:w-32 lg:w-36 h-28 sm:h-32 lg:h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="50%" cy="50%" r="40%" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100" />
                    <circle cx="50%" cy="50%" r="40%" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={251} strokeDashoffset={251 - (251 * 98.4) / 100} className="text-[#074D91]" strokeLinecap="round" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-black">98.4%</span>
                    <span className="text-[9px] sm:text-[10px] font-black text-slate-400">TOP 2%</span>
                  </div>
               </div>

               <p className="mt-6 text-center text-xs text-slate-400 font-medium leading-relaxed">
                 Higher than <span className="text-slate-900 font-bold">4.2 lakh candidates</span>
               </p>
            </div>
          </div>

          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8">
            <div className="lg:col-span-8 bg-white p-5 sm:p-6 lg:p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="font-bold text-lg mb-8">Subject-wise Accuracy</h3>
              <div className="space-y-6">
                {[
                  { label: "Quants", val: "48/50", p: "96%" },
                  { label: "English", val: "45/50", p: "90%" },
                  { label: "Reasoning", val: "49/50", p: "98%" },
                  { label: "G.K.", val: "26/50", p: "52%" }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span>{item.label}</span>
                      <span className="text-slate-400">{item.val}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#074D91] h-full rounded-full" style={{ width: item.p }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4">
              <h3 className="font-bold text-lg px-2">Strong Subjects</h3>
              {[
                { t: "Geometry", d: "100% Accuracy in mocks" },
                { t: "Reading Comp.", d: "Avg time: 42s/ques" },
                { t: "Coding-Decoding", d: "Mastery level: Expert" }
              ].map((s, idx) => (
                <div key={idx} className="bg-[#F0FDF4] p-4 rounded-2xl border border-green-100 flex gap-4 items-start shadow-sm">
                  <CheckCircle2 size={18} className="text-green-600 mt-1" />
                  <div>
                    <h4 className="font-bold text-sm">{s.t}</h4>
                    <p className="text-[11px] text-slate-500 font-medium">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="font-bold text-lg text-slate-800 mb-10">Recent Milestones</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">

              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-[#DCE7F9] rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm">
                  <Trophy size={20} className="text-[#074D91]" />
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-slate-900">Ranked #1</h4>
                  <p className="text-[11px] text-slate-500">Daily English Quiz</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-[#E0E7FF] rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm">
                  <Zap size={20} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-slate-900">Speed Demon</h4>
                  <p className="text-[11px] text-slate-500">Solved fast</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-[#E0F2FE] rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-slate-900">+12 Rank</h4>
                  <p className="text-[11px] text-slate-500">Mock test</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-[#F1F5F9] rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm">
                  <PenTool size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-slate-900">Silver Pen</h4>
                  <p className="text-[11px] text-slate-500">Essays done</p>
                </div>
              </div>

            </div>
          </div>
        </div>  
      </main>
    </div>
  ) 
} 

export default Rank 