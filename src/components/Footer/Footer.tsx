import React from 'react';
import { TikTokIcon, XIcon, InstagramIcon, DiscordIcon } from './SocialIcons';
import { useTheme } from '../../ThemeContext';

export const Footer: React.FC = () => {
  const { isDark } = useTheme();
  
  const socialLinks = [
    { 
      name: 'TikTok', 
      icon: <TikTokIcon className="w-6 h-6" />, 
      url: 'https://tiktok.com/@bwiize',
      ariaLabel: 'Follow B-Wiize on TikTok'
    },
    { 
      name: 'X', 
      icon: <XIcon className="w-6 h-6" />, 
      url: 'https://x.com/bwiize',
      ariaLabel: 'Follow B-Wiize on X'
    },
    { 
      name: 'Instagram', 
      icon: <InstagramIcon className="w-6 h-6" />, 
      url: 'https://instagram.com/bwiize',
      ariaLabel: 'Follow B-Wiize on Instagram'
    },
    { 
      name: 'Discord', 
      icon: <DiscordIcon className="w-6 h-6" />, 
      url: 'https://discord.gg/bwiize',
      ariaLabel: 'Join B-Wiize Discord community'
    },
  ];

  return (
    <footer className={`w-full py-8 px-4 mt-12 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-r from-purple-900/90 to-gray-900/90' 
        : 'bg-gradient-to-r from-purple-100/90 to-white/90'
    } backdrop-blur-sm shadow-lg`}>
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Resources */}
          <div>
            <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Financial Education
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Budgeting Tips
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  XRPL Tutorials
                </a>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Press
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm ${isDark ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Social Links & Copyright */}
        <div className={`pt-6 border-t ${
          isDark ? 'border-gray-700/50' : 'border-purple-100'
        } flex flex-col md:flex-row items-center justify-between text-sm`}>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            © 2025 B-Wiize. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className={`${isDark ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} transition-colors`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};