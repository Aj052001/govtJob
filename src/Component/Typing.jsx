import { useState } from "react";
import ModeToggle from "./typing/ModeToggle";
import LessonSystem from "./typing/LessonSystem";
import TestSystem from "./typing/TestSystem";

const Typing = () => {
  const [mode, setMode] = useState("test");

  return (
<<<<<<< HEAD
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
    } catch {
      return;
    }
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
=======
    <div className="min-h-screen bg-[#f0f4ff] p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <p className="text-xs text-gray-400 mb-1">Dashboard › Typing Practice</p>
          <div className="flex justify-between items-center flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Typing Module</h1>
              <p className="text-sm text-gray-500 mt-0.5">Practice & test your typing speed for govt exams</p>
>>>>>>> 8c7d15e80d9cb7d08244ffee0befe90ee1efe055
            </div>
            <ModeToggle mode={mode} onChange={setMode} />
          </div>
        </div>
        {mode === "practice" ? <LessonSystem /> : <TestSystem />}
      </div>
    </div>
  );
};

export default Typing;
