import React from 'react';
import type { Product } from '../App';

interface ProductCardProps {
  product: Product;
  navigate: (page: string, props?: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, navigate }) => {
  const handleProductClick = () => {
    let page = 'classic-letter'; // Default
    if (product.name.toUpperCase().includes('OPEN WHEN')) {
      page = 'open-when-letter';
    } else if (product.name.toUpperCase().includes('UNSENT')) {
      page = 'unsent-letter';
    } else {
       // For other products like "P.S. I LOVE YOU", direct them to the classic letter page
       // with the product name pre-selected as the occasion.
       page = 'classic-letter';
    }
    navigate(page, { productName: product.name });
  };

  return (
    <div className="bg-white/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
      <div className="overflow-hidden aspect-[3/4]">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4 text-center flex flex-col">
        <h3 className="font-bold text-lg text-[#5B2C23] truncate h-7">{product.name}</h3>
        <p className="text-sm text-[#8C6653] h-10 overflow-hidden my-1 flex-grow">{product.description}</p>
        <p className="font-bold text-xl my-2 text-[#5B2C23]">₹{product.price.toFixed(2)}</p>
        <button onClick={handleProductClick} className="w-full bg-[#8C6653] text-white font-bold py-2 px-4 rounded-xl hover:bg-[#5B2C23] transition-colors mt-auto">
          Customize
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
