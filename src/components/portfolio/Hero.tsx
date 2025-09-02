import React from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface HeroProps {
  onScrollToProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToProjects }) => {
  const { aboutContent, contactInfo } = usePortfolio();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
              P
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {aboutContent.title}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {aboutContent.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={onScrollToProjects}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View My Work
            </button>
            <a
              href={contactInfo.email ? `mailto:${contactInfo.email}` : '#'}
              className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-all duration-200 transform hover:scale-105"
            >
              Get In Touch
            </a>
          </div>

          <div className="flex items-center justify-center space-x-6">
            {contactInfo.github && (
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 transform hover:scale-110"
              >
                <Github className="w-6 h-6" />
              </a>
            )}
            {contactInfo.linkedin && (
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 transform hover:scale-110"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            )}
            {contactInfo.email && (
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 transform hover:scale-110"
              >
                <Mail className="w-6 h-6" />
              </a>
            )}
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </div>
    </section>
  );
};