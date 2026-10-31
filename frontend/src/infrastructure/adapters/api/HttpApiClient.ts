import { IApiClient } from "../../../core/application/ports/IApiClient";
import { Project } from "../../../core/domain/models/Project";
import { ContactInput, ContactMessage } from "../../../core/domain/models/ContactMessage";
import { SiteContent } from "../../../core/domain/models/SiteContent";

const API_BASE = "http://localhost:5000/api";

const INITIAL_PROJECTS: Project[] = [
  {
    id: "1",
    titleFr: "Plateforme Web E-Commerce & SaaS Hexagonale",
    titleEn: "Hexagonal E-Commerce & SaaS Web Platform",
    slug: "plateforme-saas-hexagonale",
    category: "web",
    descriptionFr:
      "Architecture Clean & Hexagonale avec découplage strict du domaine métier. Gestion temps-réel des stocks, paiements sécurisés et dashboards analytiques.",
    descriptionEn:
      "Engineered with Clean Architecture and Hexagonal patterns. Features inventory management, secure payments and analytics dashboards.",
    technologies: ["React.js", "Next.js", "TypeScript", "TailwindCSS", "AdonisJS", "PostgreSQL", "Drizzle ORM"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://demo.bautzen-dev.com",
    githubUrl: "https://github.com/bautzen-dev/saas-clean-architecture",
    isFeatured: true,
    displayOrder: 1,
  },
  {
    id: "2",
    titleFr: "Application Mobile Multi-Services & Logistique",
    titleEn: "Multi-Service & Logistics Mobile Application",
    slug: "app-mobile-logistique",
    category: "mobile",
    descriptionFr:
      "Application mobile cross-platform avec suivi GPS en direct, notifications push et synchronisation hors ligne (offline-first).",
    descriptionEn:
      "Cross-platform mobile application with live GPS tracking, push notifications and offline-first data sync.",
    technologies: ["React Native", "TypeScript", "TailwindCSS", "NestJS", "PostgreSQL", "Drizzle ORM"],
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://demo.bautzen-dev.com/mobile",
    githubUrl: "https://github.com/bautzen-dev/mobile-clean-arch",
    isFeatured: true,
    displayOrder: 2,
  },
  {
    id: "3",
    titleFr: "Site Vitrine Corporate Haute Performance",
    titleEn: "High-Performance Corporate Showcase Website",
    slug: "site-vitrine-corporate",
    category: "vitrine",
    descriptionFr:
      "Vitrine interactive ultra-rapide aux couleurs Bleu, Orange et Blanc. Score Lighthouse 99/100, animations fluides et SEO optimisé.",
    descriptionEn:
      "Ultra-fast interactive showcase website in Signature Blue, Orange & White. 99/100 Lighthouse score and advanced SEO.",
    technologies: ["React.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://demo.bautzen-dev.com/vitrine",
    githubUrl: "https://github.com/bautzen-dev/showcase-react-tailwind",
    isFeatured: true,
    displayOrder: 3,
  },
  {
    id: "4",
    titleFr: "Moteur d'Analyse de Données & Microservice Python",
    titleEn: "Data Analytics Engine & Python Microservice",
    slug: "moteur-analyse-python",
    category: "api",
    descriptionFr:
      "Pipeline de traitement de données haute cadence avec Python, interfacé avec PostgreSQL et Drizzle ORM.",
    descriptionEn:
      "High-throughput data pipeline built in Python, integrated with PostgreSQL and Drizzle ORM.",
    technologies: ["Python", "React.js", "TypeScript", "PostgreSQL", "Drizzle ORM"],
    imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://demo.bautzen-dev.com/analytics",
    githubUrl: "https://github.com/bautzen-dev/python-analytics-api",
    isFeatured: false,
    displayOrder: 4,
  },
];

const INITIAL_CONTENT: SiteContent = {
  hero: {
    titleFr: "Développeur Web & Mobile Fullstack",
    titleEn: "Fullstack Web & Mobile Developer",
    subtitleFr:
      "Spécialiste en Clean Architecture et Architecture Hexagonale. Je conçois des plateformes web et des applications mobiles robustes, pérennes et hautement performantes.",
    subtitleEn:
      "Specialist in Clean & Hexagonal Architecture. I engineer robust, sustainable, high-performance web and mobile platforms.",
  },
  contact: {
    phones: ["+237 697 480 153", "+237 654 399 609"],
    email: "bautzennfoyettcbs@gmail.com",
    location: "Bafoussam, Cameroun",
  },
};

export class HttpApiClient implements IApiClient {
  private localProjects: Project[] = [...INITIAL_PROJECTS];
  private localMessages: ContactMessage[] = [
    {
      id: "msg-1",
      name: "Jean-Paul Kamga",
      email: "jp.kamga@tech-africa.cm",
      phone: "+237 670 000 000",
      subject: "Proposition de projet d'application mobile",
      message: "Bonjour Bautzen, nous avons un projet d'application mobile logistique et votre profil Clean Architecture nous intéresse vivement.",
      isRead: false,
      createdAt: new Date().toISOString(),
    },
  ];
  private localContent: SiteContent = { ...INITIAL_CONTENT };

  async getProjects(params?: { featured?: boolean; category?: string }): Promise<Project[]> {
    try {
      const url = new URL(`${API_BASE}/projects`);
      if (params?.featured) url.searchParams.set("featured", "true");
      if (params?.category) url.searchParams.set("category", params.category);

      const res = await fetch(url.toString(), { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback gracieux sur le store local
    }

    let result = [...this.localProjects];
    if (params?.featured) {
      result = result.filter((p) => p.isFeatured);
    }
    if (params?.category && params.category !== "all") {
      result = result.filter((p) => p.category === params.category);
    }
    return result;
  }

  async createProject(project: Omit<Project, "id">, token: string): Promise<Project> {
    if (!token.startsWith("demo_token_bautzen_")) {
      try {
        const res = await fetch(`${API_BASE}/projects`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(project),
        });
        if (res.ok) return await res.json();
      } catch {}
    }

    const newProject: Project = { ...project, id: String(Date.now()) };
    this.localProjects.unshift(newProject);
    return newProject;
  }

  async updateProject(id: string, project: Partial<Project>, token: string): Promise<Project> {
    if (!token.startsWith("demo_token_bautzen_")) {
      try {
        const res = await fetch(`${API_BASE}/projects/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(project),
        });
        if (res.ok) return await res.json();
      } catch {}
    }

    const index = this.localProjects.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.localProjects[index] = { ...this.localProjects[index], ...project };
      return this.localProjects[index];
    }
    throw new Error("Projet non trouvé");
  }

  async deleteProject(id: string, token: string): Promise<boolean> {
    if (!token.startsWith("demo_token_bautzen_")) {
      try {
        const res = await fetch(`${API_BASE}/projects/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return true;
      } catch {}
    }

    this.localProjects = this.localProjects.filter((p) => p.id !== id);
    return true;
  }

  async sendContact(input: ContactInput): Promise<{ success: boolean }> {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (res.ok) return { success: true };
    } catch {}

    this.localMessages.unshift({
      id: "msg-" + Date.now(),
      name: input.name,
      email: input.email,
      phone: input.phone,
      subject: input.subject,
      message: input.message,
      isRead: false,
      createdAt: new Date().toISOString(),
    });
    return { success: true };
  }

  async getMessages(token: string): Promise<{ messages: ContactMessage[]; unreadCount: number }> {
    if (!token.startsWith("demo_token_bautzen_")) {
      try {
        const res = await fetch(`${API_BASE}/admin/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return await res.json();
      } catch {}
    }

    const unreadCount = this.localMessages.filter((m) => !m.isRead).length;
    return { messages: this.localMessages, unreadCount };
  }

  async markMessageAsRead(id: string, token: string): Promise<boolean> {
    if (!token.startsWith("demo_token_bautzen_")) {
      try {
        const res = await fetch(`${API_BASE}/admin/messages/${id}/read`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return true;
      } catch {}
    }

    const msg = this.localMessages.find((m) => m.id === id);
    if (msg) msg.isRead = true;
    return true;
  }

  async deleteMessage(id: string, token: string): Promise<boolean> {
    if (!token.startsWith("demo_token_bautzen_")) {
      try {
        const res = await fetch(`${API_BASE}/admin/messages/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) return true;
      } catch {}
    }

    this.localMessages = this.localMessages.filter((m) => m.id !== id);
    return true;
  }

  async getSiteContent(): Promise<SiteContent> {
    try {
      const res = await fetch(`${API_BASE}/content/homepage_content`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.hero) return data;
      }
    } catch {}

    return this.localContent;
  }

  async updateSiteContent(data: Partial<SiteContent>, token: string): Promise<SiteContent> {
    if (!token.startsWith("demo_token_bautzen_")) {
      try {
        const res = await fetch(`${API_BASE}/content/homepage_content`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(data),
        });
        if (res.ok) return await res.json();
      } catch {}
    }

    this.localContent = { ...this.localContent, ...data };
    return this.localContent;
  }

  async login(credentials: { email: string; password: string }): Promise<{ token: string; user: { name: string; email: string } }> {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.token) return data;
      }
    } catch {}

    // Fallback d'authentification pour démo locale immédiate
    if (
      credentials.email.toLowerCase() === "bautzennfoyettcbs@gmail.com" &&
      credentials.password === "BautzenDev2026!"
    ) {
      return {
        token: "demo_token_bautzen_" + Date.now(),
        user: {
          name: "BAUTZEN FOYET LAIRRY VALLONE",
          email: "bautzennfoyettcbs@gmail.com",
        },
      };
    }
    throw new Error("Identifiants incorrects.");
  }

  async verifyToken(token: string): Promise<boolean> {
    if (!token) return false;
    if (token.startsWith("demo_token_bautzen_")) {
      return true;
    }
    try {
      const res = await fetch(`${API_BASE}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}

export const api = new HttpApiClient();

