import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, RefreshCcw, TrendingUp, Clock, ThumbsUp, ThumbsDown, Send, Plus, X, Info, Users, Calendar, Pin, Siren as Fire, Hash } from 'lucide-react';
import { CommunityProps, CommunityData, Post, Comment } from './types';
import { mockCommunityData } from './mockData';
import { useTheme } from '../../ThemeContext';
import { PostCard } from './PostCard';
import { CommentCard } from './CommentCard';
import { NewPostForm } from './NewPostForm';

const SkeletonLoader: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`rounded-lg overflow-hidden ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } animate-pulse p-4`}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-700" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded w-32" />
              <div className="h-3 bg-gray-700 rounded w-24" />
            </div>
          </div>
          <div className="h-6 bg-gray-700 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-700 rounded w-full mb-2" />
          <div className="h-4 bg-gray-700 rounded w-full mb-2" />
          <div className="h-4 bg-gray-700 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
};

const ErrorState: React.FC<{ message: string; onRetry?: () => void }> = ({
  message,
  onRetry,
}) => (
  <div className="text-center py-8">
    <p className="text-red-500 mb-2">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="flex items-center justify-center mx-auto text-purple-600 hover:text-purple-800 transition-colors"
      >
        <RefreshCcw className="w-4 h-4 mr-1" />
        Retry
      </button>
    )}
  </div>
);

export const Community: React.FC<CommunityProps> = ({
  data: propData,
  isLoading: propIsLoading,
  error: propError,
  onRetry,
  onVote,
  onCommentVote,
  onReplyVote,
  onAddPost,
  onAddComment,
  onAddReply,
}) => {
  const [activeSort, setActiveSort] = useState<'hot' | 'new' | 'top'>('hot');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<CommunityData | undefined>();
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [replyData, setReplyData] = useState<{ postId: string; commentId: string; text: string } | null>(null);
  const { isDark } = useTheme();

  const fetchData = useCallback(async () => {
    if (propData) {
      setData(propData);
      return;
    }

    setIsLoading(true);
    setError(undefined);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(mockCommunityData);
    } catch (err) {
      setError('Failed to load community data');
    } finally {
      setIsLoading(false);
    }
  }, [propData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    if (!data) return;

    const updatedPosts = data.posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            votes: {
              ...post.votes,
              [voteType]: post.votes[voteType] + 1,
            },
          }
        : post
    );

    setData({
      ...data,
      posts: updatedPosts,
    });

    if (onVote) {
      onVote(postId, voteType);
    }
  };

  const handleCommentVote = (postId: string, commentId: string, voteType: 'up' | 'down') => {
    if (!data) return;

    const updatedPosts = data.posts.map((post) => {
      if (post.id !== postId) return post;

      const updatedComments = post.comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              votes: {
                ...comment.votes,
                [voteType]: comment.votes[voteType] + 1,
              },
            }
          : comment
      );

      return {
        ...post,
        comments: updatedComments,
      };
    });

    setData({
      ...data,
      posts: updatedPosts,
    });

    if (onCommentVote) {
      onCommentVote(postId, commentId, voteType);
    }
  };

  const handleReplyVote = (postId: string, commentId: string, replyId: string, voteType: 'up' | 'down') => {
    if (!data) return;

    const updatedPosts = data.posts.map((post) => {
      if (post.id !== postId) return post;

      const updatedComments = post.comments.map((comment) => {
        if (comment.id !== commentId) return comment;

        const updatedReplies = comment.replies.map((reply) =>
          reply.id === replyId
            ? {
                ...reply,
                votes: {
                  ...reply.votes,
                  [voteType]: reply.votes[voteType] + 1,
                },
              }
            : reply
        );

        return {
          ...comment,
          replies: updatedReplies,
        };
      });

      return {
        ...post,
        comments: updatedComments,
      };
    });

    setData({
      ...data,
      posts: updatedPosts,
    });

    if (onReplyVote) {
      onReplyVote(postId, commentId, replyId, voteType);
    }
  };

  const handleAddPost = (title: string, body: string) => {
    if (!data) return;

    const newPost: Post = {
      id: `new-${Date.now()}`,
      title,
      body,
      author: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100',
      },
      votes: {
        up: 1,
        down: 0,
      },
      comments: [],
      timestamp: 'Just now',
      tags: [],
    };

    setData({
      ...data,
      posts: [newPost, ...data.posts],
    });

    setShowNewPostForm(false);

    if (onAddPost) {
      onAddPost(title, body);
    }
  };

  const handleAddComment = (postId: string) => {
    if (!data || !commentText.trim()) return;

    const updatedPosts = data.posts.map((post) => {
      if (post.id !== postId) return post;

      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        author: {
          name: 'You',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100',
        },
        text: commentText,
        votes: {
          up: 1,
          down: 0,
        },
        replies: [],
        timestamp: 'Just now',
      };

      return {
        ...post,
        comments: [newComment, ...post.comments],
      };
    });

    setData({
      ...data,
      posts: updatedPosts,
    });

    setCommentText('');

    if (onAddComment) {
      onAddComment(postId, commentText);
    }
  };

  const handleAddReply = () => {
    if (!data || !replyData || !replyData.text.trim()) return;

    const { postId, commentId, text } = replyData;

    const updatedPosts = data.posts.map((post) => {
      if (post.id !== postId) return post;

      const updatedComments = post.comments.map((comment) => {
        if (comment.id !== commentId) return comment;

        const newReply = {
          id: `reply-${Date.now()}`,
          author: {
            name: 'You',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100',
          },
          text,
          votes: {
            up: 1,
            down: 0,
          },
          timestamp: 'Just now',
        };

        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      });

      return {
        ...post,
        comments: updatedComments,
      };
    });

    setData({
      ...data,
      posts: updatedPosts,
    });

    setReplyData(null);

    if (onAddReply) {
      onAddReply(postId, commentId, text);
    }
  };

  const toggleExpandPost = (postId: string) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  const startReply = (postId: string, commentId: string) => {
    setReplyData({ postId, commentId, text: '' });
  };

  const cancelReply = () => {
    setReplyData(null);
  };

  const sortPosts = (posts: Post[]) => {
    if (activeSort === 'hot') {
      return [...posts].sort((a, b) => {
        // Sort by a combination of votes and recency
        const aScore = a.votes.up - a.votes.down + (a.comments.length * 2);
        const bScore = b.votes.up - b.votes.down + (b.comments.length * 2);
        return bScore - aScore;
      });
    } else if (activeSort === 'new') {
      return [...posts].sort((a, b) => {
        // Simple sort by timestamp (assuming newer posts have more recent timestamps)
        return a.timestamp > b.timestamp ? -1 : 1;
      });
    } else if (activeSort === 'top') {
      return [...posts].sort((a, b) => {
        // Sort by net votes
        const aVotes = a.votes.up - a.votes.down;
        const bVotes = b.votes.up - b.votes.down;
        return bVotes - aVotes;
      });
    }
    return posts;
  };

  const currentIsLoading = propIsLoading ?? isLoading;
  const currentError = propError ?? error;
  const sortedPosts = data ? sortPosts(data.posts) : [];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4">
        {/* Left Sidebar - Community Info (Desktop Only) */}
        <div className="hidden lg:block space-y-6">
          {/* Community Stats */}
          <div className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800/90' : 'bg-white/90'
          } backdrop-blur-sm shadow-lg`}>
            <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              B-Wiize Community
            </h2>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Talk Finance & Well-Being with fellow B-Wiizers
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Users className={`w-5 h-5 mr-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {data?.stats.members.toLocaleString()} members
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {data?.stats.online} online now
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className={`w-5 h-5 mr-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Created {data?.stats.founded ? new Date(data.stats.founded).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric'
                    }) : ''}
                  </p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowNewPostForm(true)}
              className={`w-full mt-6 py-2.5 px-4 rounded-lg font-medium transition-colors ${
                isDark
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              Create Post
            </button>
          </div>
          
          {/* Pinned Posts */}
          <div className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800/90' : 'bg-white/90'
          } backdrop-blur-sm shadow-lg`}>
            <h3 className={`font-semibold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Pin className="w-4 h-4 mr-2" />
              Pinned Posts
            </h3>
            
            <div className="space-y-3">
              {data?.pinnedPosts.map((post) => (
                <div 
                  key={post.id}
                  className={`p-3 rounded-lg ${
                    isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                  } cursor-pointer transition-colors`}
                >
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {post.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Community Rules */}
          <div className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800/90' : 'bg-white/90'
          } backdrop-blur-sm shadow-lg`}>
            <h3 className={`font-semibold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Info className="w-4 h-4 mr-2" />
              Community Rules
            </h3>
            
            <div className="space-y-3">
              {data?.rules.map((rule, index) => (
                <div key={index} className="flex">
                  <span className={`font-medium mr-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                    {index + 1}.
                  </span>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {/* Mobile Header */}
          <div className="lg:hidden mb-4">
            <div className={`p-4 rounded-xl ${
              isDark ? 'bg-gray-800/90' : 'bg-white/90'
            } backdrop-blur-sm shadow-lg`}>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                B-Wiize Community
              </h2>
              <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Talk Finance & Well-Being with fellow B-Wiizers
              </p>
              
              <button
                onClick={() => setShowNewPostForm(true)}
                className={`w-full mt-4 py-2.5 px-4 rounded-lg font-medium transition-colors ${
                  isDark
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-purple-500 hover:bg-purple-600 text-white'
                }`}
              >
                Create Post
              </button>
            </div>
          </div>
          
          {/* Sort Tabs */}
          <div className={`mb-4 p-3 rounded-xl ${
            isDark ? 'bg-gray-800/90' : 'bg-white/90'
          } backdrop-blur-sm shadow-lg`}>
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveSort('hot')}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  activeSort === 'hot'
                    ? isDark
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100 text-purple-900'
                    : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Fire className="w-4 h-4" />
                <span>Hot</span>
              </button>
              <button
                onClick={() => setActiveSort('new')}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  activeSort === 'new'
                    ? isDark
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100 text-purple-900'
                    : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>New</span>
              </button>
              <button
                onClick={() => setActiveSort('top')}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  activeSort === 'top'
                    ? isDark
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100 text-purple-900'
                    : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Top</span>
              </button>
            </div>
          </div>
          
          {/* Posts */}
          {currentIsLoading ? (
            <SkeletonLoader />
          ) : currentError ? (
            <ErrorState message={currentError} onRetry={onRetry} />
          ) : (
            <div className="space-y-6">
              {sortedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  isExpanded={expandedPostId === post.id}
                  onToggleExpand={() => toggleExpandPost(post.id)}
                  onVote={(voteType) => handleVote(post.id, voteType)}
                  onCommentVote={(commentId, voteType) => handleCommentVote(post.id, commentId, voteType)}
                  onReplyVote={(commentId, replyId, voteType) => handleReplyVote(post.id, commentId, replyId, voteType)}
                  onAddComment={() => handleAddComment(post.id)}
                  onStartReply={(commentId) => startReply(post.id, commentId)}
                  commentText={commentText}
                  onCommentTextChange={setCommentText}
                  replyData={replyData && replyData.postId === post.id ? replyData : null}
                  onReplyTextChange={(text) => setReplyData({ ...replyData!, text })}
                  onAddReply={handleAddReply}
                  onCancelReply={cancelReply}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Right Sidebar - Trending Topics (Desktop Only) */}
        <div className="hidden lg:block space-y-6">
          <div className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800/90' : 'bg-white/90'
          } backdrop-blur-sm shadow-lg`}>
            <h3 className={`font-semibold mb-4 flex items-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending Topics
            </h3>
            
            <div className="space-y-3">
              {['FIRE', 'SideHustles', 'Investing', 'StudentDiscounts', 'MealPrep', 'Budgeting', 'Wellness'].map((topic) => (
                <div 
                  key={topic}
                  className={`p-3 rounded-lg ${
                    isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                  } cursor-pointer transition-colors flex items-center`}
                >
                  <Hash className={`w-4 h-4 mr-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {topic}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Financial Tips */}
          <div className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800/90' : 'bg-white/90'
          } backdrop-blur-sm shadow-lg`}>
            <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Quick Financial Tips
            </h3>
            
            <div className="space-y-4">
              <div className={`p-3 rounded-lg ${
                isDark ? 'bg-gray-700/50' : 'bg-gray-100'
              }`}>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Set up automatic transfers to your savings account on payday
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                isDark ? 'bg-gray-700/50' : 'bg-gray-100'
              }`}>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Use student discounts for everything - always ask if they're available
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                isDark ? 'bg-gray-700/50' : 'bg-gray-100'
              }`}>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Track your spending for a month to identify areas to cut back
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* New Post Modal */}
      {showNewPostForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className={`max-w-2xl w-full rounded-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-xl overflow-hidden`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Create a Post
              </h3>
              <button
                onClick={() => setShowNewPostForm(false)}
                className={`p-1 rounded-full ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <NewPostForm onSubmit={handleAddPost} onCancel={() => setShowNewPostForm(false)} />
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile New Post Button */}
      <div className="lg:hidden fixed bottom-20 right-4 z-40">
        <button
          onClick={() => setShowNewPostForm(true)}
          className={`p-4 rounded-full shadow-lg transition-colors ${
            isDark
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          }`}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};