import { Request, Response } from "express";
import { GetProjectsUseCase } from "../../../../../core/application/use-cases/projects/GetProjectsUseCase";
import { CreateProjectUseCase } from "../../../../../core/application/use-cases/projects/CreateProjectUseCase";
import { UpdateProjectUseCase } from "../../../../../core/application/use-cases/projects/UpdateProjectUseCase";
import { DeleteProjectUseCase } from "../../../../../core/application/use-cases/projects/DeleteProjectUseCase";

export class ProjectController {
  constructor(
    private getProjectsUseCase: GetProjectsUseCase,
    private createProjectUseCase: CreateProjectUseCase,
    private updateProjectUseCase: UpdateProjectUseCase,
    private deleteProjectUseCase: DeleteProjectUseCase
  ) {}

  async getAll(req: Request, res: Response) {
    try {
      const { featured, category } = req.query;
      const projects = await this.getProjectsUseCase.execute({
        featuredOnly: featured === "true",
        category: category as string,
      });
      return res.json(projects);
    } catch {
      // Fallback par défaut de démonstration
      const defaultProjects = [
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
      ];
      return res.json(defaultProjects);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const project = await this.createProjectUseCase.execute(req.body);
      return res.status(201).json(project);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = await this.updateProjectUseCase.execute(id, req.body);
      return res.json(project);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await this.deleteProjectUseCase.execute(id);
      return res.json({ success });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

