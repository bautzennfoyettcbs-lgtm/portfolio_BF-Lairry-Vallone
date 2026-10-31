import { Request, Response, NextFunction } from "express";
import { BcryptSecurityService } from "../../../secondary/security/BcryptSecurityService";

const securityService = new BcryptSecurityService();

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Accès non autorisé. Token manquant." });
  }

  const token = authHeader.split(" ")[1];
  const payload = securityService.verifyToken(token);

  if (!payload) {
    return res.status(401).json({ error: "Token invalide ou expiré." });
  }

  req.user = payload;
  next();
}

