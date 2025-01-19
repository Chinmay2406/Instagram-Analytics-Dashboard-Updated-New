import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Plus, X, Image as ImageIcon, Video as VideoIcon, Hash, Clock } from 'lucide-react';
import { CalendarEvent } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const Calendar = () => {
  const [events, setEvents] = useLocalStorage<CalendarEvent[]>('calendar_events', []);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    caption: '',
    hashtags: [],
    mediaType: 'image',
    status: 'draft',
    time: '12:00'
  });

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();

  const handleDateClick = (day: number) => {
    const date = `${currentYear}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleAddEvent = () => {
    if (selectedDate && newEvent.title) {
      const event: CalendarEvent = {
        id: Date.now().toString(),
        date: selectedDate,
        time: newEvent.time || '12:00',
        title: newEvent.title,
        caption: newEvent.caption || '',
        hashtags: newEvent.hashtags || [],
        mediaType: newEvent.mediaType as 'image' | 'video' | 'carousel',
        status: 'draft',
        mediaUrl: newEvent.mediaUrl
      };
      setEvents([...events, event]);
      setShowModal(false);
      setNewEvent({
        title: '',
        caption: '',
        hashtags: [],
        mediaType: 'image',
        status: 'draft',
        time: '12:00'
      });
    }
  };

  const handleHashtagInput = (value: string) => {
    const hashtags = value.split(' ').map(tag => 
      tag.startsWith('#') ? tag : `#${tag}`
    ).filter(tag => tag.length > 1);
    setNewEvent(prev => ({ ...prev, hashtags }));
  };

  const getEventsByDate = (day: number) => {
    const date = `${currentYear}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === date);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Content Calendar
        </h2>

        <div className="bg-gray-900 rounded-xl p-6 border border-purple-600/30">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <CalendarIcon className="w-6 h-6 text-purple-500" />
              <h3 className="text-xl font-semibold">{`${currentMonth} ${currentYear}`}</h3>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-purple-600 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Post</span>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-gray-400 font-medium py-2">
                {day}
              </div>
            ))}
            {days.map((day) => {
              const dayEvents = getEventsByDate(day);
              const hasEvents = dayEvents.length > 0;
              
              return (
                <motion.div
                  key={day}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleDateClick(day)}
                  className={`aspect-square bg-gray-800 rounded-lg flex flex-col p-2 cursor-pointer hover:bg-purple-600/20 transition-colors border ${
                    hasEvents ? 'border-purple-500' : 'border-gray-700'
                  }`}
                >
                  <span className="text-lg mb-1">{day}</span>
                  {hasEvents && (
                    <div className="flex flex-col gap-1">
                      {dayEvents.map((event, index) => (
                        <div
                          key={event.id}
                          className={`text-xs px-1 py-0.5 rounded ${
                            event.status === 'posted'
                              ? 'bg-green-500/20 text-green-300'
                              : event.status === 'scheduled'
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-gray-500/20 text-gray-300'
                          }`}
                        >
                          {event.title.substring(0, 10)}...
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-gray-900 rounded-xl p-6 max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Schedule Post</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Post Title
                    </label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                      placeholder="Enter post title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Caption
                    </label>
                    <textarea
                      value={newEvent.caption}
                      onChange={(e) => setNewEvent({ ...newEvent, caption: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 h-24"
                      placeholder="Write your caption..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Hashtags
                    </label>
                    <input
                      type="text"
                      value={newEvent.hashtags?.join(' ')}
                      onChange={(e) => handleHashtagInput(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                      placeholder="Add hashtags (space-separated)"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={selectedDate || ''}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Media Type
                    </label>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setNewEvent({ ...newEvent, mediaType: 'image' })}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                          newEvent.mediaType === 'image'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-400'
                        }`}
                      >
                        <ImageIcon className="w-4 h-4" />
                        <span>Image</span>
                      </button>
                      <button
                        onClick={() => setNewEvent({ ...newEvent, mediaType: 'video' })}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                          newEvent.mediaType === 'video'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-400'
                        }`}
                      >
                        <VideoIcon className="w-4 h-4" />
                        <span>Video</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddEvent}
                    className="w-full px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Schedule Post
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};