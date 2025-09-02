import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Skill, ContactInfo, AboutContent } from '../types';

interface PortfolioContextType {
  projects: Project[];
  skills: Skill[];
  aboutContent: AboutContent;
  contactInfo: ContactInfo;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  updateAboutContent: (content: Partial<AboutContent>) => void;
  updateContactInfo: (info: Partial<ContactInfo>) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    liveUrl: 'https://demo-ecommerce.com',
    githubUrl: 'https://github.com/user/ecommerce',
    featured: true
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Firebase', 'Material-UI', 'Socket.io'],
    liveUrl: 'https://taskmanager-demo.com',
    githubUrl: 'https://github.com/user/taskmanager',
    featured: true
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard that displays current conditions, forecasts, and weather maps using multiple weather APIs.',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['JavaScript', 'Chart.js', 'Weather API', 'CSS Grid'],
    liveUrl: 'https://weather-dashboard-demo.com',
    githubUrl: 'https://github.com/user/weather-dashboard',
    featured: false
  }
];

const initialSkills: Skill[] = [
  { id: '1', name: 'React', level: 95, category: 'Frontend' },
  { id: '2', name: 'TypeScript', level: 90, category: 'Frontend' },
  { id: '3', name: 'Node.js', level: 85, category: 'Backend' },
  { id: '4', name: 'PostgreSQL', level: 80, category: 'Backend' },
  { id: '5', name: 'AWS', level: 75, category: 'DevOps' },
  { id: '6', name: 'Docker', level: 70, category: 'DevOps' }
];

const initialAboutContent: AboutContent = {
  title: 'Full Stack Developer',
  description: 'Passionate about creating beautiful, functional web applications that solve real-world problems.',
  bio: 'I am a dedicated full-stack developer with over 5 years of experience building web applications. I specialize in React, Node.js, and modern web technologies. I love turning complex problems into simple, beautiful designs.',
  resumeUrl: '/resume.pdf'
};

const initialContactInfo: ContactInfo = {
  email: 'hello@portfolio.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY',
  linkedin: 'https://linkedin.com/in/portfolio',
  github: 'https://github.com/portfolio',
  twitter: 'https://twitter.com/portfolio'
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [skills] = useState<Skill[]>(initialSkills);
  const [aboutContent, setAboutContent] = useState<AboutContent>(initialAboutContent);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialContactInfo);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString()
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const updateAboutContent = (updates: Partial<AboutContent>) => {
    setAboutContent(prev => ({ ...prev, ...updates }));
  };

  const updateContactInfo = (updates: Partial<ContactInfo>) => {
    setContactInfo(prev => ({ ...prev, ...updates }));
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        skills,
        aboutContent,
        contactInfo,
        addProject,
        updateProject,
        deleteProject,
        updateAboutContent,
        updateContactInfo
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};