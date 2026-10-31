# PORTFOLIO PROFESSIONNEL & CMS ADMINISTRATIF PRIVÉ
## BAUTZEN FOYET LAIRRY VALLONE
**Développeur Web & Mobile Fullstack** | Bilingue (Français & Anglais)  
**Localisation :** Bafoussam, Cameroun  
**Contact :** +237 697 480 153 / +237 654 399 609 | [bautzennfoyettcbs@gmail.com](mailto:bautzennfoyettcbs@gmail.com)

---

## 🏛️ ARCHITECTURE LOGICIELLE DU PROJET

Le projet est conçu selon les principes stricts de la **Clean Architecture** et de l'**Architecture Hexagonale (Ports & Adapters)** afin de garantir un découplage total entre la logique métier et les détails d'infrastructure.

```
portfolio_BF-Lairry-Vallone/
│
├── frontend/                                # Application Web & Mobile React / TypeScript
│   ├── src/
│   │   ├── core/                           # Couche Domaine & Ports (Frontend)
│   │   │   ├── domain/models/              # Entités & Modèles (Project, ContactMessage, SiteContent)
│   │   │   └── application/ports/          # Interface IApiClient
│   │   ├── infrastructure/                 # Adaptateurs & Implémentations concrètes
│   │   │   └── adapters/api/               # HttpApiClient (API REST + Mock fallback résilient)
│   │   └── presentation/                   # Interface Utilisateur (React / Tailwind CSS)
│   │       ├── components/                 # Navbar, Footer, Hero, Summaries...
│   │       ├── context/                    # LanguageContext (FR/EN), AuthContext
│   │       ├── pages/                      # HomePage, AboutPage, ProjectsPage, ContactPage
│   │       │   └── admin/                  # AdminLoginPage, AdminDashboardPage (CMS)
│   │       └── styles/                     # Tailwind CSS configuré (Orange, Bleu, Blanc)
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── package.json
│
├── backend/                                 # Serveur API Node / TypeScript
│   ├── src/
│   │   ├── core/
│   │   │   ├── domain/entities/            # Project, ContactMessage, AdminUser, SiteContent
│   │   │   └── application/
│   │   │       ├── ports/                  # IProjectRepository, IContactRepository, ISecurityService...
│   │   │       └── use-cases/              # CreateProject, GetProjects, SubmitContact, LoginAdmin...
│   │   └── infrastructure/
│   │       └── adapters/
│   │           ├── primary/http/           # Contrôleurs Express, Middlewares, Routes API
│   │           └── secondary/              # Adaptateurs BDD & Sécurité
│   │               ├── database/drizzle/   # Schémas PostgreSQL Drizzle ORM, Connexion, Seed
│   │               └── security/           # Bcrypt & JWT Security Service
│   ├── drizzle.config.ts                   # Configuration Drizzle Kit
│   ├── .env.example
│   └── package.json
│
├── CAHIER_DES_CHARGES.md                    # Spécifications complètes du projet
├── CAHIER_DES_CHARGES_PORTFOLIO_BAUTZEN.docx # Document Word officiel formaté
└── package.json                             # Scripts d'orchestration globale
```

---

## 🎨 CHARTE GRAPHIQUE

* **Bleu Nuit / Royal (`#0F172A` / `#1E40AF`) :** Représente l'ingénierie, la stabilité technique et le fond sombre haut de gamme.
* **Orange Énergique (`#FF6B00`) :** Utilisé pour les Call-To-Action (CTA), les puces clés, les badges interactifs et le dynamisme.
* **Blanc Pur (`#FFFFFF`) :** Clarté typographique et cartes de contenu contrastées.

---

## 🚀 DÉMARRAGE RAPIDE

### 1. Lancer le Frontend (React + TypeScript + Tailwind)
```bash
# Depuis la racine du projet :
npm run dev:frontend

# L'application est accessible sur : http://localhost:5173
```

### 2. Lancer le Backend (TypeScript + PostgreSQL + Drizzle ORM)
```bash
# Configurer les variables d'environnement dans backend/.env
# Puis lancer le serveur API :
npm run dev:backend

# L'API est accessible sur : http://localhost:5000/api
# Healthcheck : http://localhost:5000/health
```

### 3. Migrations & Seed de la Base de Données (PostgreSQL)
```bash
# Pousser le schéma vers PostgreSQL avec Drizzle Kit :
cd backend
npm run db:push

# Remplir la base avec les projets et données par défaut :
npm run seed
```

---

## 🔐 ACCÈS À LA PLATEFORME ADMINISTRATIVE (CMS)

Pour gérer tous les contenus visibles en direct sur le site public :
* **URL d'accès :** Cliquez sur l'icône de bouclier dans la barre de navigation ou naviguez sur l'écran d'administration.
* **Email par défaut :** `bautzennfoyettcbs@gmail.com`
* **Mot de passe par défaut :** `BautzenDev2026!` *(personnalisable dans le `.env` et la BDD)*.

