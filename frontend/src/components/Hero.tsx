import React from 'react';
import { HeroVideo } from './Image';

interface HeroProps {
  navigate: (page: string, props?: any, anchor?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ navigate }) => {
  return (
    <section className="container mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="md:w-1/3 text-center md:text-left flex flex-col items-center md:items-start gap-40">
        <h2 className="font-display text-5xl lg:text-7xl font-black text-[#F3E9DD] leading-none">
          Say it<br/>with ink ❤️
        </h2>
        <button
          onClick={() => navigate('home', {}, 'shop')}
          className="bg-[#511317] text-white text-sm py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-lg">
          Write Your Letter
        </button>
      </div>
      <div className="w-full md:w-2/3">
        <HeroVideo />
      </div>
    </section>
  );
};

export default Hero;