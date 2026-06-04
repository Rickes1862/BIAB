import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, Ticket, Sparkles, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: string, q: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeItem,
  clearCart
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0); // active discount rate e.g., 0.15 = 15%
  const [promoApplied, setPromoApplied] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // States for checkout process inside cart drawer
  const [isCheckout, setIsCheckout] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '4111 2222 3333 4444',
    expiry: '12/28',
    cvv: '123'
  });

  if (!isOpen) return null;

  const totalOriginalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const FREE_SHIPPING_THRESHOLD = 50;
  const shippingCost = totalOriginalPrice >= FREE_SHIPPING_THRESHOLD || totalOriginalPrice === 0 ? 0 : 5.95;
  
  // Promo code verification
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'BIABNUDES' || code === 'WELCOME15') {
      setDiscount(0.15);
      setPromoApplied(code);
      setPromoError(null);
    } else if (code === 'FREESHIP' && totalOriginalPrice > 0) {
      setDiscount(0.1); // 10% off for testing
      setPromoApplied(code);
      setPromoError(null);
    } else {
      setPromoError('Invalid coupon. Try WELCOME15 for 15% off.');
      setPromoApplied(null);
    }
  };

  const discountAmount = totalOriginalPrice * discount;
  const finalSubtotal = totalOriginalPrice - discountAmount;
  const finalTotal = finalSubtotal + shippingCost;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.fullName || !formData.address) {
      alert('Please fill out all required shipping fields.');
      return;
    }
    setIsOrdered(true);
  };

  const handleResetCart = () => {
    clearCart();
    setIsOrdered(false);
    setIsCheckout(false);
    setPromoApplied(null);
    setPromoCode('');
    onClose();
  };

  const triggerFillDemo = () => {
    setFormData({
      email: 'alex.nailpro@gmail.com',
      fullName: 'Alex Reynolds',
      address: '742 Everlasting Blush Lane',
      city: 'Beverly Hills',
      zip: '90210',
      cardNumber: '4111 5555 9999 1121',
      expiry: '10/29',
      cvv: '985'
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop overlay */}
        <div 
          onClick={onClose} 
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        ></div>

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md">
            <div className="flex h-full flex-col overflow-y-scroll bg-stone-50 shadow-2xl border-l border-stone-200">
              
              {/* Header */}
              <div className="px-6 py-5 border-b border-stone-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-stone-900" />
                  <h2 className="text-lg font-serif font-semibold text-stone-900">
                    {isCheckout ? 'Express Secure Checkout' : 'My Selection'}
                  </h2>
                </div>
                <button 
                  onClick={onClose} 
                  className="rounded-full p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Promo alerts */}
              {!isCheckout && !isOrdered && cart.length > 0 && (
                <div className="bg-rose-50 border-b border-rose-100 py-2.5 px-6 flex items-center justify-between text-xs font-sans text-rose-800">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Apply code <strong>WELCOME15</strong> for 15% off!
                  </span>
                  <button 
                    onClick={() => { setPromoCode('WELCOME15'); setDiscount(0.15); setPromoApplied('WELCOME15'); }}
                    className="underline hover:text-rose-950 font-bold transition-all cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              )}

              {/* Main Content Area */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                
                {isOrdered ? (
                  /* Success/Ordered State */
                  <div className="text-center py-12 space-y-6 flex flex-col items-center justify-center h-full">
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-100 mb-2 animate-bounce">
                      <Check className="w-10 h-10 text-emerald-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-3xl leading-snug">Order Confirmed!</h3>
                      <p className="text-stone-600 font-sans text-sm max-w-sm mx-auto">
                        Your beauty parcel is being processed. Natural nail reinforcement is on the way to <strong>{formData.fullName || 'you'}</strong>.
                      </p>
                    </div>
                    
                    <div className="bg-white border border-stone-200/80 rounded-2xl p-5 text-left w-full space-y-3 shadow-sm text-xs">
                      <p className="text-stone-500 font-sans tracking-wide uppercase font-bold text-[10px]">Parcel Details</p>
                      <div className="flex justify-between font-mono">
                        <span className="text-stone-500">Order ID:</span>
                        <span className="font-semibold text-stone-900">#BIAB-{(Math.floor(Math.random() * 89999) + 10000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500 font-sans">Sent to:</span>
                        <span className="font-semibold text-stone-900 font-sans">{formData.email}</span>
                      </div>
                      <div className="flex justify-between border-t border-stone-100 pt-2 font-mono">
                        <span className="text-stone-500 font-sans">Payment via Card:</span>
                        <span className="font-semibold text-stone-900">•••• •••• •••• {formData.cardNumber.slice(-4)}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleResetCart}
                      className="w-full bg-stone-900 hover:bg-stone-800 text-stone-50 py-4 rounded-full font-medium tracking-wide transition-colors uppercase text-sm mt-4 cursor-pointer"
                    >
                      Return to Store
                    </button>
                    <p className="text-stone-400 text-[11px] italic font-sans flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-stone-400" />
                      Zero-friction Guarantee: Shipped with love.
                    </p>
                  </div>

                ) : isCheckout ? (
                  /* Checkout Shipping and Card Form */
                  <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                    <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
                      <h4 className="font-serif text-lg font-medium text-stone-900">Shipping Credentials</h4>
                      <button 
                        type="button"
                        onClick={triggerFillDemo}
                        className="text-[10px] text-rose-500 font-bold bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-full uppercase tracking-wider transition-all"
                      >
                        Auto-Fill Demo
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1.5">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="your.email@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1.5">Recipient Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="First & Last Name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1.5">Delivery Address</label>
                        <input
                          type="text"
                          required
                          placeholder="Street Address, Apt, Suite"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1.5">City</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. New York"
                            value={formData.city}
                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1.5">ZIP Code</label>
                          <input
                            type="text"
                            required
                            placeholder="ZIP/Postal Code"
                            value={formData.zip}
                            onChange={(e) => setFormData({...formData, zip: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-stone-200/60 pt-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-lg font-medium text-stone-900">Secure Payment</h4>
                        <div className="flex items-center gap-1.5 bg-stone-100 text-[10px] uppercase font-mono px-2 py-0.5 rounded text-stone-500">
                          <ShieldCheck className="w-3.5 h-3.5 text-stone-900" />
                          Encrypted
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1.5">Card Number</label>
                          <input
                            type="text"
                            required
                            placeholder="4111 2222 3333 4444"
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white text-sm font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1.5">Expiry Date</label>
                            <input
                              type="text"
                              required
                              placeholder="MM/YY"
                              value={formData.expiry}
                              onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white text-sm font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1.5">Secure CVV</label>
                            <input
                              type="password"
                              required
                              maxLength={4}
                              placeholder="CSC/CVV"
                              value={formData.cvv}
                              onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white text-sm font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-stone-100 rounded-2xl p-4 text-xs space-y-2 border border-stone-200">
                      <div className="flex justify-between">
                        <span>Original Order Subtotal:</span>
                        <span>${totalOriginalPrice.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-rose-600 font-medium">
                          <span>Promo code discount:</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Carbon-Neutral Delivery:</span>
                        <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between border-t border-stone-200 pt-2 font-bold text-sm text-stone-900">
                        <span>Charged Subtotal:</span>
                        <span>${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsCheckout(false)}
                        className="w-1/3 border border-stone-300 text-stone-600 hover:text-stone-900 hover:bg-stone-100 py-3.5 rounded-full font-medium tracking-wide text-xs transition-colors cursor-pointer"
                      >
                        Back to Cart
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 bg-stone-900 hover:bg-stone-800 text-stone-50 py-3.5 rounded-full font-medium tracking-wide text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Place Order — ${finalTotal.toFixed(2)}</span>
                      </button>
                    </div>
                  </form>
                ) : cart.length === 0 ? (
                  /* Empty Cart State */
                  <div className="text-center py-20 flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-300">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-xl tracking-tight">Your bag is empty</h3>
                      <p className="text-stone-500 font-sans text-xs max-w-[240px] mx-auto">
                        Explore our professional HEMA-free builder formula levels or our Starter Kit to initiate beautiful reinforcement of natural nails.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="bg-stone-900 text-stone-50 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase mt-4 hover:bg-stone-800 transition-colors cursor-pointer"
                    >
                      Explore Formulas
                    </button>
                  </div>
                ) : (
                  /* Standard Basket List State */
                  <div className="space-y-6">
                    
                    {/* Free shipping progress bar */}
                    <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="font-medium text-stone-700">
                          {totalOriginalPrice >= FREE_SHIPPING_THRESHOLD 
                            ? '🎉 You have unlocked complimentary shipping!' 
                            : `Spend $${(FREE_SHIPPING_THRESHOLD - totalOriginalPrice).toFixed(2)} more for complimentry shipping`}
                        </span>
                      </div>
                      <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-rose-400 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((totalOriginalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Cart Items List */}
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 p-3 bg-white border border-stone-200/60 rounded-2xl shadow-sm hover:border-stone-300 transition-all">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 rounded-xl object-cover bg-stone-100 border border-stone-100 shrink-0" 
                          />
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between text-xs font-bold text-stone-900">
                                <h4 className="font-serif leading-tight">{item.name}</h4>
                                <span className="font-mono ml-2">${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                              {item.shade && (
                                <p className="text-[10px] text-stone-500 font-sans tracking-wider uppercase flex items-center gap-1.5 mt-0.5">
                                  <span 
                                    className="w-2.5 h-2.5 rounded-full border border-stone-300 inline-block shrink-0" 
                                    style={{ backgroundColor: item.shade.hex }}
                                  />
                                  <span>Shade: {item.shade.name}</span>
                                </p>
                              )}
                            </div>

                            <div className="flex items-center justify-between mt-2">
                              {/* Quantity Control */}
                              <div className="flex items-center border border-stone-200 rounded-full bg-stone-50 px-1 py-0.5">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 hover:bg-stone-200 rounded-full transition-colors text-stone-500 cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 text-xs font-semibold text-stone-800">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 hover:bg-stone-200 rounded-full transition-colors text-stone-500 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button 
                                onClick={() => removeItem(item.id)}
                                className="text-stone-400 hover:text-rose-500 p-1.5 rounded-full hover:bg-rose-50 transition-all cursor-pointer"
                                title="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Promo code form */}
                    <form onSubmit={handleApplyPromo} className="border-t border-stone-200/60 pt-4 space-y-2">
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest font-sans">Apply Promo Code</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. WELCOME15"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1 bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 uppercase font-mono"
                        />
                        <button
                          type="submit"
                          className="bg-stone-900 text-stone-50 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors uppercase tracking-wider font-sans cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                      {promoApplied && (
                        <p className="text-[11px] text-emerald-600 flex items-center gap-1">
                          <Check className="w-3 h-3 shrink-0" /> Promo code <strong>{promoApplied}</strong> applied beautifully (15% discount)!
                        </p>
                      )}
                      {promoError && (
                        <p className="text-[11px] text-rose-500">{promoError}</p>
                      )}
                    </form>
                  </div>
                )}
              </div>

              {/* Subtotal and checkout triggers */}
              {!isOrdered && cart.length > 0 && (
                <div className="border-t border-stone-200 px-6 py-6 bg-white space-y-4">
                  <div className="space-y-2 text-sm font-sans">
                    <div className="flex justify-between text-stone-600">
                      <span>Products Subtotal</span>
                      <span>${totalOriginalPrice.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-rose-600 font-medium">
                        <span>Shade Promotion Discount</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-stone-600">
                      <span>Carbon-Neutral Shipping</span>
                      <span>{shippingCost === 0 ? 'Complimentary' : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-base font-medium text-stone-900 border-t border-stone-100 pt-2 font-serif">
                      <span>Estimated Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {!isCheckout ? (
                    <button
                      onClick={() => setIsCheckout(true)}
                      className="w-full bg-stone-900 text-stone-50 py-4 rounded-full font-medium tracking-wide hover:bg-stone-800 transition-all uppercase text-sm cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Securd Checkout</span>
                      <span>&rarr;</span>
                    </button>
                  ) : null}

                  <div className="text-center text-[10px] text-stone-400 font-sans tracking-wide leading-relaxed">
                    By making a reservation/purchase you accept our Zero-Friction Terms. Your nail formula ships out with high-grade carbon neutral logistics.
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
