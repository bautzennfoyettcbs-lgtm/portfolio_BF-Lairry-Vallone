import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Download, CheckCircle, Code, Layers, Database, Award, ArrowLeft, Terminal, Cpu } from "lucide-react";

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { lang } = useLanguage();

  const skillGroups = [
    {
      category: "Frontend & Mobile",
      icon: Code,
      color: "border-blue-500",
      skills: ["React.js", "Next.js", "React Native", "TypeScript", "Tailwind CSS", "HTML5 / CSS3", "State Management (Zustand, Redux)"],
    },
    {
      category: "Backend & APIs",
      icon: Terminal,
      color: "border-brand-orange",
      skills: ["AdonisJS", "NestJS", "Node.js", "Python", "RESTful APIs", "Microservices", "JWT & Auth Security"],
    },
    {
      category: "Bases de Données & ORM",
      icon: Database,
      color: "border-emerald-500",
      skills: ["PostgreSQL", "Drizzle ORM", "Drizzle Kit Migrations", "Modélisation relationnelle", "Requêtes SQL complexes"],
    },
    {
      category: "Architecture & Méthodologie",
      icon: Cpu,
      color: "border-purple-500",
      skills: ["Clean Architecture", "Architecture Hexagonale (Ports & Adapters)", "Domain-Driven Design (DDD)", "Git & GitHub CI/CD", "Testing (Jest / Vitest)"],
    },
  ];

  const timeline = [
    {
      year: "2024 - Présent",
      title: "Développeur Fullstack Web & Mobile Senior Freelance",
      company: "Projets Internationaux & Locaux (Remote)",
      description:
        "Conception d'applications SaaS complexes et de plateformes mobiles intégrant l'architecture hexagonale, React.js, Next.js, AdonisJS, NestJS, Python et PostgreSQL avec Drizzle ORM.",
    },
    {
      year: "2022 - 2024",
      title: "Développeur Fullstack TypeScript & React",
      company: "Missions & Agences Digitales",
      description:
        "Création de sites vitrines sur-mesure à haute conversion, d'applications web scalables et optimisation poussée des Core Web Vitals.",
    },
  ];

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6 space-y-16">
        
        {/* Navigation retour */}
        <button
          onClick={() => onNavigate("home")}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-brand-orange transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à l'accueil</span>
        </button>

        {/* Header Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold border border-brand-orange/30">
            <span>Profil Détaillé & Expertise</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            À Propos de <span className="text-gradient">Bautzen Foyet</span>
          </h1>
          <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
            Développeur Web & Mobile Fullstack bilingue (Français & Anglais) basé à Bafoussam, Cameroun. Passionné par l'élégance architecturale et la création de logiciels solides.
          </p>
          
          {/* CV Download Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert("Téléchargement du CV en Français (Version PDF)"); }}
              className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold shadow-glow flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger CV (Français)</span>
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert("Downloading English Resume (PDF format)"); }}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-brand-blue/60 hover:border-brand-blue text-slate-200 hover:text-white text-xs font-bold flex items-center space-x-2 transition-colors"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span>Download Resume (English)</span>
            </a>
          </div>
        </div>

        {/* Focus Clean Architecture */}
        <div className="rounded-3xl glass-panel p-8 border border-brand-blue/30 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Layers className="w-5 h-5 text-brand-orange" />
            <span>Mon Approche : Clean Architecture & Architecture Hexagonale</span>
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Dans chacun de mes projets, j'applique une séparation stricte des préoccupations. Le cœur de métier (**Domain Core**) est totalement indépendant des frameworks, de la base de données ou de l'interface utilisateur. Grâce aux **Ports et Adaptateurs**, le système gagne en :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
              <span className="font-bold text-brand-orange text-sm block mb-1">Pérennité & Évolution</span>
              <span className="text-xs text-slate-400">Possibilité de changer d'ORM ou de framework sans réécrire la logique métier.</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
              <span className="font-bold text-blue-400 text-sm block mb-1">Testabilité Maximale</span>
              <span className="text-xs text-slate-400">Tests unitaires ultra-rapides isolant les cas d'utilisation des bases de données.</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
              <span className="font-bold text-emerald-400 text-sm block mb-1">Clarté de Code</span>
              <span className="text-xs text-slate-400">Arborescence explicite facilitant la collaboration en équipe et la maintenance.</span>
            </div>
          </div>
        </div>

        {/* Matrice des Compétences */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-white">Matrice des Compétences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillGroups.map((group, idx) => {
              const IconComp = group.icon;
              return (
                <div key={idx} className={`glass-panel rounded-2xl p-6 border-l-4 ${group.color}`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-slate-900 text-slate-200">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-white text-base">{group.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 rounded-lg bg-slate-900/90 text-xs font-semibold text-slate-200 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Parcours Chronologique */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-white">Parcours Professionnel</h2>
          <div className="space-y-6">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative pl-8 before:absolute before:left-3 before:top-2 before:bottom-0 before:w-0.5 before:bg-brand-orange/40">
                <div className="absolute left-1.5 top-2 w-3.5 h-3.5 rounded-full bg-brand-orange shadow-glow" />
                <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-brand-blue/30 text-blue-300 font-mono text-[11px] font-bold">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <span className="text-xs font-semibold text-brand-orange block">{item.company}</span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

