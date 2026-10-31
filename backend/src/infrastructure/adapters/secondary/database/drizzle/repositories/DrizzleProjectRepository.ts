import { eq, desc, asc } from "drizzle-orm";
import { db } from "../connection";
import { projects } from "../schema";
import { IProjectRepository } from "../../../../../../core/application/ports/IProjectRepository";
import { Project } from "../../../../../../core/domain/entities/Project";

export class DrizzleProjectRepository implements IProjectRepository {
  private mapToDomain(row: typeof projects.$inferSelect): Project {
    return new Project({
      id: row.id,
      titleFr: row.titleFr,
      titleEn: row.titleEn,
      slug: row.slug,
      category: row.category as any,
      descriptionFr: row.descriptionFr,
      descriptionEn: row.descriptionEn,
      technologies: row.technologies,
      imageUrl: row.imageUrl,
      liveUrl: row.liveUrl,
      githubUrl: row.githubUrl,
      isFeatured: row.isFeatured,
      displayOrder: row.displayOrder,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  async findAll(): Promise<Project[]> {
    const rows = await db.select().from(projects).orderBy(asc(projects.displayOrder), desc(projects.createdAt));
    return rows.map((r) => this.mapToDomain(r));
  }

  async findById(id: string): Promise<Project | null> {
    const [row] = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
    return row ? this.mapToDomain(row) : null;
  }

  async findBySlug(slug: string): Promise<Project | null> {
    const [row] = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
    return row ? this.mapToDomain(row) : null;
  }

  async findFeatured(): Promise<Project[]> {
    const rows = await db
      .select()
      .from(projects)
      .where(eq(projects.isFeatured, true))
      .orderBy(asc(projects.displayOrder));
    return rows.map((r) => this.mapToDomain(r));
  }

  async findByCategory(category: string): Promise<Project[]> {
    const rows = await db
      .select()
      .from(projects)
      .where(eq(projects.category, category))
      .orderBy(asc(projects.displayOrder));
    return rows.map((r) => this.mapToDomain(r));
  }

  async save(project: Project): Promise<Project> {
    const [inserted] = await db
      .insert(projects)
      .values({
        titleFr: project.titleFr,
        titleEn: project.titleEn,
        slug: project.slug,
        category: project.category,
        descriptionFr: project.descriptionFr,
        descriptionEn: project.descriptionEn,
        technologies: project.technologies,
        imageUrl: project.imageUrl,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        isFeatured: project.isFeatured,
        displayOrder: project.displayOrder,
      })
      .returning();

    return this.mapToDomain(inserted);
  }

  async update(project: Project): Promise<Project> {
    if (!project.id) throw new Error("ID requis pour la mise à jour");

    const [updated] = await db
      .update(projects)
      .set({
        titleFr: project.titleFr,
        titleEn: project.titleEn,
        slug: project.slug,
        category: project.category,
        descriptionFr: project.descriptionFr,
        descriptionEn: project.descriptionEn,
        technologies: project.technologies,
        imageUrl: project.imageUrl,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        isFeatured: project.isFeatured,
        displayOrder: project.displayOrder,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, project.id))
      .returning();

    return this.mapToDomain(updated);
  }

  async delete(id: string): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id)).returning();
    return result.length > 0;
  }
}

