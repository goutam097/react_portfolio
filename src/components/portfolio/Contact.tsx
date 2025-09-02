import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Contact: React.FC = () => {
  const { contactInfo } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('Thank you for your message! I\'ll get back to you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I'm always open to discussing new opportunities and interesting projects. Let's connect!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
            
            <div className="space-y-6">
              {contactInfo.email && (
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              )}

              {contactInfo.phone && (
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Phone</div>
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="text-gray-600 hover:text-green-600 transition-colors duration-200"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
              )}

              {contactInfo.location && (
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Location</div>
                    <div className="text-gray-600">{contactInfo.location}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8">
              <h4 className="font-medium text-gray-900 mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {contactInfo.github && (
                  <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-all duration-200"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {contactInfo.linkedin && (
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-200 transition-all duration-200"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {contactInfo.twitter && (
                  <a
                    href={contactInfo.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-200 transition-all duration-200"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};