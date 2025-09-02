export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  twitter: string;
}

export interface AboutContent {
  title: string;
  description: string;
  bio: string;
  resumeUrl: string;
}