import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BarChart2,
  BookOpen,
  Check,
  Clock,
  Copy,
  FileText,
  Gauge,
  Keyboard,
  LayoutDashboard,
  Lightbulb,
  Play,
  RefreshCw,
  Settings,
  Star,
  TrendingUp,
} from "lucide-react";

const DURATION = 10 * 60;
const FONT_SIZE = 18;

const PASSAGES = [
  // "The Staff Selection Commission conducts the Combined Graduate Level Examination every year to recruit candidates for various Group B and Group C posts in different Ministries and Departments of the Government of India. Candidates appearing for the typing test must achieve a minimum speed of thirty five words per minute in English on a computer. Accuracy and speed both are evaluated during the test. It is therefore important that candidates practice regularly to improve their typing speed and reduce errors.",
  // "The Government of India has launched several flagship programmes aimed at improving the quality of life of citizens across the country. The Digital India initiative seeks to transform the country into a digitally empowered society by ensuring that government services are made available to citizens electronically. The Pradhan Mantri Jan Dhan Yojana has been instrumental in bringing millions of unbanked citizens into the formal financial system by providing them with zero balance bank accounts.",
  // "Public administration in India is governed by a well established set of rules and procedures that ensure transparency and efficiency in the delivery of government services. The civil services of India are divided into All India Services, Central Services, and State Services, each with its own recruitment process. Officers recruited through the Union Public Service Commission are posted to various departments and are responsible for implementing government policies at the ground level.",
  "Main ChatGPT hoon, ek artificial intelligence system jo OpenAI ne banaya hai. Main insaan nahi hoon, mere paas emotions, personal life ya real experiences nahi hain; main sirf data aur patterns ke basis par kaam karta hoon. Tum jo bhi likhte ho, main usko samajhne ki koshish karta hoon aur uske hisaab se jawab deta hoon. Maine bahut saare books, articles aur general knowledge sources se training li hai, isliye main concepts samjha sakta hoon, problems solve kar sakta hoon, writing mein help kar sakta hoon, coding kar sakta hoon aur naye ideas generate kar sakta hoon. Lekin main perfect nahi hoon—kabhi galti kar sakta hoon, aur mera knowledge mostly 2025 tak ka updated hai, isliye har cheez real-time ya fully accurate ho ye zaroori nahi. Main khud se sochne wala independent mind nahi hoon, balki ek tool hoon jo input ke basis par output deta hai. Iska matlab ye hai ki main utna hi powerful hoon jitna achha tum mujhe use karte ho. Agar tum clear aur specific questions poochte ho to main kaafi strong aur useful hoon—writing, reasoning aur coding mein especially. Lekin agar tum vague ya unclear ho, to mera output bhi average ho jayega. Isliye mujhe ek smart tool ki tarah use karo, blindly trust mat karo, aur important cheezon ko verify bhi karte raho."
];


const SIDEBAR_ITEMS = [
  { label: "Dashboard", Icon: LayoutDashboard, active: true },
  { label: "Skillboard", Icon: Keyboard },
  { label: "Notes", Icon: FileText },
  { label: "Performance", Icon: BarChart2 },
  { label: "Resources", Icon: BookOpen },
  { label: "Settings", Icon: Settings },
];

function AccuracyMiniRing({ value }) {
  const r = 15;
  const stroke = 3;
  const size = 38;
  const circ = 2 * Math.PI * r;
  const clamped = Math.min(100, Math.max(0, value));
  const offset = circ - (clamped / 100) * circ;

  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="#22c55e" strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <Check size={16} className="absolute text-[#22c55e]" />
    </div>
  );
}

export default function Typing() {
  const containerRef = useRef(null);
  const copyTimeoutRef = useRef(null);

  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [capsLock, setCapsLock] = useState(false);
  const [copied, setCopied] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [passage] = useState(() => PASSAGES[Math.floor(Math.random() * PASSAGES.length)]);
  const inputRef = useRef(null);

  const isFinished = started && (timeLeft <= 0 || submitted);

  const elapsed = (DURATION - timeLeft) / 60;
  const typedWords = inputVal.trim().split(/\s+/).filter(Boolean);
  const passageWords = passage.trim().split(/\s+/);
  const correctCount = typedWords.filter((w, i) => w === passageWords[i]).length;
  const wpm = elapsed > 0 ? Math.round(typedWords.length / elapsed) : 0;
  const accuracy = typedWords.length > 0 ? Math.round((correctCount / typedWords.length) * 100) : 100;

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  useEffect(() => {
    if (!started || isFinished) return;
    const id = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [started, isFinished]);

  useEffect(() => {
    return () => clearTimeout(copyTimeoutRef.current);
  }, []);

  function handleStart() {
    setStarted(true);
    setSubmitted(false);
    setTimeLeft(DURATION);
    setCapsLock(false);
    setCopied(false);
    setInputVal("");
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(passage);
      setCopied(true);
      clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 1400);
    } catch {}
  }

  function handleKeyDown(e) {
    setCapsLock(!!e.getModifierState?.("CapsLock"));
  }

  function handleWordInput(e) {
    if (!started || isFinished) return;
    setInputVal(e.target.value);
  }

  return (
    <div
      className="bg-[#f5f7fb] min-h-screen p-4 sm:p-6 flex justify-center"
      ref={containerRef}
      tabIndex={-1}
    >
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-[260px] space-y-5">
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
              <p className="text-xs text-gray-500">Master's in Computer Application</p>
              <button className="mt-3 w-full border border-blue-600 text-blue-600 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition">
                View Full Profile
              </button>
            </div>
            <div className="border-t px-4 py-3 text-sm space-y-2">
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

          <div className="bg-white rounded-2xl p-2 shadow-sm border">
            {SIDEBAR_ITEMS.map(({ label, Icon, active }) => (
              <div
                key={label}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
                  active ? "bg-blue-50 text-blue-700" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Panel */}
        <section className="flex-1 min-w-0 bg-white rounded-2xl shadow-sm border overflow-hidden flex flex-col">
          {/* Header */}
          <header className="bg-white border-b border-[#e8eaed] px-6 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[11px] text-[#999] mb-0.5">
                  Dashboard &nbsp;&gt;&nbsp; Typing Practice
                </div>
                <h1 className="text-[16px] font-bold text-[#1a1a2e] truncate">
                  SSC CGL Tier II — Typing Test (English)
                </h1>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="hidden sm:flex items-center gap-1.5 text-[12px] text-[#888]">
                  Difficulty:{" "}
                  <span className="font-medium text-[#1a1a2e]">Medium</span>
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                </div>
                <button
                  type="button"
                  onClick={handleStart}
                  className="flex items-center gap-2 px-5 py-2 rounded-md text-[13px] font-semibold bg-[#3b82f6] text-white hover:bg-[#2563eb] transition-colors"
                >
                  {started ? <RefreshCw size={16} /> : <Play size={16} />}
                  {started ? "Restart Test" : "Start Test"}
                </button>
              </div>
            </div>
          </header>

          {/* Stats Row */}
          <div className="bg-white border-b border-[#e8eaed] px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex items-center justify-between sm:justify-start gap-5 min-w-[210px]">
              <div>
                <div className="text-[10px] text-[#999] uppercase tracking-wider font-medium mb-1">Time Remaining</div>
                <div className="text-[32px] font-bold font-mono text-[#1a1a2e] leading-none">{minutes}:{seconds}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#f0f2f5] border border-[#e0e2e6] flex items-center justify-center">
                <Clock size={18} className="text-[#65758b]" />
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-5 min-w-[210px]">
              <div>
                <div className="text-[10px] text-[#999] uppercase tracking-wider font-medium mb-1">Current Speed</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[32px] font-bold text-[#1a1a2e] leading-none">{wpm}</span>
                  <span className="text-[11px] text-[#999]">WPM</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#f0f2f5] border border-[#e0e2e6] flex items-center justify-center">
                <Gauge size={18} className="text-[#65758b]" />
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-5 min-w-[210px]">
              <div>
                <div className="text-[10px] text-[#999] uppercase tracking-wider font-medium mb-1">Accuracy</div>
                <div className="text-[32px] font-bold text-[#1a1a2e] leading-none">{accuracy}%</div>
              </div>
              <AccuracyMiniRing value={accuracy} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 py-5 bg-[#f5f6fa] overflow-auto flex flex-col gap-4">

            {/* Passage Display — plain read only */}
            <div className="bg-white rounded-lg border h-[200px] border-[#e0e2e6] p-5">
              <div className="text-[10px] text-[#999] uppercase tracking-wider font-medium mb-3">Passage — Read carefully and type below</div>
              <p
                className="leading-[1.9] tracking-wide text-[#1a1a2e] select-none"
                style={{ fontSize: `${FONT_SIZE}px` }}
              >
                {passage}
              </p>
            </div>

            {/* Typing Input Area */}
            <div className="bg-white rounded-lg border border-[#e0e2e6] p-4">
              <div className="text-[10px] text-[#999] uppercase tracking-wider font-medium mb-3">Type the passage below</div>
              <textarea
                ref={inputRef}
                value={inputVal}
                onChange={handleWordInput}
                onKeyDown={handleKeyDown}
                disabled={!started || isFinished}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder={started ? "Start typing here..." : "Click \"Start Test\" to begin..."}
                rows={6}
                className="w-full border border-[#e0e2e6] rounded-md px-4 py-3 text-[16px] font-mono focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-blue-100 bg-[#f9fafb] disabled:opacity-50 resize-none"
              />
              <div className="mt-2 flex items-center justify-between text-[11px] text-[#888]">
                <span
                  className={`px-3 py-1 rounded border flex items-center gap-1.5 ${
                    capsLock ? "bg-red-50 text-red-500 border-red-200" : "bg-[#f5f6fa] text-[#888] border-[#e0e2e6]"
                  }`}
                >
                  <Keyboard size={14} />
                  Caps Lock: {capsLock ? "ON" : "OFF"}
                </span>
                <div className="flex items-center gap-2">
                  {started && !isFinished && (
                    <button
                      type="button"
                      onClick={() => setSubmitted(true)}
                      className="px-4 py-2 rounded-md text-[13px] font-semibold bg-[#22c55e] text-white hover:bg-[#16a34a] transition-colors"
                    >
                      Submit Test
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="w-9 h-9 rounded-lg border border-[#e0e2e6] bg-white hover:bg-[#f5f6fa] transition-colors flex items-center justify-center"
                    title={copied ? "Copied" : "Copy Passage"}
                  >
                    <Copy size={16} className="text-[#65758b]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Result — shown only after test ends */}
            {isFinished && (
              <div className="bg-white rounded-lg border border-[#e0e2e6] p-6">
                <div className="text-[11px] text-[#999] uppercase tracking-wider font-medium mb-4">Test Result</div>
                <div className="flex flex-wrap gap-8 mb-5">
                  <div className="text-center">
                    <div className="text-[10px] text-[#999] uppercase tracking-wider mb-1">Final Speed</div>
                    <div className="text-[36px] font-bold text-[#1a1a2e] leading-none">{wpm}</div>
                    <div className="text-[11px] text-[#999] mt-1">WPM</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-[#999] uppercase tracking-wider mb-1">Accuracy</div>
                    <div className="text-[36px] font-bold text-[#22c55e] leading-none">{accuracy}%</div>
                    <div className="text-[11px] text-[#999] mt-1">Correct Words</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-[#999] uppercase tracking-wider mb-1">Words Typed</div>
                    <div className="text-[36px] font-bold text-[#3b82f6] leading-none">{typedWords.length}</div>
                    <div className="text-[11px] text-[#999] mt-1">of {passageWords.length}</div>
                  </div>
                  <div className="flex items-center ml-auto">
                    <div className={`px-5 py-3 rounded-lg text-[14px] font-bold ${
                      wpm >= 35 ? "bg-green-50 text-green-600 border border-green-200" : "bg-red-50 text-red-500 border border-red-200"
                    }`}>
                      {wpm >= 35 ? "✓ SSC Qualified (35+ WPM)" : "✗ Below SSC Cutoff (35 WPM)"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Cards */}
          <div className="px-6 pb-5 bg-[#f5f6fa] grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-[#e0e2e6] p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-[#fef3c7] flex items-center justify-center">
                  <Lightbulb size={14} className="text-[#f59e0b]" />
                </div>
                <h3 className="font-semibold text-[13px] text-[#1a1a2e]">Editor&apos;s Tip</h3>
              </div>
              <p className="text-[12px] text-[#888] leading-relaxed">
                Keep your eyes on the screen, not the keys. Practice the home row technique to increase
                your speed without sacrificing accuracy. For government exams, consistency is more
                valuable than sporadic bursts of speed.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-[#e0e2e6] p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-[#dbeafe] flex items-center justify-center">
                  <TrendingUp size={14} className="text-[#2563eb]" />
                </div>
                <h3 className="font-semibold text-[13px] text-[#1a1a2e]">Your Recent Trends</h3>
              </div>
              <div className="space-y-2.5 text-[12px]">
                <div className="flex justify-between items-center">
                  <span className="text-[#888]">Last Session</span>
                  <span className="font-semibold text-[#1a1a2e]">42 WPM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#888]">Accuracy Trend</span>
                  <span className="font-semibold text-[#22c55e] flex items-center gap-1">
                    <ArrowUpRight size={14} />
                    96% / 98%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#e5e7eb] mt-1">
                  <div className="h-full rounded-full bg-[#3b82f6]" style={{ width: "75%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-[#e8eaed] bg-white px-6 py-2.5 flex items-center justify-between text-[10px] text-[#999]">
            <span>© 2024 GovExam Pro - Official Typing Navigation Module</span>
            <div className="flex gap-5">
              <span className="hover:text-[#666] cursor-pointer">Guidelines</span>
              <span className="hover:text-[#666] cursor-pointer">Feedback</span>
              <span className="hover:text-[#666] cursor-pointer">Keyboard Shortcuts</span>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
