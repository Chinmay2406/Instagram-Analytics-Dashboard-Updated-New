export const resources = [
  // Analytics Resources
  {
    id: 'analytics-1',
    title: 'Understanding Instagram Analytics',
    description: 'A comprehensive guide to Instagram metrics and what they mean for your growth',
    category: 'analytics',
    type: 'guide',
    url: 'https://example.com/instagram-analytics',
    readTime: '10 min'
  },
  // Add more resources here...
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
      return `The most recent post received ${recentPost.likes} likes and ${recentPost.comments} comments. The caption was: "${recentPost.caption}"`;
    }
    
    return "I can help you analyze your Instagram metrics. Try asking about followers, engagement rate, or recent posts!";
  }
};