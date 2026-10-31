import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ISecurityService } from "../../../../core/application/ports/ISecurityService";

export class BcryptSecurityService implements ISecurityService {
  private jwtSecret: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || "fallback_secret_key_bautzen_2026";
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  generateToken(payload: { userId: string; email: string }): string {
    return jwt.sign(payload, this.jwtSecret, { expiresIn: "7d" });
  }

  verifyToken(token: string): { userId: string; email: string } | null {
    try {
      return jwt.verify(token, this.jwtSecret) as { userId: string; email: string };
    } catch {
      return null;
    }
  }
}

