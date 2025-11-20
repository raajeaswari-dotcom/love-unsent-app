import React from 'react';
import { HeroVideo } from './Image';

interface HeroProps {
  navigate: (page: string, props?: any, anchor?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ navigate }) => {
  const line1 = "Say it";
  const line2 = "with ink "; // Keep the trailing space

  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center text-[#F5EADF] overflow-hidden">
      <HeroVideo />
      <div className="absolute inset-0 bg-[#5B2C23] opacity-40"></div>
      <div className="relative z-10 px-6 flex flex-col items-center gap-40">
        <h1 className="font-display text-5xl lg:text-7xl font-black leading-none drop-shadow-md">
          <span className="block whitespace-pre-wrap">
            {line1.split("").map((char, index) => (
              <span
                key={`line1-${index}`}
                className="animate-fade-in"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                {char}
              </span>
            ))}
          </span>
          <span className="block whitespace-pre-wrap">
            {line2.split("").map((char, index) => (
              <span
                key={`line2-${index}`}
                className="animate-fade-in"
                style={{ animationDelay: `${0.5 + (line1.length + index) * 0.1}s` }}
              >
                {char}
              </span>
            ))}
            <span
              className="inline-block animate-heartbeat"
              style={{ animationDelay: `${0.5 + (line1.length + line2.length) * 0.1}s` }}
            >
              ❤️
            </span>
          </span>
        </h1>
        <button
          onClick={() => navigate('shop')}
          className="bg-[#F5EADF] text-[#5B2C23] text-sm py-3 px-8 rounded-xl hover:bg-opacity-90 transition-all duration-300 shadow-[0_8px_16px_rgba(91,44,35,0.1)]"
        >
          Write Your Letter
        </button>
      </div>
    </section>
  );
};

export default Hero;