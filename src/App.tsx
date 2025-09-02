import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { LoginForm } from './components/admin/LoginForm';
import { AdminLayout } from './components/admin/AdminLayout';
import { Dashboard } from './components/admin/Dashboard';
import { ProjectsManager } from './components/admin/ProjectsManager';
import { AboutManager } from './components/admin/AboutManager';
import { ContactManager } from './components/admin/ContactManager';
import { Header } from './components/portfolio/Header';
import { Hero } from './components/portfolio/Hero';
import { About } from './components/portfolio/About';
import { Projects } from './components/portfolio/Projects';
import { Contact } from './components/portfolio/Contact';

type ViewMode = 'portfolio' | 'admin';
type PortfolioSection = 'home' | 'about' | 'projects' | 'contact';
type AdminTab = 'dashboard' | 'projects' | 'about' | 'contact';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('portfolio');
  const [currentSection, setCurrentSection] = useState<PortfolioSection>('home');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setCurrentSection(sectionId as PortfolioSection);
  };

  if (viewMode === 'admin') {
    if (!isAuthenticated) {
      return <LoginForm />;
    }

    const renderAdminContent = () => {
      switch (adminTab) {
        case 'dashboard':
          return <Dashboard />;
        case 'projects':
          return <ProjectsManager />;
        case 'about':
          return <AboutManager />;
        case 'contact':
          return <ContactManager />;
        default:
          return <Dashboard />;
      }
    };

    return (
      <AdminLayout 
        currentTab={adminTab} 
        onTabChange={setAdminTab}
        onBackToPortfolio={() => setViewMode('portfolio')}
      >
        {renderAdminContent()}
      </AdminLayout>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        showAdminButton={true}
        onAdminClick={() => setViewMode('admin')}
      />
      
      <main className="pt-16">
        <section id="home">
          <Hero onScrollToProjects={() => scrollToSection('projects')} />
        </section>
        
        <section id="about">
          <About />
        </section>
        
        <section id="projects">
          <Projects />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <AppContent />
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;