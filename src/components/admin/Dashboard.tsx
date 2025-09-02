import React from 'react';
import { Briefcase, Eye, Users, TrendingUp } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Dashboard: React.FC = () => {
  const { projects } = usePortfolio();
  
  const stats = [
    {
      name: 'Total Projects',
      value: projects.length,
      icon: Briefcase,
      change: '+4.75%',
      changeType: 'positive',
    },
    {
      name: 'Featured Projects',
      value: projects.filter(p => p.featured).length,
      icon: Eye,
      change: '+54.02%',
      changeType: 'positive',
    },
    {
      name: 'Portfolio Views',
      value: '2,847',
      icon: Users,
      change: '-1.39%',
      changeType: 'negative',
    },
    {
      name: 'Contact Inquiries',
      value: '127',
      icon: TrendingUp,
      change: '+10.18%',
      changeType: 'positive',
    },
  ];

  const recentProjects = projects.slice(0, 3);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome to your portfolio admin panel. Here's an overview of your content.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white overflow-hidden rounded-lg shadow">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Recent Projects
            </h3>
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentProjects.map((project) => (
                  <li key={project.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img className="h-8 w-8 rounded-lg object-cover" src={project.image} alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {project.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {project.technologies.slice(0, 3).join(', ')}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        {project.featured ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Featured
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Regular
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                <div className="text-sm font-medium text-blue-900">Add New Project</div>
                <div className="text-xs text-blue-700">Create a new portfolio project</div>
              </button>
              <button className="w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200">
                <div className="text-sm font-medium text-purple-900">Update About Section</div>
                <div className="text-xs text-purple-700">Edit your bio and skills</div>
              </button>
              <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200">
                <div className="text-sm font-medium text-green-900">Manage Contact Info</div>
                <div className="text-xs text-green-700">Update contact details</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};