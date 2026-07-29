import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Moon, Sun, Sparkles, ArrowRight, Shield, Brain, Award, 
  Lightbulb, Bell, User, Stars, Calendar, Zap, Heart 
} from "lucide-react";

// Sub-component Imports
import HappySleepLogo from "./components/HappySleepLogo";
import SleepLogger from "./pages/SleepLogger";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState('landing');
  
  const featuresRef = useRef(null);

  // Personal info
  const [age, setAge] = useState(22);
  const [gender, setGender] = useState("Female");

  // Sleep schedule
  const [bedtime, setBedtime] = useState("23:00");
  const [wakeTime, setWakeTime] = useState("06:30");
  const [duration, setDuration] = useState([7.5]);

  // Lifestyle factors
  const [stress, setStress] = useState([4]);
  const [physicalActivity, setPhysicalActivity] = useState([30]);
  const [caffeine, setCaffeine] = useState([2]);
  const [screenTime, setScreenTime] = useState([1.5]);
  const [alcohol, setAlcohol] = useState(false);

  const [score, setScore] = useState(84);

  const handleAnalyze = (e) => {
    e.preventDefault();
    const base = (duration[0] / 8) * 70;
    const penalty =
      (stress[0] * 2) +
      (caffeine[0] * 2.5) +
      (screenTime[0] * 3.5) +
      (alcohol ? 6 : 0);
    const bonus = (Math.min(physicalActivity[0], 60) / 60) * 8;
    const finalScore = Math.max(30, Math.min(100, Math.round(base + 30 - penalty + bonus)));
    
    setScore(finalScore);
    setView('dashboard');
  };

  const scrollToFeatures = () => {
    setView('landing');
    setTimeout(() => {
      featuresRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-500 font-sans ${
      darkMode 
        ? "bg-[#0A1628]/100 text-[#E8F1FA]" 
        : "bg-gradient-to-b from-[#FAFCFF] via-[#F4F9FF] to-[#EDF4FA] text-[#2C3E5D]"
    }`}>
      
      {/* ─── 1. NAVBAR ─── */}
      <nav className={`max-w-7xl mx-auto px-6 md:px-8 py-5 flex justify-between items-center ${
        darkMode ? "border-b border-[#1E3A5F]/20" : "border-b border-[#D4E4F7]/40"
      }`}>
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setView('landing')}>
          <HappySleepLogo className="w-14 h-14 transition-transform duration-300 group-hover:scale-105" />
          <div>
            <span className={`text-2xl font-bold tracking-tight ${
              darkMode ? "text-[#E8F1FA]" : "text-[#2C3E5D]"
            }`}>
              Sleep<span className="text-[#6B9AC4]">Sync</span>
            </span>
            <div className={`text-[9px] font-medium tracking-[0.3em] uppercase ${
              darkMode ? "text-[#A9C6E8]/50" : "text-[#6B9AC4]/50"
            }`}>
              Sleep Wellness
            </div>
          </div>
        </div>

        <div className={`hidden md:flex items-center gap-8 text-sm ${darkMode ? "text-[#A9C6E8]" : "text-[#4A6A8A]"}`}>
          <span 
            className={`cursor-pointer transition-all duration-300 font-medium ${
              view === 'landing' ? 'text-[#6B9AC4] font-semibold' : 'hover:text-[#6B9AC4]'
            }`}
            onClick={() => setView('landing')}
          >
            Home
          </span>
          <span 
            className="cursor-pointer hover:text-[#6B9AC4] transition-all duration-300 font-medium"
            onClick={scrollToFeatures}
          >
            Features
          </span>
          <span className="cursor-pointer hover:text-[#6B9AC4] transition-all duration-300 font-medium opacity-50 cursor-not-allowed">
            About
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className={`p-2 rounded-xl transition-all duration-300 ${
              darkMode 
                ? "hover:bg-[#1E3A5F]/30 text-[#A9C6E8]" 
                : "hover:bg-[#D4E4F7]/40 text-[#6B9AC4]"
            }`}
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <Button 
            onClick={() => setView('log')} 
            className={`rounded-xl px-4 py-2 text-xs font-semibold flex items-center gap-2 transition-all duration-300 ${
              darkMode 
                ? "bg-[#1E3A5F] border-[#2C4A6A] text-[#E8F1FA] hover:bg-[#2C4A6A]" 
                : "bg-[#6B9AC4] text-white hover:bg-[#5A8AB4] shadow-[0_2px_12px_rgba(107,154,196,0.2)]"
            }`}
          >
            <User size={13} /> Log Sleep
          </Button>
        </div>
      </nav>

      {/* ─── 2. LANDING VIEW ─── */}
      {view === 'landing' && (
        <div className="max-w-7xl mx-auto px-6 md:px-8 animate-in fade-in duration-500">
          
          {/* HERO SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative pt-12 pb-16">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#A9C6E8]/5 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#6B9AC4]/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="space-y-8 z-10">
              <div className="space-y-4">
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider ${
                  darkMode 
                    ? "bg-[#1E3A5F]/30 text-[#A9C6E8] border border-[#1E3A5F]/20" 
                    : "bg-[#D4E4F7]/40 text-[#4A6A8A] border border-[#A9C6E8]/20"
                }`}>
                  <Sparkles size={12} className="text-[#6B9AC4]" /> 
                  Your Personal Sleep Companion
                </div>
                
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] ${
                  darkMode ? "text-[#E8F1FA]" : "text-[#2C3E5D]"
                }`}>
                  Wake up feeling
                  <br />
                  <span className="text-[#6B9AC4]">truly rested</span>
                </h1>
                
                <p className={`text-base max-w-md leading-relaxed ${darkMode ? "text-[#A9C6E8]/70" : "text-[#4A6A8A]"}`}>
                  Understand your sleep patterns with gentle, AI-powered insights. 
                  Start your journey to more restful nights and energized mornings.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={() => setView('log')} 
                  className="bg-[#6B9AC4] hover:bg-[#5A8AB4] text-white rounded-full px-8 py-6 text-sm font-semibold shadow-[0_4px_20px_rgba(107,154,196,0.3)] hover:shadow-[0_4px_30px_rgba(107,154,196,0.4)] flex items-center gap-2 group transition-all duration-300"
                >
                  Start Your Journey <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  onClick={scrollToFeatures}
                  variant="outline"
                  className={`rounded-full px-6 py-6 text-sm font-medium border-2 transition-all duration-300 ${
                    darkMode 
                      ? "border-[#2C4A6A] hover:border-[#6B9AC4] text-[#A9C6E8] hover:text-[#E8F1FA]" 
                      : "border-[#D4E4F7] hover:border-[#6B9AC4] text-[#4A6A8A] hover:text-[#2C3E5D]"
                  }`}
                >
                  Learn More
                </Button>
              </div>

              <div className={`flex items-center gap-6 pt-6 border-t ${darkMode ? "border-[#1E3A5F]/20" : "border-[#D4E4F7]/40"}`}>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#D4E4F7]/20">
                    <Shield size={14} className="text-[#6B9AC4]" />
                  </div>
                  <span className={`text-xs font-medium ${darkMode ? "text-[#A9C6E8]/60" : "text-[#4A6A8A]"}`}>100% Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#D4E4F7]/20">
                    <Brain size={14} className="text-[#6B9AC4]" />
                  </div>
                  <span className={`text-xs font-medium ${darkMode ? "text-[#A9C6E8]/60" : "text-[#4A6A8A]"}`}>AI-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#D4E4F7]/20">
                    <Award size={14} className="text-[#6B9AC4]" />
                  </div>
                  <span className={`text-xs font-medium ${darkMode ? "text-[#A9C6E8]/60" : "text-[#4A6A8A]"}`}>Science-Backed</span>
                </div>
              </div>
            </div>

            {/* METRIC DEMO PANEL — signature dial + floating badges */}
            <div className="relative z-10 flex justify-center">
              <div className="relative w-full max-w-md">

                {/* Floating badge: HRV */}
                <div className={`absolute -top-6 -right-4 z-20 animate-float-slow px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md ${darkMode ? "bg-[#0A1628]/90 border-[#1E3A5F]/40" : "bg-white/90 border-[#D4E4F7]/60"}`}>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#D4E4F7]/30">
                      <Zap size={14} className="text-[#6B9AC4]" />
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider font-semibold text-[#6B9AC4]/70">HRV</div>
                      <div className="text-sm font-bold text-[#6B9AC4] leading-none">42ms <span className="text-emerald-500 text-[10px] font-semibold">+8%</span></div>
                    </div>
                  </div>
                </div>

                {/* Floating badge: Recovery */}
                <div className={`absolute -bottom-5 -left-5 z-20 animate-float px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md ${darkMode ? "bg-[#0A1628]/90 border-[#1E3A5F]/40" : "bg-white/90 border-[#D4E4F7]/60"}`}>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10">
                      <Heart size={14} className="text-emerald-500" />
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider font-semibold text-emerald-500/80">Recovery</div>
                      <div className="text-sm font-bold text-emerald-600 leading-none">Excellent</div>
                    </div>
                  </div>
                </div>

                {/* Main dial card */}
                <div className={`relative rounded-[2.5rem] border shadow-2xl overflow-hidden p-8 ${darkMode ? "bg-[#0A1628]/85 border-[#1E3A5F]/30" : "bg-white/85 border-[#D4E4F7]/50"}`}>

                  <svg className="absolute inset-x-0 bottom-0 w-full h-24 opacity-40 pointer-events-none" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <path d="M0,60 C50,20 100,80 150,50 C200,20 250,70 300,40 C350,15 380,55 400,45 L400,100 L0,100 Z" fill="url(#waveGrad)" />
                    <defs>
                      <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#A9C6E8" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#A9C6E8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="relative text-center">
                    <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${darkMode ? "text-[#A9C6E8]/50" : "text-[#6B9AC4]/60"}`}>
                      Tonight's Summary
                    </span>

                    <div className="relative w-40 h-40 mx-auto my-5">
                      <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
                        <circle cx="70" cy="70" r="60" fill="none" strokeWidth="10" stroke={darkMode ? "#1E3A5F" : "#E8F1FA"} />
                        <circle cx="70" cy="70" r="60" fill="none" strokeWidth="10" strokeLinecap="round"
                          stroke="url(#scoreGrad)"
                          strokeDasharray={2 * Math.PI * 60}
                          strokeDashoffset={2 * Math.PI * 60 * (1 - 0.84)}
                        />
                        <defs>
                          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#A9C6E8" />
                            <stop offset="100%" stopColor="#6B9AC4" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-bold bg-gradient-to-br from-[#6B9AC4] to-[#4A6A8A] bg-clip-text text-transparent">84</span>
                        <span className={`text-[10px] font-medium ${darkMode ? "text-[#A9C6E8]/50" : "text-[#4A6A8A]/60"}`}>Sleep Score</span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">
                      <Sparkles size={11} /> Excellent · +12% this week
                    </span>

                    <div className={`grid grid-cols-3 gap-2 mt-7 pt-6 border-t ${darkMode ? "border-[#1E3A5F]/20" : "border-[#D4E4F7]/40"}`}>
                      <div>
                        <div className="text-lg font-bold text-[#6B9AC4]">7h 32m</div>
                        <div className={`text-[10px] uppercase tracking-wide ${darkMode ? "text-[#A9C6E8]/50" : "text-[#4A6A8A]/60"}`}>Duration</div>
                      </div>
                      <div className={`border-x ${darkMode ? "border-[#1E3A5F]/20" : "border-[#D4E4F7]/40"}`}>
                        <div className="text-lg font-bold text-[#6B9AC4]">28%</div>
                        <div className={`text-[10px] uppercase tracking-wide ${darkMode ? "text-[#A9C6E8]/50" : "text-[#4A6A8A]/60"}`}>Deep Sleep</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-[#6B9AC4]">22%</div>
                        <div className={`text-[10px] uppercase tracking-wide ${darkMode ? "text-[#A9C6E8]/50" : "text-[#4A6A8A]/60"}`}>REM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <style>{`
              @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
              @keyframes floatSlow { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
              .animate-float { animation: float 4s ease-in-out infinite; }
              .animate-float-slow { animation: floatSlow 5s ease-in-out infinite; }
            `}</style>
          </div>

          {/* FEATURES SECTION */}
          <div ref={featuresRef} className="py-20 scroll-mt-6">
            <div className="text-center mb-14">
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider mb-4 ${
                darkMode ? "bg-[#1E3A5F]/30 text-[#A9C6E8] border border-[#1E3A5F]/20" : "bg-[#D4E4F7]/40 text-[#4A6A8A] border border-[#A9C6E8]/20"
              }`}>
                <Stars size={12} className="text-[#6B9AC4]" /> Why HappySleep
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${darkMode ? "text-[#E8F1FA]" : "text-[#2C3E5D]"}`}>
                Designed for better <span className="text-[#6B9AC4]">rest</span>
              </h2>
              <p className={`text-sm mt-3 max-w-xl mx-auto ${darkMode ? "text-[#A9C6E8]/60" : "text-[#4A6A8A]"}`}>
                Gentle tools and intelligent insights to help you understand and improve your sleep quality
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`group relative p-6 rounded-2xl transition-all duration-500 ${
                darkMode ? "bg-[#0A1628]/60 border border-[#1E3A5F]/20 hover:border-[#6B9AC4]/40 hover:bg-[#0A1628]/80" : "bg-white/60 border border-[#D4E4F7]/40 hover:border-[#6B9AC4]/30 hover:bg-white/80"
              }`}>
                <div className="relative">
                  <div className={`p-3 rounded-xl w-fit mb-4 ${darkMode ? "bg-[#1E3A5F]/40 text-[#6B9AC4]" : "bg-[#D4E4F7]/30 text-[#6B9AC4]"}`}>
                    <Brain size={22} />
                  </div>
                  <h4 className="font-bold text-base mb-2">AI-Powered Insights</h4>
                  <p className="text-sm leading-relaxed opacity-70">Personalized analysis of your unique sleep patterns with intelligent recommendations</p>
                </div>
              </div>

              <div className={`group relative p-6 rounded-2xl transition-all duration-500 ${
                darkMode ? "bg-[#0A1628]/60 border border-[#1E3A5F]/20 hover:border-[#6B9AC4]/40 hover:bg-[#0A1628]/80" : "bg-white/60 border border-[#D4E4F7]/40 hover:border-[#6B9AC4]/30 hover:bg-white/80"
              }`}>
                <div className="relative">
                  <div className={`p-3 rounded-xl w-fit mb-4 ${darkMode ? "bg-[#1E3A5F]/40 text-[#6B9AC4]" : "bg-[#D4E4F7]/30 text-[#6B9AC4]"}`}>
                    <Calendar size={22} />
                  </div>
                  <h4 className="font-bold text-base mb-2">Track Progress</h4>
                  <p className="text-sm leading-relaxed opacity-70">Monitor improvements over time and build sustainable sleep habits that last</p>
                </div>
              </div>

              <div className={`group relative p-6 rounded-2xl transition-all duration-500 ${
                darkMode ? "bg-[#0A1628]/60 border border-[#1E3A5F]/20 hover:border-[#6B9AC4]/40 hover:bg-[#0A1628]/80" : "bg-white/60 border border-[#D4E4F7]/40 hover:border-[#6B9AC4]/30 hover:bg-white/80"
              }`}>
                <div className="relative">
                  <div className={`p-3 rounded-xl w-fit mb-4 ${darkMode ? "bg-[#1E3A5F]/40 text-[#6B9AC4]" : "bg-[#D4E4F7]/30 text-[#6B9AC4]"}`}>
                    <Lightbulb size={22} />
                  </div>
                  <h4 className="font-bold text-base mb-2">Gentle Recommendations</h4>
                  <p className="text-sm leading-relaxed opacity-70">Simple, actionable tips delivered with care to help you sleep better tonight</p>
                </div>
              </div>

              <div className={`group relative p-6 rounded-2xl transition-all duration-500 ${
                darkMode ? "bg-[#0A1628]/60 border border-[#1E3A5F]/20 hover:border-[#6B9AC4]/40 hover:bg-[#0A1628]/80" : "bg-white/60 border border-[#D4E4F7]/40 hover:border-[#6B9AC4]/30 hover:bg-white/80"
              }`}>
                <div className="relative">
                  <div className={`p-3 rounded-xl w-fit mb-4 ${darkMode ? "bg-[#1E3A5F]/40 text-[#6B9AC4]" : "bg-[#D4E4F7]/30 text-[#6B9AC4]"}`}>
                    <Bell size={22} />
                  </div>
                  <h4 className="font-bold text-base mb-2">Mindful Reminders</h4>
                  <p className="text-sm leading-relaxed opacity-70">Gentle notifications that help you maintain optimal sleep hygiene without stress</p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button onClick={() => setView('log')} className="bg-[#6B9AC4] hover:bg-[#5A8AB4] text-white rounded-full px-8 py-6 text-sm font-semibold">
                Start Your Journey <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>

          {/* BOTTOM CALL TO ACTION */}
          <div className={`py-10 mb-8 rounded-3xl px-6 text-center relative overflow-hidden ${
            darkMode ? "bg-gradient-to-br from-[#1E3A5F]/20 to-[#0A1628] border border-[#1E3A5F]/20" : "bg-gradient-to-br from-[#E8F1FA] to-[#F0F6FE] border border-[#D4E4F7]/40"
          }`}>
            <div className="relative z-10">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-2xl bg-[#D4E4F7]/30">
                  <HappySleepLogo className="w-10 h-10" />
                </div>
              </div>
              <h3 className={`text-xl font-bold ${darkMode ? "text-[#E8F1FA]" : "text-[#2C3E5D]"}`}>Ready for better sleep?</h3>
              <p className={`text-sm mt-1 ${darkMode ? "text-[#A9C6E8]/60" : "text-[#4A6A8A]"}`}>Start your sleep journey today</p>
              <Button onClick={() => setView('log')} className="mt-4 bg-[#6B9AC4] hover:bg-[#5A8AB4] text-white rounded-full px-8 py-5 text-sm font-semibold">
                Begin Journey <ArrowRight size={15} className="ml-2" />
              </Button>
            </div>
          </div>

        </div>
      )}

      {/* ─── 3. ACTIVE SUB-VIEWS ─── */}
      {view === 'log' && (
        <SleepLogger 
          darkMode={darkMode} 
          handleAnalyze={handleAnalyze}
          age={age} setAge={setAge}
          gender={gender} setGender={setGender}
          bedtime={bedtime} setBedtime={setBedtime}
          wakeTime={wakeTime} setWakeTime={setWakeTime}
          duration={duration} setDuration={setDuration}
          stress={stress} setStress={setStress}
          physicalActivity={physicalActivity} setPhysicalActivity={setPhysicalActivity}
          caffeine={caffeine} setCaffeine={setCaffeine}
          screenTime={screenTime} setScreenTime={setScreenTime}
          alcohol={alcohol} setAlcohol={setAlcohol}
        />
      )}

      {view === 'dashboard' && (
        <Dashboard 
          darkMode={darkMode} 
          setView={setView} 
          score={score}
          age={age}
          gender={gender}
          bedtime={bedtime}
          wakeTime={wakeTime}
          duration={duration}
          screenTime={screenTime} 
          stress={stress} 
          caffeine={caffeine}
          physicalActivity={physicalActivity}
          alcohol={alcohol}
        />
      )}
    </div>
  );
}