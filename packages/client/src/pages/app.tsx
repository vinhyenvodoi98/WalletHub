import { useState } from 'react';

import WalletCreator from '@/components/WalletCreator';
// import WalletGetter from '@/components/WalletGetter';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AppPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessage: ChatMessage = {
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        text: "I've received your message. How can I help you with wallet management?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="flex min-h-main bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">My Wallets</h2>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {/* Wallet List */}
          <div className="space-y-2">
            <button className="w-full p-3 text-left rounded-lg hover:bg-gray-800 transition-colors">
              <div className="font-medium">Wallet #1</div>
              <div className="text-sm text-gray-400 truncate">0x1234...5678</div>
            </button>
            {/* Add more wallet items here */}
          </div>
        </div>
        <div className="p-4 border-t border-gray-800">
          <WalletCreator />
          {/* <WalletGetter /> */}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto p-4 bg-white">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Chat messages */}
            <div className="space-y-4 scrollbar-hide overflow-scroll max-h-chat">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  Hello! I can help you manage your wallets. You can:
                  <br />• Create a new wallet
                  <br />• Get wallet information
                  <br />• View transaction history
                </p>
              </div>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.isUser
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p>{message.text}</p>
                    <div
                      className={`text-xs mt-1 ${
                        message.isUser ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="border-t bg-white p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-4 items-end">
              <div className="flex-1 bg-white flex items-center">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message here..."
                  className="w-full h-14 resize-none rounded-lg border border-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={1}
                />
              </div>
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 h-14 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Send
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Your wallet assistant is in beta. Responses may not be accurate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
