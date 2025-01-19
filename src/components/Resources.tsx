import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Book, Camera, X } from 'lucide-react';
import { resources } from '../data/mockData';
import { Resource } from '../types';

export const Resources = () => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const categories = {
    analytics: resources.filter(r => r.category === 'analytics'),
    marketing: resources.filter(r => r.category === 'marketing'),
    community: resources.filter(r => r.category === 'community')
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'analytics':
        return <Video className="w-6 h-6" />;
      case 'marketing':
        return <Book className="w-6 h-6" />;
      case 'community':
        return <Camera className="w-6 h-6" />;
      default:
        return <Book className="w-6 h-6" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'analytics':
        return 'Instagram Analytics';
      case 'marketing':
        return 'Marketing & Growth';
      case 'community':
        return 'Community Building';
      default:
        return category;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Resources & Tips
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(categories).map(([category, items]) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900 p-6 rounded-xl border border-purple-600/30"
            >
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                {getCategoryIcon(category)}
              </div>
              <h3 className="text-xl font-semibold mb-4">{getCategoryTitle(category)}</h3>
              <div className="space-y-4">
                {items.map((resource) => (
                  <div
                    key={resource.id}
                    onClick={() => setSelectedResource(resource)}
                    className="p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                  >
                    <h4 className="font-semibold">{resource.title}</h4>
                    <p className="text-gray-400 text-sm">{resource.description}</p>
                    {resource.readTime && (
                      <div className="mt-2 text-sm text-purple-400">
                        Read time: {resource.readTime}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedResource && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedResource(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-gray-900 rounded-xl p-6 max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{selectedResource.title}</h3>
                  <button
                    onClick={() => setSelectedResource(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-400 mb-4">{selectedResource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-400">
                    Type: {selectedResource.type.charAt(0).toUpperCase() + selectedResource.type.slice(1)}
                  </span>
                  {selectedResource.readTime && (
                    <span className="text-sm text-purple-400">
                      Read time: {selectedResource.readTime}
                    </span>
                  )}
                </div>
                <a
                  href={selectedResource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block w-full px-4 py-2 bg-purple-600 text-center rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Read More
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};