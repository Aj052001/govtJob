import { useState } from "react";
import ModeToggle from "./typing/ModeToggle";
import LessonSystem from "./typing/LessonSystem";
import TestSystem from "./typing/TestSystem";

const Typing = () => {
  const [mode, setMode] = useState("test");

  return (
    <div className="min-h-screen bg-[#f0f4ff] p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <p className="text-xs text-gray-400 mb-1">Dashboard › Typing Practice</p>
          <div className="flex justify-between items-center flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Typing Module</h1>
              <p className="text-sm text-gray-500 mt-0.5">Practice & test your typing speed for govt exams</p>
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
