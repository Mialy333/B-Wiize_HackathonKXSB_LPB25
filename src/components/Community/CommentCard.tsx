import React from 'react';
import { ThumbsUp, ThumbsDown, Reply, Send, X } from 'lucide-react';
import { Comment } from './types';
import { useTheme } from '../../ThemeContext';

interface CommentCardProps {
  comment: Comment;
  onVote: (voteType: 'up' | 'down') => void;
  onReplyVote: (replyId: string, voteType: 'up' | 'down') => void;
  onStartReply: () => void;
  isReplying: boolean;
  replyText: string;
  onReplyTextChange: (text: string) => void;
  onAddReply: () => void;
  onCancelReply: () => void;
}

export const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  onVote,
  onReplyVote,
  onStartReply,
  isReplying,
  replyText,
  onReplyTextChange,
  onAddReply,
  onCancelReply,
}) => {
  const { isDark } = useTheme();
  const netVotes = comment.votes.up - comment.votes.down;

  return (
    <div className={`p-4 rounded-lg ${
      isDark ? 'bg-gray-700/50' : 'bg-gray-100'
    }`}>
      {/* Comment Header */}
      <div className="flex items-center mb-2">
        <img
          src={comment.author.avatar}
          alt={comment.author.name}
          className="w-6 h-6 rounded-full object-cover"
        />
        <span className={`ml-2 font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {comment.author.name}
        </span>
        <span className={`ml-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {comment.timestamp}
        </span>
      </div>

      {/* Comment Text */}
      <p className={`mb-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {comment.text}
      </p>

      {/* Comment Actions */}
      <div className="flex items-center space-x-4">
        {/* Voting */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onVote('up')}
            className={`p-1 rounded transition-colors ${
              isDark
                ? 'hover:bg-gray-600 text-gray-400 hover:text-teal-400'
                : 'hover:bg-gray-200 text-gray-600 hover:text-teal-600'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
          </button>
          <span className={`text-xs font-medium ${
            netVotes > 0
              ? isDark ? 'text-teal-400' : 'text-teal-600'
              : netVotes < 0
              ? isDark ? 'text-red-400' : 'text-red-600'
              : isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {netVotes}
          </span>
          <button
            onClick={() => onVote('down')}
            className={`p-1 rounded transition-colors ${
              isDark
                ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400'
                : 'hover:bg-gray-200 text-gray-600 hover:text-red-600'
            }`}
          >
            <ThumbsDown className="w-4 h-4" />
          </button>
        </div>

        {/* Reply Button */}
        <button
          onClick={onStartReply}
          className={`flex items-center space-x-1 text-xs ${
            isDark
              ? 'text-gray-400 hover:text-gray-300'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Reply className="w-4 h-4" />
          <span>Reply</span>
        </button>
      </div>

      {/* Reply Form */}
      {isReplying && (
        <div className={`mt-3 p-3 rounded-lg ${
          isDark ? 'bg-gray-600/50' : 'bg-gray-200'
        }`}>
          <div className="flex items-center space-x-2">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100"
              alt="Your Avatar"
              className="w-6 h-6 rounded-full object-cover"
            />
            <input
              type="text"
              value={replyText}
              onChange={(e) => onReplyTextChange(e.target.value)}
              placeholder="Write a reply..."
              className={`flex-1 text-sm bg-transparent border-0 focus:ring-0 ${
                isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
              }`}
            />
            <button
              onClick={onCancelReply}
              className={`p-1.5 rounded-full ${
                isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={onAddReply}
              disabled={!replyText.trim()}
              className={`p-1.5 rounded-full ${
                replyText.trim()
                  ? isDark
                    ? 'bg-teal-600 text-white hover:bg-teal-700'
                    : 'bg-teal-500 text-white hover:bg-teal-600'
                  : isDark
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Replies */}
      {comment.replies.length > 0 && (
        <div className="mt-3 space-y-3 pl-4 border-l-2 border-gray-600">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="pt-2">
              {/* Reply Header */}
              <div className="flex items-center mb-1">
                <img
                  src={reply.author.avatar}
                  alt={reply.author.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className={`ml-2 font-medium text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {reply.author.name}
                </span>
                <span className={`ml-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {reply.timestamp}
                </span>
              </div>

              {/* Reply Text */}
              <p className={`mb-2 text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {reply.text}
              </p>

              {/* Reply Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onReplyVote(reply.id, 'up')}
                  className={`p-1 rounded transition-colors ${
                    isDark
                      ? 'hover:bg-gray-600 text-gray-400 hover:text-teal-400'
                      : 'hover:bg-gray-200 text-gray-600 hover:text-teal-600'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                </button>
                <span className={`text-xs font-medium ${
                  reply.votes.up - reply.votes.down > 0
                    ? isDark ? 'text-teal-400' : 'text-teal-600'
                    : reply.votes.up - reply.votes.down < 0
                    ? isDark ? 'text-red-400' : 'text-red-600'
                    : isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {reply.votes.up - reply.votes.down}
                </span>
                <button
                  onClick={() => onReplyVote(reply.id, 'down')}
                  className={`p-1 rounded transition-colors ${
                    isDark
                      ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400'
                      : 'hover:bg-gray-200 text-gray-600 hover:text-red-600'
                  }`}
                >
                  <ThumbsDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};