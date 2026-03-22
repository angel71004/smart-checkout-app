import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-slate-100">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all" />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded-full uppercase tracking-wider">
            {product.category}
          </span>
          <div className="flex items-center text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold ml-1 text-slate-700">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-800 mb-2 truncate" title={product.name}>
          {product.name}
        </h3>
        
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">
            ${product.price.toLocaleString()}
          </span>
          <button 
            onClick={() => addToCart(product)}
            className="p-3 bg-slate-900 text-white rounded-xl hover:bg-primary-600 transition-colors shadow-sm"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
