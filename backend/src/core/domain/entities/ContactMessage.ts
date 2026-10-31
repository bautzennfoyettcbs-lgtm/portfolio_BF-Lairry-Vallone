export interface ContactMessageProps {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  isRead?: boolean;
  createdAt?: Date;
}

export class ContactMessage {
  public readonly id?: string;
  public readonly name: string;
  public readonly email: string;
  public readonly phone?: string | null;
  public readonly subject: string;
  public readonly message: string;
  public isRead: boolean;
  public readonly createdAt: Date;

  constructor(props: ContactMessageProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.subject = props.subject;
    this.message = props.message;
    this.isRead = props.isRead ?? false;
    this.createdAt = props.createdAt ?? new Date();
  }

  public markAsRead(): void {
    this.isRead = true;
  }
}

