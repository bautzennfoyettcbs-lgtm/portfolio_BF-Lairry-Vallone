import { IProjectRepository } from "../../ports/IProjectRepository";
import { Project } from "../../../domain/entities/Project";

export class GetProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(options?: { featuredOnly?: boolean; category?: string }): Promise<Project[]> {
    if (options?.featuredOnly) {
      return this.projectRepository.findFeatured();
    }
    if (options?.category && options.category !== "all") {
      return this.projectRepository.findByCategory(options.category);
    }
    return this.projectRepository.findAll();
  }
}

