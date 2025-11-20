import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';

// Interface for the structured JSON response from the Gemini API
interface TarotCard {
  card_name: string;
  position: 'Past' | 'Present' | 'Future';
  interpretation: string;
}

// A simple star SVG for the background
const Star: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
    <div className="absolute rounded-full bg-amber-200" style={style} />
);

// Component to generate a starry background
const StarryBackground: React.FC = () => {
    const [stars] = useState<React.CSSProperties[]>(() => {
        return Array.from({ length: 50 }).map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            animation: `twinkle ${Math.random() * 5 + 3}s linear infinite`,
        }));
    });

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <style>
                {`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 0.7; }
                }
                `}
            </style>
            {stars.map((style, i) => <Star key={i} style={style} />)}
        </div>
    );
};

const TarotReader: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [reading, setReading] = useState<TarotCard[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  const getTarotReading = async () => {
    setError('');
    setReading(null);
    setIsFlipped(false);
    setIsLoading(true);

    if (!question.trim()) {
      setError('Please ask a question to the cards.');
      setIsLoading(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          cards: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                card_name: { type: Type.STRING, description: "The name of a Major Arcana tarot card." },
                position: { type: Type.STRING, description: "The position in the spread: 'Past', 'Present', or 'Future'." },
                interpretation: { type: Type.STRING, description: "A 1-2 sentence interpretation of the card related to the user's question." }
              },
              required: ['card_name', 'position', 'interpretation']
            }
          }
        },
        required: ['cards']
      };

      const prompt = `You are a mystical tarot reader. A user is asking: "${question}".
      Draw a three-card spread (Past, Present, Future) using ONLY Major Arcana cards.
      For each card, provide its name, its position in the spread, and a concise one or two-sentence interpretation related specifically to their question.
      Ensure the card names are well-known Major Arcana (e.g., The Fool, The Magician, The High Priestess, etc.).`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: responseSchema,
        },
      });
      
      const parsedResponse = JSON.parse(response.text);

      if (parsedResponse.cards && parsedResponse.cards.length === 3) {
        // Ensure the order is correct for the reveal animation
        const orderedCards = [
          parsedResponse.cards.find((c: TarotCard) => c.position === 'Past'),
          parsedResponse.cards.find((c: TarotCard) => c.position === 'Present'),
          parsedResponse.cards.find((c: TarotCard) => c.position === 'Future'),
        ].filter(Boolean) as TarotCard[];

        setReading(orderedCards);
        setTimeout(() => setIsFlipped(true), 100); 
      } else {
        throw new Error("Received an invalid response structure from the AI.");
      }

    } catch (err) {
      console.error("Tarot reading error:", err);
      setError("The cards are shrouded in mystery right now. Please try again later.");
      setReading(null);
    } finally {
      setIsLoading(false);
    }
  };

  const positions: Array<'Past' | 'Present' | 'Future'> = ['Past', 'Present', 'Future'];

  return (
    <div className="bg-gradient-to-b from-[#2C1B13] to-[#511317] text-[#F3E9DD] min-h-screen py-12 md:py-24 relative overflow-hidden">
        <StarryBackground />
        <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="font-display text-4xl md:text-6xl font-black text-amber-200 mb-4">Ask the Cards</h1>
            <p className="max-w-xl mx-auto mb-8 text-amber-100/80">Focus your mind on a question and let the wisdom of the tarot guide you.</p>

            <div className="max-w-lg mx-auto mb-8">
                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="What do you seek to know...?"
                    rows={2}
                    className="w-full bg-white/10 border-2 border-amber-200/50 rounded-lg p-4 text-white placeholder-amber-100/50 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none transition-colors"
                    aria-label="Your question for the tarot reading"
                />
            </div>

            <button
                onClick={getTarotReading}
                disabled={isLoading}
                className="bg-[#D79A79] text-[#2C1B13] font-bold py-3 px-12 rounded-full hover:bg-[#A37B65] transition-all duration-300 shadow-lg text-lg disabled:bg-opacity-50 disabled:cursor-wait"
            >
                {isLoading ? 'Consulting the cosmos...' : 'Draw Your Cards'}
            </button>

            {error && <p className="text-red-400 mt-4" role="alert">{error}</p>}

            <div className="mt-16" aria-live="polite">
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto" style={{ perspective: '1000px' }}>
                    {positions.map((position, index) => {
                         const card = reading ? reading[index] : null;
                         return (
                            <div key={position} className={`card ${reading && isFlipped ? 'is-flipped' : ''}`} style={{ transitionDelay: `${index * 200}ms`}}>
                                <div className="card-inner">
                                    <div className="card-face card-face-front" aria-hidden="true">
                                        <div className={`${isLoading ? 'pulsating-glow' : ''}`} />
                                    </div>
                                    <div className="card-face card-face-back">
                                        {card ? (
                                            <>
                                                <p className="text-sm font-bold text-[#D79A79] uppercase tracking-widest">{card.position}</p>
                                                <h3 className="text-xl font-bold font-display text-[#F3E9DD] my-2">{card.card_name}</h3>
                                                <p className="text-sm text-amber-100/90">{card.interpretation}</p>
                                            </>
                                        ) : (
                                          <div className="w-full h-full bg-transparent"></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        <style>{`
            .card {
                background-color: transparent;
                width: 100%;
                height: 400px;
                border: none;
            }
            .card-inner {
                position: relative;
                width: 100%;
                height: 100%;
                text-align: center;
                transition: transform 0.8s;
                transform-style: preserve-3d;
            }
            .card.is-flipped .card-inner {
                transform: rotateY(180deg);
            }
            .card-face {
                position: absolute;
                width: 100%;
                height: 100%;
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
                border-radius: 1rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 1.5rem;
            }
            .card-face-front {
                background: linear-gradient(145deg, #6D4C41, #511317);
                border: 2px solid rgba(215, 187, 134, 0.5);
                box-shadow: 0 0 15px rgba(215, 187, 134, 0.2);
            }
            .pulsating-glow {
                width: 60px;
                height: 60px;
                background: radial-gradient(circle, rgba(215, 187, 134, 0.5) 0%, rgba(215, 187, 134, 0) 70%);
                border-radius: 50%;
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(215, 187, 134, 0.5); }
                70% { transform: scale(1); box-shadow: 0 0 0 20px rgba(215, 187, 134, 0); }
                100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(215, 187, 134, 0); }
            }
            .card-face-back {
                background: linear-gradient(145deg, #511317, #2C1B13);
                border: 1px solid #D79A79;
                color: white;
                transform: rotateY(180deg);
            }
        `}</style>
    </div>
  );
};

export default TarotReader;