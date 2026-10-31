import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Code, ArrowRight, Download, Sparkles, Layers, Database, Smartphone } from "lucide-react";

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { lang, t } = useLanguage();

  const techBadges = [
    { label: "React.js", color: "from-blue-500 to-cyan-400" },
    { label: "Next.js", color: "from-slate-700 to-slate-900" },
    { label: "TypeScript", color: "from-blue-600 to-indigo-600" },
    { label: "Tailwind CSS", color: "from-cyan-500 to-teal-400" },
    { label: "AdonisJS", color: "from-purple-600 to-indigo-700" },
    { label: "NestJS", color: "from-red-600 to-rose-700" },
    { label: "Python", color: "from-yellow-500 to-amber-600" },
    { label: "PostgreSQL", color: "from-blue-700 to-sky-800" },
    { label: "Drizzle ORM", color: "from-emerald-500 to-teal-600" },
  ];

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-blue/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-brand-orange/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Présentation & Accroche */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-brand-orange/40 text-brand-orange text-xs font-semibold shadow-glow">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
              <span>{t("hero_badge")}</span>
            </div>

            {/* Main Titles */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              <span className="block text-white">BAUTZEN FOYET</span>
              <span className="block text-gradient">LAIRRY VALLONE</span>
            </h1>

            <p className="text-lg sm:text-xl font-medium text-slate-300">
              <span className="text-brand-orange font-bold">{t("hero_role")}</span>
              <span className="mx-2 text-slate-600">|</span>
              <span className="text-sky-300 font-mono text-sm tracking-wide">Bilingue (FR / EN)</span>
            </p>

            {/* Architecture Focus Box */}
            <div className="p-4 rounded-2xl glass-panel border border-brand-blue/40 shadow-blue-glow max-w-xl mx-auto lg:mx-0">
              <div className="flex items-start space-x-3 text-left">
                <div className="p-2 rounded-xl bg-brand-blue text-white shrink-0 mt-0.5">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center space-x-1.5">
                    <span>Clean Architecture & Architecture Hexagonale</span>
                    <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Toutes mes applications sont conçues avec un découplage rigoureux entre la logique métier pure (Domain/Use-Cases) et les infrastructures (AdonisJS, NestJS, Next.js, PostgreSQL, Drizzle ORM).
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onNavigate("projects")}
                className="px-6 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm shadow-glow flex items-center space-x-2 transition-all hover:scale-105"
              >
                <span>{t("hero_btn_projects")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate("about")}
                className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm border border-brand-blue/50 flex items-center space-x-2 transition-all hover:border-brand-blue"
              >
                <Download className="w-4 h-4 text-brand-orange" />
                <span>{t("hero_btn_cv")}</span>
              </button>
            </div>

            {/* Tech Badges List */}
            <div className="pt-4">
              <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">
                Stack Technologique Maîtrisée :
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {techBadges.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-xs font-semibold text-slate-200 hover:border-brand-orange transition-colors"
                  >
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Profil Card Card Moderne Stylisée */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Decorative Frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-orange via-blue-600 to-indigo-600 opacity-30 blur-xl group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />

              <div className="relative rounded-3xl glass-panel p-6 border border-white/15 shadow-2xl space-y-6">
                {/* Header Card */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-300">En ligne & Joignable</span>
                  </div>
                  <span className="text-[11px] font-mono text-brand-orange font-bold">Bafoussam, CM</span>
                </div>

                {/* Avatar / Portrait Stylisé */}
                <div className="relative mx-auto w-36 h-36 rounded-2xl p-1 bg-gradient-to-tr from-brand-orange via-blue-500 to-amber-400 shadow-glow">
                  <div className="w-full h-full rounded-2xl bg-slate-950 flex flex-col items-center justify-center text-center p-2">
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-300">
                      BF
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono mt-1">Lairry Vallone</span>
                  </div>
                </div>

                {/* Profil Details */}
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-bold text-white">Bautzen Foyet L. V.</h3>
                  <p className="text-xs text-brand-orange font-medium">Développeur Fullstack Web & Mobile</p>
                </div>

                {/* Badges Highlights */}
                <div className="grid grid-cols-2 gap-2 text-left pt-2">
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                    <Smartphone className="w-4 h-4 text-brand-orange mb-1" />
                    <span className="block text-[11px] font-bold text-slate-200">Web & Mobile</span>
                    <span className="block text-[9px] text-slate-400">React, Next, React Native</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                    <Database className="w-4 h-4 text-blue-400 mb-1" />
                    <span className="block text-[11px] font-bold text-slate-200">PostgreSQL</span>
                    <span className="block text-[9px] text-slate-400">Drizzle ORM & AdonisJS</span>
                  </div>
                </div>

                {/* Direct Contact Button */}
                <a
                  href="https://wa.me/237697480153"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold text-center shadow-lg transition-colors"
                >
                  WhatsApp : +237 697 480 153
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

