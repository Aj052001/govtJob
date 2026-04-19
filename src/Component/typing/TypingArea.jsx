import React, { useEffect, useRef } from "react";

const TypingArea = ({ text, typed, focused, onFocus, onKey }) => {
  const hiddenRef = useRef(null);

  useEffect(() => {
    if (focused && hiddenRef.current) hiddenRef.current.focus();
  }, [focused]);

  return (
    <div
      onClick={() => { hiddenRef.current?.focus(); onFocus?.(); }}
      className="bg-white border-2 border-gray-100 hover:border-blue-200 focus-within:border-blue-400 rounded-2xl p-7 min-h-[200px] cursor-text select-none transition-all shadow-sm"
      style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 20, lineHeight: 1.9, letterSpacing: "0.3px" }}
    >
      {text.split("").map((ch, i) => {
        let cls = "text-gray-300";
        let extra = {};
        if (i < typed.length) {
          cls = typed[i] === ch ? "text-gray-900" : "text-red-500 bg-red-50 rounded";
        } else if (i === typed.length) {
          extra = { borderBottom: "2.5px solid #2563eb", background: "rgba(37,99,235,0.1)", borderRadius: 3 };
        }
        return (
          <span key={i} className={cls} style={extra}>{ch}</span>
        );
      })}
      <input
        ref={hiddenRef}
        onChange={() => {}}
        onKeyDown={(e) => onKey?.(e)}
        value=""
        className="absolute opacity-0 pointer-events-none w-px h-px"
        autoFocus
      />
    </div>
  );
};

export default TypingArea;
