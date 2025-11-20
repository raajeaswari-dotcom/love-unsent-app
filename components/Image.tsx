import React from 'react';

const imageBaseClasses = "w-full h-full object-cover";
const pageImageBaseClasses = "rounded-xl shadow-[0_8px_16px_rgba(91,44,35,0.1)] w-full max-w-md";

export const HeroVideo: React.FC = () => (
  <video
    src="https://www.pexels.com/download/video/10203039/"
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover"
  />
);

export const ClassicLetterImage: React.FC<{ context?: 'card' | 'page' }> = ({ context = 'card' }) => (
  <img 
    src="https://images.pexels.com/photos/4207783/pexels-photo-4207783.jpeg?auto=compress&cs=tinysrgb&w=800" 
    alt="A classic letter being written on textured paper with an elegant fountain pen." 
    className={context === 'card' ? imageBaseClasses : pageImageBaseClasses}
  />
);

export const OpenWhenLetterImage: React.FC<{ context?: 'card' | 'page' }> = ({ context = 'card' }) => (
  <img 
    src="https://images.pexels.com/photos/7174415/pexels-photo-7174415.jpeg?auto=compress&cs=tinysrgb&w=800"
    alt="A beautiful stack of 'Open When' letters tied with a delicate white ribbon." 
    className={context === 'card' ? imageBaseClasses : pageImageBaseClasses}
  />
);

export const UnsentLetterImage: React.FC<{ context?: 'card' | 'page' }> = ({ context = 'card' }) => (
    <img 
      src="https://images.pexels.com/photos/4145146/pexels-photo-4145146.jpeg?auto=compress&cs=tinysrgb&w=800" 
      alt="A person writing a heartfelt 'Unsent Letter' at a desk, with an envelope nearby." 
      className={context === 'card' ? imageBaseClasses : pageImageBaseClasses}
    />
);

export const PSILoveYouImage: React.FC = () => (
    <img src="https://images.pexels.com/photos/669578/pexels-photo-669578.jpeg?auto=compress&cs=tinysrgb&w=800" alt="A close-up of a hand writing 'I love you' with a fountain pen, conveying a personal and heartfelt message." className={imageBaseClasses} />
);

export const GoodbyeWithLoveImage: React.FC = () => (
    <img src="https://images.pexels.com/photos/4226876/pexels-photo-4226876.jpeg?auto=compress&cs=tinysrgb&w=800" alt="A person pensively holding a letter, bathed in soft window light." className={imageBaseClasses} />
);

export const WhenYouStruggleImage: React.FC = () => (
    <img src="https://images.pexels.com/photos/3755707/pexels-photo-3755707.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Two hands holding each other for comfort and support, symbolizing encouragement." className={imageBaseClasses} />
);

export const TimeCapsuleImage: React.FC = () => (
    <img src="https://images.pexels.com/photos/7131301/pexels-photo-7131301.jpeg?auto=compress&cs=tinysrgb&w=800" alt="A letter sealed in a glass bottle, resting on the sand, symbolizing a message for the future." className={imageBaseClasses} />
);

export const DailyLittleThingsImage: React.FC = () => (
    <img src="https://images.pexels.com/photos/4245903/pexels-photo-4245903.jpeg?auto=compress&cs=tinysrgb&w=800" alt="A person writing in a journal, capturing daily moments with a warm cup of tea nearby." className={imageBaseClasses} />
);

export const OurStoryImage: React.FC = () => (
    <img src="https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=800" alt="A couple looking at old photographs together, reminiscing about their story." className={imageBaseClasses} />
);

export const ForAllSeasonsImage: React.FC = () => (
    <img src="https://images.pexels.com/photos/4198135/pexels-photo-4198135.jpeg?auto=compress&cs=tinysrgb&w=800" alt="A letter surrounded by beautiful dried flowers and leaves, representing changing seasons." className={imageBaseClasses} />
);

export const ApologyUnspokenImage: React.FC = () => (
    <img src="https://images.pexels.com/photos/3784144/pexels-photo-3784144.jpeg?auto=compress&cs=tinysrgb&w=800" alt="A handwritten letter with a single delicate flower on it, representing a thoughtful apology." className={imageBaseClasses} />
);

export const WordsOfWisdomImage: React.FC = () => (
    <img src="https://images.pexels.com/photos/6231819/pexels-photo-6231819.jpeg?auto=compress&cs=tinysrgb&w=800" alt="A person writing thoughtfully in a journal, bathed in warm light." className={imageBaseClasses} />
);

export const LoveNoteImage: React.FC = () => (
    <img src="https://images.pexels.com/photos/4607733/pexels-photo-4607733.jpeg?auto=compress&cs=tinysrgb&w=800" alt="A small love note tucked into the pages of a vintage book with flowers." className={imageBaseClasses} />
);

export const PoemImage: React.FC = () => (
    <img src="https://images.pexels.com/photos/3747148/pexels-photo-3747148.jpeg?auto=compress&cs=tinysrgb&w=800" alt="A poem being written on a vintage typewriter, surrounded by books and a cup of coffee." className={imageBaseClasses} />
);

export const BirthdayWishImage: React.FC = () => (
    <img src="https://images.pexels.com/photos/6572520/pexels-photo-6572520.jpeg?auto=compress&cs=tinysrgb&w=800" alt="A person writing a heartfelt message on a birthday card with a cake nearby." className={imageBaseClasses} />
);