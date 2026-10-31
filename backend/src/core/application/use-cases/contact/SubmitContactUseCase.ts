import { IContactRepository } from "../../ports/IContactRepository";
import { ContactMessage, ContactMessageProps } from "../../../domain/entities/ContactMessage";

export class SubmitContactUseCase {
  constructor(private contactRepository: IContactRepository) {}

  async execute(dto: Omit<ContactMessageProps, "id" | "isRead" | "createdAt">): Promise<ContactMessage> {
    if (!dto.email || !dto.name || !dto.message) {
      throw new Error("Veuillez renseigner les champs obligatoires (nom, email, message).");
    }

    const message = new ContactMessage(dto);
    return this.contactRepository.save(message);
  }
}

