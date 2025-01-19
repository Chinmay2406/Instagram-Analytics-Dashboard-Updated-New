import { InstagramProfile, InstagramPost } from '../types';

export class InstagramService {
  async getPublicProfile(username: string): Promise<InstagramProfile> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock data based on username
    const mockProfile: InstagramProfile = {
      username,
      followers: 15000 + Math.floor(Math.random() * 5000),
      following: 1200 + Math.floor(Math.random() * 300),
      posts: 342 + Math.floor(Math.random() * 50),
      engagement_rate: (3 + Math.random() * 3).toFixed(2) + '%',
      isPrivate: false,
      profilePic: `https://source.unsplash.com/400x400/?portrait&u=${username}`,
      recentPosts: this.generateMockPosts()
    };

    return mockProfile;
  }

  private generateMockPosts(): InstagramPost[] {
    const captions = [
      'Living my best life! 🌟',
      'Adventure awaits! 🌎✈️',
      'Good vibes only 🌈',
      'Making memories 📸',
      'Weekend mood 🎉',
      'Nature is calling 🌿',
      'Coffee time ☕',
      'Work hard, play harder 💪',
      'Beach day! 🏖',
      'City lights 🌃',
      'Sunset views 🌅',
      'Food lover 🍕'
    ];

    return Array.from({ length: 12 }, (_, i) => ({
      id: `post-${i}`,
      caption: captions[i],
      imageUrl: `https://source.unsplash.com/600x600/?lifestyle&sig=${i}`,
      likes: 500 + Math.floor(Math.random() * 1500),
      comments: 20 + Math.floor(Math.random() * 80),
      timestamp: Date.now() - (i * 24 * 60 * 60 * 1000), // Posts from recent days
      isVideo: Math.random() > 0.8,
      videoUrl: undefined,
      engagement: 0 // Will be calculated below
    })).map(post => ({
      ...post,
      engagement: post.likes + post.comments
    }));
  }
}