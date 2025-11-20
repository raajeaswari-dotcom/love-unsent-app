
import React, { useState, useMemo } from 'react';
import type { CartItem } from '../App';

interface CartPageProps {
  navigate: (page: string, props?: any, anchor?: string) => void;
  cart: CartItem[];
  removeFromCart: (itemId: number) => void;
}

const ADD_ON_COSTS = {
  giftWrap: 49,
  perfume: 250, // This was not in the prompt, keeping it as is.
};

const CartPage: React.FC<CartPageProps> = ({ navigate, cart, removeFromCart }) => {
  const [giftWrap, setGiftWrap] = useState(false);
  const [perfume, setPerfume] = useState(false);

  const subtotal = useMemo(() => cart.reduce((total, item) => total + item.price, 0), [cart]);
  const giftWrapCost = giftWrap ? ADD_ON_COSTS.giftWrap : 0;
  const perfumeCost = perfume ? ADD_ON_COSTS.perfume : 0;
  const total = subtotal + giftWrapCost + perfumeCost;
  
  const handleCheckout = () => {
    navigate('checkout', { 
        cart, 
        addOnCosts: { giftWrap: giftWrapCost, perfume: perfumeCost }
    });
  };

  return (
    <div className="bg-[#F5EADF] text-[#5B2C23] min-h-screen py-12 md:py-24">
      <div className="container mx-auto px-6">
        <h1 className="font-display text-4xl md:text-5xl font-black mb-12 text-center">Your Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center max-w-md mx-auto">
              <p className="text-lg mb-6">Your cart is currently empty.</p>
              <button
                  onClick={() => navigate('home', {}, 'shop')}
                  className="bg-[#5B2C23] text-white font-bold py-3 px-8 rounded-xl hover:bg-opacity-90 transition-all duration-300 shadow-[0_8px_16px_rgba(91,44,35,0.1)]"
              >
                  Continue Shopping
              </button>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-start border-b border-[#E9CBA7] pb-4">
                  <div>
                    <h2 className="font-bold text-lg capitalize">{item.productName.toLowerCase()}</h2>
                    <div className="text-sm text-[#8C6653] mt-1 space-y-1">
                      {item.occasion && <p>Occasion: {item.occasion}</p>}
                      {item.language && <p>Language: {item.language}</p>}
                      {item.writingStyle && <p>Writing Style: {item.writingStyle}</p>}
                      {item.style && <p>Letter Style: {item.style}</p>}
                      {item.paperType && <p>Paper: {item.paperType} ({item.paperQuality}, {item.paperColor}, {item.gsm})</p>}
                      {item.inkColor && <p>Ink: {item.inkColor}</p>}
                      {item.message && (
                          <details className="mt-2">
                              <summary className="cursor-pointer font-semibold">View Message</summary>
                              <p className="mt-1 p-2 bg-white/50 rounded whitespace-pre-wrap text-xs">{item.message}</p>
                          </details>
                      )}
                    </div>
                    <p className="font-bold text-[#5B2C23] mt-2">₹{item.price.toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 hover:text-red-600 font-bold transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-[#E9CBA7] pt-6">
                <h3 className="text-xl font-bold mb-4">Add a special touch</h3>
                <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 border border-[#E9CBA7] rounded-xl cursor-pointer transition-all bg-white/50">
                        <div>
                            <span className="font-semibold">Gift Wrapping</span>
                            <p className="text-sm text-[#8C6653]">Have your letter beautifully wrapped.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-[#5B2C23]">+ ₹{ADD_ON_COSTS.giftWrap.toFixed(2)}</span>
                            <input type="checkbox" checked={giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} className="h-5 w-5 rounded text-[#5B2C23] focus:ring-[#5B2C23]" />
                        </div>
                    </label>
                     <label className="flex items-center justify-between p-4 border border-[#E9CBA7] rounded-xl cursor-pointer transition-all bg-white/50">
                        <div>
                            <span className="font-semibold">Add Perfume</span>
                            <p className="text-sm text-[#8C6653]">A light, romantic scent on the paper.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-[#5B2C23]">+ ₹{ADD_ON_COSTS.perfume.toFixed(2)}</span>
                            <input type="checkbox" checked={perfume} onChange={(e) => setPerfume(e.target.checked)} className="h-5 w-5 rounded text-[#5B2C23] focus:ring-[#5B2C23]" />
                        </div>
                    </label>
                </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-[#E9CBA7] text-right space-y-2">
              <p className="text-lg">Subtotal: <span className="font-semibold">₹{subtotal.toFixed(2)}</span></p>
              {giftWrap && <p className="text-lg">Gift Wrap: <span className="font-semibold">₹{giftWrapCost.toFixed(2)}</span></p>}
              {perfume && <p className="text-lg">Perfume: <span className="font-semibold">₹{perfumeCost.toFixed(2)}</span></p>}
              <p className="text-2xl font-bold">
                Total: <span className="text-[#5B2C23]">₹{total.toFixed(2)}</span>
              </p>
              <button
                onClick={handleCheckout}
                className="bg-[#5B2C23] text-white font-bold py-3 px-12 rounded-xl hover:bg-opacity-90 transition-all duration-300 shadow-[0_8px_16px_rgba(91,44,35,0.1)] mt-6"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
