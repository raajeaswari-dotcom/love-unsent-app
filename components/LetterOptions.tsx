
import React from 'react';
import { mainCategories, subCategories } from '../data/category-mapping.js';

// Define the structure for our letter categories
interface LetterCategory {
  icon: string;
  title: string;
  items: string[];
}

const letterCategories: LetterCategory[] = mainCategories.map(category => ({
    icon: category.icon,
    title: category.name,
    items: subCategories[category.name as keyof typeof subCategories] || []
}));


interface LetterOptionsProps {
  navigate: (page: string, props?: any) => void;
}

const LetterOptions: React.FC<LetterOptionsProps> = ({ navigate }) => {
  return (
    <section id="shop" className="bg-[#F5EADF] py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-subheading text-[#5B2C23] mb-4">
              Our Letter Catalogue
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-[#8C6653]">
                Beautifully crafted handwritten letters for every occasion & emotion.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {letterCategories.filter(c => c.items.length > 0).map((category) => (
            <div key={category.title} className="bg-white/60 rounded-2xl p-6 border-2 border-transparent hover:border-[#8C6653] transition-all duration-300 shadow-sm hover:shadow-lg">
              <h3 className="font-display text-2xl font-black text-[#5B2C23] mb-4">
                <span className="mr-2">{category.icon}</span>
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => {
                        const productName = item.includes('Bundle') ? 'OPEN WHEN' : 'CLASSIC';
                        const pageName = productName === 'OPEN WHEN' ? 'open-when-letter' : 'classic-letter';
                        navigate(pageName, { productName: item });
                      }}
                      className="text-left w-full text-[#5B2C23] hover:text-[#8C6653] hover:underline transition-colors duration-200"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LetterOptions;
