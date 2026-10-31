import { SiteContent } from "../../domain/entities/SiteContent";

export interface ISiteContentRepository {
  getByKey(key: string): Promise<SiteContent | null>;
  upsert(key: string, data: Record<string, any>): Promise<SiteContent>;
}

