import { Resource } from '../types';

export const resources: Resource[] = [
  // Analytics Resources
  {
    id: 'analytics-1',
    title: 'Instagram Analytics Guide 2024',
    description: 'Learn how to interpret your Instagram metrics for maximum growth',
    category: 'analytics',
    type: 'guide',
    url: 'https://later.com/blog/instagram-analytics/',
    readTime: '12 min'
  },
  {
    id: 'analytics-2',
    title: 'Engagement Rate Calculator',
    description: 'Calculate and track your Instagram engagement rate',
    category: 'analytics',
    type: 'tool',
    url: 'https://phlanx.com/engagement-calculator',
    readTime: '5 min'
  },
  {
    id: 'analytics-3',
    title: 'Best Times to Post on Instagram',
    description: 'Data-driven insights for optimal posting times',
    category: 'analytics',
    type: 'research',
    url: 'https://sproutsocial.com/insights/best-times-to-post-on-social-media/',
    readTime: '8 min'
  },
  
  // Marketing Resources
  {
    id: 'marketing-1',
    title: 'Instagram Algorithm Guide',
    description: 'Understanding how the Instagram algorithm works in 2024',
    category: 'marketing',
    type: 'guide',
    url: 'https://later.com/blog/how-instagram-algorithm-works/',
    readTime: '15 min'
  },
  {
    id: 'marketing-2',
    title: 'Hashtag Strategy Guide',
    description: 'How to use hashtags effectively for growth',
    category: 'marketing',
    type: 'article',
    url: 'https://plannthat.com/instagram-hashtag-strategy/',
    readTime: '10 min'
  },
  {
    id: 'marketing-3',
    title: 'Content Creation Tips',
    description: 'Create engaging content that converts',
    category: 'marketing',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=example',
    readTime: '20 min'
  },
  
  // Community Building Resources
  {
    id: 'community-1',
    title: 'Instagram Community Guidelines',
    description: 'Official Instagram community guidelines and best practices',
    category: 'community',
    type: 'guide',
    url: 'https://help.instagram.com/477434105621119',
    readTime: '7 min'
  },
  {
    id: 'community-2',
    title: 'Building Authentic Engagement',
    description: 'Strategies for genuine community interaction',
    category: 'community',
    type: 'article',
    url: 'https://later.com/blog/instagram-engagement/',
    readTime: '12 min'
  },
  {
    id: 'community-3',
    title: 'Instagram Stories for Community',
    description: 'Using Stories to build community engagement',
    category: 'community',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=example2',
    readTime: '15 min'
  }
];

export const chatbotResponses = {
  getResponse(query: string, profile: any): string {
    const normalizedQuery = query.toLowerCase();
    
    if (normalizedQuery.includes('followers')) {
      return `The account has ${profile.followers.toLocaleString()} followers.`;
    }
    
    if (normalizedQuery.includes('engagement rate')) {
      return `The current engagement rate is ${profile.engagement_rate}. ${
        parseFloat(profile.engagement_rate) > 3 
          ? 'This is considered good engagement!'
          : 'There might be room for improvement in engagement.'
      }`;
    }
    
    if (normalizedQuery.includes('recent post')) {
      const recentPost = profile.recentPosts[0];
      return `The most recent post received ${recentPost.likes.toLocaleString()} likes and ${recentPost.comments.toLocaleString()} comments. The caption was: "${recentPost.caption}"`;
    }
    
    if (normalizedQuery.includes('best time')) {
      return 'Based on your recent posts, the best times to post are:\n- Weekdays: 6-8 PM\n- Weekends: 11 AM-2 PM\nThese times typically show higher engagement rates.';
    }

    if (normalizedQuery.includes('improve') || normalizedQuery.includes('growth')) {
      return 'To improve your Instagram presence:\n1. Post consistently (3-4 times per week)\n2. Use relevant hashtags\n3. Engage with your audience\n4. Share authentic content\n5. Utilize all Instagram features (Posts, Stories, Reels)';
    }
    
    return "I can help you analyze your Instagram metrics. Try asking about:\n- Followers count\n- Engagement rate\n- Recent posts\n- Best posting times\n- Growth strategies";
  }
};