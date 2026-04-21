import React from "react";
import { BookOpen, Zap } from "lucide-react";

const ModeToggle = ({ mode, onChange }) => (
  <div className="flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm gap-1">
    {[
      { key: "practice", label: "Practice", icon: <BookOpen size={14} /> },
      { key: "test",     label: "Typing Test", icon: <Zap size={14} /> },
    ].map(({ key, label, icon }) => (
      <button
        key={key}
        onClick={() => onChange(key)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
          mode === key
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
            : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
        }`}
      >
        {icon} {label}
      </button>
    ))}
  </div>
);

export default ModeToggle;
