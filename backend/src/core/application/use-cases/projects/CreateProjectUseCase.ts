import { IProjectRepository } from "../../ports/IProjectRepository";
import { Project, ProjectProps } from "../../../domain/entities/Project";

export class CreateProjectUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(dto: Omit<ProjectProps, "id" | "createdAt" | "updatedAt">): Promise<Project> {
    const existing = await this.projectRepository.findBySlug(dto.slug);
    if (existing) {
      throw new Error(`Un projet avec le slug "${dto.slug}" existe déjà.`);
    }

    const project = new Project(dto);
    return this.projectRepository.save(project);
  }
}

