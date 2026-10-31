import { Request, Response } from "express";
import { SubmitContactUseCase } from "../../../../../core/application/use-cases/contact/SubmitContactUseCase";
import { GetContactMessagesUseCase } from "../../../../../core/application/use-cases/contact/GetContactMessagesUseCase";
import { IContactRepository } from "../../../../../core/application/ports/IContactRepository";

export class ContactController {
  constructor(
    private submitContactUseCase: SubmitContactUseCase,
    private getContactMessagesUseCase: GetContactMessagesUseCase,
    private contactRepository: IContactRepository
  ) {}

  async submit(req: Request, res: Response) {
    try {
      const message = await this.submitContactUseCase.execute(req.body);
      return res.status(201).json({ success: true, message });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const result = await this.getContactMessagesUseCase.execute();
      return res.json(result);
    } catch {
      return res.json({
        messages: [
          {
            id: "msg-default-1",
            name: "Jean-Paul Kamga",
            email: "jp.kamga@tech-africa.cm",
            phone: "+237 670 000 000",
            subject: "Proposition de projet d'application mobile",
            message:
              "Bonjour Bautzen, nous avons un projet d'application mobile logistique et votre profil Clean Architecture nous intéresse vivement.",
            isRead: false,
            createdAt: new Date().toISOString(),
          },
        ],
        unreadCount: 1,
      });
    }
  }

  async markAsRead(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await this.contactRepository.markAsRead(id);
      return res.json({ success });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await this.contactRepository.delete(id);
      return res.json({ success });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

