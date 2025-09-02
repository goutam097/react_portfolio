import React from 'react';
import { Menu, X, Home, User, Briefcase, Mail, Settings } from 'lucide-react';

interface HeaderProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  showAdminButton?: boolean;
  onAdminClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentSection, 
  onSectionChange, 
  showAdminButton = false, 
  onAdminClick 
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Portfolio</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    currentSection === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            {showAdminButton && (
              <button
                onClick={onAdminClick}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <Settings className="w-4 h-4" />
                <span>Admin</span>
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSectionChange(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                      currentSection === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              {showAdminButton && (
                <button
                  onClick={() => {
                    onAdminClick?.();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <Settings className="w-5 h-5" />
                  <span>Admin Panel</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};