import { IContactRepository } from "../../ports/IContactRepository";
import { ContactMessage } from "../../../domain/entities/ContactMessage";

export class GetContactMessagesUseCase {
  constructor(private contactRepository: IContactRepository) {}

  async execute(): Promise<{ messages: ContactMessage[]; unreadCount: number }> {
    const messages = await this.contactRepository.findAll();
    const unreadCount = await this.contactRepository.getUnreadCount();
    return { messages, unreadCount };
  }
}

