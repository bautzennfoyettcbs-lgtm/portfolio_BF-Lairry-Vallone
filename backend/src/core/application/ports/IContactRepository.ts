import { ContactMessage } from "../../domain/entities/ContactMessage";

export interface IContactRepository {
  findAll(): Promise<ContactMessage[]>;
  findById(id: string): Promise<ContactMessage | null>;
  save(message: ContactMessage): Promise<ContactMessage>;
  markAsRead(id: string): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  getUnreadCount(): Promise<number>;
}

