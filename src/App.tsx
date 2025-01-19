import React from 'react';
import { Hero } from './components/Hero';
import { Analytics } from './components/Analytics';
import { Calendar } from './components/Calendar';
import { ChatBot } from './components/ChatBot';
import { Resources } from './components/Resources';

function App() {
  return (
    <div className="bg-black">
      <Hero />
      <Analytics />
      <Calendar />
      <ChatBot />
      <Resources />
    </div>
  );
}

export default App;