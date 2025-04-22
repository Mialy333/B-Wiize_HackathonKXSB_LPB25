import { DivideIcon as LucideIcon } from 'lucide-react';

export interface Article {
  id: string;
  title: string;
  image: string;
  hashtags: string[];
  date: string;
  readTime: string;
  votes: {
    up: number;
    down: number;
  };
  topComment: {
    text: string;
    likes: number;
  };
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  isSaved: boolean;
  isTrending?: boolean;
}

export interface NewsData {
  discover: Article[];
  following: Article[];
}

export interface NewsProps {
  data?: NewsData;
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
  onVote?: (articleId: string, voteType: 'up' | 'down') => void;
  onSave?: (articleId: string) => void;
}

export interface TrendingArticleProps {
  article: Article;
  onVote?: (articleId: string, voteType: 'up' | 'down') => void;
  onArticleClick?: (article: Article) => void;
  onSave?: (articleId: string) => void;
}