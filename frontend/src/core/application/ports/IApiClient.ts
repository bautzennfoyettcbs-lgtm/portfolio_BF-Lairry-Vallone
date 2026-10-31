import { Project } from "../../domain/models/Project";
import { ContactInput, ContactMessage } from "../../domain/models/ContactMessage";
import { SiteContent } from "../../domain/models/SiteContent";

export interface IApiClient {
  getProjects(params?: { featured?: boolean; category?: string }): Promise<Project[]>;
  createProject(project: Omit<Project, "id">, token: string): Promise<Project>;
  updateProject(id: string, project: Partial<Project>, token: string): Promise<Project>;
  deleteProject(id: string, token: string): Promise<boolean>;

  sendContact(input: ContactInput): Promise<{ success: boolean }>;
  getMessages(token: string): Promise<{ messages: ContactMessage[]; unreadCount: number }>;
  markMessageAsRead(id: string, token: string): Promise<boolean>;
  deleteMessage(id: string, token: string): Promise<boolean>;

  getSiteContent(): Promise<SiteContent>;
  updateSiteContent(data: Partial<SiteContent>, token: string): Promise<SiteContent>;

  login(credentials: { email: string; password: string }): Promise<{ token: string; user: { name: string; email: string } }>;
  verifyToken(token: string): Promise<boolean>;
}

