export interface InstagramProfile {
  username: string;
  followers: number;
  following: number;
  posts: number;
  engagement_rate: string;
  isPrivate: boolean;
  profilePic: string;
  recentPosts: InstagramPost[];
}

export interface InstagramPost {
  id: string;
  caption: string;
  imageUrl: string;
  likes: number;
  comments: number;
  timestamp: number;
  isVideo: boolean;
  videoUrl?: string;
  engagement: number;
}

export interface CalendarEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  caption: string;
  hashtags: string[];
  mediaUrl?: string;
  mediaType: 'image' | 'video' | 'carousel';
  status: 'draft' | 'scheduled' | 'posted';
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: number;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'analytics' | 'marketing' | 'community';
  url: string;
  type: 'article' | 'guide' | 'video' | 'research';
  readTime?: string;
}