import React from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Projects: React.FC = () => {
  const { projects } = usePortfolio();

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Here are some of the projects I've worked on recently. Each one represents a unique challenge and solution.
          </p>
        </div>

        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              Featured Projects
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      {project.title}
                    </h4>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 font-medium transition-colors duration-200"
                        >
                          <Github className="w-4 h-4" />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Other Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {project.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {project.description.substring(0, 100)}...
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-700 text-sm font-medium transition-colors duration-200"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};