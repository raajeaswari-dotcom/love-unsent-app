import React, { useState, useMemo } from 'react';
// FIX: Corrected import path for App.tsx
import { CartItem } from '../../../App';

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
    <div className="bg-[#F3E9DD] text-[#2C1B13] min-h-screen py-12 md:py-24">
      <div className="container mx-auto px-6">
        <h1 className="font-display text-4xl md:text-5xl font-black mb-12 text-center">Your Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center max-w-md mx-auto">
              <p className="text-lg mb-6">Your cart is currently empty.</p>
              <button
                  onClick={() => navigate('home', {}, 'shop')}
                  className="bg-[#511317] text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-lg"
              >
                  Continue Shopping
              </button>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-start border-b border-gray-400 pb-4">
                  <div>
                    <h2 className="font-bold text-lg capitalize">{item.productName.toLowerCase()}</h2>
                    <div className="text-sm text-gray-600 mt-1">
                      {item.occasion && <p>Occasion: {item.occasion}</p>}
                      {item.language && <p>Language: {item.language}</p>}
                      {item.writingStyle && <p>Style: {item.writingStyle}</p>}
                    </div>
                    <p className="font-bold text-[#511317] mt-2">₹{item.price.toFixed(2)}</p>
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

            <div className="mt-8 border-t border-gray-400 pt-6">
                <h3 className="text-xl font-bold mb-4">Add a special touch</h3>
                <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all bg-white/50">
                        <div>
                            <span className="font-semibold">Gift Wrapping</span>
                            <p className="text-sm text-gray-600">Have your letter beautifully wrapped.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-[#511317]">+ ₹{ADD_ON_COSTS.giftWrap.toFixed(2)}</span>
                            <input type="checkbox" checked={giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} className="h-5 w-5 rounded text-[#511317] focus:ring-[#511317]" />
                        </div>
                    </label>
                     <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all bg-white/50">
                        <div>
                            <span className="font-semibold">Add Perfume</span>
                            <p className="text-sm text-gray-600">A light, romantic scent on the paper.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-[#511317]">+ ₹{ADD_ON_COSTS.perfume.toFixed(2)}</span>
                            <input type="checkbox" checked={perfume} onChange={(e) => setPerfume(e.target.checked)} className="h-5 w-5 rounded text-[#511317] focus:ring-[#511317]" />
                        </div>
                    </label>
                </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-400 text-right space-y-2">
              <p className="text-lg">Subtotal: <span className="font-semibold">₹{subtotal.toFixed(2)}</span></p>
              {giftWrap && <p className="text-lg">Gift Wrap: <span className="font-semibold">₹{giftWrapCost.toFixed(2)}</span></p>}
              {perfume && <p className="text-lg">Perfume: <span className="font-semibold">₹{perfumeCost.toFixed(2)}</span></p>}
              <p className="text-2xl font-bold">
                Total: <span className="text-[#511317]">₹{total.toFixed(2)}</span>
              </p>
              <button
                onClick={handleCheckout}
                className="bg-[#511317] text-white font-bold py-3 px-12 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-lg mt-6"
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