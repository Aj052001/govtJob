import React, { useEffect, useState } from "react";
import TypingArea from "./TypingArea";
import Keyboard from "./Keyboard";
// import LESSONS from "./lessons";
import { Lock, CheckCircle, ChevronRight, RotateCcw, ArrowLeft } from "lucide-react";
import { useApp } from "../../context/AppContext";

const STORAGE_KEY = "typing_practice_progress_v1";
const loadProgress = () => { try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : { completed: [] }; } catch { return { completed: [] }; } };
const saveProgress = (p) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {} };

const LessonSystem = () => {
  const [progress, setProgress] = useState(loadProgress);
  const [currentId, setCurrentId] = useState(null);
  const [typed, setTyped] = useState("");
  const [activeKey, setActiveKey] = useState(null);

  const {lessons} = useApp();

  const lesson = currentId ? lessons.find((l) => l.id === currentId) : null;
  const text = lesson?.text || "";
  const isComplete = lesson && typed.length >= text.length;

  useEffect(() => { setTyped(""); }, [currentId]);

  useEffect(() => {
    if (isComplete && lesson && !progress.completed.includes(lesson.id)) {
      const next = { completed: [...progress.completed, lesson.id] };
      setProgress(next);
      saveProgress(next);
    }
  }, [isComplete]);

  const handleKey = (e) => {
    const k = e.key;
    if (k === "Backspace") { setTyped((t) => t.slice(0, -1)); e.preventDefault(); return; }
    if (k.length !== 1) return;
    setActiveKey(k);
    setTimeout(() => setActiveKey(null), 120);
    setTyped((t) => (t.length < text.length ? t + k : t));
    e.preventDefault();
  };

  const isUnlocked = (id) => id === lessons[0].id || progress.completed.includes(id - 1) || progress.completed.includes(id);

  if (!currentId) {
    const completedCount = progress.completed.length;
    const totalCount = lessons.length;
    const overallPct = Math.round((completedCount / totalCount) * 100);

    return (
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex justify-between items-center flex-wrap gap-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">Practice Mode · Step-by-step Lessons</p>
            <h2 className="text-xl font-bold text-gray-900">Choose a lesson to begin</h2>
            <p className="text-sm text-gray-500 mt-1">Lessons unlock progressively. Complete one to open the next.</p>
          </div>
          <div className="min-w-[220px]">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Overall Progress</span>
              <span className="font-bold text-gray-900">{completedCount}/{totalCount}</span>
            </div>
            <div className="h-2.5 bg-blue-50 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all" style={{ width: `${overallPct}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-1">{overallPct}% complete</p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {lessons.map((l) => {
            const unlocked = isUnlocked(l.id);
            const done = progress.completed.includes(l.id);
            return (
              <button
                key={l.id}
                disabled={!unlocked}
                onClick={() => unlocked && setCurrentId(l.id)}
                className={`text-left rounded-2xl p-5 border-2 flex flex-col gap-3 transition-all duration-150
                  ${done     ? "border-green-200 bg-green-50 hover:shadow-md hover:-translate-y-0.5" :
                    unlocked ? "border-gray-100 bg-white hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5" :
                    "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"}
                `}
              >
                <div className="flex justify-between items-center">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base
                    ${done ? "bg-green-500 text-white" : unlocked ? "bg-blue-50 text-blue-600" : "bg-gray-200 text-gray-400"}
                  `}>
                    {done ? <CheckCircle size={18} /> : unlocked ? l.id : <Lock size={16} />}
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full
                    ${done ? "bg-green-100 text-green-700" : unlocked ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-400"}
                  `}>
                    {done ? "Done" : unlocked ? "Available" : "Locked"}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Lesson {l.id}</p>
                  <p className="font-bold text-gray-900">{l.title}</p>
                </div>
                <p className="text-xs text-gray-500">Focus: <strong className="text-gray-700">{l.focus}</strong></p>
                {unlocked && (
                  <p className={`text-xs font-bold flex items-center gap-1 ${done ? "text-green-600" : "text-blue-600"}`}>
                    {done ? "Practice Again" : "Start Lesson"} <ChevronRight size={12} />
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const expectedKey = text[typed.length];
  const correct = typed.split("").filter((c, i) => c === text[i]).length;
  const accuracy = typed.length ? Math.round((correct / typed.length) * 100) : 100;
  const progressPct = Math.round((typed.length / text.length) * 100);

  return (
    <div className="flex flex-col gap-4">
      {/* Top bar */}
      <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm flex justify-between items-center flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentId(null)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition">
            <ArrowLeft size={14} /> All Lessons
          </button>
          <div>
            <p className="text-xs text-gray-400">Lesson {lesson.id} · {lesson.focus}</p>
            <p className="font-bold text-gray-900">{lesson.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="text-center">
            <p className="text-xs text-gray-400">Progress</p>
            <p className="font-bold text-gray-900">{progressPct}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">Accuracy</p>
            <p className="font-bold text-blue-600">{accuracy}%</p>
          </div>
          <button onClick={() => setTyped("")} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
            <RotateCcw size={13} /> Restart
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
      </div>

      <TypingArea text={text} typed={typed} focused onKey={handleKey} />

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex justify-center">
        <Keyboard activeKey={activeKey} expectedKey={expectedKey} />
      </div>

      {isComplete && (
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5 flex justify-between items-center flex-wrap gap-3">
          <p className="font-semibold text-green-800">🎉 Lesson complete! Accuracy: <strong>{accuracy}%</strong></p>
          <div className="flex gap-2">
            <button onClick={() => setCurrentId(null)} className="px-4 py-2 rounded-xl border border-green-200 bg-white text-green-700 font-semibold text-sm hover:bg-green-50 transition">
              Back to Lessons
            </button>
            {LESSONS.find((l) => l.id === lesson.id + 1) && (
              <button onClick={() => setCurrentId(lesson.id + 1)} className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold text-sm hover:opacity-90 transition shadow-sm">
                Next Lesson →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonSystem;
