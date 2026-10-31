import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../../infrastructure/adapters/api/HttpApiClient";
import { Project } from "../../../core/domain/models/Project";
import { ContactMessage } from "../../../core/domain/models/ContactMessage";
import { SiteContent } from "../../../core/domain/models/SiteContent";
import {
  FolderKanban,
  Mail,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Eye,
  Star,
  Save,
  ArrowLeft
} from "lucide-react";

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { user, token, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"projects" | "content" | "messages">("projects");

  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);

  // Formulaire d'ajout de projet
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    titleFr: "",
    titleEn: "",
    slug: "",
    category: "web" as const,
    descriptionFr: "",
    descriptionEn: "",
    technologies: "React.js, TypeScript, TailwindCSS, AdonisJS, PostgreSQL, Drizzle ORM",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "",
    githubUrl: "",
    isFeatured: true,
    displayOrder: 1,
  });

  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [token]);

  const loadData = async () => {
    if (!token) return;
    const projs = await api.getProjects();
    setProjects(projs);

    const msgs = await api.getMessages(token);
    setMessages(msgs.messages);
    setUnreadCount(msgs.unreadCount);

    const content = await api.getSiteContent();
    setSiteContent(content);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const techArray = newProject.technologies.split(",").map((t) => t.trim());
      await api.createProject(
        {
          ...newProject,
          technologies: techArray,
        },
        token
      );
      setStatusMsg("Projet créé avec succès !");
      setIsAddingProject(false);
      loadData();
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err: any) {
      alert(err.message || "Erreur de création");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!token || !confirm("Voulez-vous vraiment supprimer ce projet ?")) return;
    await api.deleteProject(id, token);
    loadData();
  };

  const handleSaveContent = async () => {
    if (!token || !siteContent) return;
    await api.updateSiteContent(siteContent, token);
    setStatusMsg("Textes du site mis à jour en direct !");
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleMarkMessageRead = async (id: string) => {
    if (!token) return;
    await api.markMessageAsRead(id, token);
    loadData();
  };

  const handleDeleteMessage = async (id: string) => {
    if (!token || !confirm("Supprimer ce message ?")) return;
    await api.deleteMessage(id, token);
    loadData();
  };

  return (
    <div className="pt-24 pb-20 max-w-6xl mx-auto px-6 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-white/10">
        <div>
          <span className="text-[10px] font-mono font-bold text-brand-orange uppercase">
            Plateforme Administrative Privée
          </span>
          <h1 className="text-2xl font-black text-white">
            Tableau de Bord CMS : <span className="text-slate-300">{user?.name || "Bautzen Foyet"}</span>
          </h1>
          <p className="text-xs text-slate-400">
            Contrôle en temps réel de tous les contenus visibles par le public
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate("home")}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-bold text-slate-300 hover:text-white flex items-center space-x-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voir le site public</span>
          </button>
          <button
            onClick={() => { logout(); onNavigate("home"); }}
            className="px-3.5 py-2 rounded-xl bg-red-600/20 border border-red-500/40 text-xs font-bold text-red-200 hover:bg-red-600 hover:text-white flex items-center space-x-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center space-x-2">
          <CheckCircle className="w-4 h-4" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === "projects"
              ? "bg-brand-orange text-white shadow-glow"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <FolderKanban className="w-4 h-4" />
          <span>Projets ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("content")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === "content"
              ? "bg-brand-orange text-white shadow-glow"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Textes & Landing Page</span>
        </button>

        <button
          onClick={() => setActiveTab("messages")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === "messages"
              ? "bg-brand-orange text-white shadow-glow"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Messages & Leads</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-brand-orange text-white text-[10px]">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: PROJECTS MANAGEMENT */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Gestionnaire des Réalisations</h2>
            <button
              onClick={() => setIsAddingProject(!isAddingProject)}
              className="px-4 py-2 rounded-xl bg-brand-blue hover:bg-blue-700 text-white text-xs font-bold flex items-center space-x-2 shadow-md transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingProject ? "Fermer le formulaire" : "Ajouter un projet"}</span>
            </button>
          </div>

          {/* Formulaire Nouvel ajout */}
          {isAddingProject && (
            <form onSubmit={handleCreateProject} className="glass-panel p-6 rounded-3xl border border-brand-orange/40 space-y-4">
              <h3 className="text-sm font-bold text-brand-orange">Nouveau Projet</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Titre (Français) *</label>
                  <input
                    type="text"
                    required
                    value={newProject.titleFr}
                    onChange={(e) => setNewProject({ ...newProject, titleFr: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Titre (Anglais) *</label>
                  <input
                    type="text"
                    required
                    value={newProject.titleEn}
                    onChange={(e) => setNewProject({ ...newProject, titleEn: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Slug unique *</label>
                  <input
                    type="text"
                    required
                    value={newProject.slug}
                    onChange={(e) => setNewProject({ ...newProject, slug: e.target.value })}
                    placeholder="mon-nouveau-projet"
                    className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Catégorie</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white"
                  >
                    <option value="web">Web Application</option>
                    <option value="mobile">Mobile Application</option>
                    <option value="vitrine">Site Vitrine</option>
                    <option value="api">Backend & API</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Description (Français) *</label>
                  <textarea
                    rows={3}
                    required
                    value={newProject.descriptionFr}
                    onChange={(e) => setNewProject({ ...newProject, descriptionFr: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Description (Anglais) *</label>
                  <textarea
                    rows={3}
                    required
                    value={newProject.descriptionEn}
                    onChange={(e) => setNewProject({ ...newProject, descriptionEn: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Technologies (séparées par virgules)</label>
                  <input
                    type="text"
                    value={newProject.technologies}
                    onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Lien Démo Live</label>
                  <input
                    type="url"
                    value={newProject.liveUrl}
                    onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Lien GitHub</label>
                  <input
                    type="url"
                    value={newProject.githubUrl}
                    onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="feat"
                  checked={newProject.isFeatured}
                  onChange={(e) => setNewProject({ ...newProject, isFeatured: e.target.checked })}
                  className="rounded text-brand-orange"
                />
                <label htmlFor="feat" className="text-xs text-slate-200 font-semibold">
                  Mettre en avant sur la Landing Page (Featured)
                </label>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold"
              >
                Enregistrer et publier le projet
              </button>
            </form>
          )}

          {/* Table des Projets */}
          <div className="glass-panel rounded-3xl overflow-hidden border border-white/10">
            <div className="divide-y divide-white/5">
              {projects.map((proj) => (
                <div key={proj.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-white/[0.02]">
                  <div className="flex items-center space-x-4">
                    <img src={proj.imageUrl} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-white text-sm">{proj.titleFr}</h4>
                        {proj.isFeatured && (
                          <span className="px-2 py-0.5 rounded-full bg-brand-orange/20 text-brand-orange text-[10px] font-bold">
                            Featured
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">{proj.category} • {proj.technologies.join(", ")}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONTENT & LANDING PAGE */}
      {activeTab === "content" && siteContent && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Édition des Textes du Site Public</h2>
            <button
              onClick={handleSaveContent}
              className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold flex items-center space-x-1.5 shadow-glow"
            >
              <Save className="w-4 h-4" />
              <span>Enregistrer les modifications</span>
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-brand-orange uppercase">Section Hero</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Titre Principal (Français)</label>
                <input
                  type="text"
                  value={siteContent.hero.titleFr}
                  onChange={(e) =>
                    setSiteContent({
                      ...siteContent,
                      hero: { ...siteContent.hero, titleFr: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Titre Principal (Anglais)</label>
                <input
                  type="text"
                  value={siteContent.hero.titleEn}
                  onChange={(e) =>
                    setSiteContent({
                      ...siteContent,
                      hero: { ...siteContent.hero, titleEn: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Sous-Titre / Pitch (Français)</label>
                <textarea
                  rows={3}
                  value={siteContent.hero.subtitleFr}
                  onChange={(e) =>
                    setSiteContent({
                      ...siteContent,
                      hero: { ...siteContent.hero, subtitleFr: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Sous-Titre / Pitch (Anglais)</label>
                <textarea
                  rows={3}
                  value={siteContent.hero.subtitleEn}
                  onChange={(e) =>
                    setSiteContent({
                      ...siteContent,
                      hero: { ...siteContent.hero, subtitleEn: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white"
                />
              </div>
            </div>

            <h3 className="font-bold text-brand-orange uppercase pt-4">Coordonnées Publiques</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={siteContent.contact.email}
                  onChange={(e) =>
                    setSiteContent({
                      ...siteContent,
                      contact: { ...siteContent.contact, email: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Téléphone Principal</label>
                <input
                  type="text"
                  value={siteContent.contact.phones[0]}
                  onChange={(e) => {
                    const newPhones = [...siteContent.contact.phones];
                    newPhones[0] = e.target.value;
                    setSiteContent({
                      ...siteContent,
                      contact: { ...siteContent.contact, phones: newPhones },
                    });
                  }}
                  className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Localisation</label>
                <input
                  type="text"
                  value={siteContent.contact.location}
                  onChange={(e) =>
                    setSiteContent({
                      ...siteContent,
                      contact: { ...siteContent.contact, location: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CONTACT MESSAGES */}
      {activeTab === "messages" && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Demandes de Contact Reçues ({messages.length})</h2>
          
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`glass-panel p-5 rounded-2xl border transition-colors ${
                  msg.isRead ? "border-white/5 opacity-80" : "border-brand-orange/40 bg-brand-orange/[0.03]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="font-bold text-white text-sm">{msg.name}</span>
                    <span className="text-xs text-brand-orange ml-2">({msg.email})</span>
                    {msg.phone && <span className="text-xs text-slate-400 ml-2">Tel: {msg.phone}</span>}
                  </div>
                  <div className="flex items-center space-x-2">
                    {!msg.isRead && (
                      <button
                        onClick={() => handleMarkMessageRead(msg.id)}
                        className="px-2.5 py-1 rounded-lg bg-blue-600/30 text-blue-300 text-xs font-semibold hover:bg-blue-600 hover:text-white"
                      >
                        Marquer comme lu
                      </button>
                    )}
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                      className="px-2.5 py-1 rounded-lg bg-brand-orange text-white text-xs font-semibold"
                    >
                      Répondre
                    </a>
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-200 mb-1">Objet : {msg.subject}</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-white/5">
                  {msg.message}
                </p>
              </div>
            ))}

            {messages.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-xs">
                Aucun message reçu pour le moment.
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

