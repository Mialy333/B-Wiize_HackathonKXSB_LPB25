import React, { useState, useEffect, useCallback } from 'react';
import { Newspaper, Bookmark, RefreshCcw, Flame } from 'lucide-react';
import { NewsProps, NewsData, Article } from './types';
import { ArticleCard } from './ArticleCard';
import { TrendingArticle } from './TrendingArticle';
import { mockNewsData } from './mockData';
import { useTheme } from '../../ThemeContext';

const SkeletonLoader: React.FC<{ isTrending?: boolean }> = ({ isTrending }) => {
  const { isDark } = useTheme();
  
  if (isTrending) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`rounded-lg overflow-hidden ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } animate-pulse`}
          >
            <div className="h-32 bg-gray-700" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-700 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {[1, 2].map((i) => (
        <div
          key={i}
          className={`rounded-lg overflow-hidden ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } animate-pulse`}
        >
          <div className="h-48 bg-gray-700" />
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-700" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-32" />
                <div className="h-3 bg-gray-700 rounded w-24" />
              </div>
            </div>
            <div className="h-6 bg-gray-700 rounded w-3/4" />
            <div className="space-x-2">
              <div className="h-6 bg-gray-700 rounded w-20 inline-block" />
              <div className="h-6 bg-gray-700 rounded w-20 inline-block" />
            </div>
          </div>
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

export const News: React.FC<NewsProps> = ({
  data: propData,
  isLoading: propIsLoading,
  error: propError,
  onRetry,
  onVote,
}) => {
  const [activeTab, setActiveTab] = useState<'discover' | 'following'>('discover');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<NewsData | undefined>();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { isDark } = useTheme();

  const fetchData = useCallback(async () => {
    if (propData) {
      setData(propData);
      return;
    }

    setIsLoading(true);
    setError(undefined);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData(mockNewsData);
    } catch (err) {
      setError('Failed to load news');
    } finally {
      setIsLoading(false);
    }
  }, [propData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleVote = (articleId: string, voteType: 'up' | 'down') => {
    if (!data) return;

    const updateArticles = (articles: Article[]) =>
      articles.map((article) =>
        article.id === articleId
          ? {
              ...article,
              votes: {
                ...article.votes,
                [voteType]: article.votes[voteType] + 1,
              },
            }
          : article
      );

    setData({
      ...data,
      discover: updateArticles(data.discover),
      following: updateArticles(data.following),
    });

    onVote?.(articleId, voteType);
  };

  const handleSave = (articleId: string) => {
    if (!data) return;

    const updateArticles = (articles: Article[]) =>
      articles.map((article) =>
        article.id === articleId
          ? {
              ...article,
              isSaved: !article.isSaved,
            }
          : article
      );

    setData({
      ...data,
      discover: updateArticles(data.discover),
      following: updateArticles(data.following),
    });
  };

  const currentIsLoading = propIsLoading ?? isLoading;
  const currentError = propError ?? error;

  const trendingArticles = data?.discover
    .sort((a, b) => (b.votes.up - b.votes.down) - (a.votes.up - a.votes.down))
    .slice(0, 3);

  const regularArticles = data?.discover.slice(3);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('discover')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
              activeTab === 'discover'
                ? isDark
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-100 text-purple-900'
                : isDark
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Newspaper className="w-5 h-5" />
            <span className="hidden sm:inline">Discover</span>
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
              activeTab === 'following'
                ? isDark
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-100 text-purple-900'
                : isDark
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bookmark className="w-5 h-5" />
            <span className="hidden sm:inline">Following</span>
          </button>
        </div>
      </div>

      {activeTab === 'discover' && (
        <>
          {/* Trending Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Flame className="w-5 h-5 text-orange-500 mr-2" />
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Trending News
              </h2>
            </div>
            {currentIsLoading ? (
              <SkeletonLoader isTrending />
            ) : currentError ? (
              <ErrorState message={currentError} onRetry={onRetry} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trendingArticles?.map((article) => (
                  <TrendingArticle
                    key={article.id}
                    article={article}
                    onVote={handleVote}
                    onArticleClick={setSelectedArticle}
                    onSave={handleSave}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Regular Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentIsLoading ? (
              <SkeletonLoader />
            ) : currentError ? (
              <ErrorState message={currentError} onRetry={onRetry} />
            ) : (
              regularArticles?.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onVote={handleVote}
                  onArticleClick={setSelectedArticle}
                  onSave={handleSave}
                />
              ))
            )}
          </div>
        </>
      )}

      {/* Following Tab */}
      {activeTab === 'following' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentIsLoading ? (
            <SkeletonLoader />
          ) : currentError ? (
            <ErrorState message={currentError} onRetry={onRetry} />
          ) : (
            data?.following.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onVote={handleVote}
                onArticleClick={setSelectedArticle}
                onSave={handleSave}
              />
            ))
          )}
        </div>
      )}

      {/* Article Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } p-6`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <div className="flex items-center mb-4">
              <img
                src={selectedArticle.author.avatar}
                alt={selectedArticle.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-3">
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedArticle.author.name}
                </h4>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {selectedArticle.author.role}
                </p>
              </div>
            </div>
            <h2
              className={`text-2xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {selectedArticle.title}
            </h2>
            <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {selectedArticle.content}
            </p>
            <button
              className={`w-full py-2 rounded-lg ${
                isDark
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedArticle(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};