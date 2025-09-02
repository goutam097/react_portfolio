import React, { useState } from 'react';
import { Save, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ContactManager: React.FC = () => {
  const { contactInfo, updateContactInfo } = usePortfolio();
  const [formData, setFormData] = useState(contactInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateContactInfo(formData);
    setIsLoading(false);
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contact Information</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your contact details and social media links.
        </p>
      </div>

      {showSuccess && (
        <div className="mb-6 rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Contact information updated successfully!
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Contact Information */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Contact Details
              </h3>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                placeholder="City, State/Country"
              />
            </div>

            {/* Social Media Links */}
            <div className="md:col-span-2 mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Github className="w-5 h-5 mr-2" />
                Social Media Links
              </h3>
            </div>

            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 flex items-center">
                <Linkedin className="w-4 h-4 mr-2 text-blue-600" />
                LinkedIn Profile
              </label>
              <input
                type="url"
                name="linkedin"
                id="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div>
              <label htmlFor="github" className="block text-sm font-medium text-gray-700 flex items-center">
                <Github className="w-4 h-4 mr-2 text-gray-900" />
                GitHub Profile
              </label>
              <input
                type="url"
                name="github"
                id="github"
                value={formData.github}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                placeholder="https://github.com/username"
              />
            </div>

            <div>
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 flex items-center">
                <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                Twitter Profile
              </label>
              <input
                type="url"
                name="twitter"
                id="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                placeholder="https://twitter.com/username"
              />
            </div>

            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formData.email && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Email</div>
                  <div className="text-sm text-gray-600">{formData.email}</div>
                </div>
              </div>
            )}

            {formData.phone && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Phone</div>
                  <div className="text-sm text-gray-600">{formData.phone}</div>
                </div>
              </div>
            )}

            {formData.location && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Location</div>
                  <div className="text-sm text-gray-600">{formData.location}</div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">Social Links</h4>
            <div className="flex space-x-4">
              {formData.github && (
                <a
                  href={formData.github}
                  className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-900"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {formData.linkedin && (
                <a
                  href={formData.linkedin}
                  className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 hover:text-blue-700"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {formData.twitter && (
                <a
                  href={formData.twitter}
                  className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-400 hover:text-blue-500"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};