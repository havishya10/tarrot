interface ChatMessageProps {
  message: string;
  sender: 'user' | 'bot';
  isDark: boolean;
}

export function ChatMessage({ message, sender, isDark }: ChatMessageProps) {
  if (sender === 'user') {
    return (
      <div className="flex justify-end animate-slideIn">
        <div className={`max-w-[85%] sm:max-w-[80%] px-3 sm:px-4 py-2 sm:py-3 rounded-2xl rounded-tr-sm shadow-lg transition-all duration-700 backdrop-blur-sm text-sm sm:text-base ${
          isDark 
            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' 
            : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
        }`}>
          <p className="whitespace-pre-wrap break-words">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start animate-slideIn">
      <div className={`max-w-[85%] sm:max-w-[80%] px-3 sm:px-4 py-2 sm:py-3 rounded-2xl rounded-tl-sm shadow-lg border transition-all duration-700 backdrop-blur-sm text-sm sm:text-base ${
        isDark 
          ? 'bg-slate-800/50 border-purple-500/20 text-purple-100' 
          : 'bg-white/60 border-purple-200/40 text-purple-900'
      }`}>
        <p className="whitespace-pre-wrap break-words">{message}</p>
      </div>
    </div>
  );
}