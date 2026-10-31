import { eq } from "drizzle-orm";
import { db } from "../connection";
import { adminUsers } from "../schema";
import { IUserRepository } from "../../../../../../core/application/ports/IUserRepository";
import { AdminUser } from "../../../../../../core/domain/entities/AdminUser";

export class DrizzleUserRepository implements IUserRepository {
  private mapToDomain(row: typeof adminUsers.$inferSelect): AdminUser {
    return new AdminUser({
      id: row.id,
      email: row.email,
      passwordHash: row.passwordHash,
      name: row.name,
      createdAt: row.createdAt,
    });
  }

  async findByEmail(email: string): Promise<AdminUser | null> {
    const [row] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email.toLowerCase().trim()))
      .limit(1);
    return row ? this.mapToDomain(row) : null;
  }

  async findById(id: string): Promise<AdminUser | null> {
    const [row] = await db.select().from(adminUsers).where(eq(adminUsers.id, id)).limit(1);
    return row ? this.mapToDomain(row) : null;
  }

  async save(user: AdminUser): Promise<AdminUser> {
    const [inserted] = await db
      .insert(adminUsers)
      .values({
        email: user.email,
        passwordHash: user.passwordHash,
        name: user.name,
      })
      .returning();

    return this.mapToDomain(inserted);
  }
}

