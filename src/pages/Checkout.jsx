import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import StepIndicator from '../components/checkout/StepIndicator';
import { ArrowLeft, ArrowRight, CreditCard, Lock, ShieldCheck, Truck } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, subtotal, tax, shippingCost, total, checkoutData, setCheckoutData, clearCart } = useCart();
  const [step, setStep] = useState('shipping'); // shipping, payment, review
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (section, field, value) => {
    setCheckoutData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/confirmation');
      // clearCart() should be called after navigation or in useEffect on confirmation page
    }, 2000);
  };

  const renderShipping = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Truck className="w-6 h-6 mr-2 text-primary-600" />
          Shipping Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-600">First Name</label>
            <input 
              type="text" 
              className="input-field" 
              value={checkoutData.shipping.firstName}
              onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
              placeholder="John"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-600">Last Name</label>
            <input 
              type="text" 
              className="input-field" 
              value={checkoutData.shipping.lastName}
              onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
              placeholder="Doe"
            />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-sm font-semibold text-slate-600">Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              value={checkoutData.shipping.email}
              onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-sm font-semibold text-slate-600">Street Address</label>
            <input 
              type="text" 
              className="input-field" 
              value={checkoutData.shipping.address}
              onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
              placeholder="123 Smart St."
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-600">City</label>
            <input 
              type="text" 
              className="input-field" 
              value={checkoutData.shipping.city}
              onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-600">State</label>
              <input 
                type="text" 
                className="input-field" 
                value={checkoutData.shipping.state}
                onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-600">ZIP</label>
              <input 
                type="text" 
                className="input-field" 
                value={checkoutData.shipping.zip}
                onChange={(e) => handleInputChange('shipping', 'zip', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4">Shipping Method</h3>
        <div className="space-y-3">
          {[
            { id: 'standard', name: 'Standard Shipping', time: '3-5 business days', price: 0 },
            { id: 'express', name: 'Express Shipping', time: '1-2 business days', price: 15 },
            { id: 'overnight', name: 'Overnight Shipping', time: 'Next business day', price: 25 }
          ].map(method => (
            <label 
              key={method.id}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                checkoutData.shipping.method === method.id 
                  ? 'border-primary-600 bg-primary-50' 
                  : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="flex items-center">
                <input 
                  type="radio" 
                  name="shippingMethod"
                  className="w-5 h-5 text-primary-600 mr-4 focus:ring-primary-500"
                  checked={checkoutData.shipping.method === method.id}
                  onChange={() => handleInputChange('shipping', 'method', method.id)}
                />
                <div>
                  <p className="font-bold text-slate-800">{method.name}</p>
                  <p className="text-sm text-slate-500">{method.time}</p>
                </div>
              </div>
              <span className="font-bold text-slate-900">
                {method.price === 0 ? 'Free' : `$${method.price}`}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button 
          onClick={() => setStep('payment')}
          className="btn-primary flex items-center"
        >
          Continue to Payment
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <CreditCard className="w-6 h-6 mr-2 text-primary-600" />
          Payment Information
        </h2>
        <div className="bg-slate-900 rounded-3xl p-8 mb-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 opacity-20 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div className="w-12 h-8 bg-amber-400 rounded-md opacity-80" />
              <ShieldCheck className="w-8 h-8 opacity-50" />
            </div>
            <div className="text-2xl font-mono tracking-widest mb-8">
              {checkoutData.payment.cardNumber || '•••• •••• •••• ••••'}
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] uppercase opacity-50 mb-1">Card Holder</p>
                <p className="font-medium tracking-wide uppercase">{checkoutData.payment.cardName || 'YOUR NAME'}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase opacity-50 mb-1">Expires</p>
                <p className="font-medium">{checkoutData.payment.expiry || 'MM/YY'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 space-y-1">
            <label className="text-sm font-semibold text-slate-600">Cardholder Name</label>
            <input 
              type="text" 
              className="input-field" 
              value={checkoutData.payment.cardName}
              onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-sm font-semibold text-slate-600">Card Number</label>
            <input 
              type="text" 
              className="input-field" 
              value={checkoutData.payment.cardNumber}
              onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().substring(0, 19))}
              placeholder="0000 0000 0000 0000"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-600">Expiry Date</label>
            <input 
              type="text" 
              className="input-field" 
              value={checkoutData.payment.expiry}
              onChange={(e) => handleInputChange('payment', 'expiry', e.target.value)}
              placeholder="MM/YY"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-600">CVV</label>
            <input 
              type="password" 
              className="input-field" 
              value={checkoutData.payment.cvv}
              onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
              placeholder="•••"
              maxLength={3}
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl flex items-start space-x-3">
        <Lock className="w-5 h-5 text-slate-400 mt-0.5" />
        <p className="text-xs text-slate-500">
          Your payment information is encrypted and securely processed. We do not store your full card details.
        </p>
      </div>

      <div className="flex justify-between pt-4">
        <button 
          onClick={() => setStep('shipping')}
          className="btn-secondary flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Shipping
        </button>
        <button 
          onClick={() => setStep('review')}
          className="btn-primary flex items-center"
        >
          Review Order
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Review Your Order</h2>
      
      <div className="bg-white rounded-3xl border border-slate-100 divide-y divide-slate-100">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Shipping To</h3>
            <button onClick={() => setStep('shipping')} className="text-primary-600 text-sm font-bold hover:underline">Edit</button>
          </div>
          <p className="text-slate-600 text-sm">
            {checkoutData.shipping.firstName} {checkoutData.shipping.lastName}<br />
            {checkoutData.shipping.address}<br />
            {checkoutData.shipping.city}, {checkoutData.shipping.state} {checkoutData.shipping.zip}<br />
            {checkoutData.shipping.country}<br />
            <span className="font-medium text-slate-800">Method: {checkoutData.shipping.method === 'overnight' ? 'Overnight' : checkoutData.shipping.method === 'express' ? 'Express' : 'Standard'} Shipping</span>
          </p>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Payment Method</h3>
            <button onClick={() => setStep('payment')} className="text-primary-600 text-sm font-bold hover:underline">Edit</button>
          </div>
          <div className="flex items-center space-x-3">
            <CreditCard className="w-5 h-5 text-slate-400" />
            <p className="text-slate-600 text-sm font-mono tracking-wider">
              •••• •••• •••• {checkoutData.payment.cardNumber.slice(-4) || '••••'}
            </p>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-bold text-slate-800 mb-4">Items in Order</h3>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-slate-800 line-clamp-1">{item.name}</p>
                    <p className="text-slate-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button 
          onClick={() => setStep('payment')}
          className="btn-secondary flex items-center"
          disabled={isProcessing}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Payment
        </button>
        <button 
          onClick={handlePlaceOrder}
          className="btn-primary min-w-[200px] flex items-center justify-center relative overflow-hidden"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Place Order ${total.toFixed(2)}
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      <StepIndicator currentStep={step} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        <div className="lg:col-span-2">
          {step === 'shipping' && renderShipping()}
          {step === 'payment' && renderPayment()}
          {step === 'review' && renderReview()}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm sticky top-28">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-slate-500">
                <span>Items Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="h-px bg-slate-100 w-full my-2" />
              <div className="flex justify-between text-xl font-extrabold text-slate-900">
                <span>Final Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-2 text-slate-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-widest">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
