import { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles, HelpCircle } from 'lucide-react';
import { ActivePage } from '../types';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  cartCount: number;
  openCart: () => void;
}

export default function Navbar({ activePage, setActivePage, cartCount, openCart }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'The Secret' },
    { id: 'pdp', label: 'The Formula 15ml' },
    { id: 'protocol', label: 'Application Protocol' },
    { id: 'quiz', label: 'Find Your Shade' },
  ] as const;

  return (
    <nav id="main-navigation" className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200/60">
      {/* Top Banner announcing HEMA-Free & Speed */}
      <div className="bg-stone-900 text-stone-100 text-xs py-2 px-4 text-center tracking-widest font-sans uppercase flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-rose-300 animate-pulse" />
        <span>HEMA-Free • Up to 4 Weeks High-Gloss Wear • Free Shipping Over $50</span>
        <Sparkles className="w-3 h-3 text-rose-300 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => { setActivePage('home'); setIsOpen(false); }}
          className="flex flex-col items-start cursor-pointer group"
        >
          <span className="font-serif text-2xl tracking-wider text-stone-900 group-hover:text-stone-700 transition-colors">
            BIAB<span className="text-stone-400 font-sans text-xs align-super ml-0.5 font-semibold">®</span>
          </span>
          <span className="text-[10px] tracking-widest font-sans uppercase text-rose-500 font-bold -mt-1 group-hover:text-rose-400 transition-colors">
            PRO LABS
          </span>
        </button>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`text-sm tracking-wide font-medium relative py-2 transition-colors duration-200 cursor-pointer ${
                activePage === item.id
                  ? 'text-stone-900'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {item.label}
              {activePage === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-400 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Desktop Cart and Support */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActivePage('quiz')}
            className="hidden lg:flex items-center gap-1.5 text-xs text-rose-600 bg-rose-50 hover:bg-rose-100/80 px-3 py-1.5 rounded-full font-semibold transition-colors uppercase tracking-widest"
          >
            <Sparkles className="w-3 h-3" />
            Shade Finder
          </button>

          <button
            onClick={openCart}
            id="cart-trigger-button"
            className="relative p-2.5 hover:bg-stone-100 rounded-full transition-colors duration-200 text-stone-800 cursor-pointer flex items-center justify-center gap-1"
            aria-label="Open your shopping cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 ? (
              <span className="absolute -top-1 -right-1 bg-stone-900 text-stone-50 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-stone-50 animate-scale-in">
                {cartCount}
              </span>
            ) : null}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-stone-800 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {isOpen && (
        <div className="md:hidden bg-stone-50 border-t border-stone-200 px-6 py-6 space-y-4 animate-fade-in-down absolute left-0 right-0 top-full shadow-lg z-50">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setIsOpen(false);
                }}
                className={`text-left text-base font-medium py-2 px-1 border-b border-stone-100/60 transition-all ${
                  activePage === item.id
                    ? 'text-stone-900 pl-2 border-l-2 border-l-rose-400'
                    : 'text-stone-500'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setActivePage('quiz');
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-rose-100 text-rose-800 py-3 rounded-xl text-sm font-semibold tracking-wider uppercase"
            >
              <Sparkles className="w-4 h-4" />
              Take the Shade Matching Quiz
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
