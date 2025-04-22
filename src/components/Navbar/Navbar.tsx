import React from 'react';
import { Trophy, GraduationCap, LogOut, Award, DollarSign, MessageSquare, Newspaper } from 'lucide-react';
import { useTheme } from '../../ThemeContext';
import { ThemeToggle } from '../ThemeToggle';
import { Logo } from '../Logo/Logo';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  activeSection: string;
  onNavigation: (section: string) => void;
}

interface NavLink {
  name: string;
  icon: React.ReactNode;
  id: string;
}

const links: NavLink[] = [
  { name: 'Balance', icon: <DollarSign className="w-5 h-5" />, id: 'home' },
  { name: 'Education', icon: <GraduationCap className="w-5 h-5" />, id: 'education' },
  { name: 'Challenges', icon: <Trophy className="w-5 h-5" />, id: 'challenges' },
  { name: 'Rewards', icon: <Award className="w-5 h-5" />, id: 'rewards' },
  { name: 'Community', icon: <MessageSquare className="w-5 h-5" />, id: 'community' },
  { name: 'News', icon: <Newspaper className="w-5 h-5" />, id: 'news' }
];

export const Navbar: React.FC<NavbarProps> = ({ 
  isLoggedIn, 
  onLogout, 
  activeSection,
  onNavigation 
}) => {
  const { isDark } = useTheme();

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`hidden md:block fixed top-0 left-0 right-0 ${
        isDark ? 'bg-[#1a1c2a]/80' : 'bg-white/90'
      } backdrop-blur-sm shadow-lg z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => onNavigation('home')}
            >
              <Logo size="small" />
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigation(link.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? isDark
                        ? 'text-brand-purple'
                        : 'text-brand-purple'
                      : isDark
                      ? 'text-gray-200 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => onNavigation('settings')}
                className={`text-sm font-medium transition-colors ${
                  activeSection === 'settings'
                    ? isDark
                      ? 'text-brand-purple'
                      : 'text-brand-purple'
                    : isDark
                    ? 'text-gray-200 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Settings
              </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {isLoggedIn && (
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-white bg-brand-purple hover:bg-brand-purple/90 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden lg:inline">Log out</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 ${
        isDark ? 'bg-[#1a1c2a]/80' : 'bg-white/90'
      } backdrop-blur-sm shadow-lg z-50`}>
        <div className="grid grid-cols-7 h-16">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigation(link.id)}
              className={`flex flex-col items-center justify-center transition-colors ${
                activeSection === link.id
                  ? isDark
                    ? 'text-brand-purple'
                    : 'text-brand-purple'
                  : isDark
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {link.icon}
            </button>
          ))}
          <button
            onClick={onLogout}
            className={`flex flex-col items-center justify-center transition-colors ${
              isDark
                ? 'text-red-400 hover:text-red-300'
                : 'text-red-600 hover:text-red-800'
            }`}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </>
  );
};