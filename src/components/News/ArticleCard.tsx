import React from 'react';
import { Article } from './types';
import { useTheme } from '../../ThemeContext';
import { ThumbsUp, ThumbsDown, Clock, MessageSquare, Heart, Bookmark, BookmarkCheck } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onVote?: (articleId: string, voteType: 'up' | 'down') => void;
  onArticleClick?: (article: Article) => void;
  onSave?: (articleId: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
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
    year: 'numeric',
  });

  return (
    <div
      className={`overflow-hidden rounded-lg transition-all duration-300 group hover:shadow-lg cursor-pointer ${
        isDark ? 'bg-gray-800/90 hover:bg-gray-700/90' : 'bg-white/90 hover:bg-white/95'
      }`}
      onClick={() => onArticleClick?.(article)}
    >
      {/* Article Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Save Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave?.(article.id);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
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
            <BookmarkCheck className="w-5 h-5" />
          ) : (
            <Bookmark className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Author Info */}
        <div className="flex items-center mb-4">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {article.author.name}
            </h4>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {article.author.role}
            </p>
          </div>
        </div>

        {/* Title and Voting */}
        <div className="flex justify-between items-start gap-4">
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {article.title}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onVote?.(article.id, 'up');
              }}
              className={`p-1.5 rounded-full transition-colors ${
                isDark
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-green-400'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-green-600'
              }`}
            >
              <ThumbsUp className="w-5 h-5" />
            </button>
            <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {article.votes.up - article.votes.down}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onVote?.(article.id, 'down');
              }}
              className={`p-1.5 rounded-full transition-colors ${
                isDark
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-red-400'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-red-600'
              }`}
            >
              <ThumbsDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {article.hashtags.map((tag) => (
            <span
              key={tag}
              className={`text-sm px-2 py-1 rounded-full ${
                isDark
                  ? 'bg-gray-700 text-blue-400'
                  : 'bg-blue-50 text-blue-600'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Metadata */}
        <div className="flex items-center mt-4 text-sm space-x-4">
          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            {formattedDate}
          </span>
          <span className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {article.readTime}
          </span>
        </div>

        {/* Top Comment */}
        <div
          className={`mt-4 p-3 rounded-lg ${
            isDark ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}
        >
          <div className="flex items-start">
            <MessageSquare
              className={`w-4 h-4 mt-1 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            />
            <div className="ml-2 flex-1">
              <p
                className={`text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {article.topComment.text}
              </p>
              <div className="flex items-center mt-2">
                <Heart
                  className={`w-4 h-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}
                />
                <span
                  className={`text-xs ml-1 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {article.topComment.likes} likes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};