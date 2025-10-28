import React, { useState } from 'react';
// FIX: Corrected import path for App.tsx
import { CartItem, Product } from '../../../App';
import { UnsentLetterImage } from './Image';
import PaperTypeSelector from './PaperTypeSelector';

interface UnsentLetterPageProps {
  navigate: (page: string, props?: any) => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  products: Product[];
}

const UnsentLetterPage: React.FC<UnsentLetterPageProps> = ({ navigate, addToCart, products }) => {
  const [selectedPaper, setSelectedPaper] = useState('Classic Laid');
  const productName = "UNSENT";
  
  const productDetails = products.find(p => p.name.toUpperCase() === productName.toUpperCase());
  const price = productDetails?.price || 1199;

  const handleAddToCart = () => {
    if (!productDetails) return;
    addToCart({
      productName: productDetails.name,
      price: productDetails.price,
      quantity: 1,
    });
    navigate('cart');
  };

  return (
    <div className="bg-[#B97C80] text-[#2C1B13] py-12 md:py-24">
      <div className="container mx-auto px-6">
        <h1 className="font-display text-4xl md:text-5xl font-black text-center mb-4">{productName}</h1>
        <p className="text-center max-w-2xl mx-auto mb-12 text-lg">
          Some words are meant just for you. The Unsent Letter is a space to express your deepest thoughts and feelings without the pressure of sending them. It's a powerful way to find closure, process emotions, and speak your truth, sealed for your eyes only.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side: Image */}
          <div className="rounded-3xl flex items-center justify-center sticky top-28">
            <UnsentLetterImage context="page" />
          </div>

          {/* Right side: Form */}
          <div className="flex flex-col gap-8">
            <div className="bg-[#F3E9DD] rounded-3xl p-6">
              <label htmlFor="message" className="font-bold text-lg mb-2 block">your message</label>
              <textarea 
                id="message" 
                rows={12}
                className="w-full bg-transparent border border-black rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-[#511317]"
              ></textarea>
            </div>
            
            <div className="bg-[#F3E9DD] rounded-3xl p-6">
              <PaperTypeSelector selectedPaper={selectedPaper} onSelectPaper={setSelectedPaper} />

              <label className="font-bold text-lg mt-6 mb-2 block">Select Ink colour</label>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-[#002366] border-2 border-transparent ring-2 ring-offset-2 ring-offset-[#F3E9DD] ring-transparent focus:ring-black focus:outline-none" aria-label="Select Blue Ink"></button>
                <button className="w-10 h-10 rounded-full bg-[#B22222] border-2 border-transparent ring-2 ring-offset-2 ring-offset-[#F3E9DD] ring-transparent focus:ring-black focus:outline-none" aria-label="Select Red Ink"></button>
                <button className="w-10 h-10 rounded-full bg-black border-2 border-transparent ring-2 ring-offset-2 ring-offset-[#F3E9DD] ring-transparent focus:ring-black focus:outline-none" aria-label="Select Black Ink"></button>
              </div>
            </div>

            <div className="bg-[#F3E9DD] rounded-3xl p-6">
              <label htmlFor="recipient" className="font-bold text-lg mb-2 block">Recipient Details</label>
              <textarea 
                id="recipient" 
                rows={4}
                className="w-full bg-transparent border border-black rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-[#511317]"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={handleAddToCart}
            className="bg-[#511317] text-white font-bold py-4 px-16 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-lg text-lg"
          >
            ADD TO CART - ₹{price.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnsentLetterPage;