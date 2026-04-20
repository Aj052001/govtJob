import React from "react";

const ROWS = [
  ["q","w","e","r","t","y","u","i","o","p"],
  ["a","s","d","f","g","h","j","k","l"],
  ["z","x","c","v","b","n","m"],
];

const FINGER_BG = {
  q:"bg-red-100",   a:"bg-red-100",   z:"bg-red-100",
  w:"bg-yellow-100",s:"bg-yellow-100",x:"bg-yellow-100",
  e:"bg-green-100", d:"bg-green-100", c:"bg-green-100",
  r:"bg-blue-100",  f:"bg-blue-100",  v:"bg-blue-100",
  t:"bg-blue-100",  g:"bg-blue-100",  b:"bg-blue-100",
  y:"bg-indigo-100",h:"bg-indigo-100",n:"bg-indigo-100",
  u:"bg-indigo-100",j:"bg-indigo-100",m:"bg-indigo-100",
  i:"bg-green-100", k:"bg-green-100",
  o:"bg-yellow-100",l:"bg-yellow-100",
  p:"bg-red-100",
};

const Keyboard = ({ activeKey, expectedKey }) => {
  const renderKey = (k) => {
    const isActive   = activeKey?.toLowerCase() === k;
    const isExpected = expectedKey?.toLowerCase() === k;
    return (
      <div
        key={k}
        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm border uppercase transition-all duration-75
          ${isActive   ? "bg-blue-600 text-white border-blue-700 shadow-lg scale-95" :
            isExpected ? "bg-yellow-200 text-yellow-900 border-yellow-300 shadow-md scale-105" :
            `${FINGER_BG[k] || "bg-gray-100"} text-gray-700 border-gray-200`}
        `}
      >
        {k}
      </div>
    );
  };

  const spaceActive   = activeKey === " ";
  const spaceExpected = expectedKey === " ";

  return (
    <div className="flex flex-col items-center gap-1.5">
      {ROWS.map((row, i) => (
        <div key={i} className="flex gap-1.5" style={{ marginLeft: i * 14 }}>
          {row.map(renderKey)}
        </div>
      ))}
      <div className="mt-1">
        <div className={`w-72 h-9 rounded-lg border transition-all
          ${spaceActive   ? "bg-blue-600 border-blue-700 shadow-lg" :
            spaceExpected ? "bg-yellow-200 border-yellow-300" :
            "bg-gray-100 border-gray-200"}
        `} />
      </div>
    </div>
  );
};

export default Keyboard;
