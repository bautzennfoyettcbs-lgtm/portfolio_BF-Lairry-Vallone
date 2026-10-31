import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Project } from "../../core/domain/models/Project";
import { api } from "../../infrastructure/adapters/api/HttpApiClient";
import { ArrowRight, ExternalLink, Code2, Sparkles } from "lucide-react";

interface ProjectsSummaryProps {
  onNavigate: (page: string) => void;
}

export const ProjectsSummarySection: React.FC<ProjectsSummaryProps> = ({ onNavigate }) => {
  const { lang, t } = useLanguage();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.getProjects({ featured: true }).then((data) => {
      setFeaturedProjects(data.slice(0, 3));
    });
  }, []);

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-brand-orange/15 text-brand-orange text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Réalisations Phares</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {t("projects_summary_title")}
            </h2>
            <p className="text-slate-400 text-sm mt-1">{t("projects_summary_sub")}</p>
          </div>

          <button
            onClick={() => onNavigate("projects")}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 border border-white/10 hover:border-brand-orange text-white text-xs font-bold transition-all hover:scale-105 shrink-0"
          >
            <span>{t("projects_summary_link")}</span>
            <ArrowRight className="w-4 h-4 text-brand-orange" />
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col group border border-white/10"
            >
              {/* Image Preview */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={project.imageUrl}
                  alt={lang === "fr" ? project.titleFr : project.titleEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                
                {/* Category Pill */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-brand-orange uppercase border border-white/10">
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-orange transition-colors">
                    {lang === "fr" ? project.titleFr : project.titleEn}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    {lang === "fr" ? project.descriptionFr : project.descriptionEn}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-900/90 text-[10px] font-mono text-slate-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-slate-900 text-[10px] font-mono text-brand-orange">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1 text-sky-400 hover:text-sky-300 transition-colors"
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
                      className="inline-flex items-center space-x-1 text-slate-400 hover:text-white transition-colors"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>{t("view_github")}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="text-center mt-10 md:hidden">
          <button
            onClick={() => onNavigate("projects")}
            className="w-full py-3 rounded-xl bg-slate-900 border border-brand-orange/40 text-brand-orange font-bold text-xs"
          >
            {t("projects_summary_link")}
          </button>
        </div>

      </div>
    </section>
  );
};
