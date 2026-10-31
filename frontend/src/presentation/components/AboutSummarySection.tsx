import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { CheckCircle2, ArrowRight, ShieldCheck, Cpu, Code2 } from "lucide-react";

interface AboutSummaryProps {
  onNavigate: (page: string) => void;
}

export const AboutSummarySection: React.FC<AboutSummaryProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const keyStrengths = [
    "Maîtrise complète du cycle de vie logiciel (Frontend, Backend & Mobile).",
    "Adoption systématique de la Clean Architecture & de l'Architecture Hexagonale.",
    "Bilinguisme fluide (Français & Anglais) pour des collaborations globales.",
    "Expertise poussée sur PostgreSQL avec l'ORM ultra-performant Drizzle ORM.",
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-orange/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-brand-blue/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-brand-orange" />
                <span>Philosophie & Compétences</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {t("about_summary_title")}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {t("about_summary_pitch")}
              </p>

              <div className="space-y-3 pt-2">
                {keyStrengths.map((strength, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200">{strength}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate("about")}
                  className="inline-flex items-center space-x-2 text-brand-orange hover:text-white font-bold text-sm group transition-colors"
                >
                  <span>{t("about_summary_link")}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Architecture Card */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-brand-orange/20 space-y-5 shadow-xl">
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-brand-orange" />
                  <span>Architecture Hexagonale en Pratique</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/80 border-l-4 border-brand-orange">
                    <span className="font-bold text-white block">1. Coeur Domaine (Domain Core)</span>
                    <span className="text-slate-400">Entités pures et règles métier sans dépendances externes.</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border-l-4 border-blue-500">
                    <span className="font-bold text-white block">2. Cas d'Utilisation (Use Cases)</span>
                    <span className="text-slate-400">Orchestration des flux applicatifs via des Ports abstraits.</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border-l-4 border-emerald-500">
                    <span className="font-bold text-white block">3. Adaptateurs & Infrastructure</span>
                    <span className="text-slate-400">Next.js, AdonisJS, NestJS, Python, Drizzle ORM & Postgres.</span>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => onNavigate("about")}
                    className="w-full py-2.5 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs transition-colors"
                  >
                    Consulter mon profil complet
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

