import React from 'react';

const paperTypes = [
  { 
    name: 'Classic Laid', 
    imageUrl: 'https://images.unsplash.com/photo-1619468129361-605ebea04b44?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    name: 'Parchment', 
    imageUrl: 'https://images.unsplash.com/photo-1593113593922-421164289457?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    name: 'Linen', 
    imageUrl: 'https://images.unsplash.com/photo-1588265910555-3255b7f0412a?q=80&w=800&auto=format&fit=crop' 
  },
];

interface PaperTypeSelectorProps {
  selectedPaper: string;
  onSelectPaper: (paper: string) => void;
}

const PaperTypeSelector: React.FC<PaperTypeSelectorProps> = ({ selectedPaper, onSelectPaper }) => {
  return (
    <div>
      <label className="font-bold text-lg mb-2 block">Select Paper type</label>
      <div className="flex gap-4">
        {paperTypes.map((paper) => (
          <button
            key={paper.name}
            onClick={() => onSelectPaper(paper.name)}
            className={`w-16 h-16 rounded-full border-2 border-transparent ring-2 ring-offset-2 ring-offset-[#F3E9DD] ring-transparent focus:outline-none transition-all duration-200 ${
              selectedPaper === paper.name ? 'ring-black' : ''
            }`}
            aria-label={`Select ${paper.name} paper`}
            title={paper.name}
          >
            <img 
              src={paper.imageUrl} 
              alt={`${paper.name} paper texture`} 
              className="w-full h-full object-cover rounded-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaperTypeSelector;