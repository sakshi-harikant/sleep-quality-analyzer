import React from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Sparkles, Coffee, Monitor, Wine, User, Clock, Activity, ArrowRight, TrendingUp, TrendingDown } from "lucide-react";

export default function SleepLogger({
  darkMode, handleAnalyze,
  age, setAge, gender, setGender,
  bedtime, setBedtime, wakeTime, setWakeTime,
  duration, setDuration, stress, setStress,
  physicalActivity, setPhysicalActivity,
  caffeine, setCaffeine, screenTime, setScreenTime,
  alcohol, setAlcohol
}) {
  const inputBase = darkMode
    ? "bg-[#0A1628]/40 border-[#1E3A5F]/60 text-[#E8F1FA]"
    : "bg-[#FAFCFF] border-[#B0CBE5] text-[#2C3E5D]";
  const labelBase = darkMode ? "text-[#E8F1FA]" : "text-[#2C3E5D]";
  const trackAccent = darkMode ? "accent-[#A9C6E8]" : "accent-[#6B9AC4]";
  const cardBase = darkMode
    ? "bg-[#0A1628]/70 border-[#1E3A5F]/30"
    : "bg-white/80 border-[#D4E4F7]/60";
  
  const mutedText = darkMode ? "text-[#B9D3F3]" : "text-[#3D5A80]";
  const sectionTitleColor = darkMode ? "text-[#A9C6E8]" : "text-[#4A7BB0]";

  const previewScore = Math.max(30, Math.min(100, Math.round(
    (duration[0] / 8) * 70 + 30
    - (stress[0] * 2) - (caffeine[0] * 2.5) - (screenTime[0] * 3.5) - (alcohol ? 6 : 0)
    + (Math.min(physicalActivity[0], 60) / 60) * 8
  )));

  const scoreLabel = previewScore >= 85 ? "Excellent" : previewScore >= 70 ? "Good" : previewScore >= 50 ? "Fair" : "Needs Care";
  const scoreColor = previewScore >= 85 ? "text-emerald-600 dark:text-emerald-400" : previewScore >= 70 ? "text-[#5080A5] dark:text-[#A9C6E8]" : previewScore >= 50 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400";

  const idealRange = age <= 17 ? [8, 10] : age <= 64 ? [7, 9] : [7, 8];
  const inIdealRange = duration[0] >= idealRange[0] && duration[0] <= idealRange[1];

  const factors = [
    { label: "Sleep Duration", good: duration[0] >= 7 && duration[0] <= 9, icon: <Moon size={13} /> },
    { label: "Stress Level", good: stress[0] <= 5, icon: <Sparkles size={13} /> },
    { label: "Physical Activity", good: physicalActivity[0] >= 20, icon: <Activity size={13} /> },
    { label: "Caffeine Intake", good: caffeine[0] <= 2, icon: <Coffee size={13} /> },
    { label: "Screen Time", good: screenTime[0] <= 1, icon: <Monitor size={13} /> },
    { label: "Alcohol", good: !alcohol, icon: <Wine size={13} /> },
  ];

  const Section = ({ title, children }) => (
    <div className="space-y-5">
      <h3 className={`text-xs font-bold uppercase tracking-[0.15em] ${sectionTitleColor}`}>
        {title}
      </h3>
      {children}
    </div>
  );

  const SliderRow = ({ icon, label, value, onChange, min, max, step, unit }) => (
    <div className="space-y-2">
      <div className={`flex items-center justify-between text-sm font-semibold ${labelBase}`}>
        <span className="flex items-center gap-2">{icon} {label}</span>
        <span className="text-[#5080A5] dark:text-[#A9C6E8] font-bold">{value} {unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-2 rounded-full cursor-pointer ${trackAccent} ${darkMode ? "bg-[#1E3A5F]/50" : "bg-[#D4E4F7]/80"}`}
      />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Clean, perfectly-scaled header component */}
      <div className="mb-8">
        <h1 className={`text-3xl font-extrabold tracking-tight ${darkMode ? "text-[#E8F1FA]" : "text-[#2C3E5D]"}`}>
          Fill Your <span className="text-[#6B9AC4]">Log Details</span>
        </h1>
        <div className="w-12 h-1 bg-[#6B9AC4]/60 mt-2 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT: FORM (2/3 width) */}
        <form onSubmit={handleAnalyze} className={`lg:col-span-2 rounded-3xl border shadow-xl p-8 space-y-10 ${cardBase}`}>

          <Section title="About You">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={`text-sm font-semibold flex items-center gap-2 ${labelBase}`}>
                  <User size={14} className="text-[#6B9AC4]" /> Age
                </label>
                <input
                  type="number" min={10} max={100} value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none font-medium focus:ring-2 focus:ring-[#A9C6E8] ${inputBase}`}
                />
              </div>
              <div className="space-y-1.5">
                <label className={`text-sm font-semibold ${labelBase}`}>Gender</label>
                <select
                  value={gender} onChange={(e) => setGender(e.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none font-medium focus:ring-2 focus:ring-[#A9C6E8] ${inputBase}`}
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </Section>

          <div className={`h-px w-full ${darkMode ? "bg-[#1E3A5F]/40" : "bg-[#D4E4F7]/80"}`}></div>

          <Section title="Sleep Schedule">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={`text-sm font-semibold flex items-center gap-2 ${labelBase}`}>
                  <Clock size={14} className="text-[#6B9AC4]" /> Bedtime
                </label>
                <input
                  type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none font-medium focus:ring-2 focus:ring-[#A9C6E8] ${inputBase}`}
                />
              </div>
              <div className="space-y-1.5">
                <label className={`text-sm font-semibold flex items-center gap-2 ${labelBase}`}>
                  <Clock size={14} className="text-[#6B9AC4]" /> Wake-up Time
                </label>
                <input
                  type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none font-medium focus:ring-2 focus:ring-[#A9C6E8] ${inputBase}`}
                />
              </div>
            </div>
            <SliderRow icon={<Moon size={14} className="text-[#6B9AC4]" />} label="Sleep Duration"
              value={duration[0]} onChange={(v) => setDuration([v])} min={4} max={12} step={0.5} unit="hrs" />
          </Section>

          <div className={`h-px w-full ${darkMode ? "bg-[#1E3A5F]/40" : "bg-[#D4E4F7]/80"}`}></div>

          <Section title="Lifestyle & Habits">
            <SliderRow icon={<Sparkles size={14} className="text-[#6B9AC4]" />} label="Stress Level"
              value={stress[0]} onChange={(v) => setStress([v])} min={1} max={10} step={1} unit="/ 10" />
            <SliderRow icon={<Activity size={14} className="text-[#6B9AC4]" />} label="Physical Activity"
              value={physicalActivity[0]} onChange={(v) => setPhysicalActivity([v])} min={0} max={120} step={5} unit="min" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SliderRow icon={<Coffee size={13} className="text-[#6B9AC4]" />} label="Caffeine"
                value={caffeine[0]} onChange={(v) => setCaffeine([v])} min={0} max={8} step={1} unit="cups" />
              <SliderRow icon={<Monitor size={13} className="text-[#6B9AC4]" />} label="Screen Time"
                value={screenTime[0]} onChange={(v) => setScreenTime([v])} min={0} max={6} step={0.5} unit="hrs" />
            </div>

            <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
              !alcohol ? "border-emerald-500/40 bg-emerald-50/50"
                : darkMode ? "border-[#1E3A5F]/30 bg-[#0A1628]/30" : "border-[#C5D9F0] bg-[#FAFCFF]"
            }`}>
              <span className={`text-sm font-semibold flex items-center gap-2 ${labelBase}`}>
                <Wine size={14} className={!alcohol ? "text-emerald-600" : "text-[#5080A5]"} />
                Alcohol today?
              </span>
              <button
                type="button" onClick={() => setAlcohol(!alcohol)}
                className={`px-5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  alcohol
                    ? darkMode ? "bg-[#1E3A5F] text-[#E8F1FA] hover:bg-[#2C4A6A]" : "bg-[#D4E4F7] text-[#3D5A80] hover:bg-[#C5D9F0]"
                    : "bg-emerald-600 text-white shadow-[0_2px_12px_rgba(16,185,129,0.25)]"
                }`}
              >
                {alcohol ? "Yes" : "No ✓"}
              </button>
            </div>
          </Section>

          <Button
            type="submit"
            className="w-full bg-[#6B9AC4] hover:bg-[#5A8AB4] text-white rounded-2xl py-6 text-sm font-bold shadow-[0_4px_20px_rgba(107,154,196,0.25)] hover:shadow-[0_4px_30px_rgba(107,154,196,0.35)] transition-all duration-300"
          >
            Analyze My Sleep
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </form>

        {/* RIGHT: LIVE PREVIEW SIDEBAR */}
        <div className="space-y-6">
          <div className={`rounded-3xl border shadow-xl p-6 text-center ${cardBase}`}>
            <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? "text-[#A9C6E8]" : "text-[#4A7BB0]"}`}>
              Live Preview
            </span>
            <div className="my-4 flex flex-col items-center">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" strokeWidth="10"
                    stroke={darkMode ? "#1E3A5F" : "#D4E4F7"} />
                  <circle cx="60" cy="60" r="52" fill="none" strokeWidth="10" strokeLinecap="round"
                    stroke="#6B9AC4"
                    strokeDasharray={2 * Math.PI * 52}
                    strokeDashoffset={2 * Math.PI * 52 * (1 - previewScore / 100)}
                    style={{ transition: "stroke-dashoffset 0.4s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-[#6B9AC4]">{previewScore}</span>
                  <span className={`text-[10px] font-bold ${mutedText}`}>/ 100</span>
                </div>
              </div>
              <span className={`text-sm font-bold mt-3 ${scoreColor}`}>{scoreLabel}</span>
            </div>
          </div>

          <div className={`rounded-3xl border shadow-lg p-6 ${cardBase}`}>
            <div className="flex items-center gap-2 mb-3">
              <Moon size={16} className="text-[#6B9AC4]" />
              <span className={`text-sm font-bold ${labelBase}`}>Ideal Range for Age {age}</span>
            </div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className={`${mutedText} font-medium`}>Recommended</span>
              <span className={`font-bold ${labelBase}`}>{idealRange[0]}–{idealRange[1]} hrs</span>
            </div>
            <div className={`h-2 rounded-full relative overflow-hidden ${darkMode ? "bg-[#1E3A5F]/50" : "bg-[#D4E4F7]/80"}`}>
              <div
                className="absolute h-full rounded-full bg-emerald-500/30"
                style={{ left: `${(idealRange[0] / 12) * 100}%`, width: `${((idealRange[1] - idealRange[0]) / 12) * 100}%` }}
              />
              <div
                className="absolute w-2.5 h-2.5 rounded-full bg-[#6B9AC4] -top-0.5 border-2 border-white"
                style={{ left: `calc(${(duration[0] / 12) * 100}% - 5px)` }}
              />
            </div>
            <p className={`text-xs font-semibold mt-3 ${inIdealRange ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"}`}>
              {inIdealRange
                ? "You're within the ideal range for your age group."
                : duration[0] < idealRange[0]
                  ? `Try adding ${(idealRange[0] - duration[0]).toFixed(1)} more hours for your age group.`
                  : "You're sleeping more than typically needed — that's usually fine, but worth noting."}
            </p>
          </div>

          <div className={`rounded-3xl border shadow-lg p-6 ${cardBase}`}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-[#6B9AC4]" />
              <span className={`text-sm font-bold ${labelBase}`}>Factor Breakdown</span>
            </div>
            <div className="space-y-3">
              {factors.map((f, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className={`flex items-center gap-2 ${mutedText} font-semibold`}>
                    <span className="text-[#6B9AC4]">{f.icon}</span> {f.label}
                  </span>
                  {f.good ? (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                      <TrendingUp size={12} /> Good
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
                      <TrendingDown size={12} /> Watch
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-3xl border shadow-lg p-6 ${cardBase}`}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-[#6B9AC4]" />
              <span className={`text-sm font-bold ${labelBase}`}>Quick Tip</span>
            </div>
            <p className={`text-xs font-medium leading-relaxed ${mutedText}`}>
              {screenTime[0] > 1.5
                ? "Reducing screen time before bed is one of the fastest ways to boost your score."
                : stress[0] > 6
                ? "High stress is weighing on your score — a short wind-down routine can help."
                : "You're on track. Consistency is what turns good nights into good habits."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}