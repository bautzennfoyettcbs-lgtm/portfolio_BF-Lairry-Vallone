export interface SiteContentProps {
  id?: string;
  key: string;
  data: Record<string, any>;
  updatedAt?: Date;
}

export class SiteContent {
  public readonly id?: string;
  public readonly key: string;
  public data: Record<string, any>;
  public updatedAt: Date;

  constructor(props: SiteContentProps) {
    this.id = props.id;
    this.key = props.key;
    this.data = props.data;
    this.updatedAt = props.updatedAt ?? new Date();
  }

  public updateData(newData: Record<string, any>): void {
    this.data = { ...this.data, ...newData };
    this.updatedAt = new Date();
  }
}

