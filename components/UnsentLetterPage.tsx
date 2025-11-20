

import React, { useState } from 'react';
import type { CartItem, Product, PaperType } from '../App';
import { UnsentLetterImage } from './Image';
import PaperTypeSelector from './PaperTypeSelector';

interface UnsentLetterPageProps {
  navigate: (page: string, props?: any) => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  products: Product[];
  paperTypes: PaperType[];
}

const UnsentLetterPage: React.FC<UnsentLetterPageProps> = ({ navigate, addToCart, products, paperTypes }) => {
  const [selectedPaper, setSelectedPaper] = useState('Laid Texture Paper');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [inkColor, setInkColor] = useState('Blue');
  const productName = "UNSENT";
  
  const productDetails = products.find(p => p.name.toUpperCase() === productName.toUpperCase());
  const price = productDetails?.price || 1199;

  const filteredPaperTypes = productDetails?.availablePaperTypeIds
    ? paperTypes.filter(pt => productDetails.availablePaperTypeIds!.includes(pt.id))
    : paperTypes;

  const handleAddToCart = () => {
    if (!productDetails) return;
    if (!message.trim()) {
        alert("Please write a message for your letter.");
        return;
    }
    const fullMessage = `Recipient Note:\n${recipient || 'N/A'}\n\n---\n\nLetter Content:\n${message}`;
    addToCart({
      productName: productDetails.name,
      price: productDetails.price,
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
        <h1 className="font-display text-4xl md:text-5xl font-black text-center mb-4">{productName}</h1>
        <p className="text-center max-w-2xl mx-auto mb-12 text-lg">
          Some words are meant just for you. The Unsent Letter is a space to express your deepest thoughts and feelings without the pressure of sending them. It's a powerful way to find closure, process emotions, and speak your truth, sealed for your eyes only.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side: Image */}
          <div className="rounded-2xl flex items-center justify-center sticky top-28">
            <UnsentLetterImage context="page" />
          </div>

          {/* Right side: Form */}
          <div className="flex flex-col gap-8">
            <div className="bg-white/60 rounded-2xl p-6">
              <label htmlFor="message" className="font-bold text-lg mb-2 block">your message</label>
              <textarea 
                id="message" 
                rows={12}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Pour your heart out here..."
                required
                className="w-full bg-transparent border border-[#8C6653] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]"
              ></textarea>
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
              <label htmlFor="recipient" className="font-bold text-lg mb-2 block">Recipient Note (For Your Reference)</label>
              <textarea 
                id="recipient" 
                rows={4}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Recipient's name or a note for yourself. This letter will not be sent."
                className="w-full bg-transparent border border-[#8C6653] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={handleAddToCart}
            className="bg-[#5B2C23] text-white font-bold py-4 px-16 rounded-xl hover:bg-opacity-90 transition-all duration-300 shadow-[0_8px_16px_rgba(91,44,35,0.1)] text-lg"
          >
            ADD TO CART - ₹{price.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnsentLetterPage;