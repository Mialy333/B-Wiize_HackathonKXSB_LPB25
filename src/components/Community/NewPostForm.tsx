import React, { useState } from 'react';
import { useTheme } from '../../ThemeContext';

interface NewPostFormProps {
  onSubmit: (title: string, body: string) => void;
  onCancel: () => void;
}

export const NewPostForm: React.FC<NewPostFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { isDark } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      onSubmit(title, body);
      setTitle('');
      setBody('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={`block text-sm font-medium mb-1 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your post a title"
          className={`w-full px-4 py-2 rounded-lg ${
            isDark
              ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600'
              : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
          } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
          required
        />
      </div>
      
      <div>
        <label className={`block text-sm font-medium mb-1 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Body
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share your thoughts, tips, or questions..."
          rows={6}
          className={`w-full px-4 py-2 rounded-lg ${
            isDark
              ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600'
              : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
          } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
          required
        />
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className={`px-4 py-2 rounded-lg ${
            isDark
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!title.trim() || !body.trim()}
          className={`px-4 py-2 rounded-lg font-medium ${
            title.trim() && body.trim()
              ? isDark
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
              : isDark
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Post
        </button>
      </div>
    </form>
  );
};