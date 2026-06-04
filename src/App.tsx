import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Homepage from './components/Homepage';
import ProductPage from './components/ProductPage';
import ProtocolPage from './components/ProtocolPage';
import ShadeQuiz from './components/ShadeQuiz';
import { Shade, CartItem, ActivePage } from './types';
import { Mail, Shield, Award, Sparkles, Heart, HelpCircle, Check, ArrowRight } from 'lucide-react';

const SHADES: Shade[] = [
  {
    id: 'dolly',
    name: 'Dolly Blush',
    hex: '#f4d6d2',
    bgHex: 'bg-[#f4d6d2]',
    description: 'The elegant Bare Pink French overlay',
    longDescription: 'Replicates the raw, vibrant transparency of pristine natural nails with a touch of exquisite warm French blush. Highlights cool skin undertones and cures with absolute glass clarity.'
  },
  {
    id: 'teddy',
    name: 'Teddy Nude',
    hex: '#dcb8aa',
    bgHex: 'bg-[#dcb8aa]',
    description: 'The ultimate warm clay beige-espresso nude',
    longDescription: 'A rich, warm-toned linen clay nude modeled after professional organic shades. Ideal for golden or olive skin shades, providing a full coverage high-apex reinforcement base.'
  },
  {
    id: 'milky',
    name: 'Milky White',
    hex: '#fdfbf7',
    bgHex: 'bg-[#fdfbf7]',
    description: 'Soft semi-opaque milk quartz',
    longDescription: 'An angelic, semi-transparent milky quartz with crisp white undertones. Delivers an ultra-clean, minimalistic quartz base—perfect for classic French tips.'
  },
  {
    id: 'clear',
    name: 'Crystal Clear',
    hex: '#ffffff',
    bgHex: 'bg-transparent',
    description: '100% glass-like defensive shield',
    longDescription: 'Pure diamond reflection clarity. Ideal for locking in bare organic nail beds or layering over color coats without altering your hand’s natural pigment hues.'
  }
];

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Newsletter Form State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Scroll to top on page switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [activePage]);

  // Cart addition handlers
  const handleAddKitToCart = (shade: Shade) => {
    const kitId = `starter-kit-${shade.id}`;
    
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === kitId);
      if (existing) {
        return prevCart.map((item) => 
          item.id === kitId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: kitId,
            itemId: 'starter-kit',
            name: 'Deluxe BIAB Starter Kit Bundle',
            price: 79.00,
            quantity: 1,
            shade: shade,
            image: '/src/assets/images/biab_starter_kit_1780580647992.png'
          }
        ];
      }
    });

    // Auto-open cart to show item addition feedback
    setTimeout(() => setIsCartOpen(true), 250);
  };

  const handleAddBottleToCart = (shade: Shade) => {
    const bottleId = `biab-bottle-${shade.id}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === bottleId);
      if (existing) {
        return prevCart.map((item) => 
          item.id === bottleId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: bottleId,
            itemId: 'biab-formula',
            name: 'Professional BIAB Formula - 15ml',
            price: 24.00,
            quantity: 1,
            shade: shade,
            image: '/src/assets/images/biab_hero_1780580629490.png'
          }
        ];
      }
    });

    // Auto-open cart
    setTimeout(() => setIsCartOpen(true), 250);
  };

  const updateQuantity = (id: string, q: number) => {
    if (q <= 0) {
      handleRemoveItem(id);
    } else {
      setCart((prev) => prev.map((item) => item.id === id ? { ...item, quantity: q } : item));
    }
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 4000);
    }
  };

  return (
    <div className="font-sans text-stone-900 bg-stone-50 min-h-screen flex flex-col justify-between">
      
      {/* Navigation Header */}
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
      />

      {/* Cart Slider Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeItem={handleRemoveItem}
        clearCart={clearCart}
      />

      {/* Main Page Area Views switching */}
      <main className="flex-1">
        {activePage === 'home' && (
          <Homepage 
            onAddKitToCart={handleAddKitToCart}
            onNavigateToPDP={() => setActivePage('pdp')}
            onNavigateToProtocol={() => setActivePage('protocol')}
            shades={SHADES}
          />
        )}
        {activePage === 'pdp' && (
          <ProductPage 
            onAddBottleToCart={handleAddBottleToCart}
            shades={SHADES}
          />
        )}
        {activePage === 'protocol' && (
          <ProtocolPage />
        )}
        {activePage === 'quiz' && (
          <ShadeQuiz 
            shades={SHADES}
            onAddShadeToCart={handleAddBottleToCart}
          />
        )}
      </main>

      {/* LUXURY EDITORIAL BRAND FOOTER */}
      <footer className="bg-stone-900 text-stone-200 border-t border-stone-800 font-sans">
        
        {/* Core Value Pillars banner */}
        <div className="max-w-7xl mx-auto px-6 py-12 border-b border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-stone-800 rounded-full text-rose-300">
              <Award className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-stone-100 font-semibold text-sm">German Synthesis Standard</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Compounded with strict cosmetic vigilance. Clean, allergen-free oligomers engineered to protect the young fingernail plate.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-stone-800 rounded-full text-rose-300">
              <Shield className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-stone-100 font-semibold text-sm">100% Sensitisation Shield</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                HEMA-Free compound architecture protects adjacent proximal skin surfaces from localized irritation common to cheap gel nails.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-stone-800 rounded-full text-rose-300">
              <Heart className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-stone-100 font-semibold text-sm">Cruelty-Free &amp; Pure Vegan</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Absolutely zero animal derived ingredients. Verified by high cosmetic standards for clean manicures.
              </p>
            </div>
          </div>
        </div>

        {/* Link Columns and Newsletter */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <button 
              onClick={() => setActivePage('home')}
              className="flex flex-col items-start text-left text-stone-100"
            >
              <span className="font-serif text-3xl font-black tracking-widest uppercase">BIAB®</span>
              <span className="text-[10px] uppercase text-rose-400 tracking-widest font-black -mt-1 block">PRO LABS</span>
            </button>
            <p className="text-xs text-stone-400 leading-relaxed">
              Designed as the definitive premium builder-gel formula for modern nail preservation. We make high-apex architectural reinforcement fast, healthy, and pristine to manifest at home.
            </p>
            <p className="text-[11px] text-stone-500 italic">
              © 2026 BIAB® Professional. All luxury reserves reserved.
            </p>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3 space-y-4 text-xs font-sans">
            <h5 className="font-serif text-stone-100 font-medium tracking-wide uppercase">Navigational Map</h5>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setActivePage('home')} className="text-stone-400 hover:text-rose-300 transition-colors uppercase tracking-widest text-[10px] font-semibold">
                  The Secret Homepage
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('pdp')} className="text-stone-400 hover:text-rose-300 transition-colors uppercase tracking-widest text-[10px] font-semibold">
                  Professional Formula 15ml
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('protocol')} className="text-stone-400 hover:text-rose-300 transition-colors uppercase tracking-widest text-[10px] font-semibold">
                  The Application Protocol
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('quiz')} className="text-stone-400 hover:text-rose-300 transition-colors uppercase tracking-widest text-[10px] font-semibold">
                  The Bespoke Shade Matcher
                </button>
              </li>
            </ul>
          </div>

          {/* Luxury Newsletter */}
          <div className="lg:col-span-5 space-y-4">
            <h5 className="font-serif text-stone-100 font-medium tracking-wide uppercase text-xs">
              Subscribe to the Salon Secret Letter
            </h5>
            <p className="text-xs text-stone-400 leading-relaxed">
              Subscribe to extract biweekly professional protocols, early limited shade drops, and complimentary shipping incentives.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  placeholder="your.cosmetics.email@gmail.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-full px-5 py-3 text-xs text-stone-200 focus:outline-none focus:border-stone-500 placeholder-stone-500"
                />
                <Mail className="absolute right-4 top-3.5 w-4 h-4 text-stone-500" />
              </div>
              <button
                type="submit"
                className="bg-stone-50 hover:bg-stone-100 text-stone-900 text-xs px-6 py-3 rounded-full font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>

            {newsletterSuccess && (
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Bespoke confirmation sent! Check your inbox for your 15% discount code!
              </p>
            )}
          </div>

        </div>

      </footer>

    </div>
  );
}
