import React from 'react';

// This data should ideally come from a dynamic source, but for this component it's fine.
const productCategories = [
  { 
    name: "Romantic Letters",
    imageUrl: "https://images.pexels.com/photos/669578/pexels-photo-669578.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  { 
    name: "Sentimental Letters",
    imageUrl: "https://images.pexels.com/photos/4226876/pexels-photo-4226876.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  { 
    name: "Letter Bundles",
    imageUrl: "https://images.pexels.com/photos/7174415/pexels-photo-7174415.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  { 
    name: "Personal Letters",
    imageUrl: "https://images.pexels.com/photos/4145146/pexels-photo-4145146.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  { 
    name: "Guidance Letters",
    imageUrl: "https://images.pexels.com/photos/6231819/pexels-photo-6231819.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  { 
    name: "Classic Letters",
    imageUrl: "https://images.pexels.com/photos/4207783/pexels-photo-4207783.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];


interface CategoryCardProps {
  name: string;
  imageUrl: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, imageUrl, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-[#F5EADF] p-3 md:p-4 rounded-2xl shadow-[0_8px_16px_rgba(91,44,35,0.1)] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(91,44,35,0.15)] group"
    style={{ backfaceVisibility: 'hidden' }}
  >
    <div className="overflow-hidden rounded-lg mb-4">
      <img 
        src={imageUrl} 
        alt={name} 
        className="w-full h-full object-cover aspect-[3/4] transition-transform duration-500 group-hover:scale-110" 
      />
    </div>
    <h3 className="font-subheading text-lg md:text-xl font-bold text-[#5B2C23] text-center">
      {name}
    </h3>
  </button>
);


interface CategoriesProps {
    navigate: (page: string, props?: any) => void;
}

const Categories: React.FC<CategoriesProps> = ({ navigate }) => {
  return (
    <section className="bg-[#8C6653] py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F5EADF] mb-4">
          Explore Our Categories
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-[#F5EADF]/80 mb-16">
            From declarations of love to words of comfort, discover a category that speaks to your heart.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {productCategories.map((category) => (
            <CategoryCard 
              key={category.name} 
              name={category.name} 
              imageUrl={category.imageUrl}
              onClick={() => navigate('shop', { initialCategory: category.name })}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;