import React, { useState } from 'react';
import { Save, User } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AboutManager: React.FC = () => {
  const { aboutContent, updateAboutContent } = usePortfolio();
  const [formData, setFormData] = useState(aboutContent);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateAboutContent(formData);
    setIsLoading(false);
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">About Section Manager</h1>
        <p className="mt-2 text-sm text-gray-600">
          Update your personal information, bio, and professional details.
        </p>
      </div>

      {showSuccess && (
        <div className="mb-6 rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                About section updated successfully!
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Professional Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
              placeholder="e.g., Full Stack Developer"
            />
            <p className="mt-1 text-sm text-gray-500">
              This appears as your main title on the homepage.
            </p>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Short Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
              placeholder="Brief description of what you do"
            />
            <p className="mt-1 text-sm text-gray-500">
              A concise description that appears below your title on the homepage.
            </p>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Biography
            </label>
            <textarea
              name="bio"
              id="bio"
              rows={6}
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
              placeholder="Tell your story..."
            />
            <p className="mt-1 text-sm text-gray-500">
              A detailed biography that appears in the About section. Share your journey, experience, and passion.
            </p>
          </div>

          <div>
            <label htmlFor="resumeUrl" className="block text-sm font-medium text-gray-700">
              Resume URL
            </label>
            <input
              type="url"
              name="resumeUrl"
              id="resumeUrl"
              value={formData.resumeUrl}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
              placeholder="https://example.com/resume.pdf"
            />
            <p className="mt-1 text-sm text-gray-500">
              Link to your downloadable resume or CV.
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2" />
          Preview
        </h3>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{formData.title}</h2>
          <p className="text-lg text-gray-600 mb-4">{formData.description}</p>
          <p className="text-gray-700 leading-relaxed">{formData.bio}</p>
          {formData.resumeUrl && (
            <div className="mt-4">
              <a
                href={formData.resumeUrl}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};