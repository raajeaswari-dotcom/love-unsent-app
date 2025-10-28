import React, { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import { 
  ClassicLetterImage, 
  OpenWhenLetterImage, 
  UnsentLetterImage,
  PSILoveYouImage,
  GoodbyeWithLoveImage,
  WhenYouStruggleImage,
  TimeCapsuleImage,
  DailyLittleThingsImage,
  OurStoryImage,
  ForAllSeasonsImage,
  ApologyUnspokenImage,
  WordsOfWisdomImage
} from './Image';

interface LetterCardProps {
  title: string;
  ImageComponent: React.FC;
  onCustomise: () => void;
}

const LetterCard: React.FC<LetterCardProps> = ({ title, ImageComponent, onCustomise }) => {
  return (
    <div className="flex-shrink-0 w-96 rounded-3xl p-6 flex flex-col justify-between items-center h-[30rem] border-2 border-[#2C1B13]">
      <h3 className="font-display text-2xl font-black text-center text-[#2C1B13] whitespace-nowrap">
        {title}
      </h3>
      <div className="flex-grow w-full my-4 rounded-xl overflow-hidden">
        <ImageComponent />
      </div>
      <button 
        onClick={onCustomise}
        className="bg-[#511317] text-white py-2 px-10 rounded-full hover:bg-opacity-90 transition-all duration-300 w-full"
      >
        CUSTOMISE
      </button>
    </div>
  );
};

const letters = [
  { title: "CLASSIC", ImageComponent: ClassicLetterImage },
  { title: "OPEN WHEN", ImageComponent: OpenWhenLetterImage },
  { title: "UNSENT", ImageComponent: UnsentLetterImage },
  { title: "P.S. I LOVE YOU", ImageComponent: PSILoveYouImage },
  { title: "GOOD BYE WITH LOVE", ImageComponent: GoodbyeWithLoveImage },
  { title: "WHEN YOU STRUGGLE", ImageComponent: WhenYouStruggleImage },
  { title: "TIME CAPSULE", ImageComponent: TimeCapsuleImage },
  { title: "DAILY LITTLE THINGS", ImageComponent: DailyLittleThingsImage },
  { title: "OUR STORY", ImageComponent: OurStoryImage },
  { title: "FOR ALL SEASONS", ImageComponent: ForAllSeasonsImage },
  { title: "AN APOLOGY UNSPOKEN", ImageComponent: ApologyUnspokenImage },
  { title: "WORDS OF WISDOM", ImageComponent: WordsOfWisdomImage }
];


interface LetterOptionsProps {
  navigate: (page: string, props?: any) => void;
}

const LetterOptions: React.FC<LetterOptionsProps> = ({ navigate }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="shop" className="bg-[#F3E9DD] py-20 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-[#2C1B13] mb-16 text-center">
          Our Collection
        </h2>
        
        <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 hidden md:block">
            <button onClick={() => scroll('left')} className="p-2 rounded-full bg-white/50 hover:bg-white transition-colors shadow-md">
                <ChevronLeftIcon />
            </button>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10 hidden md:block">
            <button onClick={() => scroll('right')} className="p-2 rounded-full bg-white/50 hover:bg-white transition-colors shadow-md">
                <ChevronRightIcon />
            </button>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pb-8 no-scrollbar"
        >
          {letters.map(letter => (
            <LetterCard 
              key={letter.title} 
              title={letter.title} 
              ImageComponent={letter.ImageComponent}
              onCustomise={() => {
                if (letter.title === "OPEN WHEN") {
                  navigate('open-when-letter');
                } else if (letter.title === "UNSENT") {
                  navigate('unsent-letter');
                } else {
                  navigate('classic-letter', { productName: letter.title });
                }
              }} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LetterOptions;