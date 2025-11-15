import { useState } from 'react';
import { Shuffle, X, Sparkles } from 'lucide-react';

const tarotDeck = [
  { number: 1, name: "The Fool" },
  { number: 2, name: "The Magician" },
  { number: 3, name: "The High Priestess" },
  { number: 4, name: "The Empress" },
  { number: 5, name: "The Emperor" },
  { number: 6, name: "The Hierophant" },
  { number: 7, name: "The Lovers" },
  { number: 8, name: "The Chariot" },
  { number: 9, name: "Strength" },
  { number: 10, name: "The Hermit" },
  { number: 11, name: "Wheel of Fortune" },
  { number: 12, name: "Justice" },
  { number: 13, name: "The Hanged Man" },
  { number: 14, name: "Death" },
  { number: 15, name: "Temperance" },
  { number: 16, name: "The Devil" },
  { number: 17, name: "The Tower" },
  { number: 18, name: "The Star" },
  { number: 19, name: "The Moon" },
  { number: 20, name: "The Sun" },
  { number: 21, name: "Judgement" },
  { number: 22, name: "The World" },

  { number: 23, name: "Ace of Wands" },
  { number: 24, name: "Two of Wands" },
  { number: 25, name: "Three of Wands" },
  { number: 26, name: "Four of Wands" },
  { number: 27, name: "Five of Wands" },
  { number: 28, name: "Six of Wands" },
  { number: 29, name: "Seven of Wands" },
  { number: 30, name: "Eight of Wands" },
  { number: 31, name: "Nine of Wands" },
  { number: 32, name: "Ten of Wands" },
  { number: 33, name: "Page of Wands" },
  { number: 34, name: "Knight of Wands" },
  { number: 35, name: "Queen of Wands" },
  { number: 36, name: "King of Wands" },

  { number: 37, name: "Ace of Cups" },
  { number: 38, name: "Two of Cups" },
  { number: 39, name: "Three of Cups" },
  { number: 40, name: "Four of Cups" },
  { number: 41, name: "Five of Cups" },
  { number: 42, name: "Six of Cups" },
  { number: 43, name: "Seven of Cups" },
  { number: 44, name: "Eight of Cups" },
  { number: 45, name: "Nine of Cups" },
  { number: 46, name: "Ten of Cups" },
  { number: 47, name: "Page of Cups" },
  { number: 48, name: "Knight of Cups" },
  { number: 49, name: "Queen of Cups" },
  { number: 50, name: "King of Cups" },

  { number: 51, name: "Ace of Swords" },
  { number: 52, name: "Two of Swords" },
  { number: 53, name: "Three of Swords" },
  { number: 54, name: "Four of Swords" },
  { number: 55, name: "Five of Swords" },
  { number: 56, name: "Six of Swords" },
  { number: 57, name: "Seven of Swords" },
  { number: 58, name: "Eight of Swords" },
  { number: 59, name: "Nine of Swords" },
  { number: 60, name: "Ten of Swords" },
  { number: 61, name: "Page of Swords" },
  { number: 62, name: "Knight of Swords" },
  { number: 63, name: "Queen of Swords" },
  { number: 64, name: "King of Swords" },

  { number: 65, name: "Ace of Pentacles" },
  { number: 66, name: "Two of Pentacles" },
  { number: 67, name: "Three of Pentacles" },
  { number: 68, name: "Four of Pentacles" },
  { number: 69, name: "Five of Pentacles" },
  { number: 70, name: "Six of Pentacles" },
  { number: 71, name: "Seven of Pentacles" },
  { number: 72, name: "Eight of Pentacles" },
  { number: 73, name: "Nine of Pentacles" },
  { number: 74, name: "Ten of Pentacles" },
  { number: 75, name: "Page of Pentacles" },
  { number: 76, name: "Knight of Pentacles" },
  { number: 77, name: "Queen of Pentacles" },
  { number: 78, name: "King of Pentacles" }
];

interface Card {
  number: number;
  name: string;
}

interface TarotCardsProps {
  selectedCards: Card[];
  setSelectedCards: (cards: Card[]) => void;
  isDark: boolean;
}

export function TarotCards({ selectedCards, setSelectedCards, isDark }: TarotCardsProps) {
  const [deck, setDeck] = useState(tarotDeck);
  const [shuffled, setShuffled] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => {
      const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
      setDeck(shuffledDeck);
      setShuffled(true);
      setIsShuffling(false);
      setTimeout(() => setShuffled(false), 2000);
    }, 600);
  };

  const handleCardClick = (card: Card) => {
    const isSelected = selectedCards.some(c => c.number === card.number);
    
    if (isSelected) {
      setSelectedCards(selectedCards.filter(c => c.number !== card.number));
    } else {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleClearSelection = () => {
    setSelectedCards([]);
  };

  const isCardSelected = (card: Card) => {
    return selectedCards.some(c => c.number === card.number);
  };

  const getCardGradient = (index: number, isDark: boolean) => {
    if (isDark) {
      const gradients = [
        'from-purple-600 via-pink-600 to-red-600',
        'from-blue-600 via-purple-600 to-pink-600',
        'from-indigo-600 via-purple-600 to-fuchsia-600',
        'from-violet-600 via-purple-600 to-pink-600',
        'from-fuchsia-600 via-purple-600 to-blue-600',
        'from-pink-600 via-rose-600 to-orange-600',
        'from-cyan-600 via-blue-600 to-purple-600',
        'from-emerald-600 via-teal-600 to-cyan-600',
      ];
      return gradients[index % gradients.length];
    } else {
      const gradients = [
        'from-pink-300 via-purple-300 to-blue-300',
        'from-purple-300 via-pink-300 to-rose-300',
        'from-blue-300 via-purple-300 to-pink-300',
        'from-rose-300 via-pink-300 to-purple-300',
        'from-purple-300 via-blue-300 to-cyan-300',
        'from-pink-300 via-rose-300 to-orange-300',
        'from-cyan-300 via-blue-300 to-purple-300',
        'from-teal-300 via-cyan-300 to-blue-300',
      ];
      return gradients[index % gradients.length];
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex gap-2">
        <button
          onClick={handleShuffle}
          disabled={isShuffling}
          className={`flex-1 px-3 py-2.5 text-white rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm hover:scale-105 ${
            isShuffling ? 'animate-pulse' : ''
          } ${
            isDark 
              ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 shadow-red-500/20' 
              : 'bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 shadow-rose-300/30'
          }`}
        >
          <Shuffle size={16} className={isShuffling ? 'animate-spin' : ''} />
          {shuffled ? 'Shuffled!' : isShuffling ? 'Shuffling...' : 'Shuffle'}
        </button>
        {selectedCards.length > 0 && (
          <button
            onClick={handleClearSelection}
            className={`px-3 py-2.5 rounded-xl transition-all flex items-center gap-2 hover:scale-105 text-sm ${
              isDark 
                ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                : 'bg-purple-200/60 hover:bg-purple-300/60 text-purple-900'
            }`}
          >
            <X size={16} />
            Clear
          </button>
        )}
      </div>

      {selectedCards.length > 0 && (
        <div className={`p-3 sm:p-4 rounded-xl border transition-all duration-700 ${
          isDark 
            ? 'bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30' 
            : 'bg-gradient-to-br from-pink-100/60 to-purple-100/60 border-purple-300/30'
        }`}>
          <p className={`text-xs sm:text-sm mb-3 transition-colors ${
            isDark ? 'text-purple-300' : 'text-purple-700'
          }`}>
            Selected cards ({selectedCards.length}):
          </p>
          <div className="space-y-1.5 sm:space-y-2 max-h-32 overflow-y-auto">
            {selectedCards.map((card, idx) => (
              <div key={idx} className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-700 ${
                isDark ? 'bg-purple-800/20' : 'bg-white/50'
              }`}>
                <span className={`px-2 py-0.5 rounded text-xs transition-all duration-700 ${
                  isDark ? 'bg-purple-600/40 text-purple-200' : 'bg-purple-300/50 text-purple-800'
                }`}>
                  {card.number}
                </span>
                <span className={`text-xs sm:text-sm transition-colors ${
                  isDark ? 'text-purple-100' : 'text-purple-900'
                }`}>
                  {card.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className={`transition-colors text-sm ${
          isDark ? 'text-purple-300' : 'text-purple-700'
        }`}>
          {selectedCards.length > 0 
            ? `${selectedCards.length} card${selectedCards.length !== 1 ? 's' : ''} selected` 
            : 'Select your cards by tapping'}
        </h3>
      </div>

      {/* Card Grid */}
      <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-2.5 transition-all duration-500 ${
        isShuffling ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}>
        {deck.map((card, index) => {
          const selected = isCardSelected(card);
          return (
            <button
              key={card.number}
              onClick={() => handleCardClick(card)}
              className={`group relative aspect-[2/3] rounded-lg transition-all duration-300 transform ${
                selected
                  ? 'scale-105'
                  : 'active:scale-95 md:hover:scale-105 md:hover:-translate-y-1'
              }`}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Card Container */}
              <div className={`absolute inset-0 rounded-lg transition-all duration-500 ${
                selected ? '[transform:rotateY(180deg)]' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
              }}>
                {/* Card Back */}
                <div 
                  className={`absolute inset-0 rounded-lg bg-gradient-to-br ${getCardGradient(index, isDark)} p-[1.5px] shadow-lg transition-all duration-700 ${
                    selected ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div className={`w-full h-full rounded-lg p-1.5 flex flex-col items-center justify-center gap-1 overflow-hidden relative transition-all duration-700 ${
                    isDark ? 'bg-slate-900' : 'bg-white'
                  }`}>
                    {/* Mystical pattern overlay */}
                    <div className={`absolute inset-0 transition-opacity duration-700 ${
                      isDark ? 'opacity-20' : 'opacity-30'
                    }`}>
                      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-2 rounded-full transition-colors ${
                        isDark ? 'border-purple-400' : 'border-purple-400/60'
                      }`}></div>
                      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 border-2 rounded-full rotate-45 transition-colors ${
                        isDark ? 'border-purple-400' : 'border-purple-400/60'
                      }`}></div>
                      <Sparkles className={`absolute top-1 right-1 w-2 h-2 transition-colors ${
                        isDark ? 'text-purple-400' : 'text-purple-400/70'
                      }`} />
                      <Sparkles className={`absolute bottom-1 left-1 w-2 h-2 transition-colors ${
                        isDark ? 'text-purple-400' : 'text-purple-400/70'
                      }`} />
                      <Sparkles className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 animate-pulse transition-colors ${
                        isDark ? 'text-purple-400' : 'text-purple-400/70'
                      }`} />
                    </div>
                    
                    {/* Animated gradient orb */}
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${getCardGradient(index, isDark)} blur-sm animate-pulse`}></div>
                    
                    {/* Decorative elements */}
                    <div className={`w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent ${
                      isDark ? 'opacity-100' : 'opacity-60'
                    }`}></div>
                    <div className="flex gap-0.5">
                      <div className={`w-0.5 h-0.5 rounded-full transition-colors ${
                        isDark ? 'bg-purple-400' : 'bg-purple-400/70'
                      }`}></div>
                      <div className={`w-0.5 h-0.5 rounded-full transition-colors ${
                        isDark ? 'bg-pink-400' : 'bg-pink-400/70'
                      }`}></div>
                      <div className={`w-0.5 h-0.5 rounded-full transition-colors ${
                        isDark ? 'bg-purple-400' : 'bg-purple-400/70'
                      }`}></div>
                    </div>
                    <div className={`w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent ${
                      isDark ? 'opacity-100' : 'opacity-60'
                    }`}></div>
                  </div>
                </div>

                {/* Card Front (when selected) */}
                <div 
                  className={`absolute inset-0 rounded-lg bg-gradient-to-br ${getCardGradient(index, isDark)} p-[1.5px] shadow-2xl transition-all duration-700 ${
                    selected ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className={`w-full h-full rounded-lg p-1.5 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-700 ${
                    isDark 
                      ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
                      : 'bg-gradient-to-br from-white via-purple-50/30 to-white'
                  }`}>
                    {/* Animated background effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getCardGradient(index, isDark)} opacity-10 animate-pulse`}></div>
                    
                    {/* Glow effect */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br ${getCardGradient(index, isDark)} rounded-full blur-2xl opacity-30`}></div>
                    
                    {/* Card content */}
                    <div className="relative z-10 text-center space-y-1">
                      <div className={`text-[9px] px-1.5 py-0.5 bg-gradient-to-r ${getCardGradient(index, isDark)} rounded-full text-white`}>
                        {card.number}
                      </div>
                      <Sparkles className={`mx-auto w-3 h-3 animate-pulse transition-colors ${
                        isDark ? 'text-purple-300' : 'text-purple-400'
                      }`} />
                    </div>

                    {/* Corner sparkles */}
                    <Sparkles className={`absolute top-0.5 left-0.5 w-1.5 h-1.5 transition-colors ${
                      isDark ? 'text-purple-400/50' : 'text-purple-400/60'
                    }`} />
                    <Sparkles className={`absolute top-0.5 right-0.5 w-1.5 h-1.5 transition-colors ${
                      isDark ? 'text-pink-400/50' : 'text-pink-400/60'
                    }`} />
                    <Sparkles className={`absolute bottom-0.5 left-0.5 w-1.5 h-1.5 transition-colors ${
                      isDark ? 'text-pink-400/50' : 'text-pink-400/60'
                    }`} />
                    <Sparkles className={`absolute bottom-0.5 right-0.5 w-1.5 h-1.5 transition-colors ${
                      isDark ? 'text-purple-400/50' : 'text-purple-400/60'
                    }`} />
                  </div>
                </div>
              </div>

              {/* Selection indicator ring */}
              {selected && (
                <div className={`absolute -inset-0.5 rounded-lg bg-gradient-to-br ${getCardGradient(index, isDark)} opacity-50 blur-sm animate-pulse -z-10`}></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}