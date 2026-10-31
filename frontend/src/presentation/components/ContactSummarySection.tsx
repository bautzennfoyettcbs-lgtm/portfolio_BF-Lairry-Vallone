import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { MessageSquare, Phone, Mail, ArrowRight, MapPin, Send } from "lucide-react";

interface ContactSummaryProps {
  onNavigate: (page: string) => void;
}

export const ContactSummarySection: React.FC<ContactSummaryProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-3xl bg-gradient-to-br from-brand-blue-surface via-slate-900 to-slate-950 p-8 sm:p-12 border border-brand-orange/30 shadow-2xl relative overflow-hidden">
          
          {/* Glowing Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Disponible immédiatement</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {t("contact_summary_title")}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl">
                {t("contact_summary_pitch")}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-300">
                <div className="flex items-center space-x-1.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-white/5">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Bafoussam, Cameroun</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-white/5">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>+237 697 480 153 / 654 399 609</span>
                </div>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="lg:col-span-4 flex flex-col space-y-3">
              {/* WhatsApp Direct */}
              <a
                href="https://wa.me/237697480153"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl flex items-center justify-center space-x-2 transition-transform hover:scale-105"
              >
                <Phone className="w-4 h-4" />
                <span>{t("contact_whatsapp_btn")}</span>
              </a>

              {/* Formulaire complet */}
              <button
                onClick={() => onNavigate("contact")}
                className="w-full py-3.5 px-6 rounded-2xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm shadow-glow flex items-center justify-center space-x-2 transition-transform hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span>{t("contact_summary_link")}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

