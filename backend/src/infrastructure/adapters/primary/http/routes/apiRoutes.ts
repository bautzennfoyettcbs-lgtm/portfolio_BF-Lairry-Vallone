import { Router } from "express";
import { DrizzleProjectRepository } from "../../../secondary/database/drizzle/repositories/DrizzleProjectRepository";
import { DrizzleContactRepository } from "../../../secondary/database/drizzle/repositories/DrizzleContactRepository";
import { DrizzleUserRepository } from "../../../secondary/database/drizzle/repositories/DrizzleUserRepository";
import { DrizzleSiteContentRepository } from "../../../secondary/database/drizzle/repositories/DrizzleSiteContentRepository";
import { BcryptSecurityService } from "../../../secondary/security/BcryptSecurityService";

import { GetProjectsUseCase } from "../../../../../core/application/use-cases/projects/GetProjectsUseCase";
import { CreateProjectUseCase } from "../../../../../core/application/use-cases/projects/CreateProjectUseCase";
import { UpdateProjectUseCase } from "../../../../../core/application/use-cases/projects/UpdateProjectUseCase";
import { DeleteProjectUseCase } from "../../../../../core/application/use-cases/projects/DeleteProjectUseCase";
import { SubmitContactUseCase } from "../../../../../core/application/use-cases/contact/SubmitContactUseCase";
import { GetContactMessagesUseCase } from "../../../../../core/application/use-cases/contact/GetContactMessagesUseCase";
import { LoginAdminUseCase } from "../../../../../core/application/use-cases/auth/LoginAdminUseCase";
import { GetSiteContentUseCase, UpdateSiteContentUseCase } from "../../../../../core/application/use-cases/content/SiteContentUseCases";

import { ProjectController } from "../controllers/ProjectController";
import { ContactController } from "../controllers/ContactController";
import { AuthController } from "../controllers/AuthController";
import { ContentController } from "../controllers/ContentController";
import { requireAuth } from "../middlewares/authMiddleware";

export function createApiRouter(): Router {
  const router = Router();

  // Instanciation des dépôts (Secondary Adapters)
  const projectRepo = new DrizzleProjectRepository();
  const contactRepo = new DrizzleContactRepository();
  const userRepo = new DrizzleUserRepository();
  const contentRepo = new DrizzleSiteContentRepository();
  const securityService = new BcryptSecurityService();

  // Instanciation des cas d'utilisation (Application Layer)
  const getProjectsUseCase = new GetProjectsUseCase(projectRepo);
  const createProjectUseCase = new CreateProjectUseCase(projectRepo);
  const updateProjectUseCase = new UpdateProjectUseCase(projectRepo);
  const deleteProjectUseCase = new DeleteProjectUseCase(projectRepo);

  const submitContactUseCase = new SubmitContactUseCase(contactRepo);
  const getContactMessagesUseCase = new GetContactMessagesUseCase(contactRepo);

  const loginAdminUseCase = new LoginAdminUseCase(userRepo, securityService);

  const getContentUseCase = new GetSiteContentUseCase(contentRepo);
  const updateContentUseCase = new UpdateSiteContentUseCase(contentRepo);

  // Instanciation des contrôleurs (Primary HTTP Adapters)
  const projectCtrl = new ProjectController(
    getProjectsUseCase,
    createProjectUseCase,
    updateProjectUseCase,
    deleteProjectUseCase
  );
  const contactCtrl = new ContactController(submitContactUseCase, getContactMessagesUseCase, contactRepo);
  const authCtrl = new AuthController(loginAdminUseCase, securityService);
  const contentCtrl = new ContentController(getContentUseCase, updateContentUseCase);

  // Routes Publiques
  router.get("/projects", (req, res) => projectCtrl.getAll(req, res));
  router.post("/contact", (req, res) => contactCtrl.submit(req, res));
  router.get("/content/:key", (req, res) => contentCtrl.getByKey(req, res));
  router.post("/auth/login", (req, res) => authCtrl.login(req, res));

  // Routes Privées (Administration / Back-Office)
  router.get("/auth/verify", requireAuth, (req, res) => authCtrl.verify(req, res));
  
  router.post("/projects", requireAuth, (req, res) => projectCtrl.create(req, res));
  router.put("/projects/:id", requireAuth, (req, res) => projectCtrl.update(req, res));
  router.delete("/projects/:id", requireAuth, (req, res) => projectCtrl.delete(req, res));

  router.get("/admin/messages", requireAuth, (req, res) => contactCtrl.getAll(req, res));
  router.patch("/admin/messages/:id/read", requireAuth, (req, res) => contactCtrl.markAsRead(req, res));
  router.delete("/admin/messages/:id", requireAuth, (req, res) => contactCtrl.delete(req, res));

  router.put("/content/:key", requireAuth, (req, res) => contentCtrl.updateByKey(req, res));

  return router;
}

