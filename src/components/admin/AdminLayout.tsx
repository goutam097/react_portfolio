import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  User, 
  Mail, 
  LogOut, 
  Menu, 
  X,
  Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentTab: string;
  onTabChange: (tab: string) => void;
  onBackToPortfolio: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  currentTab, 
  onTabChange, 
  onBackToPortfolio 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', name: 'Projects', icon: Briefcase },
    { id: 'about', name: 'About', icon: User },
    { id: 'contact', name: 'Contact', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-linear ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setSidebarOpen(false)} />
        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">P</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <nav className="mt-5 px-2">
              <div className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`group w-full flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                        currentTab === item.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`mr-4 flex-shrink-0 h-6 w-6 ${currentTab === item.id ? 'text-blue-700' : 'text-gray-400'}`} />
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold">P</span>
            </div>
            <h1 className="text-lg font-bold text-white">Admin Panel</h1>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`group w-full flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      currentTab === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`mr-3 flex-shrink-0 h-5 w-5 ${currentTab === item.id ? 'text-blue-700' : 'text-gray-400'}`} />
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={onBackToPortfolio}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <Home className="h-4 w-4 mr-2" />
                Back to Portfolio
              </button>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};