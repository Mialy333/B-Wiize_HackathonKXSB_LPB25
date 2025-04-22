import React, { useState, useCallback } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Moon, 
  Key, 
  RefreshCcw,
  Camera,
  Eye,
  EyeOff,
  Star,
  Trophy,
  Calendar,
  X
} from 'lucide-react';
import { SettingsProps, SettingsData } from './types';
import { mockSettingsData } from './mockData';
import { useTheme } from '../../ThemeContext';

export const Settings: React.FC<SettingsProps> = ({
  data: propData,
  isLoading: propIsLoading,
  error: propError,
  onRetry,
  onUpdateProfile,
  onUpdatePassword,
  onClose
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(propError);
  const [data, setData] = useState<SettingsData | undefined>(propData || mockSettingsData);
  const [notifications, setNotifications] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [editedProfile, setEditedProfile] = useState(data?.profile);

  const handleRetrieveData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(undefined);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setData(mockSettingsData);
      setEditedProfile(mockSettingsData.profile);
    } catch (err) {
      setError('Failed to retrieve data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSaveProfile = () => {
    if (editedProfile && onUpdateProfile) {
      onUpdateProfile(editedProfile);
    }
    setIsEditingProfile(false);
  };

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    if (onUpdatePassword) {
      onUpdatePassword(passwordForm.oldPassword, passwordForm.newPassword);
    }
    setIsChangingPassword(false);
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const calculateProgress = () => {
    if (!editedProfile) return 0;
    return (editedProfile.xp / editedProfile.nextLevelXp) * 100;
  };

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Header with Close Button (Mobile Only) */}
      <div className="md:hidden flex items-center justify-between mb-4">
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Settings
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${
              isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {/* Profile Header */}
      <div className={`mb-8 p-8 md:p-10 rounded-2xl ${
        isDark ? 'bg-gray-800/90' : 'bg-white/90'
      } backdrop-blur-sm shadow-lg`}>
        <div className="flex flex-col items-center text-center">
          {/* Profile Picture */}
          <div className="relative mb-6">
            <div className={`w-28 h-28 md:w-32 md:h-32 rounded-full ring-4 ${
              isDark ? 'ring-purple-500' : 'ring-purple-400'
            } overflow-hidden`}>
              <img
                src={editedProfile?.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {isEditingProfile && (
              <button className={`absolute bottom-0 right-0 p-2 rounded-full ${
                isDark ? 'bg-gray-700 text-purple-400' : 'bg-white text-purple-600'
              } shadow-lg hover:scale-110 transition-transform`}>
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Profile Info */}
          <div className="w-full">
            <h2 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {editedProfile?.name}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
              <div className={`flex items-center px-4 py-1.5 rounded-full ${
                isDark ? 'bg-purple-500/20' : 'bg-purple-100'
              }`}>
                <Trophy className={`w-4 h-4 mr-2 ${
                  isDark ? 'text-purple-300' : 'text-purple-600'
                }`} />
                <span className={`font-semibold ${
                  isDark ? 'text-purple-300' : 'text-purple-600'
                }`}>
                  Level {editedProfile?.level}
                </span>
              </div>
              <div className={`flex items-center px-4 py-1.5 rounded-full ${
                isDark ? 'bg-gray-600/50' : 'bg-gray-200'
              }`}>
                <Calendar className={`w-4 h-4 mr-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`} />
                <span className={`text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Joined {editedProfile?.joinedDate ? formatJoinDate(editedProfile.joinedDate) : ''}
                </span>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  XP Progress
                </span>
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {editedProfile?.xp}/{editedProfile?.nextLevelXp} XP
                </span>
              </div>
              <div className={`h-2.5 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-2">
              {editedProfile?.badges.map((badge, index) => (
                <span
                  key={index}
                  className={`text-xs px-3 py-1.5 rounded-full ${
                    isDark
                      ? 'bg-gray-600/50 text-gray-300'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-8">
        {/* Profile Information */}
        <div className={`p-6 rounded-2xl ${
          isDark ? 'bg-gray-800/90' : 'bg-white/90'
        } backdrop-blur-sm shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Profile Information
            </h3>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isDark
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              {isEditingProfile ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="grid gap-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Student ID
              </label>
              <input
                type="text"
                value={editedProfile?.id}
                readOnly
                className={`w-full px-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Full Name
              </label>
              <input
                type="text"
                value={editedProfile?.name}
                onChange={(e) => isEditingProfile && setEditedProfile(prev => ({
                  ...prev!,
                  name: e.target.value
                }))}
                readOnly={!isEditingProfile}
                className={`w-full px-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-900'
                } ${isEditingProfile ? 'border border-purple-500' : ''}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email
              </label>
              <input
                type="email"
                value={editedProfile?.email}
                onChange={(e) => isEditingProfile && setEditedProfile(prev => ({
                  ...prev!,
                  email: e.target.value
                }))}
                readOnly={!isEditingProfile}
                className={`w-full px-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-900'
                } ${isEditingProfile ? 'border border-purple-500' : ''}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Birthdate
              </label>
              <input
                type="date"
                value={editedProfile?.birthdate}
                onChange={(e) => isEditingProfile && setEditedProfile(prev => ({
                  ...prev!,
                  birthdate: e.target.value
                }))}
                readOnly={!isEditingProfile}
                className={`w-full px-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-900'
                } ${isEditingProfile ? 'border border-purple-500' : ''}`}
              />
            </div>

            {isEditingProfile && (
              <button
                onClick={handleSaveProfile}
                className={`w-full py-2 px-4 rounded-lg font-medium ${
                  isDark
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                } transition-colors`}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Password Section */}
        <div className={`p-6 rounded-2xl ${
          isDark ? 'bg-gray-800/90' : 'bg-white/90'
        } backdrop-blur-sm shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Password
            </h3>
            <button
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isDark
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              {isChangingPassword ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {isChangingPassword && (
            <div className="space-y-4">
              <div className="relative">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  placeholder="Current Password"
                  value={passwordForm.oldPassword}
                  onChange={(e) => setPasswordForm(prev => ({
                    ...prev,
                    oldPassword: e.target.value
                  }))}
                  className={`w-full px-4 py-2 pr-10 rounded-lg ${
                    isDark
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-100 text-gray-900'
                  } border border-purple-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({
                    ...prev,
                    newPassword: e.target.value
                  }))}
                  className={`w-full px-4 py-2 pr-10 rounded-lg ${
                    isDark
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-100 text-gray-900'
                  } border border-purple-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <input
                type="password"
                placeholder="Confirm New Password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm(prev => ({
                  ...prev,
                  confirmPassword: e.target.value
                }))}
                className={`w-full px-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-900'
                } border border-purple-500`}
              />

              <button
                onClick={handleChangePassword}
                className={`w-full py-2 px-4 rounded-lg font-medium ${
                  isDark
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                } transition-colors`}
              >
                Update Password
              </button>
            </div>
          )}
        </div>

        {/* Preferences Section */}
        <div className={`p-6 rounded-2xl ${
          isDark ? 'bg-gray-800/90' : 'bg-white/90'
        } backdrop-blur-sm shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                <span className={isDark ? 'text-white' : 'text-gray-900'}>Notifications</span>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications
                    ? isDark ? 'bg-teal-600' : 'bg-teal-500'
                    : isDark ? 'bg-gray-700' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Moon className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                <span className={isDark ? 'text-white' : 'text-gray-900'}>Dark Mode</span>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isDark
                    ? 'bg-teal-600'
                    : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDark ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
          <div className="flex items-center justify-center space-x-2">
            <span>{error}</span>
            <button
              onClick={onRetry || handleRetrieveData}
              className="flex items-center text-red-500 hover:text-red-600"
            >
              <RefreshCcw className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};