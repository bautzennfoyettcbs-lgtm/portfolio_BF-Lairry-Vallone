import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Project } from "../../core/domain/models/Project";
import { api } from "../../infrastructure/adapters/api/HttpApiClient";
import { ArrowLeft, ExternalLink, Code2, Search, X } from "lucide-react";

interface ProjectsPageProps {
  onNavigate: (page: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const { lang, t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  useEffect(() => {
    api.getProjects().then((data) => setProjects(data));
  }, []);

  const categories = [
    { id: "all", labelFr: "Tous les Projets", labelEn: "All Projects" },
    { id: "web", labelFr: "Applications Web", labelEn: "Web Applications" },
    { id: "mobile", labelFr: "Applications Mobiles", labelEn: "Mobile Apps" },
    { id: "vitrine", labelFr: "Sites Vitrines", labelEn: "Showcase Sites" },
    { id: "api", labelFr: "APIs & Python", labelEn: "APIs & Python" },
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const title = lang === "fr" ? p.titleFr : p.titleEn;
    const desc = lang === "fr" ? p.descriptionFr : p.descriptionEn;
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* Navigation retour */}
        <button
          onClick={() => onNavigate("home")}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-brand-orange transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à l'accueil</span>
        </button>

        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold border border-brand-orange/30">
            <span>Portfolio & Réalisations</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Mes Projets & <span className="text-gradient">Développements</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Explorez mes applications web, mobiles et sites vitrines conçus avec React.js, TypeScript, Tailwind CSS, AdonisJS, NestJS, Python et PostgreSQL avec Drizzle ORM.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-white/10">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === c.id
                    ? "bg-brand-orange text-white shadow-glow"
                    : "bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                {lang === "fr" ? c.labelFr : c.labelEn}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === "fr" ? "Rechercher par techno ou mot-clé..." : "Search by tech or keyword..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 pl-9 pr-4 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col group border border-white/10"
            >
              {/* Image Preview */}
              <div
                className="relative h-52 overflow-hidden bg-slate-900 cursor-pointer"
                onClick={() => setActiveModalProject(project)}
              >
                <img
                  src={project.imageUrl}
                  alt={lang === "fr" ? project.titleFr : project.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-brand-orange uppercase border border-white/10">
                  {project.category}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3
                    onClick={() => setActiveModalProject(project)}
                    className="text-lg font-bold text-white group-hover:text-brand-orange transition-colors cursor-pointer"
                  >
                    {lang === "fr" ? project.titleFr : project.titleEn}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    {lang === "fr" ? project.descriptionFr : project.descriptionEn}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-900 text-[10px] font-mono text-slate-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-brand-orange hover:text-white transition-colors"
                  >
                    Détails complets →
                  </button>

                  <div className="flex items-center space-x-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-400 hover:text-sky-300 flex items-center space-x-1"
                      >
                        <span>{t("view_live")}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white"
                        title="Code Source"
                      >
                        <Code2 className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-slate-400 text-sm">
            Aucun projet ne correspond à votre filtre actuel.
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-white/15 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activeModalProject.imageUrl}
              alt=""
              className="w-full h-64 object-cover rounded-2xl"
            />

            <div>
              <span className="text-[11px] font-mono text-brand-orange font-bold uppercase">
                {activeModalProject.category}
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                {lang === "fr" ? activeModalProject.titleFr : activeModalProject.titleEn}
              </h2>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {lang === "fr" ? activeModalProject.descriptionFr : activeModalProject.descriptionEn}
            </p>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Technologies & Architecture
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.technologies.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-brand-orange"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
              {activeModalProject.liveUrl && (
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold flex items-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Accéder à la démo en ligne</span>
                </a>
              )}
              {activeModalProject.githubUrl && (
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs font-bold flex items-center space-x-2 hover:bg-slate-800"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Voir le code GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
