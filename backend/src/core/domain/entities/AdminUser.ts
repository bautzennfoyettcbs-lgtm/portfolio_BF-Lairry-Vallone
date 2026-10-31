export interface AdminUserProps {
  id?: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt?: Date;
}

export class AdminUser {
  public readonly id?: string;
  public email: string;
  public passwordHash: string;
  public name: string;
  public readonly createdAt: Date;

  constructor(props: AdminUserProps) {
    this.id = props.id;
    this.email = props.email.toLowerCase().trim();
    this.passwordHash = props.passwordHash;
    this.name = props.name;
    this.createdAt = props.createdAt ?? new Date();
  }
}

