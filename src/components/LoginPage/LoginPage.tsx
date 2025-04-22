import React, { useState } from 'react';
import { UserSquare2, Eye, EyeOff, Sun, Moon, Lock, CreditCard } from 'lucide-react';
import { useTheme } from '../../ThemeContext';
import { Logo } from '../Logo/Logo';

interface LoginPageProps {
  onLogin: (studentId: string, password: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(studentId, password);
  };

  return (
    <div>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 p-2 rounded-full transition-colors ${
          isDark
            ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
            : 'bg-white/80 text-gray-800 hover:bg-gray-100'
        } backdrop-blur-sm z-50`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="w-full max-w-[420px] mx-auto">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="inline-block p-4">
            <Logo size="large" />
          </div>
          <p className={`mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Empowering students to grow financially
          </p>
        </div>

        {/* Login Form */}
        <div className={`backdrop-blur-xl rounded-2xl p-6 ${
          isDark 
            ? 'bg-gray-900/40 border border-gray-700/50'
            : 'bg-white/40 border border-brand-purple/10'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Student ID
              </label>
              <div className="relative">
                <CreditCard className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} size={18} />
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter your student ID"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-brand-purple transition-colors duration-300`}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={`block text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Password
                </label>
                <button
                  type="button"
                  className={`text-xs ${
                    isDark
                      ? 'text-brand-purple hover:text-brand-purple/80'
                      : 'text-brand-purple hover:text-brand-purple/80'
                  } transition-colors`}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-brand-purple transition-colors duration-300`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  } hover:text-brand-purple transition-colors`}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg font-medium ${
                isDark
                  ? 'bg-brand-purple hover:bg-brand-purple/90 text-white'
                  : 'bg-brand-purple hover:bg-brand-purple/90 text-white'
              } transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(115,89,252,0.5)] focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 ${
                isDark ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'
              }`}
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Don't have an account? <a href="#" className={`font-medium ${
                isDark ? 'text-brand-purple hover:text-brand-purple/80' : 'text-brand-purple hover:text-brand-purple/80'
              }`}>Contact your university</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};