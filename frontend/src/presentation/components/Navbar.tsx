import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { Globe, Shield, Send, Code2, Menu, X } from "lucide-react";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { lang, setLang, t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: "home", label: t("nav_home") },
    { id: "about", label: t("nav_about") },
    { id: "projects", label: t("nav_projects") },
    { id: "contact", label: t("nav_contact") },
  ];

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:py-4">
      <div className="max-w-6xl mx-auto glass-panel rounded-2xl px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-2xl border border-white/10">
        {/* Monogramme / Logo */}
        <button
          onClick={() => handleNav("home")}
          className="flex items-center space-x-2 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-orange to-amber-500 flex items-center justify-center font-black text-white text-lg shadow-glow group-hover:scale-105 transition-transform">
            BF
          </div>
          <div className="text-left hidden sm:block">
            <span className="block text-sm font-bold tracking-tight text-white group-hover:text-brand-orange transition-colors">
              BAUTZEN FOYET
            </span>
            <span className="block text-[10px] text-slate-400 font-mono tracking-widest uppercase">
              Fullstack Dev
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-900/60 p-1.5 rounded-xl border border-white/5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentPage === item.id
                  ? "bg-brand-blue text-white shadow-md font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Tools: Lang switch, Admin link, Contact button */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-white/10 transition-colors"
            title="Changer de langue / Switch language"
          >
            <Globe className="w-3.5 h-3.5 text-brand-orange" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Admin Back-Office Link */}
          <button
            onClick={() => handleNav(isAuthenticated ? "admin_dashboard" : "admin_login")}
            className={`p-2 rounded-lg border transition-colors ${
              currentPage.startsWith("admin")
                ? "bg-brand-orange/20 border-brand-orange text-brand-orange"
                : "bg-slate-800/60 hover:bg-slate-700/80 border-white/10 text-slate-300 hover:text-white"
            }`}
            title="Plateforme Administrative (Back-office)"
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* CTA Contact */}
          <button
            onClick={() => handleNav("contact")}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold shadow-glow hover:scale-105 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t("nav_cta")}</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="px-2 py-1 rounded bg-slate-800 text-xs font-bold text-slate-200"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-2 p-4 glass-panel rounded-2xl border border-white/10 shadow-2xl flex flex-col space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === item.id
                  ? "bg-brand-blue text-white font-bold"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => handleNav("admin_login")}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Back-office Admin</span>
            </button>
            <button
              onClick={() => handleNav("contact")}
              className="px-3 py-1.5 rounded-lg bg-brand-orange text-white text-xs font-bold"
            >
              {t("nav_cta")}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

