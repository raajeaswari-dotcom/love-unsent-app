import React, { useState, useMemo, useEffect } from 'react';
import type { Product, Occasion } from '../App';
import ProductCard from './ProductCard';
import { SearchIcon } from './Icons';

interface ShopPageProps {
  products: Product[];
  occasions: Occasion[];
  navigate: (page: string, props?: any) => void;
  initialCategory?: string; // For pre-filtering
}

const allCategories = [
    "All", "Classic Letters", "Letter Bundles", "Personal Letters", "Romantic Letters", "Sentimental Letters", "Guidance Letters"
];

const ShopPage: React.FC<ShopPageProps> = ({ products, occasions, navigate, initialCategory }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
    const [sortBy, setSortBy] = useState('default');

    useEffect(() => {
        if (initialCategory) {
            setSelectedCategory(initialCategory);
        }
    }, [initialCategory]);

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...products];

        if (searchTerm) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        switch (sortBy) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                 filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                 filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }

        return filtered;
    }, [products, searchTerm, selectedCategory, sortBy]);

    return (
        <div className="bg-[#F5EADF] text-[#5B2C23] py-12 md:py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="font-display text-4xl md:text-6xl font-black">Our Collection</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-[#8C6653]">
                        Find the perfect handwritten letter for every moment life brings.
                    </p>
                </div>

                {/* Filters and Controls */}
                <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-8 p-4 bg-white/50 rounded-2xl sticky top-36 z-40 shadow-sm">
                    <div className="relative w-full md:w-auto flex-grow">
                        <input
                            type="text"
                            placeholder="Search letters..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent border border-[#8C6653] rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]"
                        />
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon className="w-5 h-5 text-gray-400" /></div>
                    </div>
                    <div className="relative w-full md:w-auto">
                        <select 
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className="w-full bg-transparent border border-[#8C6653] rounded-full py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-[#5B2C23]"
                        >
                            <option value="default">Sort by Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="name-asc">Name: A to Z</option>
                            <option value="name-desc">Name: Z to A</option>
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-xl">v</div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Sidebar */}
                    <aside className="w-full md:w-64 bg-white/50 p-6 rounded-2xl sticky top-60">
                        <h3 className="font-bold text-xl mb-4 border-b pb-2 border-[#E9CBA7]">Categories</h3>
                        <ul className="space-y-2">
                            {allCategories.map(category => (
                                <li key={category}>
                                    <button 
                                        onClick={() => setSelectedCategory(category)}
                                        className={`w-full text-left p-2 rounded-lg transition-colors ${selectedCategory === category ? 'bg-[#8C6653] text-white font-semibold' : 'hover:bg-[#E9CBA7]'}`}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Product Grid */}
                    <main className="flex-1">
                        {filteredAndSortedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredAndSortedProducts.map(product => (
                                    <ProductCard key={product.id} product={product} navigate={navigate} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <h3 className="text-2xl font-bold">No Letters Found</h3>
                                <p className="text-[#8C6653] mt-2">Try adjusting your filters to find what you're looking for.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;