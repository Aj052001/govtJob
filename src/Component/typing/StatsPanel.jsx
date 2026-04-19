import React from "react";
import { Activity, TrendingUp, Lightbulb } from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-gray-100 rounded-2xl p-5 shadow-sm ${className}`}>
    {children}
  </div>
);

const Row = ({ label, value, valueClass = "text-gray-900" }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0 text-sm">
    <span className="text-gray-500">{label}</span>
    <span className={`font-bold text-sm ${valueClass}`}>{value}</span>
  </div>
);

export const LiveStatsCard = ({ wpm, accuracy, errors, timeLeft }) => (
  <Card>
    <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-sm">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      <Activity size={14} className="text-green-500" /> Live Stats
    </h3>
    <Row label="Time Left" value={`${timeLeft}s`} />
    <Row label="WPM" value={wpm} valueClass="text-blue-600" />
    <Row label="Accuracy" value={`${accuracy}%`} valueClass="text-indigo-600" />
    <Row label="Errors" value={errors} valueClass="text-red-500" />
  </Card>
);

export const RecentPerformanceCard = ({ bestWpm, bestAccuracy, lastWpm }) => {
  const pct = Math.min(100, Math.round((bestWpm / 80) * 100));
  return (
    <Card>
      <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-sm">
        <TrendingUp size={14} className="text-blue-500" /> Recent Trends
      </h3>
      <Row label="Last Session" value={`${lastWpm} WPM`} />
      <div className="my-3">
        <div className="h-2 bg-blue-50 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-gray-400 mt-1">{pct}% of 80 WPM goal</p>
      </div>
      <Row label="Best WPM" value={bestWpm} valueClass="text-blue-600" />
      <Row label="Best Accuracy" value={`${bestAccuracy}%`} valueClass="text-indigo-600" />
    </Card>
  );
};

export const TipsCard = ({ tip }) => (
  <Card className="bg-amber-50 border-amber-100">
    <h3 className="flex items-center gap-2 font-bold text-amber-800 mb-2 text-sm">
      <Lightbulb size={14} className="text-amber-500" /> Editor's Tip
    </h3>
    <p className="text-xs text-amber-700 leading-relaxed">{tip}</p>
  </Card>
);
