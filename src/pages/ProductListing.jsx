import React, { useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

const ProductListing = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0 text-center md:text-left">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Featured Collection</h1>
          <p className="text-slate-500">Discover our handpicked premium selection.</p>
        </div>
        
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <div className="flex items-center mr-4 text-slate-400">
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium whitespace-nowrap">Filter by:</span>
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                filter === cat 
                  ? 'bg-slate-900 text-white shadow-lg' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">No products found for this category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
