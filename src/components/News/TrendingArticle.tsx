import React from 'react';
import { TrendingArticleProps } from './types';
import { useTheme } from '../../ThemeContext';
import { ThumbsUp, ThumbsDown, Clock, Bookmark, BookmarkCheck, Flame } from 'lucide-react';

export const TrendingArticle: React.FC<TrendingArticleProps> = ({
  article,
  onVote,
  onArticleClick,
  onSave,
}) => {
  const { isDark } = useTheme();
  const date = new Date(article.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className={`relative overflow-hidden rounded-lg transition-all duration-300 group hover:shadow-lg cursor-pointer ${
        isDark ? 'bg-gray-800/90 hover:bg-gray-700/90' : 'bg-white/90 hover:bg-white/95'
      }`}
      onClick={() => onArticleClick?.(article)}
    >
      {/* Trending Badge */}
      <div className="absolute top-3 left-3 z-10 flex items-center px-2 py-1 rounded-full bg-orange-500/90 backdrop-blur-sm">
        <Flame className="w-3 h-3 text-white" />
        <span className="text-xs font-medium text-white ml-1">Trending</span>
      </div>

      {/* Save Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSave?.(article.id);
        }}
        className={`absolute top-3 right-3 z-10 p-1.5 rounded-full backdrop-blur-sm transition-all duration-300 ${
          article.isSaved
            ? isDark
              ? 'bg-purple-500/90 text-white hover:bg-purple-600/90'
              : 'bg-purple-500/90 text-white hover:bg-purple-600/90'
            : isDark
            ? 'bg-gray-800/90 text-gray-300 hover:bg-gray-700/90'
            : 'bg-white/90 text-gray-600 hover:bg-gray-100/90'
        }`}
      >
        {article.isSaved ? (
          <BookmarkCheck className="w-4 h-4" />
        ) : (
          <Bookmark className="w-4 h-4" />
        )}
      </button>

      {/* Image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className={`text-sm font-medium line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {article.title}
        </h3>

        {/* Metadata and Voting */}
        <div className="flex items-center justify-between mt-2 text-xs">
          <div className="flex items-center space-x-2">
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              {formattedDate}
            </span>
            <span className="flex items-center text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              {article.readTime}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onVote?.(article.id, 'up');
              }}
              className={`p-1 rounded transition-colors ${
                isDark
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-green-400'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-green-600'
              }`}
            >
              <ThumbsUp className="w-3 h-3" />
            </button>
            <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {article.votes.up - article.votes.down}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onVote?.(article.id, 'down');
              }}
              className={`p-1 rounded transition-colors ${
                isDark
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-red-400'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-red-600'
              }`}
            >
              <ThumbsDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};