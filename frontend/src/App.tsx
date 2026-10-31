import React, { useState } from "react";
import { LanguageProvider } from "./presentation/context/LanguageContext";
import { AuthProvider, useAuth } from "./presentation/context/AuthContext";
import { Navbar } from "./presentation/components/Navbar";
import { Footer } from "./presentation/components/Footer";
import { HomePage } from "./presentation/pages/HomePage";
import { AboutPage } from "./presentation/pages/AboutPage";
import { ProjectsPage } from "./presentation/pages/ProjectsPage";
import { ContactPage } from "./presentation/pages/ContactPage";
import { AdminLoginPage } from "./presentation/pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "./presentation/pages/admin/AdminDashboardPage";

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const { isAuthenticated } = useAuth();

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "about":
        return <AboutPage onNavigate={handleNavigate} />;
      case "projects":
        return <ProjectsPage onNavigate={handleNavigate} />;
      case "contact":
        return <ContactPage onNavigate={handleNavigate} />;
      case "admin_login":
        return isAuthenticated ? (
          <AdminDashboardPage onNavigate={handleNavigate} />
        ) : (
          <AdminLoginPage onNavigate={handleNavigate} />
        );
      case "admin_dashboard":
        return isAuthenticated ? (
          <AdminDashboardPage onNavigate={handleNavigate} />
        ) : (
          <AdminLoginPage onNavigate={handleNavigate} />
        );
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const isAdminView = currentPage.startsWith("admin");

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0F1D] text-slate-100 selection:bg-[#FF6B00] selection:text-white">
      {/* Barre de navigation globale */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Corps de la page */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Pied de page (affiché sur le site public) */}
      {!isAdminView && <Footer onNavigate={handleNavigate} />}
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
