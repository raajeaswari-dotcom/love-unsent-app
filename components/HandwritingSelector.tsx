import React from 'react';

const styles = [
  { 
    name: 'Cursive', 
    fontClass: 'font-display' 
  },
  { 
    name: 'Normal', 
    fontClass: 'font-sans'
  },
];

interface HandwritingSelectorProps {
  selectedStyle: string;
  onSelectStyle: (style: string) => void;
}

const HandwritingSelector: React.FC<HandwritingSelectorProps> = ({ selectedStyle, onSelectStyle }) => {
  return (
    <div className="mt-6">
      <label className="font-bold text-lg mb-2 block">Select Handwriting Style</label>
      <div className="flex gap-4">
        {styles.map((style) => (
          <button
            key={style.name}
            onClick={() => onSelectStyle(style.name)}
            className={`px-6 py-2 rounded-full border-2 text-lg transition-all duration-200 ${
              selectedStyle === style.name 
                ? 'bg-[#5B2C23] text-white border-transparent' 
                : 'bg-transparent border-[#8C6653] hover:bg-[#E9CBA7]'
            } ${style.fontClass}`}
          >
            {style.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HandwritingSelector;