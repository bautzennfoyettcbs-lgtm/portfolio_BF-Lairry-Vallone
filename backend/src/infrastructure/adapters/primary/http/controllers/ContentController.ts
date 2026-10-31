import { Request, Response } from "express";
import { GetSiteContentUseCase, UpdateSiteContentUseCase } from "../../../../../core/application/use-cases/content/SiteContentUseCases";

export class ContentController {
  constructor(
    private getContentUseCase: GetSiteContentUseCase,
    private updateContentUseCase: UpdateSiteContentUseCase
  ) {}

  async getByKey(req: Request, res: Response) {
    try {
      const { key } = req.params;
      const content = await this.getContentUseCase.execute(key);
      return res.json(content ? content.data : {});
    } catch {
      // Fallback par défaut si la base PostgreSQL est en attente d'initialisation
      return res.json({
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
      });
    }
  }

  async updateByKey(req: Request, res: Response) {
    try {
      const { key } = req.params;
      const content = await this.updateContentUseCase.execute(key, req.body);
      return res.json(content.data);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

