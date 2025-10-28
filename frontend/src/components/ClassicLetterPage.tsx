import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
// FIX: Corrected import path for App.tsx
import { CartItem, Product } from '../../../App';
import { ClassicLetterImage } from './Image';
import PaperTypeSelector from './PaperTypeSelector';
import HandwritingSelector from './HandwritingSelector';
import { SparklesIcon } from './Icons';


interface ClassicLetterPageProps {
  navigate: (page: string, props?: any) => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  productName?: string;
  products: Product[];
}

const descriptions: { [key: string]: string } = {
  "CLASSIC": "Pour your heart onto paper with our timeless Classic Letter. Perfect for any occasion, this is your chance to send a message that will be cherished for years to come. Every word is handwritten with care, sealed with wax, and sent with love.",
  "P.S. I LOVE YOU": "Three simple words, a universe of meaning. This letter is dedicated to the purest expression of love, a keepsake for your special someone to hold close to their heart. Say it once more, with feeling.",
  "GOOD BYE WITH LOVE": "Saying goodbye is never easy, but it can be done with grace and love. This letter offers a way to express your final thoughts, share cherished memories, and find peace for both you and the recipient.",
  "WHEN YOU STRUGGLE": "A beacon of hope for difficult times. Write a letter of encouragement, support, and unwavering belief in someone's strength. It's a powerful reminder that they are not alone and that this, too, shall pass.",
  "TIME CAPSULE": "Capture a moment in time. Write a letter to a future self, a child on their graduation, or a loved one on a future anniversary. Seal your thoughts, memories, and hopes, and let time work its magic.",
  "DAILY LITTLE THINGS": "Celebrate the beauty of the ordinary. This letter is for capturing the small, everyday moments that make life so rich—a shared laugh, a quiet morning, a favorite song. It's a tapestry of the little things that mean everything.",
  "OUR STORY": "Every relationship has a story. Recount your journey together, from the first hello to the present moment. A beautiful way to reminisce, celebrate your bond, and fall in love all over again.",
  "FOR ALL SEASONS": "A letter for every season of life and love. Whether it's the bloom of spring or the quiet of winter, this is a space to reflect on the changing nature of your journey together, celebrating every phase.",
  "AN APOLOGY UNSPOKEN": "Sometimes, 'sorry' is the hardest word to say. This letter provides a sanctuary for your regrets, a place to articulate your apology with the sincerity it deserves, whether you choose to send it or keep it for your own peace.",
  "WORDS OF WISDOM": "Share the lessons you've learned, the advice you hold dear, or the guidance you wish you'd received. A timeless gift of wisdom, passed from one heart to another, to be treasured for a lifetime."
};


const ClassicLetterPage: React.FC<ClassicLetterPageProps> = ({ navigate, addToCart, productName = "CLASSIC", products }) => {
  const [selectedPaper, setSelectedPaper] = useState('Classic Laid');
  const [writingStyle, setWritingStyle] = useState('Cursive');
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [occasion, setOccasion] = useState('Love');
  const [language, setLanguage] = useState('English');

  const productDetails = products.find(p => p.name.toUpperCase() === productName.toUpperCase());

  const description = descriptions[productName] || descriptions["CLASSIC"];
  const price = productDetails?.price || 1499;

  const handleAddToCart = () => {
    if (!productDetails) return;
    if (!message.trim()) {
        alert("Please write a message for your letter.");
        return;
    }
    addToCart({
      productName: productDetails.name,
      price: productDetails.price,
      quantity: 1,
      message,
      occasion,
      language,
      writingStyle,
    });
    navigate('cart');
  };

  const handleAiHelp = async () => {
    setError('');
    setIsGenerating(true);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const prompt = `You are a romantic and heartfelt letter writing assistant for a service called "Love Unsent". A user wants to write a "${productName}" letter for a "${occasion}" occasion in ${language}. Their current draft is: "${message}". Please refine this draft to be more emotional, elegant, and beautiful, while keeping the original sentiment. If the draft is empty, please generate a short, touching letter (around 100 words) suitable for the theme "${productName}" and occasion "${occasion}" in ${language}.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        setMessage(response.text);

    } catch (err) {
        console.error("Error generating AI message:", err);
        setError("Sorry, I couldn't come up with anything right now. Please try again.");
    } finally {
        setIsGenerating(false);
    }
  };
  
  return (
    <div className="bg-[#B97C80] text-[#2C1B13] py-12 md:py-24">
      <div className="container mx-auto px-6">
        <h1 className="font-display text-4xl md:text-5xl font-black text-center mb-4">{productName}</h1>
        <p className="text-center max-w-2xl mx-auto mb-12 text-lg">
          {description}
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side: Image */}
          <div className="rounded-3xl flex items-center justify-center sticky top-40">
            <ClassicLetterImage context="page" />
          </div>

          {/* Right side: Form */}
          <div className="flex flex-col gap-8">
            <div className="bg-[#F3E9DD] rounded-3xl p-6">
              <div className="flex justify-between items-center mb-2">
                 <label htmlFor="message" className="font-bold text-lg block">Your Message</label>
                 <button 
                    onClick={handleAiHelp}
                    disabled={isGenerating}
                    className="flex items-center gap-2 bg-[#A37B65] text-white text-sm font-bold py-2 px-4 rounded-full hover:bg-opacity-90 transition-all duration-300 disabled:bg-opacity-50"
                  >
                    <SparklesIcon className="w-4 h-4" />
                    {isGenerating ? 'Thinking...' : 'AI Help'}
                 </button>
              </div>
              <textarea 
                id="message" 
                rows={12}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent border border-black rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-[#511317]"
                placeholder="Pour your heart out here, or click 'AI Help' to get started..."
                required
              ></textarea>
              {error && <p className="text-red-800 text-sm mt-2">{error}</p>}
            </div>
            
            <div className="bg-[#F3E9DD] rounded-3xl p-6 space-y-6">
               <div>
                  <label htmlFor="occasion" className="font-bold text-lg mb-2 block">Occasion</label>
                  <select id="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)} className="w-full bg-transparent border border-black rounded-full py-3 px-6 appearance-none focus:outline-none focus:ring-2 focus:ring-[#511317]">
                    <option>Love</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                    <option>Friendship</option>
                  </select>
               </div>
               <div>
                  <label className="font-bold text-lg mb-2 block">Language</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2"><input type="radio" name="language" value="English" checked={language === 'English'} onChange={(e) => setLanguage(e.target.value)} className="text-[#511317] focus:ring-[#511317]" /> English</label>
                    <label className="flex items-center gap-2"><input type="radio" name="language" value="Tamil" checked={language === 'Tamil'} onChange={(e) => setLanguage(e.target.value)} className="text-[#511317] focus:ring-[#511317]" /> Tamil</label>
                  </div>
               </div>
            </div>

            <div className="bg-[#F3E9DD] rounded-3xl p-6">
              <PaperTypeSelector selectedPaper={selectedPaper} onSelectPaper={setSelectedPaper} />
              <HandwritingSelector selectedStyle={writingStyle} onSelectStyle={setWritingStyle} />
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

export default ClassicLetterPage;