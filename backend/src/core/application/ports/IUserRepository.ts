import { AdminUser } from "../../domain/entities/AdminUser";

export interface IUserRepository {
  findByEmail(email: string): Promise<AdminUser | null>;
  findById(id: string): Promise<AdminUser | null>;
  save(user: AdminUser): Promise<AdminUser>;
}

