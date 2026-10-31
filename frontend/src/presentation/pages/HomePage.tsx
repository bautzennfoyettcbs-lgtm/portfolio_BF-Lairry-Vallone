import React from "react";
import { HeroSection } from "../components/HeroSection";
import { AboutSummarySection } from "../components/AboutSummarySection";
import { ProjectsSummarySection } from "../components/ProjectsSummarySection";
import { ContactSummarySection } from "../components/ContactSummarySection";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-4">
      <HeroSection onNavigate={onNavigate} />
      <AboutSummarySection onNavigate={onNavigate} />
      <ProjectsSummarySection onNavigate={onNavigate} />
      <ContactSummarySection onNavigate={onNavigate} />
    </div>
  );
};

