import { useEffect, useMemo, useRef, useState } from "react";
import { LiveStatsCard, RecentPerformanceCard, TipsCard } from "./StatsPanel";
// import TEST_TEXTS from "./testTexts";
import { RotateCcw, ArrowLeft, CheckCircle, XCircle, Play, Clock, Zap, Shield, Target, Trophy, BookOpen, Timer } from "lucide-react";
import { useApp } from "../../context/AppContext";

const BEST_KEY = "typing_test_best_v1";
const loadBest = () => { try { return JSON.parse(localStorage.getItem(BEST_KEY)) || { wpm: 0, accuracy: 0, lastWpm: 0 }; } catch { return { wpm: 0, accuracy: 0, lastWpm: 0 }; } };

const TIME_OPTIONS = [
  { label: "1 min",  value: 60,  hint: "Standard" },
  { label: "5 min",  value: 300, hint: "Endurance" },
  { label: "10 min", value: 600, hint: "SSC Pattern" },
];

const DIFFICULTIES = [
  { key: "beginner", label: "Beginner", desc: "Simple short sentences", wpm: "15–25 WPM", icon: <BookOpen size={20} />, active: "border-emerald-400 bg-emerald-50 shadow-emerald-100", iconBg: "bg-emerald-100 text-emerald-600", dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700", bar: "bg-emerald-400", barW: "w-1/3" },
  { key: "medium",   label: "Medium",   desc: "Normal paragraphs",     wpm: "25–40 WPM", icon: <Zap size={20} />,      active: "border-blue-400 bg-blue-50 shadow-blue-100",     iconBg: "bg-blue-100 text-blue-600",    dot: "bg-blue-500",    badge: "bg-blue-100 text-blue-700",    bar: "bg-blue-400",    barW: "w-2/3" },
  { key: "advanced", label: "Advanced", desc: "SSC exam-level text",   wpm: "35+ WPM",   icon: <Shield size={20} />,   active: "border-rose-400 bg-rose-50 shadow-rose-100",     iconBg: "bg-rose-100 text-rose-600",    dot: "bg-rose-500",    badge: "bg-rose-100 text-rose-700",    bar: "bg-rose-400",    barW: "w-full" },
];

const SSC_CUTOFF = 35;

export default function TestSystem() {
  const [step, setStep]             = useState("config");
  const [difficulty, setDifficulty] = useState("advanced");
  const [duration, setDuration]     = useState(600);
  const [text, setText]             = useState("");
  const [typed, setTyped]           = useState("");
  const [running, setRunning]       = useState(false);
  const [finished, setFinished]     = useState(false);
  const [timeLeft, setTimeLeft]     = useState(600);
  const [best, setBest]             = useState(loadBest);
  const [capsLock, setCapsLock]     = useState(false);
  const textareaRef                 = useRef(null);
  const intervalRef                 = useRef(null);


  const {testTexts} = useApp();

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => { if (t <= 1) { clearInterval(intervalRef.current); finishTest(); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const stats = useMemo(() => {
    const passageWords = text.trim().split(/\s+/);
    const typedWords   = typed.trim().split(/\s+/).filter(Boolean);
    const correct      = typedWords.filter((w, i) => w === passageWords[i]).length;
    const accuracy     = typedWords.length ? Math.round((correct / typedWords.length) * 100) : 100;
    const elapsed      = Math.max(1, duration - timeLeft);
    const wpm          = Math.round(typedWords.length / (elapsed / 60));
    return { correct, total: typedWords.length, accuracy, wpm: isFinite(wpm) ? wpm : 0 };
  }, [typed, text, duration, timeLeft]);

  const finishTest = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setFinished(true);
    const updated = { wpm: Math.max(best.wpm, stats.wpm), accuracy: Math.max(best.accuracy, stats.accuracy), lastWpm: stats.wpm };
    setBest(updated);
    try { localStorage.setItem(BEST_KEY, JSON.stringify(updated)); } catch {}
  };

  const startTest = () => {
    clearInterval(intervalRef.current);
    const arr = testTexts[difficulty];
    setText(arr[Math.floor(Math.random() * arr.length)]);
    setTyped(""); setTimeLeft(duration); setFinished(false); setRunning(true); setStep("typing");
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    const arr = testTexts[difficulty];
    setText(arr[Math.floor(Math.random() * arr.length)]);
    setTyped(""); setTimeLeft(duration); setFinished(false); setRunning(true);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const backToConfig = () => { clearInterval(intervalRef.current); setRunning(false); setFinished(false); setTyped(""); setStep("config"); };

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  const isLow = timeLeft <= 30 && running;

  // ── CONFIG ──────────────────────────────────────────────────────
  if (step === "config") {
    const activeDiff = DIFFICULTIES.find((d) => d.key === difficulty);
    const activeTime = TIME_OPTIONS.find((t) => t.value === duration);
    return (
      <div className="flex flex-col gap-6">

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-gray-900 to-blue-950 rounded-xl px-5 py-3 flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-500/30 uppercase tracking-wider">SSC · CGL</span>
            <h2 className="text-base font-extrabold text-white">Configure <span className="text-blue-400">Typing Test</span></h2>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>Best: <strong className="text-white">{best.wpm} WPM</strong></span>
            <div className="w-px h-3 bg-white/20" />
            <span>Cutoff: <strong className="text-emerald-400">35 WPM</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* Left: Difficulty + Duration */}
          <div className="flex flex-col gap-5">

            {/* Difficulty */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                <p className="font-bold text-gray-900">Choose Difficulty</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {DIFFICULTIES.map((d) => {
                  const active = difficulty === d.key;
                  return (
                    <button key={d.key} onClick={() => setDifficulty(d.key)}
                      className={`text-left p-5 rounded-2xl border-2 flex flex-col gap-3 transition-all duration-200 shadow-sm ${
                        active ? `${d.active} shadow-md -translate-y-0.5` : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-md hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className={`p-2.5 rounded-xl ${d.iconBg}`}>{d.icon}</div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          active ? `${d.dot} border-transparent` : "border-gray-300 bg-white"
                        }`}>
                          {active && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{d.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{d.desc}</p>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Speed range</span>
                          <span className="font-semibold text-gray-600">{d.wpm}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${d.bar} ${d.barW}`} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                <p className="font-bold text-gray-900">Select Duration</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {TIME_OPTIONS.map((t) => {
                  const active = duration === t.value;
                  return (
                    <button key={t.value} onClick={() => setDuration(t.value)}
                      className={`p-5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all duration-200 ${
                        active ? "border-blue-400 bg-gradient-to-b from-blue-50 to-indigo-50 shadow-md shadow-blue-100 -translate-y-0.5" : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm hover:-translate-y-0.5"
                      }`}
                    >
                      <Clock size={18} className={active ? "text-blue-600" : "text-gray-400"} />
                      <span className={`text-xl font-extrabold ${active ? "text-blue-700" : "text-gray-900"}`}>{t.label}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        active ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                      }`}>{t.hint}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Summary + Start */}
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Test Summary</p>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-500">Difficulty</span>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${activeDiff.badge}`}>{activeDiff.label}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-500">Duration</span>
                  <span className="text-sm font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">{activeTime.label}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-500">Speed Target</span>
                  <span className="text-sm font-bold text-gray-700">{activeDiff.wpm}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-500">SSC Cutoff</span>
                  <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">35 WPM</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-400 mb-3">Your personal best</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-extrabold text-blue-700">{best.wpm}</p>
                    <p className="text-xs text-blue-500 mt-0.5">Best WPM</p>
                  </div>
                  <div className="bg-indigo-50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-extrabold text-indigo-700">{best.accuracy}%</p>
                    <p className="text-xs text-indigo-500 mt-0.5">Best Accuracy</p>
                  </div>
                </div>
              </div>

              <button onClick={startTest} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-base hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-blue-500/25">
                <Play size={18} fill="white" /> Start Typing Test
              </button>
              <p className="text-center text-xs text-gray-400">Press Start to load a random passage</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── TYPING ──────────────────────────────────────────────────────
  const passageWords = text.trim().split(/\s+/);
  const typedWordCount = typed.trim().split(/\s+/).filter(Boolean).length;
  const progress = Math.min(100, Math.round((typedWordCount / passageWords.length) * 100));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">
      {/* Left */}
      <div className="flex flex-col gap-4">
        {/* Top bar */}
        <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm flex justify-between items-center flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <button onClick={backToConfig} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition">
              <ArrowLeft size={14} /> Settings
            </button>
            <div>
              <p className="text-xs text-gray-400 tracking-wide uppercase">SSC CGL Tier II — Typing Test</p>
              <p className="font-bold text-gray-900">{DIFFICULTIES.find((d) => d.key === difficulty).label} · {TIME_OPTIONS.find((t) => t.value === duration).label}</p>
            </div>
          </div>
          <button onClick={handleReset} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm hover:opacity-90 transition">
            <RotateCcw size={13} /> Restart
          </button>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "TIME LEFT", value: `${mm}:${ss}`, cls: isLow ? "text-red-600" : "text-gray-900", card: isLow ? "border-red-200 bg-red-50" : "border-gray-100 bg-white" },
            { label: "SPEED",     value: `${stats.wpm} WPM`, cls: "text-blue-600",  card: "border-gray-100 bg-white" },
            { label: "ACCURACY",  value: `${stats.accuracy}%`, cls: "text-green-600", card: "border-gray-100 bg-white" },
          ].map((s) => (
            <div key={s.label} className={`border rounded-2xl p-4 shadow-sm ${s.card}`}>
              <p className="text-xs text-gray-400 tracking-widest font-semibold">{s.label}</p>
              <p className={`text-3xl font-bold mt-1 ${s.cls}`} style={{ fontFamily: "monospace" }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Passage */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <p className="text-xs text-gray-400 tracking-widest font-semibold uppercase mb-3">Passage — Read and Type Below</p>
          <p className="text-base leading-8 text-gray-700 select-none" style={{ letterSpacing: "0.2px" }}>{text}</p>
        </div>

        

        {/* Textarea */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <p className="text-xs text-gray-400 tracking-widest font-semibold uppercase mb-3">Type Here</p>
          <textarea
            ref={textareaRef}
            value={typed}
            onChange={(e) => { if (running && !finished) setTyped(e.target.value); }}
            onKeyDown={(e) => setCapsLock(!!e.getModifierState?.("CapsLock"))}
            disabled={!running || finished}
            autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
            placeholder={running ? "Start typing the passage above..." : "Click Start Test to begin..."}
            rows={6}
            className="w-full border-2 border-gray-100 focus:border-blue-400 rounded-xl p-4 text-base resize-none outline-none transition-all bg-gray-50 focus:bg-white text-gray-900 disabled:opacity-60"
            style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", lineHeight: 1.8 }}
          />
          <div className="mt-3 flex justify-between items-center">
            <span className={`text-xs px-3 py-1.5 rounded-lg border font-semibold ${capsLock ? "border-red-200 bg-red-50 text-red-600" : "border-gray-200 bg-gray-50 text-gray-500"}`}>
              ⌨ Caps Lock: {capsLock ? "ON ⚠" : "OFF"}
            </span>
            {running && !finished && (
              <button onClick={finishTest} className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-sm hover:opacity-90 transition shadow-sm shadow-green-500/30">
                <CheckCircle size={15} /> Submit Test
              </button>
            )}
          </div>
        </div>

        {/* Result */}
        {finished && (
          <div className={`border-2 rounded-2xl p-6 ${stats.wpm >= SSC_CUTOFF ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
            <p className="text-xs tracking-widest font-semibold uppercase text-gray-400 mb-4">Test Result</p>
            <div className="flex flex-wrap gap-8 mb-5">
              {[
                { label: "Final Speed",   value: stats.wpm,          unit: "WPM",                      cls: "text-gray-900" },
                { label: "Accuracy",      value: `${stats.accuracy}%`, unit: "correct",                cls: "text-blue-600" },
                { label: "Words Typed",   value: stats.total,        unit: `of ${passageWords.length}`, cls: "text-gray-500" },
                { label: "Correct Words", value: stats.correct,      unit: "words",                    cls: "text-green-600" },
              ].map((r) => (
                <div key={r.label} className="text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{r.label}</p>
                  <p className={`text-4xl font-extrabold leading-none ${r.cls}`}>{r.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{r.unit}</p>
                </div>
              ))}
              <div className="ml-auto flex items-center">
                <div className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm border-2 ${stats.wpm >= SSC_CUTOFF ? "bg-green-100 border-green-300 text-green-700" : "bg-red-100 border-red-300 text-red-700"}`}>
                  {stats.wpm >= SSC_CUTOFF ? <CheckCircle size={16} /> : <XCircle size={16} />}
                  {stats.wpm >= SSC_CUTOFF ? "SSC Qualified (35+ WPM)" : "Below SSC Cutoff (35 WPM)"}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={backToConfig} className="px-4 py-2 rounded-xl border-2 border-gray-200 bg-white text-gray-700 font-bold text-sm hover:bg-gray-50 transition">New Test</button>
              <button onClick={handleReset} className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm hover:opacity-90 transition">Try Again</button>
            </div>
          </div>
        )}
      </div>

      {/* Right sidebar */}
      <div className="flex flex-col gap-4">
        <LiveStatsCard wpm={stats.wpm} accuracy={stats.accuracy} errors={stats.total - stats.correct} timeLeft={timeLeft} />
        <RecentPerformanceCard bestWpm={best.wpm} bestAccuracy={best.accuracy} lastWpm={best.lastWpm} />
        <TipsCard tip="Keep your eyes on the screen, not the keys. Practice the Home Row technique to increase speed without sacrificing accuracy. For SSC exams, 35+ WPM with 95%+ accuracy is the target." />
      </div>
    </div>
  );
}
