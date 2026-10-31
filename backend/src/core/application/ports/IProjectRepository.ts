import { Project } from "../../domain/entities/Project";

export interface IProjectRepository {
  findAll(): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
  findBySlug(slug: string): Promise<Project | null>;
  findFeatured(): Promise<Project[]>;
  findByCategory(category: string): Promise<Project[]>;
  save(project: Project): Promise<Project>;
  update(project: Project): Promise<Project>;
  delete(id: string): Promise<boolean>;
}

