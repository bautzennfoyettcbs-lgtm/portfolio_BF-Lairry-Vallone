import { IProjectRepository } from "../../ports/IProjectRepository";

export class DeleteProjectUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(id: string): Promise<boolean> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new Error("Projet introuvable.");
    }
    return this.projectRepository.delete(id);
  }
}

