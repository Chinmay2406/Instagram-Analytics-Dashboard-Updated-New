import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Users, Heart, MessageCircle, TrendingUp, Calendar, Image } from 'lucide-react';
import { InstagramService } from '../services/instagram';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { InstagramProfile, InstagramPost } from '../types';

export const Analytics = () => {
  const [profile, setProfile] = useLocalStorage<InstagramProfile | null>('instagram_profile', null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  const handleAnalyze = async () => {
    if (!username) {
      setError('Please enter an Instagram username');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const instagramService = new InstagramService();
      const profileData = await instagramService.getPublicProfile(username);
      setProfile(profileData);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch Instagram data. Please check the username and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getEngagementColor = (rate: string) => {
    const percentage = parseFloat(rate);
    if (percentage >= 5) return 'text-green-500';
    if (percentage >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Instagram Analytics
        </h2>

        <div className="bg-gray-900 rounded-xl p-6 border border-purple-600/30 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Instagram username"
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="px-6 py-2 bg-purple-600 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <span>Analyzing...</span>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Analyze</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="text-red-500 mb-4">
              {error}
            </div>
          )}

          {profile && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <Users className="w-5 h-5 text-purple-500" />
                    <h3 className="text-lg font-semibold">Followers</h3>
                  </div>
                  <p className="text-3xl font-bold">{profile.followers.toLocaleString()}</p>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <Image className="w-5 h-5 text-purple-500" />
                    <h3 className="text-lg font-semibold">Posts</h3>
                  </div>
                  <p className="text-3xl font-bold">{profile.posts.toLocaleString()}</p>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                    <h3 className="text-lg font-semibold">Engagement Rate</h3>
                  </div>
                  <p className={`text-3xl font-bold ${getEngagementColor(profile.engagement_rate)}`}>
                    {profile.engagement_rate}
                  </p>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <Calendar className="w-5 h-5 text-purple-500" />
                    <h3 className="text-lg font-semibold">Account Type</h3>
                  </div>
                  <p className="text-3xl font-bold">{profile.isPrivate ? 'Private' : 'Public'}</p>
                </div>
              </div>

              {profile.recentPosts.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {profile.recentPosts.map((post) => (
                      <motion.div
                        key={post.id}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => setSelectedPost(post)}
                      >
                        <img
                          src={post.imageUrl}
                          alt={post.caption}
                          className="w-full aspect-square object-cover"
                        />
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span>{post.likes.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MessageCircle className="w-4 h-4 text-blue-500" />
                              <span>{post.comments.toLocaleString()}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-400 truncate">{post.caption}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-900 rounded-xl max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.caption}
                className="w-full aspect-video object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="text-lg">{selectedPost.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5 text-blue-500" />
                      <span className="text-lg">{selectedPost.comments.toLocaleString()}</span>
                    </div>
                  </div>
                  <span className="text-gray-400">
                    {new Date(selectedPost.timestamp * 1000).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-300">{selectedPost.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};