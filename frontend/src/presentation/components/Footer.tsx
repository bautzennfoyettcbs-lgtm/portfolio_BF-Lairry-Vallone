import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Mail, Phone, MapPin, Code2, Globe, Shield } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="mt-24 border-t border-white/10 bg-slate-950/80 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1 : Identité */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-orange to-amber-500 flex items-center justify-center font-black text-white text-lg shadow-glow">
                BF
              </div>
              <div>
                <h3 className="font-bold text-white text-base tracking-wide">
                  BAUTZEN FOYET LAIRRY VALLONE
                </h3>
                <p className="text-xs text-brand-orange font-medium">
                  Développeur Web & Mobile Fullstack
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Conception d'applications web et mobiles d'envergure, respectant scrupuleusement la Clean Architecture et l'Architecture Hexagonale.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-brand-orange transition-colors"
                title="GitHub"
              >
                <Code2 className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-brand-blue transition-colors"
                title="LinkedIn"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/237697480153"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-white/10 text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                title="WhatsApp Direct"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2 : Navigation rapide */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate("home")} className="hover:text-brand-orange transition-colors">
                  {t("nav_home")}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("about")} className="hover:text-brand-orange transition-colors">
                  {t("nav_about")}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("projects")} className="hover:text-brand-orange transition-colors">
                  {t("nav_projects")}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("contact")} className="hover:text-brand-orange transition-colors">
                  {t("nav_contact")}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 : Contact Direct */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase mb-4">
              Coordonnées
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
                <span>{t("footer_loc")}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+237 697 480 153</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+237 654 399 609</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">bautzennfoyettcbs@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} BAUTZEN FOYET LAIRRY VALLONE. {t("footer_rights")}</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate("admin_login")}
              className="flex items-center space-x-1 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Back-Office CMS</span>
            </button>
            <span className="text-slate-700">|</span>
            <span className="flex items-center space-x-1">
              <span>Fait avec Clean Architecture</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
