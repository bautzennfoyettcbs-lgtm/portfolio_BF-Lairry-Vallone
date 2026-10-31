import { IUserRepository } from "../../ports/IUserRepository";
import { ISecurityService } from "../../ports/ISecurityService";

export interface LoginResult {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export class LoginAdminUseCase {
  constructor(
    private userRepository: IUserRepository,
    private securityService: ISecurityService
  ) {}

  async execute(email: string, password: string): Promise<LoginResult> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Identifiants de connexion invalides.");
    }

    const isValid = await this.securityService.comparePassword(password, user.passwordHash);
    if (!isValid) {
      throw new Error("Identifiants de connexion invalides.");
    }

    const token = this.securityService.generateToken({
      userId: user.id || "",
      email: user.email,
    });

    return {
      token,
      user: {
        id: user.id || "",
        email: user.email,
        name: user.name,
      },
    };
  }
}

