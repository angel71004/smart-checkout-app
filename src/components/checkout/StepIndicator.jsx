import React from 'react';
import { Check } from 'lucide-react';

const steps = [
  { id: 'cart', label: 'Cart' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' }
];

const StepIndicator = ({ currentStep }) => {
  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="flex items-center justify-between max-w-2xl mx-auto mb-12">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;
        
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                isCompleted 
                  ? 'bg-primary-600 text-white' 
                  : isActive 
                    ? 'bg-slate-900 text-white ring-4 ring-primary-100' 
                    : 'bg-white border-2 border-slate-200 text-slate-400'
              }`}>
                {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              <span className={`absolute -bottom-7 text-xs font-semibold whitespace-nowrap ${
                isActive ? 'text-slate-900' : 'text-slate-400'
              }`}>
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-4 bg-slate-100 relative">
                <div 
                  className="absolute inset-0 bg-primary-600 transition-all duration-500 ease-in-out" 
                  style={{ width: isCompleted ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;
