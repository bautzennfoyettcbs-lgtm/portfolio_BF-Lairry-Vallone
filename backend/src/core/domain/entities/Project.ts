export interface ProjectProps {
  id?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}

export class Project {
  public readonly id?: string;
  public titleFr: string;
  public titleEn: string;
  public slug: string;
  public category: "web" | "mobile" | "vitrine" | "api";
  public descriptionFr: string;
  public descriptionEn: string;
  public technologies: string[];
  public imageUrl: string;
  public liveUrl?: string | null;
  public githubUrl?: string | null;
  public isFeatured: boolean;
  public displayOrder: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: ProjectProps) {
    this.id = props.id;
    this.titleFr = props.titleFr;
    this.titleEn = props.titleEn;
    this.slug = props.slug;
    this.category = props.category;
    this.descriptionFr = props.descriptionFr;
    this.descriptionEn = props.descriptionEn;
    this.technologies = props.technologies;
    this.imageUrl = props.imageUrl;
    this.liveUrl = props.liveUrl;
    this.githubUrl = props.githubUrl;
    this.isFeatured = props.isFeatured;
    this.displayOrder = props.displayOrder;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  public update(props: Partial<Omit<ProjectProps, "id" | "createdAt">>): void {
    if (props.titleFr !== undefined) this.titleFr = props.titleFr;
    if (props.titleEn !== undefined) this.titleEn = props.titleEn;
    if (props.slug !== undefined) this.slug = props.slug;
    if (props.category !== undefined) this.category = props.category;
    if (props.descriptionFr !== undefined) this.descriptionFr = props.descriptionFr;
    if (props.descriptionEn !== undefined) this.descriptionEn = props.descriptionEn;
    if (props.technologies !== undefined) this.technologies = props.technologies;
    if (props.imageUrl !== undefined) this.imageUrl = props.imageUrl;
    if (props.liveUrl !== undefined) this.liveUrl = props.liveUrl;
    if (props.githubUrl !== undefined) this.githubUrl = props.githubUrl;
    if (props.isFeatured !== undefined) this.isFeatured = props.isFeatured;
    if (props.displayOrder !== undefined) this.displayOrder = props.displayOrder;
  }
}

