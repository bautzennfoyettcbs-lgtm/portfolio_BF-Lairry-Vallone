import { eq, desc, count } from "drizzle-orm";
import { db } from "../connection";
import { contactMessages } from "../schema";
import { IContactRepository } from "../../../../../../core/application/ports/IContactRepository";
import { ContactMessage } from "../../../../../../core/domain/entities/ContactMessage";

export class DrizzleContactRepository implements IContactRepository {
  private mapToDomain(row: typeof contactMessages.$inferSelect): ContactMessage {
    return new ContactMessage({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      subject: row.subject,
      message: row.message,
      isRead: row.isRead,
      createdAt: row.createdAt,
    });
  }

  async findAll(): Promise<ContactMessage[]> {
    const rows = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
    return rows.map((r) => this.mapToDomain(r));
  }

  async findById(id: string): Promise<ContactMessage | null> {
    const [row] = await db.select().from(contactMessages).where(eq(contactMessages.id, id)).limit(1);
    return row ? this.mapToDomain(row) : null;
  }

  async save(message: ContactMessage): Promise<ContactMessage> {
    const [inserted] = await db
      .insert(contactMessages)
      .values({
        name: message.name,
        email: message.email,
        phone: message.phone,
        subject: message.subject,
        message: message.message,
        isRead: message.isRead,
      })
      .returning();

    return this.mapToDomain(inserted);
  }

  async markAsRead(id: string): Promise<boolean> {
    const [updated] = await db
      .update(contactMessages)
      .set({ isRead: true })
      .where(eq(contactMessages.id, id))
      .returning();
    return !!updated;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await db.delete(contactMessages).where(eq(contactMessages.id, id)).returning();
    return deleted.length > 0;
  }

  async getUnreadCount(): Promise<number> {
    const [res] = await db
      .select({ value: count() })
      .from(contactMessages)
      .where(eq(contactMessages.isRead, false));
    return Number(res?.value || 0);
  }
}

