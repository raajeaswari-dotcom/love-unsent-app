

import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
// FIX: Corrected import path for App.tsx
import type { CartItem, Product, Occasion, PaperType } from '../App';
import { ClassicLetterImage } from './Image';
import PaperTypeSelector from './PaperTypeSelector';
import HandwritingSelector from './HandwritingSelector';
import { SparklesIcon } from './Icons';
import { paperQualityLevels, gsmOptions, letterStyles, paperColors } from '../data/category-mapping.js';


interface ClassicLetterPageProps {
  navigate: (page: string, props?: any) => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  productName?: string; // This is the pre-selected occasion name or product name
  products: Product[];
  occasions: Occasion[];
  paperTypes: PaperType[];
}

const CustomSelect: React.FC<{
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}> = ({ label, id, value, onChange, options }) => (
  <div>
    <label htmlFor={id} className="font-bold text-lg mb-2 block">{label}</label>
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-[#5B2C23]"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-xl text-[#5B2C23]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
      </div>
    </div>
  </div>
);


const ClassicLetterPage: React.FC<ClassicLetterPageProps> = ({ navigate, addToCart, productName, products, occasions, paperTypes }) => {
  const [selectedPaper, setSelectedPaper] = useState('Cotton Rag Paper');
  const [writingStyle, setWritingStyle] = useState('Cursive');
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const [occasion, setOccasion] = useState('');
  
  const [language, setLanguage] = useState('English');
  const [paperQuality, setPaperQuality] = useState('Premium Paper');
  const [gsm, setGsm] = useState('120–150 GSM (Premium Weight)');
  const [style, setStyle] = useState('Vintage');
  const [paperColor, setPaperColor] = useState('Ivory');

  // Identify if the incoming productName is a generic product or a specific occasion
  const isGenericProduct = products.some(p => p.name.toUpperCase() === productName?.toUpperCase() && p.name.toUpperCase() !== 'CLASSIC');
  const productKeyForDetails = isGenericProduct ? productName!.toUpperCase() : 'CLASSIC';

  const productDetails = products.find(p => p.name.toUpperCase() === productKeyForDetails) || products.find(p => p.name.toUpperCase() === 'CLASSIC');

  useEffect(() => {
    // If a generic product name like "P.S. I LOVE YOU" is passed, set it as the occasion
    if (isGenericProduct) {
        setOccasion(productName || '');
    } else if (occasions && occasions.length > 0) {
        const preselected = occasions.find(o => o.name === productName);
        if (preselected) {
            setOccasion(preselected.name);
        } else {
            setOccasion(occasions[0].name);
        }
    }
  }, [productName, occasions, isGenericProduct]);


  const price = productDetails?.price || 1499;
  
  const filteredPaperTypes = productDetails?.availablePaperTypeIds
    ? paperTypes.filter(pt => productDetails.availablePaperTypeIds!.includes(pt.id))
    : paperTypes;

  const selectedOccasionDetails = occasions.find(o => o.name === occasion);
  const description = selectedOccasionDetails?.description || productDetails?.description || "Pour your heart onto paper with our timeless Classic Letter. Perfect for any occasion, this is your chance to send a message that will be cherished for years to come.";
  const pageTitle = occasion || productName || "Classic Letter";
  
  const handleAddToCart = () => {
    if (!productDetails) return;
    if (!message.trim()) {
        alert("Please write a message for your letter.");
        return;
    }
    addToCart({
      productName: pageTitle,
      price: productDetails.price,
      quantity: 1,
      message,
      occasion,
      language,
      writingStyle,
      paperType: selectedPaper,
      paperQuality,
      gsm,
      style,
      paperColor,
    });
    navigate('cart');
  };

  const handleAiHelp = async () => {
    setError('');
    setIsGenerating(true);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const prompt = `You are a romantic and heartfelt letter writing assistant for a service called "Love Unsent". A user wants to write a letter for a "${occasion}" occasion in ${language}. Their current draft is: "${message}". Please refine this draft to be more emotional, elegant, and beautiful, while keeping the original sentiment. If the draft is empty, please generate a short, touching letter (around 100 words) suitable for the occasion "${occasion}" in ${language}.`;
        
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
    <div className="bg-[#F5EADF] text-[#5B2C23] py-12 md:py-24">
      <div className="container mx-auto px-6">
        <h1 className="font-display text-4xl md:text-5xl font-black text-center mb-4 capitalize">{pageTitle.toLowerCase()}</h1>
        <p className="text-center max-w-2xl mx-auto mb-12 text-lg">
          {description}
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side: Image */}
          <div className="rounded-2xl flex items-center justify-center sticky top-40">
            <ClassicLetterImage context="page" />
          </div>

          {/* Right side: Form */}
          <div className="flex flex-col gap-8">
            <div className="bg-white/60 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-2">
                 <label htmlFor="message" className="font-bold text-lg block">Your Message</label>
                 <button 
                    onClick={handleAiHelp}
                    disabled={isGenerating}
                    className="flex items-center gap-2 bg-[#8C6653] text-white text-sm font-bold py-2 px-4 rounded-xl hover:bg-opacity-90 transition-all duration-300 disabled:bg-opacity-50"
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
                className="w-full bg-transparent border border-[#8C6653] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]"
                placeholder="Pour your heart out here, or click 'AI Help' to get started..."
                required
              ></textarea>
              {error && <p className="text-red-800 text-sm mt-2">{error}</p>}
            </div>
            
            <div className="bg-white/60 rounded-2xl p-6 space-y-6">
               <CustomSelect
                  label="Occasion"
                  id="occasion"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  options={isGenericProduct ? [occasion] : occasions.map(o => o.name)}
                />
               <div>
                  <label className="font-bold text-lg mb-2 block">Language</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2"><input type="radio" name="language" value="English" checked={language === 'English'} onChange={(e) => setLanguage(e.target.value)} className="text-[#5B2C23] focus:ring-[#5B2C23]" /> English</label>
                    <label className="flex items-center gap-2"><input type="radio" name="language" value="Tamil" checked={language === 'Tamil'} onChange={(e) => setLanguage(e.target.value)} className="text-[#5B2C23] focus:ring-[#5B2C23]" /> Tamil</label>
                  </div>
               </div>
            </div>

            <div className="bg-white/60 rounded-2xl p-6 space-y-6">
                <CustomSelect
                  label="Paper Quality"
                  id="paperQuality"
                  value={paperQuality}
                  onChange={(e) => setPaperQuality(e.target.value)}
                  options={Object.keys(paperQualityLevels)}
                />
                <CustomSelect
                  label="Paper Thickness (GSM)"
                  id="gsm"
                  value={gsm}
                  onChange={(e) => setGsm(e.target.value)}
                  options={gsmOptions}
                />
                <CustomSelect
                  label="Letter Style"
                  id="style"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  options={letterStyles}
                />
                 <CustomSelect
                  label="Paper Color"
                  id="paperColor"
                  value={paperColor}
                  onChange={(e) => setPaperColor(e.target.value)}
                  options={paperColors}
                />
            </div>

            <PaperTypeSelector selectedPaper={selectedPaper} onSelectPaper={setSelectedPaper} paperColor={paperColor} paperTypes={filteredPaperTypes} />
            
            <div className="bg-white/60 rounded-2xl p-6">
              <HandwritingSelector selectedStyle={writingStyle} onSelectStyle={setWritingStyle} />
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

export default ClassicLetterPage;