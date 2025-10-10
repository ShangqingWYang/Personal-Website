'use client';

import Globe from '../components/Globe';
import ChatPanel from '../components/ChatPanel';
import StarryBackground from '../components/StarryBackground';

export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col md:flex-row items-center justify-center gap-8 p-4 text-gray-100">

      {/* Starry background */}
      <div className="absolute inset-0 -z-10">
        <StarryBackground />
      </div>

      {/* Globe */}
      <div className="flex-1 w-full md:w-2/3 h-[600px] md:h-[800px] flex justify-center items-center">
        <Globe />
      </div>

      {/* Chat Panel */}
      <div className="flex-1 w-full md:w-1/3 max-w-md">
        <div className="relative bg-black/70 backdrop-blur-xl rounded-3xl p-6 h-[600px] md:h-[800px] overflow-y-auto shadow-lg border border-gray-700">
          <ChatPanel />
        </div>
      </div>
    </main>
  );
}
