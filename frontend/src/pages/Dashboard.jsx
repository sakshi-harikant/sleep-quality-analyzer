import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ShieldAlert, Monitor, Sparkles, Coffee, Lightbulb, Moon, Activity,
  Wine, TrendingUp, TrendingDown, Clock, CheckCircle2, ArrowLeft, AlertCircle, Info
} from "lucide-react";

export default function Dashboard({
  darkMode, setView, score,
  age, gender, bedtime, wakeTime,
  duration, screenTime, stress, caffeine, physicalActivity, alcohol
}) {
  const cardBase = darkMode
    ? "bg-[#0A1628]/90 border-[#1E3A5F]/30 text-[#E8F1FA]"
    : "bg-white/90 border-[#D4E4F7]/50 text-[#2C3E5D]";
  const mutedText = darkMode ? "text-[#A9C6E8]/60" : "text-[#4A6A8A]";
  const trackBg = darkMode ? "bg-[#1E3A5F]" : "bg-[#D4E4F7]";

  const scoreColor = score >= 85 ? "#10B981" : score >= 70 ? "#6B9AC4" : score >= 50 ? "#F59E0B" : "#F43F5E";
  const scoreLabel = score >= 85 ? "Excellent" : score >= 70 ? "Restful Sleep" : score >= 50 ? "Fair" : "Needs Attention";
  const scoreEmoji = score >= 85 ? "🌟" : score >= 70 ? "✨" : score >= 50 ? "🌤️" : "🌙";

  const idealRange = age <= 17 ? [8, 10] : age <= 64 ? [7, 9] : [7, 8];
  const inIdealRange = duration[0] >= idealRange[0] && duration[0] <= idealRange[1];
  const activityGood = physicalActivity[0] >= 20;

  // Each factor explained in plain language: what you have vs. what's healthy, and why it matters
  const factors = [
    {
      label: "Screen Time Before Bed",
      icon: <Monitor size={15} />,
      value: `${screenTime[0]} hrs`,
      healthy: "Under 1 hour",
      good: screenTime[0] <= 1,
      why: screenTime[0] <= 1
        ? "You're keeping screens away from bedtime — this helps your body wind down naturally."
        : "Screens close to bedtime delay melatonin release, making it harder to fall asleep.",
    },
    {
      label: "Stress Level",
      icon: <Sparkles size={15} />,
      value: `${stress[0]} / 10`,
      healthy: "5 or below",
      good: stress[0] <= 5,
      why: stress[0] <= 5
        ? "Your stress is in a manageable range, which supports deeper, less interrupted sleep."
        : "Higher stress levels are linked to lighter, more fragmented sleep.",
    },
    {
      label: "Caffeine Intake",
      icon: <Coffee size={15} />,
      value: `${caffeine[0]} cups/day`,
      healthy: "2 or fewer",
      good: caffeine[0] <= 2,
      why: caffeine[0] <= 2
        ? "Your caffeine intake is within a healthy range for good sleep."
        : "Caffeine can stay in your system for 6+ hours, delaying sleep onset.",
    },
    {
      label: "Alcohol",
      icon: <Wine size={15} />,
      value: alcohol ? "Consumed today" : "None today",
      healthy: "None close to bedtime",
      good: !alcohol,
      why: !alcohol
        ? "Avoiding alcohol helps keep your REM sleep cycles intact."
        : "Alcohol can help you fall asleep faster but disrupts REM sleep later in the night.",
    },
    {
      label: "Physical Activity",
      icon: <Activity size={15} />,
      value: `${physicalActivity[0]} min today`,
      healthy: "20+ minutes",
      good: activityGood,
      why: activityGood
        ? "Regular activity is helping improve your deep sleep quality."
        : "Low activity levels can reduce how much deep, restorative sleep you get.",
    },
    {
      label: "Sleep Duration",
      icon: <Moon size={15} />,
      value: `${duration[0]} hrs`,
      healthy: `${idealRange[0]}–${idealRange[1]} hrs (age ${age})`,
      good: inIdealRange,
      why: inIdealRange
        ? "You're getting the recommended amount of sleep for your age group."
        : duration[0] < idealRange[0]
          ? "You're getting less sleep than recommended, which affects recovery and focus."
          : "You're sleeping more than typically needed — usually fine, but worth monitoring.",
    },
  ];

  const goodCount = factors.filter(f => f.good).length;

  // Ranked suggestions, worst offenders first
  const suggestions = [];
  if (screenTime[0] > 1) suggestions.push({
    icon: <Monitor size={15} />, title: "Cut screen time before bed",
    detail: `You're at ${screenTime[0]} hrs of screen exposure before sleep. Try winding down to under 1 hour — blue light delays melatonin release.`,
    impact: "High impact"
  });
  if (stress[0] >= 6) suggestions.push({
    icon: <Sparkles size={15} />, title: "Manage evening stress",
    detail: `Your stress level (${stress[0]}/10) is likely fragmenting your sleep. A 5-minute breathing or journaling routine before bed can help.`,
    impact: "High impact"
  });
  if (caffeine[0] > 2) suggestions.push({
    icon: <Coffee size={15} />, title: "Reduce caffeine intake",
    detail: `${caffeine[0]} cups a day is above the recommended range. Try to stop caffeine at least 6 hours before bedtime.`,
    impact: "Medium impact"
  });
  if (alcohol) suggestions.push({
    icon: <Wine size={15} />, title: "Watch alcohol close to bedtime",
    detail: "Alcohol can help you fall asleep faster but reduces REM sleep quality later in the night.",
    impact: "Medium impact"
  });
  if (!inIdealRange) suggestions.push({
    icon: <Moon size={15} />, title: "Adjust your sleep duration",
    detail: duration[0] < idealRange[0]
      ? `You're getting ${duration[0]} hrs — aim for ${idealRange[0]}–${idealRange[1]} hrs for your age group.`
      : `You're sleeping more than the typical ${idealRange[0]}–${idealRange[1]} hrs range — quality matters more than extra hours here.`,
    impact: "High impact"
  });
  if (!activityGood) suggestions.push({
    icon: <Activity size={15} />, title: "Add more daily movement",
    detail: `Only ${physicalActivity[0]} min of activity logged. Even 20-30 minutes of daily movement measurably improves deep sleep.`,
    impact: "Medium impact"
  });
  if (suggestions.length === 0) suggestions.push({
    icon: <CheckCircle2 size={15} />, title: "You're doing great",
    detail: "All your key habits are in a healthy range. Keep this consistency up — it's what compounds into long-term sleep quality.",
    impact: "Keep it up"
  });

  const circumference = 2 * Math.PI * 60;

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 space-y-6 animate-in fade-in duration-300">
      <button
        onClick={() => setView('log')}
        className={`text-sm font-medium flex items-center gap-1.5 transition-all hover:gap-2.5 ${mutedText}`}
      >
        <ArrowLeft size={15} /> Back to log
      </button>

      <div>
        <h1 className={`text-2xl font-bold ${darkMode ? "text-[#E8F1FA]" : "text-[#2C3E5D]"}`}>
          Your Sleep Report
        </h1>
        <p className={`text-sm mt-1 ${mutedText}`}>
          {goodCount} of {factors.length} habits are in a healthy range tonight
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* LEFT: Score + Schedule + Info Note */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className={`rounded-3xl border p-8 flex flex-col items-center text-center ${cardBase}`}>
            <span className={`text-xs font-semibold uppercase tracking-wider ${mutedText}`}>Sleep Quality Score</span>
            <div className="relative w-44 h-44 my-5">
              <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
                <circle cx="70" cy="70" r="60" fill="none" strokeWidth="11" stroke={darkMode ? "#1E3A5F" : "#E8F1FA"} />
                <circle
                  cx="70" cy="70" r="60" fill="none" strokeWidth="11" strokeLinecap="round"
                  stroke={scoreColor}
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - score / 100)}
                  style={{ transition: "stroke-dashoffset 0.6s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold" style={{ color: scoreColor }}>{score}</span>
                <span className={`text-[10px] uppercase tracking-widest font-medium ${mutedText}`}>/ 100</span>
              </div>
            </div>
            <div
              className="text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full"
              style={{ backgroundColor: `${scoreColor}1A`, color: scoreColor, border: `1px solid ${scoreColor}33` }}
            >
              {scoreEmoji} {scoreLabel}
            </div>
          </Card>

          <Card className={`rounded-3xl border p-6 ${cardBase}`}>
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-[#6B9AC4]" />
              <span className="text-sm font-bold">Sleep Schedule</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className={`p-3 rounded-xl text-center ${darkMode ? "bg-[#1E3A5F]/20" : "bg-[#FAFCFF]"}`}>
                <div className={`text-[10px] uppercase tracking-wide ${mutedText}`}>Bedtime</div>
                <div className="text-lg font-bold text-[#6B9AC4]">{bedtime}</div>
              </div>
              <div className={`p-3 rounded-xl text-center ${darkMode ? "bg-[#1E3A5F]/20" : "bg-[#FAFCFF]"}`}>
                <div className={`text-[10px] uppercase tracking-wide ${mutedText}`}>Wake-up</div>
                <div className="text-lg font-bold text-[#6B9AC4]">{wakeTime}</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className={mutedText}>Duration: <strong className={darkMode ? "text-[#E8F1FA]" : "text-[#2C3E5D]"}>{duration[0]} hrs</strong></span>
              <span className={mutedText}>Ideal: {idealRange[0]}–{idealRange[1]} hrs</span>
            </div>
            <div className={`h-2 rounded-full relative overflow-hidden ${trackBg}`}>
              <div className="absolute h-full rounded-full bg-emerald-400/40"
                style={{ left: `${(idealRange[0] / 12) * 100}%`, width: `${((idealRange[1] - idealRange[0]) / 12) * 100}%` }} />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-[#6B9AC4] -top-0.5 border-2 border-white"
                style={{ left: `calc(${(duration[0] / 12) * 100}% - 5px)` }} />
            </div>
            <p className={`text-xs mt-2 ${inIdealRange ? "text-emerald-600" : "text-amber-600"}`}>
              {inIdealRange ? "Within the ideal range for your age." : "Outside the ideal range — see suggestions below."}
            </p>
          </Card>

          {/* New Helpful Note Card to cover the vertical empty spacing gap perfectly */}
          <Card className={`rounded-3xl border p-5 flex-1 flex items-center gap-3.5 ${
            darkMode ? "bg-[#1E3A5F]/10 border-[#1E3A5F]/20" : "bg-[#6B9AC4]/5 border-[#6B9AC4]/15"
          }`}>
            <div className="p-2.5 rounded-2xl bg-[#6B9AC4]/10 text-[#6B9AC4] shrink-0">
              <Info size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide text-[#6B9AC4]">Daily Sleep Insights</h4>
              <p className={`text-xs mt-1 leading-relaxed ${mutedText}`}>
                Your metrics are continuously calculated based on habits, circadian alignment, and restorative downtime routines. Review personalized steps below to step up your score.
              </p>
            </div>
          </Card>
        </div>

        {/* RIGHT: Factors Affecting Sleep */}
        <div className="lg:col-span-7">
          <Card className={`rounded-3xl border p-6 ${cardBase}`}>
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <ShieldAlert size={16} className="text-[#6B9AC4]" />
                What's Affecting Your Sleep
              </CardTitle>
              <p className={`text-xs mt-1 font-normal ${mutedText}`}>
                Each habit compared against a healthy range, in plain terms.
              </p>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              {factors.map((f, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border ${
                    f.good
                      ? "border-emerald-400/30 bg-emerald-50/40"
                      : darkMode ? "border-amber-400/20 bg-amber-500/5" : "border-amber-400/30 bg-amber-50/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[#6B9AC4]">{f.icon}</span>
                      <span className="text-sm font-semibold">{f.label}</span>
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-semibold shrink-0 ${
                      f.good ? "text-emerald-600" : "text-amber-600"
                    }`}>
                      {f.good ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
                      {f.good ? "Healthy" : "Could improve"}
                    </span>
                  </div>
                  <div className={`flex items-center gap-4 mt-2 text-xs ${mutedText}`}>
                    <span>Your value: <strong className={darkMode ? "text-[#E8F1FA]" : "text-[#2C3E5D]"}>{f.value}</strong></span>
                    <span>Healthy range: <strong className={darkMode ? "text-[#E8F1FA]" : "text-[#2C3E5D]"}>{f.healthy}</strong></span>
                  </div>
                  <p className={`text-xs mt-2 leading-relaxed ${mutedText}`}>{f.why}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* BOTTOM FULL-WIDTH: Personalized Suggestions */}
        <div className="lg:col-span-12 mt-2">
          <Card className={`rounded-3xl border p-6 ${cardBase}`}>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={16} className="text-[#6B9AC4]" />
              <span className="text-sm font-bold">Personalized Suggestions</span>
            </div>
            <div className="space-y-3">
              {suggestions.map((s, i) => (
                <div key={i} className={`flex items-start gap-3 p-4 rounded-2xl border ${
                  darkMode ? "bg-[#1E3A5F]/15 border-[#1E3A5F]/20" : "bg-[#FAFCFF] border-[#D4E4F7]/40"
                }`}>
                  <div className="p-2 rounded-xl bg-[#D4E4F7]/20 text-[#6B9AC4] shrink-0">
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold">{s.title}</h4>
                      <span className={`text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0 ${
                        s.impact === "High impact" ? "bg-rose-500/10 text-rose-500"
                        : s.impact === "Medium impact" ? "bg-amber-500/10 text-amber-500"
                        : "bg-emerald-500/10 text-emerald-500"
                      }`}>
                        {s.impact}
                      </span>
                    </div>
                    <p className={`text-xs mt-1 leading-relaxed ${mutedText}`}>{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}