import { IProjectRepository } from "../../ports/IProjectRepository";
import { Project, ProjectProps } from "../../../domain/entities/Project";

export class UpdateProjectUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(id: string, dto: Partial<Omit<ProjectProps, "id" | "createdAt">>): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new Error("Projet non trouvé.");
    }

    if (dto.slug && dto.slug !== project.slug) {
      const existing = await this.projectRepository.findBySlug(dto.slug);
      if (existing && existing.id !== id) {
        throw new Error(`Le slug "${dto.slug}" est déjà utilisé par un autre projet.`);
      }
    }

    project.update(dto);
    return this.projectRepository.update(project);
  }
}

