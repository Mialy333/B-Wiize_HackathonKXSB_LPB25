import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, Ban as Bank, Shield, BarChart as ChartBar } from 'lucide-react';
import { useTheme } from '../../ThemeContext';

export const WelcomeSetup: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const features = [
    {
      icon: <Bank className="w-6 h-6" />,
      title: "Easy Import",
      description: "Simply upload your bank statement CSV file to get started"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your data stays on your device and is never stored or shared"
    },
    {
      icon: <ChartBar className="w-6 h-6" />,
      title: "Smart Analysis",
      description: "We'll automatically categorize your income and expenses"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className={`max-w-4xl w-full rounded-2xl ${
        isDark ? 'bg-gray-800/90' : 'bg-white/90'
      } backdrop-blur-sm shadow-lg p-8 md:p-12`}>
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome to B-Wiize! 🎉
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Let's set up your financial flow in just a few minutes
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl ${
                isDark 
                  ? 'bg-gray-700/50 hover:bg-gray-700/70' 
                  : 'bg-gray-50 hover:bg-gray-100'
              } transition-colors duration-300`}
            >
              <div className={`mb-4 ${
                isDark ? 'text-purple-400' : 'text-purple-600'
              }`}>
                {feature.icon}
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bank Statement Section */}
        <div className={`p-6 rounded-xl mb-8 ${
          isDark ? 'bg-purple-900/20' : 'bg-purple-50'
        }`}>
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-full ${
              isDark ? 'bg-purple-900/30' : 'bg-purple-100'
            }`}>
              <FileText className={`w-6 h-6 ${
                isDark ? 'text-purple-400' : 'text-purple-600'
              }`} />
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-semibold mb-2 ${
                isDark ? 'text-purple-300' : 'text-purple-900'
              }`}>
                What You'll Need
              </h3>
              <p className={`mb-4 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Download your bank statement as a CSV file from your online banking portal. 
                Most banks offer this option in their transaction history or account statement section.
              </p>
              <ul className={`space-y-2 text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Export your transactions for the last month
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Make sure it's in CSV format
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Include both income and expenses
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/setup')}
            className={`inline-flex items-center px-6 py-3 rounded-xl text-white font-semibold transition-all transform hover:scale-105 ${
              isDark
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-purple-500 hover:bg-purple-600'
            } shadow-lg hover:shadow-xl`}
          >
            <span>Let's Get Started</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};