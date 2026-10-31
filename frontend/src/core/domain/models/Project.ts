export interface Project {
  id: string;
  titleFr: string;
  titleEn: string;
  slug: string;
  category: "web" | "mobile" | "vitrine" | "api";
  descriptionFr: string;
  descriptionEn: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
  isFeatured: boolean;
  displayOrder: number;
}

