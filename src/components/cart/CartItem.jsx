import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary-200 transition-colors mb-4 group">
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-bold text-slate-800">{item.name}</h3>
          <p className="text-slate-500 text-sm">{item.category}</p>
          <div className="sm:hidden mt-2 font-bold text-primary-600">
            ${item.price}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto mt-4 sm:mt-0 sm:space-x-12">
        <div className="flex items-center bg-slate-100 rounded-lg p-1">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-1 hover:bg-white rounded-md transition-colors text-slate-500"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-bold text-slate-700">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1 hover:bg-white rounded-md transition-colors text-slate-500"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="hidden sm:block font-bold text-slate-900 w-24 text-right">
          ${(item.price * item.quantity).toFixed(2)}
        </div>

        <button 
          onClick={() => removeFromCart(item.id)}
          className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
