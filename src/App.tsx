import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Moon, Sun, MessageCircle, X } from 'lucide-react';
import { TarotCards } from './components/TarotCards';
import { ChatMessage } from './components/ChatMessage';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface HistoryItem {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface Card {
  number: number;
  name: string;
}

export default function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [isDark, setIsDark] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const API_KEY = "AIzaSyAuTYWz0ciKnGvrf6Bf2La_mcfcszoeUCQ"; // prototype only
  const MODEL = "gemini-2.5-flash";

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    // Include selected cards in the context
    let contextMessage = trimmedMessage;
    if (selectedCards.length > 0) {
      const cardsText = selectedCards.map(c => `${c.number}: ${c.name}`).join(', ');
      contextMessage = `Selected cards: ${cardsText}\n\nQuestion: ${trimmedMessage}`;
    }

    const newUserMessage: Message = { text: trimmedMessage, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    
    const newHistory = [...history, { role: 'user' as const, parts: [{ text: contextMessage }] }];
    setHistory(newHistory);
    setMessage('');

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            contents: newHistory, 
            systemInstruction: {
              role: "system",
              parts: [{ text: "You are an expert tarot reader, and you will be absolutely honest about the card content." }]
            } 
          }),
        }
      );

      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "(no reply)";
      
      const newBotMessage: Message = { text: reply, sender: 'bot' };
      setMessages(prev => [...prev, newBotMessage]);
      setHistory([...newHistory, { role: 'model', parts: [{ text: reply }] }]);
    } catch (err) {
      const errorMessage: Message = { 
        text: `(error: ${err instanceof Error ? err.message : 'Unknown error'})`, 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 flex items-center justify-center p-0 md:p-4 lg:p-6 ${
      isDark 
        ? 'bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950' 
        : 'bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100'
    }`}>
      {/* Dreamy overlay effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${
          isDark ? 'bg-purple-600' : 'bg-pink-300'
        }`}></div>
        <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse delay-1000 ${
          isDark ? 'bg-indigo-600' : 'bg-blue-300'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 animate-pulse delay-500 ${
          isDark ? 'bg-fuchsia-600' : 'bg-purple-300'
        }`}></div>
      </div>

      <div className={`relative w-full h-screen md:h-auto md:max-w-7xl md:rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-700 ${
        isDark 
          ? 'bg-slate-900/90 md:border border-purple-500/20' 
          : 'bg-white/80 md:border border-purple-200/50'
      }`}>
        {/* Header */}
        <div className={`p-4 sm:p-5 border-b transition-all duration-700 relative overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500/20' 
            : 'bg-gradient-to-r from-pink-200/50 via-purple-200/50 to-blue-200/50 border-purple-200/30'
        }`}>
          {/* Floating sparkles animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <Sparkles 
                key={i}
                className={`absolute animate-float ${isDark ? 'text-purple-300/20' : 'text-purple-400/30'}`}
                size={16}
                style={{
                  left: `${(i * 20) + 10}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between relative">
            <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3">
              <Sparkles className={`${isDark ? 'text-purple-300' : 'text-purple-500'} transition-colors`} size={20} />
              <h1 className={`text-center transition-colors ${isDark ? 'text-purple-100' : 'text-purple-900'}`}>
                Mystic Tarot
              </h1>
              <Sparkles className={`${isDark ? 'text-purple-300' : 'text-purple-500'} transition-colors`} size={20} />
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 sm:p-2.5 rounded-full transition-all duration-500 hover:scale-110 ${
                isDark 
                  ? 'bg-purple-800/50 hover:bg-purple-700/50 text-yellow-300' 
                  : 'bg-purple-200/50 hover:bg-purple-300/50 text-purple-900'
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          <p className={`text-center mt-1.5 text-xs transition-colors ${
            isDark ? 'text-purple-300' : 'text-purple-600'
          }`}>
            Select your cards and seek guidance
          </p>
        </div>

        {/* Main Content - Tarot Cards */}
        <div className={`p-4 sm:p-5 md:p-6 overflow-y-auto transition-all duration-700 ${
          isDark 
            ? 'bg-slate-900/30' 
            : 'bg-purple-50/30'
        }`}
        style={{ height: 'calc(100vh - 120px)', maxHeight: '800px' }}>
          <TarotCards 
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            isDark={isDark}
          />
        </div>

        {/* Floating Chat Button - Mobile */}
        <button
          onClick={() => setIsChatOpen(true)}
          className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 lg:hidden p-4 rounded-full shadow-2xl transition-all hover:scale-110 z-40 ${
            isDark 
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' 
              : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
          }`}
        >
          <MessageCircle size={24} />
          {messages.length > 0 && (
            <span className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              isDark ? 'bg-pink-500' : 'bg-rose-500'
            }`}>
              {messages.length}
            </span>
          )}
        </button>

        {/* Chat Window - Mobile Modal / Desktop Floating */}
        <div className={`fixed inset-0 lg:inset-auto lg:bottom-8 lg:right-8 lg:w-96 lg:h-[600px] z-50 transition-all duration-300 ${
          isChatOpen ? 'translate-y-0 opacity-100' : 'translate-y-full lg:translate-y-0 opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto'
        }`}>
          {/* Backdrop for mobile */}
          <div 
            className={`lg:hidden absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${
              isChatOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsChatOpen(false)}
          ></div>

          {/* Chat Container */}
          <div className={`absolute bottom-0 lg:bottom-0 left-0 right-0 lg:left-auto lg:right-0 h-[85vh] lg:h-full rounded-t-3xl lg:rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-700 ${
            isDark 
              ? 'bg-slate-900/95 border-t lg:border border-purple-500/20' 
              : 'bg-white/95 border-t lg:border border-purple-200/50'
          }`}>
            {/* Chat Header */}
            <div className={`p-4 border-b flex items-center justify-between transition-all duration-700 ${
              isDark 
                ? 'bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500/20' 
                : 'bg-gradient-to-r from-pink-200/50 via-purple-200/50 to-blue-200/50 border-purple-200/30'
            }`}>
              <div className="flex items-center gap-2">
                <Sparkles className={isDark ? 'text-purple-300' : 'text-purple-500'} size={20} />
                <h2 className={`transition-colors ${isDark ? 'text-purple-100' : 'text-purple-900'}`}>
                  Mystic Reading
                </h2>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className={`lg:hidden p-2 rounded-full transition-all hover:scale-110 ${
                  isDark 
                    ? 'bg-purple-800/50 hover:bg-purple-700/50 text-purple-200' 
                    : 'bg-purple-200/50 hover:bg-purple-300/50 text-purple-900'
                }`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={chatBoxRef}
              className="p-4 space-y-3 overflow-y-auto"
              style={{ height: 'calc(100% - 180px)' }}
            >
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className={`text-center space-y-2 transition-colors px-4 ${
                    isDark ? 'text-purple-300/50' : 'text-purple-400/60'
                  }`}>
                    <Sparkles className="mx-auto mb-4 animate-pulse" size={48} />
                    <p className="text-sm">Select your cards and ask your questions...</p>
                    <p className="text-xs">The mystic awaits your inquiry</p>
                  </div>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <ChatMessage key={idx} message={msg.text} sender={msg.sender} isDark={isDark} />
                ))
              )}
            </div>

            {/* Input */}
            <div className={`p-4 border-t transition-all duration-700 ${
              isDark 
                ? 'border-purple-500/20 bg-slate-900/50' 
                : 'border-purple-200/30 bg-purple-50/50'
            }`}>
              {selectedCards.length > 0 && (
                <div className={`mb-3 p-2.5 rounded-lg border transition-all duration-700 ${
                  isDark 
                    ? 'bg-purple-900/20 border-purple-500/30' 
                    : 'bg-purple-100/40 border-purple-300/30'
                }`}>
                  <p className={`text-xs mb-1.5 transition-colors ${
                    isDark ? 'text-purple-300' : 'text-purple-700'
                  }`}>
                    {selectedCards.length} card{selectedCards.length !== 1 ? 's' : ''} selected
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCards.slice(0, 3).map((card, idx) => (
                      <span 
                        key={idx} 
                        className={`px-2 py-0.5 rounded text-xs transition-all duration-700 ${
                          isDark 
                            ? 'bg-purple-600/30 text-purple-200' 
                            : 'bg-purple-300/40 text-purple-800'
                        }`}
                      >
                        {card.name}
                      </span>
                    ))}
                    {selectedCards.length > 3 && (
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        isDark ? 'text-purple-400' : 'text-purple-600'
                      }`}>
                        +{selectedCards.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`flex-1 px-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-700 text-sm ${
                    isDark 
                      ? 'bg-slate-800/50 border-purple-500/30 text-purple-100 placeholder-purple-400/50 focus:ring-purple-500/50' 
                      : 'bg-white/60 border-purple-300/40 text-purple-900 placeholder-purple-400/70 focus:ring-purple-400/50'
                  }`}
                  placeholder="Ask about your reading..."
                />
                <button
                  onClick={sendMessage}
                  className={`px-4 py-2.5 rounded-xl transition-all shadow-lg flex items-center gap-2 hover:scale-105 ${
                    isDark 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/20 hover:from-purple-500 hover:to-indigo-500' 
                      : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-purple-300/30 hover:from-purple-500 hover:to-pink-500'
                  }`}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}