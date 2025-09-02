import React from 'react';
import { Download, Award, Users, Coffee } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const About: React.FC = () => {
  const { aboutContent, skills } = usePortfolio();

  const stats = [
    { icon: Award, label: 'Projects Completed', value: '50+' },
    { icon: Users, label: 'Happy Clients', value: '30+' },
    { icon: Coffee, label: 'Cups of Coffee', value: '1000+' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {aboutContent.bio}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="grid grid-cols-3 gap-8 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <a
              href={aboutContent.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <Download className="w-5 h-5" />
              <span>Download Resume</span>
            </a>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Skills</h3>
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-900">{skill.name}</span>
                    <span className="text-sm text-gray-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};