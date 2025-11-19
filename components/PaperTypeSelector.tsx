
import React, { useState, useEffect } from 'react';
import type { PaperType } from '../App';

interface PaperTypeSelectorProps {
  selectedPaper: string;
  onSelectPaper: (paper: string) => void;
  paperColor: string;
  paperTypes: PaperType[];
}

const colorMap: { [key: string]: string } = {
  'White': 'transparent',
  'Ivory': 'rgba(255, 253, 240, 0.3)',
  'Brown Kraft': 'rgba(210, 180, 140, 0.2)',
  'Pastel Pink': 'rgba(255, 221, 229, 0.4)',
  'Pastel Blue': 'rgba(204, 229, 255, 0.4)',
  'Pastel Lavender': 'rgba(230, 230, 250, 0.4)',
  'Gold/Silver Pearl': 'rgba(240, 230, 140, 0.15)'
};

const PaperTypeSelector: React.FC<PaperTypeSelectorProps> = ({ selectedPaper, onSelectPaper, paperColor, paperTypes }) => {
  const [previewPaper, setPreviewPaper] = useState<PaperType | null>(null);

  useEffect(() => {
    if (paperTypes && paperTypes.length > 0) {
        const initialPaper = paperTypes.find(p => p.name === selectedPaper) || paperTypes[0];
        setPreviewPaper(initialPaper);
    }
  }, [selectedPaper, paperTypes]);

  if (!previewPaper || !paperTypes || paperTypes.length === 0) {
    return <div className="bg-white/60 rounded-2xl p-6"><p>Loading paper types...</p></div>;
  }

  return (
    <div className="bg-white/60 rounded-2xl p-6">
      <label className="font-bold text-lg mb-4 block">Select Your Canvas</label>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Preview Pane */}
        <div className="md:sticky top-40">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-inner bg-[#E9CBA7]/50 mb-4">
             <img 
              src={previewPaper.imageUrl} 
              alt={`Preview of ${previewPaper.name} paper`}
              className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
            />
            <div
              className="absolute inset-0 transition-colors duration-300 pointer-events-none"
              style={{
                backgroundColor: colorMap[paperColor] || 'transparent',
                mixBlendMode: 'multiply',
              }}
            ></div>
          </div>
          <div className="text-center">
            <h4 className="font-bold text-lg">{previewPaper.name}</h4>
            <p className="text-sm text-[#5B2C23]/90 mt-1">{previewPaper.description}</p>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 self-start">
          {paperTypes.map((paper) => (
            <button
              key={paper.name}
              onClick={() => onSelectPaper(paper.name)}
              onMouseEnter={() => setPreviewPaper(paper)}
              className={`relative w-full aspect-square rounded-full border-2 border-transparent ring-2 ring-offset-2 ring-offset-white/60 focus:outline-none transition-all duration-200 ${
                selectedPaper === paper.name ? 'ring-[#5B2C23]' : 'ring-transparent'
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
    </div>
  );
};

export default PaperTypeSelector;
