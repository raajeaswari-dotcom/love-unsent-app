import React from 'react';

const imageBaseClasses = "w-full h-full object-cover";
const pageImageBaseClasses = "rounded-lg shadow-lg w-full max-w-md";

export const HeroVideo: React.FC = () => (
  <video
    src="https://www.pexels.com/download/video/10203039/"
    autoPlay
    loop
    muted
    playsInline
    className="rounded-3xl shadow-2xl w-full object-cover aspect-[2/1]"
  >
    Your browser does not support the video tag.
  </video>
);

export const HeroImage: React.FC = () => (
  <img 
    src="https://images.unsplash.com/photo-1518064903523-6617882d49c6?q=80&w=2070&auto=format&fit=crop" 
    alt="A romantic flat lay scene with a handwritten letter, an envelope sealed with wax, and delicate flowers."
    className="rounded-3xl shadow-2xl w-full object-cover aspect-[2/1]"
  />
);

export const ClassicLetterImage: React.FC<{ context?: 'card' | 'page' }> = ({ context = 'card' }) => (
  <img 
    src="https://storage.googleapis.com/aistudio-hosting/image-49e083c2-d35b-4351-a08b-4b1368fd6093.jpeg" 
    alt="A personal handwritten letter displayed next to its envelope, which has a pink floral stamp." 
    className={context === 'card' ? imageBaseClasses : pageImageBaseClasses}
  />
);

export const OpenWhenLetterImage: React.FC<{ context?: 'card' | 'page' }> = ({ context = 'card' }) => (
  <img 
    src="https://images.unsplash.com/photo-1562443252-c36216c52b41?q=80&w=800&auto=format&fit=crop" 
    alt="A bundle of 'Open When' letters tied with a red ribbon, ready for sending." 
    className={context === 'card' ? imageBaseClasses : pageImageBaseClasses}
  />
);

export const UnsentLetterImage: React.FC<{ context?: 'card' | 'page' }> = ({ context = 'card' }) => (
    <img 
      src="https://images.unsplash.com/photo-1520492142442-c24599a2a3e6?q=80&w=800&auto=format&fit=crop" 
      alt="A person writing a heartfelt 'Unsent Letter' at a desk, with an envelope nearby." 
      className={context === 'card' ? imageBaseClasses : pageImageBaseClasses}
    />
);

export const PSILoveYouImage: React.FC = () => (
    <img src="https://images.unsplash.com/photo-1550950387-cb94602f2324?q=80&w=800&auto=format&fit=crop" alt="P.S. I LOVE YOU" className={imageBaseClasses} />
);

export const GoodbyeWithLoveImage: React.FC = () => (
    <img src="https://images.unsplash.com/photo-1515671765102-12002f237f37?q=80&w=800&auto=format&fit=crop" alt="GOOD BYE WITH LOVE" className={imageBaseClasses} />
);

export const WhenYouStruggleImage: React.FC = () => (
    <img src="https://images.unsplash.com/photo-1589137213809-5147854655f0?q=80&w=800&auto=format&fit=crop" alt="WHEN YOU STRUGGLE" className={imageBaseClasses} />
);

export const TimeCapsuleImage: React.FC = () => (
    <img src="https://images.unsplash.com/photo-1599580500482-35a1a37c35de?q=80&w=800&auto=format&fit=crop" alt="TIME CAPSULE" className={imageBaseClasses} />
);

export const DailyLittleThingsImage: React.FC = () => (
    <img src="https://images.unsplash.com/photo-1489269979201-642642272740?q=80&w=800&auto=format&fit=crop" alt="DAILY LITTLE THINGS" className={imageBaseClasses} />
);

export const OurStoryImage: React.FC = () => (
    <img src="https://images.unsplash.com/photo-1541845157-a3d8b4b1a415?q=80&w=800&auto=format&fit=crop" alt="OUR STORY" className={imageBaseClasses} />
);

export const ForAllSeasonsImage: React.FC = () => (
    <img src="https://images.unsplash.com/photo-1506781961370-37a89d6b384a?q=80&w=800&auto=format&fit=crop" alt="FOR ALL SEASONS" className={imageBaseClasses} />
);

export const ApologyUnspokenImage: React.FC = () => (
    <img src="https://images.unsplash.com/photo-1456327102063-fb50545b7b71?q=80&w=800&auto=format&fit=crop" alt="AN APOLOGY UNSPOKEN" className={imageBaseClasses} />
);

export const WordsOfWisdomImage: React.FC = () => (
    <img src="https://images.unsplash.com/photo-1593113646773-4621c1a51167?q=80&w=800&auto=format&fit=crop" alt="WORDS OF WISDOM" className={imageBaseClasses} />
);