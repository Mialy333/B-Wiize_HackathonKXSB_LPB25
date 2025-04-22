import { DivideIcon as LucideIcon } from 'lucide-react';

export interface Reply {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  text: string;
  votes: {
    up: number;
    down: number;
  };
  timestamp: string;
}

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  text: string;
  votes: {
    up: number;
    down: number;
  };
  replies: Reply[];
  timestamp: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  author: {
    name: string;
    avatar: string;
  };
  votes: {
    up: number;
    down: number;
  };
  comments: Comment[];
  timestamp: string;
  tags: string[];
}

export interface CommunityData {
  posts: Post[];
  stats: {
    members: number;
    online: number;
    founded: string;
  };
  rules: string[];
  pinnedPosts: {
    id: string;
    title: string;
  }[];
}

export interface CommunityProps {
  data?: CommunityData;
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
  onVote?: (postId: string, voteType: 'up' | 'down') => void;
  onCommentVote?: (postId: string, commentId: string, voteType: 'up' | 'down') => void;
  onReplyVote?: (postId: string, commentId: string, replyId: string, voteType: 'up' | 'down') => void;
  onAddPost?: (title: string, body: string) => void;
  onAddComment?: (postId: string, text: string) => void;
  onAddReply?: (postId: string, commentId: string, text: string) => void;
}