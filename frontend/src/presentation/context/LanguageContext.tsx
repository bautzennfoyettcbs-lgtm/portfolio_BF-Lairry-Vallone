import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "fr" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    nav_home: "Accueil",
    nav_about: "À Propos",
    nav_projects: "Mes Projets",
    nav_contact: "Contact",
    nav_admin: "Administration",
    nav_cta: "Me Contacter",
    hero_badge: "Disponible pour nouveaux projets & recrutement",
    hero_role: "Développeur Web & Mobile Fullstack",
    hero_arch: "Architecture Hexagonale & Clean Architecture",
    hero_btn_projects: "Explorer mes projets",
    hero_btn_cv: "Télécharger mon CV",
    about_summary_title: "À Propos de moi",
    about_summary_pitch:
      "Je m'appelle BAUTZEN FOYET LAIRRY VALLONE, développeur Fullstack passionné basé à Bafoussam, Cameroun. Je conçois des applications web et mobiles à haute valeur ajoutée, en respectant rigoureusement la Clean Architecture et l'Architecture Hexagonale pour assurer maintenabilité, testabilité et pérennité.",
    about_summary_link: "En savoir plus sur mon parcours et mes compétences →",
    projects_summary_title: "Projets Récents & Réalisations Phares",
    projects_summary_sub: "Un aperçu de mes créations web, mobiles et sites vitrines.",
    projects_summary_link: "Voir l'ensemble de mes projets avec filtres →",
    contact_summary_title: "Prêt à démarrer un projet ensemble ?",
    contact_summary_pitch:
      "Que ce soit pour une mission freelance, du consulting technique ou une opportunité à temps plein, je suis joignable directement.",
    contact_whatsapp_btn: "Discuter sur WhatsApp (+237)",
    contact_summary_link: "Accéder au formulaire de contact complet →",
    footer_rights: "Tous droits réservés.",
    footer_loc: "Bafoussam, Cameroun",
    view_live: "Démo en ligne",
    view_github: "Code GitHub",
  },
  en: {
    nav_home: "Home",
    nav_about: "About Me",
    nav_projects: "Projects",
    nav_contact: "Contact",
    nav_admin: "Admin",
    nav_cta: "Contact Me",
    hero_badge: "Available for new projects & full-time roles",
    hero_role: "Fullstack Web & Mobile Developer",
    hero_arch: "Hexagonal Architecture & Clean Architecture",
    hero_btn_projects: "Explore My Projects",
    hero_btn_cv: "Download My Resume",
    about_summary_title: "About Me",
    about_summary_pitch:
      "My name is BAUTZEN FOYET LAIRRY VALLONE, a passionate Fullstack Developer based in Bafoussam, Cameroon. I build high-value web and mobile platforms with strict adherence to Clean Architecture and Hexagonal patterns to guarantee robustness, testability, and scalability.",
    about_summary_link: "Learn more about my journey and technical skills →",
    projects_summary_title: "Featured Works & Major Projects",
    projects_summary_sub: "A curated preview of my web apps, mobile apps, and showcase websites.",
    projects_summary_link: "Browse all projects with category filters →",
    contact_summary_title: "Ready to build something impactful together?",
    contact_summary_pitch:
      "Whether for a freelance mission, technical consulting, or a full-time position, you can reach out directly.",
    contact_whatsapp_btn: "Chat on WhatsApp (+237)",
    contact_summary_link: "Go to full contact form & details →",
    footer_rights: "All rights reserved.",
    footer_loc: "Bafoussam, Cameroon",
    view_live: "Live Demo",
    view_github: "GitHub Code",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem("preferred_lang") as Language) || "fr";
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("preferred_lang", newLang);
  };

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};

