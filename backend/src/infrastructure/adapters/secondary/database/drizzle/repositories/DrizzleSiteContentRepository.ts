import { eq } from "drizzle-orm";
import { db } from "../connection";
import { siteSettings } from "../schema";
import { ISiteContentRepository } from "../../../../../../core/application/ports/ISiteContentRepository";
import { SiteContent } from "../../../../../../core/domain/entities/SiteContent";

export class DrizzleSiteContentRepository implements ISiteContentRepository {
  private mapToDomain(row: typeof siteSettings.$inferSelect): SiteContent {
    return new SiteContent({
      id: row.id,
      key: row.key,
      data: row.data,
      updatedAt: row.updatedAt,
    });
  }

  async getByKey(key: string): Promise<SiteContent | null> {
    const [row] = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
    return row ? this.mapToDomain(row) : null;
  }

  async upsert(key: string, data: Record<string, any>): Promise<SiteContent> {
    const existing = await this.getByKey(key);

    if (existing) {
      const merged = { ...existing.data, ...data };
      const [updated] = await db
        .update(siteSettings)
        .set({
          data: merged,
          updatedAt: new Date(),
        })
        .where(eq(siteSettings.key, key))
        .returning();
      return this.mapToDomain(updated);
    } else {
      const [inserted] = await db
        .insert(siteSettings)
        .values({
          key,
          data,
        })
        .returning();
      return this.mapToDomain(inserted);
    }
  }
}

