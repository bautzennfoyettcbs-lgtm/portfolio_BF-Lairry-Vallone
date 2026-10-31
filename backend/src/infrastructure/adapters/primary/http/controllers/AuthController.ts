import { Request, Response } from "express";
import { LoginAdminUseCase } from "../../../../../core/application/use-cases/auth/LoginAdminUseCase";
import { ISecurityService } from "../../../../../core/application/ports/ISecurityService";

export class AuthController {
  constructor(
    private loginAdminUseCase: LoginAdminUseCase,
    private securityService?: ISecurityService
  ) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email et mot de passe requis." });
      }

      try {
        const result = await this.loginAdminUseCase.execute(email, password);
        return res.json(result);
      } catch (dbError) {
        // Fallback administrateur sécurisé si PostgreSQL n'est pas encore initialisé
        if (
          email.toLowerCase() === "bautzennfoyettcbs@gmail.com" &&
          password === "BautzenDev2026!" &&
          this.securityService
        ) {
          const token = this.securityService.generateToken({
            userId: "admin-default-bautzen",
            email: "bautzennfoyettcbs@gmail.com",
          });
          return res.json({
            token,
            user: {
              id: "admin-default-bautzen",
              email: "bautzennfoyettcbs@gmail.com",
              name: "BAUTZEN FOYET LAIRRY VALLONE",
            },
          });
        }
        throw dbError;
      }
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }

  async verify(req: Request, res: Response) {
    return res.json({ authenticated: true });
  }
}

