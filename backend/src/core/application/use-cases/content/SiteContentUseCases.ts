import { ISiteContentRepository } from "../../ports/ISiteContentRepository";
import { SiteContent } from "../../../domain/entities/SiteContent";

export class GetSiteContentUseCase {
  constructor(private siteContentRepository: ISiteContentRepository) {}

  async execute(key: string): Promise<SiteContent | null> {
    return this.siteContentRepository.getByKey(key);
  }
}

export class UpdateSiteContentUseCase {
  constructor(private siteContentRepository: ISiteContentRepository) {}

  async execute(key: string, data: Record<string, any>): Promise<SiteContent> {
    return this.siteContentRepository.upsert(key, data);
  }
}

