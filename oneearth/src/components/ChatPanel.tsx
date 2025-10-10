'use client';
import { useState } from 'react';

export default function ChatPanel() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <div className="w-full md:w-[400px] bg-gray-900 p-4 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-yellow-400 mb-3">Global Chat</h2>
      <div className="h-[300px] overflow-y-auto mb-3 border border-gray-700 p-2 rounded">
        {messages.map((msg, i) => (
          <div key={i} className="text-left py-1 text-sm text-gray-200">
            {msg}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 bg-gray-800 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say hi to the world..."
        />
        <button
          onClick={sendMessage}
          className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-400"
        >
          Send
        </button>
      </div>
    </div>
  );
}
