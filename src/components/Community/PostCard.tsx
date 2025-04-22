import React, { useState } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  ChevronDown, 
  ChevronUp, 
  Send,
  Clock,
  Hash
} from 'lucide-react';
import { Post } from './types';
import { useTheme } from '../../ThemeContext';
import { CommentCard } from './CommentCard';

interface PostCardProps {
  post: Post;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onVote: (voteType: 'up' | 'down') => void;
  onCommentVote: (commentId: string, voteType: 'up' | 'down') => void;
  onReplyVote: (commentId: string, replyId: string, voteType: 'up' | 'down') => void;
  onAddComment: () => void;
  onStartReply: (commentId: string) => void;
  commentText: string;
  onCommentTextChange: (text: string) => void;
  replyData: { commentId: string; text: string } | null;
  onReplyTextChange: (text: string) => void;
  onAddReply: () => void;
  onCancelReply: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  isExpanded,
  onToggleExpand,
  onVote,
  onCommentVote,
  onReplyVote,
  onAddComment,
  onStartReply,
  commentText,
  onCommentTextChange,
  replyData,
  onReplyTextChange,
  onAddReply,
  onCancelReply,
}) => {
  const { isDark } = useTheme();
  const netVotes = post.votes.up - post.votes.down;

  return (
    <div className={`overflow-hidden rounded-xl transition-all duration-300 ${
      isDark ? 'bg-gray-800/90 hover:bg-gray-800' : 'bg-white/90 hover:bg-white'
    } backdrop-blur-sm shadow-lg`}>
      <div className="p-4 sm:p-6">
        {/* Author Info */}
        <div className="flex items-center mb-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {post.author.name}
            </h4>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {post.timestamp}
            </p>
          </div>
        </div>

        {/* Post Content */}
        <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
          {post.title}
        </h3>
        <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {post.body}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <div
                key={tag}
                className={`flex items-center px-2 py-1 rounded-full text-xs ${
                  isDark
                    ? 'bg-gray-700 text-blue-400'
                    : 'bg-blue-50 text-blue-600'
                }`}
              >
                <Hash className="w-3 h-3 mr-1" />
                {tag}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4">
            {/* Voting */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => onVote('up')}
                className={`p-1.5 rounded-full transition-colors ${
                  isDark
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-teal-400'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-teal-600'
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
              </button>
              <span className={`font-medium ${
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
                className={`p-1.5 rounded-full transition-colors ${
                  isDark
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-red-400'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-red-600'
                }`}
              >
                <ThumbsDown className="w-5 h-5" />
              </button>
            </div>

            {/* Comments */}
            <button
              onClick={onToggleExpand}
              className={`flex items-center space-x-1.5 ${
                isDark
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>{post.comments.length} comments</span>
            </button>
          </div>

          {/* Expand/Collapse */}
          <button
            onClick={onToggleExpand}
            className={`p-1.5 rounded-full transition-colors ${
              isDark
                ? 'hover:bg-gray-700 text-gray-400'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {/* Comments Section */}
        {isExpanded && (
          <div className="mt-6 space-y-4">
            {/* Comment Form */}
            <div className={`flex items-center space-x-3 p-3 rounded-lg ${
              isDark ? 'bg-gray-700/50' : 'bg-gray-100'
            }`}>
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100"
                alt="Your Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <input
                type="text"
                value={commentText}
                onChange={(e) => onCommentTextChange(e.target.value)}
                placeholder="Add a comment..."
                className={`flex-1 bg-transparent border-0 focus:ring-0 ${
                  isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-500'
                }`}
              />
              <button
                onClick={onAddComment}
                disabled={!commentText.trim()}
                className={`p-2 rounded-full transition-colors ${
                  commentText.trim()
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

            {/* Comments List */}
            <div className="space-y-4">
              {post.comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  onVote={(voteType) => onCommentVote(comment.id, voteType)}
                  onReplyVote={(replyId, voteType) => onReplyVote(comment.id, replyId, voteType)}
                  onStartReply={() => onStartReply(comment.id)}
                  isReplying={replyData?.commentId === comment.id}
                  replyText={replyData?.commentId === comment.id ? replyData.text : ''}
                  onReplyTextChange={onReplyTextChange}
                  onAddReply={onAddReply}
                  onCancelReply={onCancelReply}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};