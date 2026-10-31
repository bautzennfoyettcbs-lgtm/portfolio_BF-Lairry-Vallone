import { db } from "./connection";
import { adminUsers, projects, siteSettings } from "./schema";
import { BcryptSecurityService } from "../../security/BcryptSecurityService";

async function seed() {
  console.log("🌱 Démarrage de l'initialisation des données (Seed)...");

  const security = new BcryptSecurityService();
  const hashedPassword = await security.hashPassword("BautzenDev2026!");

  // 1. Initialisation Utilisateur Admin
  console.log("👤 Création du compte administrateur...");
  await db
    .insert(adminUsers)
    .values({
      email: "bautzennfoyettcbs@gmail.com",
      passwordHash: hashedPassword,
      name: "BAUTZEN FOYET LAIRRY VALLONE",
    })
    .onConflictDoNothing();

  // 2. Initialisation des Projets
  console.log("💼 Création des projets par défaut...");
  const sampleProjects = [
    {
      titleFr: "Plateforme Web E-Commerce & SaaS Hexagonale",
      titleEn: "Hexagonal E-Commerce & SaaS Web Platform",
      slug: "plateforme-saas-hexagonale",
      category: "web",
      descriptionFr:
        "Application web complète construite selon la Clean Architecture et l'architecture hexagonale. Découplage complet du domaine, gestion fine des stocks et paiements.",
      descriptionEn:
        "Full-stack web application designed with Clean Architecture and Hexagonal pattern. Complete decoupling of core domain, inventory management and payment gateway.",
      technologies: ["React", "Next", "TypeScript", "TailwindCSS", "AdonisJS", "PostgreSQL", "Drizzle ORM"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      liveUrl: "https://demo.bautzen-dev.com/saas",
      githubUrl: "https://github.com/bautzen-dev/saas-hexagonal-clean",
      isFeatured: true,
      displayOrder: 1,
    },
    {
      titleFr: "Application Mobile Multi-Services & Livraisons",
      titleEn: "Multi-Service & Delivery Mobile App",
      slug: "app-mobile-livraison",
      category: "mobile",
      descriptionFr:
        "Application mobile multiplateforme connectée à une API haute disponibilité. Géolocalisation en temps réel, notifications push et synchronisation hors ligne.",
      descriptionEn:
        "Cross-platform mobile application connected to high-availability API. Real-time GPS tracking, push notifications and offline-first synchronization.",
      technologies: ["React Native", "TypeScript", "TailwindCSS", "NestJS", "PostgreSQL", "Drizzle ORM"],
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
      liveUrl: "https://demo.bautzen-dev.com/mobile",
      githubUrl: "https://github.com/bautzen-dev/mobile-app-clean-arch",
      isFeatured: true,
      displayOrder: 2,
    },
    {
      titleFr: "Site Vitrine Corporate Haute Performance",
      titleEn: "High-Performance Corporate Showcase Website",
      slug: "site-vitrine-corporate",
      category: "vitrine",
      descriptionFr:
        "Site vitrine moderne ultra-rapide avec animations interactives, design soigné aux couleurs bleu et orange, score Lighthouse 99/100 et SEO optimisé.",
      descriptionEn:
        "Ultra-fast modern showcase site with interactive micro-animations, blue and orange color identity, 99/100 Lighthouse score and advanced SEO.",
      technologies: ["React", "TypeScript", "TailwindCSS", "Framer Motion"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      liveUrl: "https://demo.bautzen-dev.com/vitrine",
      githubUrl: "https://github.com/bautzen-dev/showcase-react-tailwind",
      isFeatured: true,
      displayOrder: 3,
    },
    {
      titleFr: "Moteur d'Analyse de Données & API Python",
      titleEn: "Data Analytics Engine & Python Microservice",
      slug: "moteur-analyse-python",
      category: "api",
      descriptionFr:
        "Microservice d'analyse et traitement automatisé de données développé en Python, interfacé avec PostgreSQL et Drizzle ORM.",
      descriptionEn:
        "Data processing and automated analytics microservice developed in Python, seamlessly integrated with PostgreSQL and Drizzle ORM.",
      technologies: ["Python", "React", "TypeScript", "PostgreSQL", "Drizzle ORM"],
      imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
      liveUrl: "https://demo.bautzen-dev.com/analytics",
      githubUrl: "https://github.com/bautzen-dev/python-analytics-api",
      isFeatured: false,
      displayOrder: 4,
    },
  ];

  for (const proj of sampleProjects) {
    await db
      .insert(projects)
      .values(proj)
      .onConflictDoNothing();
  }

  // 3. Initialisation des textes de la Landing Page
  console.log("⚙️ Initialisation des paramètres du site...");
  await db
    .insert(siteSettings)
    .values({
      key: "homepage_content",
      data: {
        hero: {
          titleFr: "Développeur Web & Mobile Fullstack",
          titleEn: "Fullstack Web & Mobile Developer",
          subtitleFr:
            "Expert en Clean Architecture et Architecture Hexagonale. Je conçois des applications web et mobiles robustes, évolutives et hautement performantes.",
          subtitleEn:
            "Specialist in Clean & Hexagonal Architecture. I engineer robust, scalable, high-performance web and mobile applications.",
        },
        contact: {
          phones: ["+237 697480153", "+237 654399609"],
          email: "bautzennfoyettcbs@gmail.com",
          location: "Bafoussam, Cameroun",
        },
      },
    })
    .onConflictDoNothing();

  console.log("✅ Seed terminé avec succès !");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Erreur lors du seed :", err);
  process.exit(1);
});

