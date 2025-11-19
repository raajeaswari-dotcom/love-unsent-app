

import React, { useState, useEffect } from 'react';
import type { CartItem, Product, PaperType } from '../App';
import { OpenWhenLetterImage } from './Image';
import PaperTypeSelector from './PaperTypeSelector';

interface OpenWhenLetterPageProps {
  navigate: (page: string, props?: any) => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  products: Product[];
  paperTypes: PaperType[];
}

const OpenWhenLetterPage: React.FC<OpenWhenLetterPageProps> = ({ navigate, addToCart, products, paperTypes }) => {
  const [letterCount, setLetterCount] = useState(5);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [headings, setHeadings] = useState<string[]>(Array(5).fill(''));
  const [price, setPrice] = useState(1999);
  const [selectedPaper, setSelectedPaper] = useState('Laid Texture Paper');
  const [inkColor, setInkColor] = useState('Blue');
  const [recipient, setRecipient] = useState('');

  const productDetails = products.find(p => p.name.toUpperCase() === "OPEN WHEN");
  const basePrice = productDetails?.price || 1999;
  const pricePerExtraLetter = 150;

  const filteredPaperTypes = productDetails?.availablePaperTypeIds
    ? paperTypes.filter(pt => productDetails.availablePaperTypeIds!.includes(pt.id))
    : paperTypes;

  useEffect(() => {
    setHeadings(prev => {
      const newHeadings = Array(letterCount).fill('');
      prev.forEach((h, i) => {
        if (i < letterCount) newHeadings[i] = h;
      });
      return newHeadings;
    });
    setCurrentLetterIndex(prev => Math.min(prev, letterCount - 1));
    setPrice(basePrice + Math.max(0, letterCount - 5) * pricePerExtraLetter);
  }, [letterCount, basePrice]);

  const handleLetterCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value, 10);
    setLetterCount(count);
  };

  const handleHeadingChange = (index: number, value: string) => {
    const newHeadings = [...headings];
    newHeadings[index] = value;
    setHeadings(newHeadings);
  };

  const handleAddToCart = () => {
    if (headings.every(h => !h.trim())) {
      alert("Please fill out at least one 'Open when...' heading.");
      return;
    }

    const formattedHeadings = headings.map((h, i) => `Letter ${i+1}: Open when ${h || '[Not specified]'}`).join('\n');
    const fullMessage = `Recipient Details:\n${recipient || 'N/A'}\n\n---\n\nLetter Headings:\n${formattedHeadings}`;

    addToCart({
      productName: `OPEN WHEN (${letterCount} Letters)`,
      price,
      quantity: 1,
      message: fullMessage,
      paperType: selectedPaper,
      inkColor: inkColor,
    });
    navigate('cart');
  };

  return (
    <div className="bg-[#F5EADF] text-[#5B2C23] py-12 md:py-24">
      <div className="container mx-auto px-6">
        <h1 className="font-display text-4xl md:text-5xl font-black text-center mb-4">OPEN WHEN</h1>
        <p className="text-center max-w-2xl mx-auto mb-12 text-lg">
          A timeless bundle of sealed letters to be opened at just the right moment. “Open when you feel lost,” “Open when you need a smile,” “Open when you forget how strong you are.” Each envelope carries comfort, laughter, or encouragement — like a hug on paper, waiting exactly when you need it most.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side: Image */}
          <div className="rounded-2xl flex items-center justify-center sticky top-28">
            <OpenWhenLetterImage context="page" />
          </div>

          {/* Right side: Form */}
          <div className="flex flex-col gap-8">
            <div className="bg-white/60 rounded-2xl p-6">
              <label htmlFor="letter-count" className="font-bold text-lg mb-2 block">No. of letters</label>
              <div className="relative">
                <select 
                  id="letter-count" 
                  className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-6 appearance-none focus:outline-none focus:ring-2 focus:ring-[#5B2C23]"
                  value={letterCount}
                  onChange={handleLetterCountChange}
                >
                  {Array.from({ length: 26 }, (_, i) => i + 5).map(number => (
                    <option key={number} value={number}>{number} Letters</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-xl">
                  <span>v</span>
                </div>
              </div>
              <p className="text-right font-bold text-lg mt-4">Price: ₹{price.toFixed(2)}</p>
            </div>

            <div className="bg-white/60 rounded-2xl p-6">
              <label className="font-bold text-lg mb-4 block">Your Letters</label>
              <div className="text-center text-sm font-bold mb-2">
                Letter {currentLetterIndex + 1} of {letterCount}
              </div>
              <textarea
                id={`heading-${currentLetterIndex}`}
                placeholder="Open when..."
                rows={4}
                value={headings[currentLetterIndex] || ''}
                onChange={(e) => handleHeadingChange(currentLetterIndex, e.target.value)}
                className="w-full bg-transparent border border-[#8C6653] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]"
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setCurrentLetterIndex(prev => prev - 1)}
                  disabled={currentLetterIndex === 0}
                  className="bg-[#5B2C23] text-white font-bold py-2 px-6 rounded-xl hover:bg-opacity-90 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentLetterIndex(prev => prev + 1)}
                  disabled={currentLetterIndex === letterCount - 1}
                  className="bg-[#5B2C23] text-white font-bold py-2 px-6 rounded-xl hover:bg-opacity-90 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
            
            <PaperTypeSelector selectedPaper={selectedPaper} onSelectPaper={setSelectedPaper} paperTypes={filteredPaperTypes} paperColor="Ivory" />

            <div className="bg-white/60 rounded-2xl p-6">
              <label className="font-bold text-lg mb-2 block">Select Ink colour</label>
              <div className="flex gap-4">
                <button onClick={() => setInkColor('Blue')} className={`w-10 h-10 rounded-full bg-[#002366] border-2 border-transparent ring-2 ring-offset-2 ring-offset-white/60 focus:outline-none ${inkColor === 'Blue' ? 'ring-[#5B2C23]' : 'ring-transparent'}`} aria-label="Select Blue Ink"></button>
                <button onClick={() => setInkColor('Red')} className={`w-10 h-10 rounded-full bg-[#B22222] border-2 border-transparent ring-2 ring-offset-2 ring-offset-white/60 focus:outline-none ${inkColor === 'Red' ? 'ring-[#5B2C23]' : 'ring-transparent'}`} aria-label="Select Red Ink"></button>
                <button onClick={() => setInkColor('Black')} className={`w-10 h-10 rounded-full bg-black border-2 border-transparent ring-2 ring-offset-2 ring-offset-white/60 focus:outline-none ${inkColor === 'Black' ? 'ring-[#5B2C23]' : 'ring-transparent'}`} aria-label="Select Black Ink"></button>
              </div>
            </div>

            <div className="bg-white/60 rounded-2xl p-6">
              <label htmlFor="recipient" className="font-bold text-lg mb-2 block">Recipient Details</label>
              <textarea 
                id="recipient" 
                rows={4}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-transparent border border-[#8C6653] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]"
                placeholder="Enter the recipient's name and address..."
              ></textarea>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={handleAddToCart}
            className="bg-[#5B2C23] text-white font-bold py-4 px-16 rounded-xl hover:bg-opacity-90 transition-all duration-300 shadow-[0_8px_16px_rgba(91,44,35,0.1)] text-lg"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenWhenLetterPage;