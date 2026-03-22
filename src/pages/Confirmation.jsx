import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Package, Calendar, ArrowRight, ShoppingBag } from 'lucide-react';

const Confirmation = () => {
  const { clearCart } = useCart();
  const orderNumber = Math.floor(Math.random() * 90000000) + 10000000;
  
  // Get date in 5 days
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const formattedDate = deliveryDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  useEffect(() => {
    // Clear the cart when the confirmation page is loaded
    clearCart();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-12 text-center fade-in">
      <div className="mb-10 relative inline-block">
        <div className="absolute inset-0 bg-primary-100 rounded-full scale-150 opacity-20 animate-pulse" />
        <CheckCircle2 className="w-24 h-24 text-primary-600 relative z-10 mx-auto" />
      </div>

      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Thank you for your order!</h1>
      <p className="text-slate-500 text-lg mb-10 max-w-md mx-auto">
        Your order has been placed successfully. We'll send you a confirmation email with details shortly.
      </p>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl mb-12 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="pb-8 md:pb-0 md:pr-8">
            <div className="flex items-center space-x-3 mb-4">
              <Package className="w-5 h-5 text-primary-600" />
              <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Order Number</h3>
            </div>
            <p className="text-2xl font-black text-slate-900">#{orderNumber}</p>
          </div>
          
          <div className="pt-8 md:pt-0 md:pl-8">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="w-5 h-5 text-primary-600" />
              <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Est. Delivery</h3>
            </div>
            <p className="text-xl font-bold text-slate-900">{formattedDate}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Link to="/" className="btn-primary inline-flex items-center group">
          <ShoppingBag className="w-5 h-5 mr-2" />
          Continue Shopping
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
        <button className="btn-secondary">
          Track My Order
        </button>
      </div>
      
      <p className="mt-12 text-slate-400 text-sm">
        Questions? Contact our support at <span className="font-bold text-slate-600">support@smartshop.com</span>
      </p>
    </div>
  );
};

export default Confirmation;
