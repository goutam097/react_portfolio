import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Star, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types';

export const ProjectsManager: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    featured: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim())
    };

    if (editingProject) {
      updateProject(editingProject.id, projectData);
    } else {
      addProject(projectData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      technologies: '',
      liveUrl: '',
      githubUrl: '',
      featured: false
    });
    setShowForm(false);
    setEditingProject(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      technologies: project.technologies.join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  const toggleFeatured = (project: Project) => {
    updateProject(project.id, { featured: !project.featured });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects Manager</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your portfolio projects and showcase your best work.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  placeholder="https://images.pexels.com/..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  placeholder="React, Node.js, PostgreSQL"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Live URL (optional)</label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    placeholder="https://demo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">GitHub URL (optional)</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    placeholder="https://github.com/user/repo"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Featured Project
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {editingProject ? 'Update' : 'Create'} Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {projects.map((project) => (
            <li key={project.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    className="h-16 w-16 rounded-lg object-cover"
                    src={project.image}
                    alt={project.title}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-medium text-gray-900 truncate">
                        {project.title}
                      </h4>
                      {project.featured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-xs text-gray-500">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                      title="View Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  
                  <button
                    onClick={() => toggleFeatured(project)}
                    className={`p-2 transition-colors duration-200 ${
                      project.featured 
                        ? 'text-yellow-500 hover:text-yellow-600' 
                        : 'text-gray-400 hover:text-yellow-500'
                    }`}
                    title={project.featured ? 'Remove from Featured' : 'Mark as Featured'}
                  >
                    <Star className={`w-4 h-4 ${project.featured ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                    title="Edit Project"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        {projects.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first project.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};