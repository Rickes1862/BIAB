import { useState, useEffect } from 'react';
import { Star, ShieldCheck, Check, Sparkles, AlertCircle, ChevronDown, Award, HelpCircle, ArrowRight } from 'lucide-react';
import { Shade, CartItem } from '../types';

interface ProductPageProps {
  onAddBottleToCart: (shade: Shade) => void;
  shades: Shade[];
}

export default function ProductPage({ onAddBottleToCart, shades }: ProductPageProps) {
  const [selectedShade, setSelectedShade] = useState<Shade>(shades[0]);
  const [activeMedia, setActiveMedia] = useState<'hero' | 'swatch' | 'before_after' | 'leveling'>('hero');
  const [beforeAfterSlider, setBeforeAfterSlider] = useState(50); // percentage for the slider
  
  // Accordion details active states
  const [openTabs, setOpenTabs] = useState<Record<string, boolean>>({
    ingredients: true,
    cure: false,
    tips: false
  });

  // Leveling timer simulation state
  const [levelingPercent, setLevelingPercent] = useState(15);
  const [isLevelingActive, setIsLevelingActive] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Auto increment leveling simulator
  useEffect(() => {
    let interval: any;
    if (activeMedia === 'leveling') {
      setIsLevelingActive(true);
      interval = setInterval(() => {
        setLevelingPercent((prev) => {
          if (prev >= 100) return 15; // Loop back
          return prev + 5;
        });
      }, 350);
    } else {
      setIsLevelingActive(false);
    }
    return () => clearInterval(interval);
  }, [activeMedia]);

  const toggleTab = (key: string) => {
    setOpenTabs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddToCart = () => {
    onAddBottleToCart(selectedShade);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Curated list of customer reviews
  const reviews = [
    {
      id: 1,
      name: 'Eleanor Vance',
      rating: 5,
      date: 'May 28, 2026',
      shade: 'Dolly Blush',
      comment: 'This has saved my nails. I used to get terrible acrylic allergic reactions around my cuticles, but this 100% HEMA-Free formula is clean and painless. The blush pink tone is incredibly chic.',
      verified: true
    },
    {
      id: 2,
      name: 'Samantha K.',
      rating: 5,
      date: 'May 14, 2026',
      shade: 'Teddy Nude',
      comment: 'The self leveling is magic. I literally drop a tiny dollop, guide it with the brush, flip my hand upside down for 5 seconds, cure, and boom—I have a perfect structural apex that doesn’t lift.',
      verified: true
    },
    {
      id: 3,
      name: 'Chantal Dubois',
      rating: 4,
      date: 'April 29, 2026',
      shade: 'Crystal Clear',
      comment: 'Very glassy high shine. Makes an incredible reinforcement base over natural nails. No cracking for 4 straight weeks. Highly recommend if you want to grow out your natural nails.',
      verified: true
    }
  ];

  return (
    <div id="product-detail-layout" className="font-sans text-stone-900 bg-stone-50 min-h-screen pb-24 relative">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* SECTION 1: INTERACTIVE MULTI-IMAGE GALLERY Column */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Visual Display Stage */}
          <div className="aspect-[4/5] bg-white rounded-3xl border border-stone-200/60 flex items-center justify-center relative overflow-hidden shadow-sm">
            
            {activeMedia === 'hero' && (
              <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
                <img 
                  src="/src/assets/images/biab_hero_1780580629490.png" 
                  alt="Professional BIAB Bottle dripping custom shade" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
                
                {/* Micro Shade Floating Tag */}
                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur shadow-md px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-semibold">
                  <span className="w-3.5 h-3.5 rounded-full border border-stone-300" style={{ backgroundColor: selectedShade.hex }} />
                  <span>Viewing Shade: {selectedShade.name}</span>
                </div>
              </div>
            )}

            {activeMedia === 'swatch' && (
              <div className="absolute inset-0 p-8 bg-stone-100 flex flex-col justify-center space-y-6 animate-fade-in text-center">
                <span className="text-[10px] tracking-widest text-rose-500 font-bold uppercase">Color Swatches Matrix</span>
                <h3 className="font-serif text-2xl text-stone-900">Choose Your Organic Tone</h3>
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto w-full">
                  {shades.map((s) => (
                    <button 
                      key={s.id}
                      onClick={() => { setSelectedShade(s); setActiveMedia('hero'); }}
                      className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer flex flex-col items-center space-y-2 ${
                        selectedShade.id === s.id ? 'border-stone-900 ring-2 ring-stone-900/10' : 'border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <span className="w-12 h-12 rounded-full border border-stone-200 inline-block shadow-sm" style={{ backgroundColor: s.hex }} />
                      <span className="text-xs font-bold text-stone-900">{s.name}</span>
                      <span className="text-[10px] text-stone-500">{s.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeMedia === 'before_after' && (
              <div className="absolute inset-0 select-none animate-fade-in flex flex-col justify-between">
                
                {/* Title */}
                <div className="absolute top-4 left-4 z-10 bg-stone-950/90 text-stone-100 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest">
                  Natural Nail Rehabilitation
                </div>

                <div className="relative w-full h-full">
                  {/* Before state (Damaged Nails) */}
                  <div className="absolute inset-0 bg-[#e8e2e0] flex flex-col items-center justify-center">
                    <div className="text-center font-mono text-xs text-stone-500 select-none">
                      <span className="text-3xl">💅🏼🪓</span>
                      <p className="mt-2 font-bold uppercase tracking-widest">Before: Brittle, Thin &amp; Chipped Bed</p>
                      <p className="text-[10px] text-stone-400 mt-1 max-w-xs px-8">Nail bed damaged from harsh acrylic drilling and dehydrating primers.</p>
                    </div>
                  </div>

                  {/* After state (Reinforced BIAB) */}
                  <div 
                    className="absolute inset-y-0 left-0 bg-[#fcedeb] border-r-2 border-stone-500 overflow-hidden" 
                    style={{ width: `${beforeAfterSlider}%` }}
                  >
                    <div className="absolute inset-0 w-[550px] md:w-[650px] h-full flex flex-col items-center justify-center bg-rose-50 select-none">
                      <div className="text-center font-mono text-xs text-rose-700 select-none">
                        <span className="text-4xl text-rose-300">🌸✨</span>
                        <p className="mt-2 font-serif text-lg font-bold">After 1 Coat of {selectedShade.name}</p>
                        <p className="text-[10.5px] font-sans tracking-wide text-rose-600 font-medium">Flawless self-leveling structural apex with 30-day durability.</p>
                      </div>
                    </div>
                  </div>

                  {/* Draggable slider overlay */}
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={beforeAfterSlider} 
                    onChange={(e) => setBeforeAfterSlider(Number(e.target.value))}
                    className="absolute inset-x-0 bottom-4 mx-auto w-4/5 h-2 my-auto bg-stone-300/40 opacity-80 cursor-ew-resize z-25 rounded-full outline-none focus:ring-1 focus:ring-stone-900"
                    title="Slide to compare nails"
                  />
                  <div className="absolute bottom-1 right-1 bg-white/90 text-[10px] text-stone-500 px-2 py-0.5 rounded font-sans uppercase font-bold tracking-widest">
                    Drag Slider Left/Right
                  </div>
                </div>

              </div>
            )}

            {activeMedia === 'leveling' && (
              <div className="absolute inset-0 p-8 bg-stone-900 text-stone-100 flex flex-col justify-between animate-fade-in select-none">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] tracking-widest text-rose-300 font-bold uppercase block">Leveling Technology</span>
                    <h4 className="font-serif text-xl font-medium pt-1">Oligomer Elastic Leveling in 15s</h4>
                  </div>
                  <div className="bg-rose-400/20 text-rose-300 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                    {levelingPercent}% Level
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Visually animated nail representation of fluid self-leaving */}
                  <div className="relative w-44 h-24 mx-auto bg-stone-850 rounded-2xl border border-stone-700 p-3 flex flex-col justify-end overflow-hidden shadow-inner">
                    {/* Leveling fluid gel mimicking self leveling */}
                    <div 
                      className="bg-gradient-to-t from-rose-200/90 to-rose-300/80 rounded-t-[50%] transition-all duration-300"
                      style={{ 
                        height: `${Math.min(levelingPercent, 85)}%`,
                        borderTopLeftRadius: `${100 - levelingPercent}%`,
                        borderTopRightRadius: `${100 - levelingPercent}%`
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-[11px] font-medium tracking-widest text-stone-400">
                      Nail Plate Structure
                    </div>
                  </div>

                  <p className="text-xs text-stone-400 leading-relaxed text-center max-w-sm mx-auto font-sans">
                    Unlike ordinary gel which pools into cuticles, BIAB's built-in surface tension pulls the gel to the center point to naturally form a strong, chip-proof apex load-center.
                  </p>
                </div>

                <button 
                  onClick={() => setLevelingPercent(15)}
                  className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase text-stone-100 uppercase mx-auto"
                >
                  Restart Simulation
                </button>
              </div>
            )}

          </div>

          {/* Selector Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            <button 
              onClick={() => setActiveMedia('hero')}
              className={`aspect-square bg-white rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-center p-1.5 overflow-hidden ${
                activeMedia === 'hero' ? 'border-stone-900 ring-2 ring-stone-900/10' : 'border-stone-200'
              }`}
            >
              <img src="/src/assets/images/biab_hero_1780580629490.png" alt="Hero Bottle Thumbnail" className="w-[85%] h-[85%] object-contain rounded-lg" />
              <span className="text-[9px] font-sans font-bold tracking-widest uppercase text-stone-500 mt-1">1. Hero Bottle</span>
            </button>

            <button 
              onClick={() => setActiveMedia('swatch')}
              className={`aspect-square bg-white rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-center p-2 ${
                activeMedia === 'swatch' ? 'border-stone-900 ring-2 ring-stone-900/10' : 'border-stone-200 hover:border-stone-400'
              }`}
            >
              <span className="w-6 h-6 rounded-full border border-stone-200 shadow-sm" style={{ backgroundColor: selectedShade.hex }} />
              <span className="text-[9px] font-sans font-bold tracking-widest uppercase text-stone-500 mt-2">2. Shade Swatches</span>
            </button>

            <button 
              onClick={() => setActiveMedia('before_after')}
              className={`aspect-square bg-white rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-center p-2 text-center text-xs ${
                activeMedia === 'before_after' ? 'border-stone-900 ring-2 ring-stone-900/10' : 'border-stone-200 hover:border-stone-400'
              }`}
            >
              <span className="text-lg">💅🏼✨</span>
              <span className="text-[9px] font-sans font-bold tracking-widest uppercase text-stone-500 mt-1">3. Before/After</span>
            </button>

            <button 
              onClick={() => setActiveMedia('leveling')}
              className={`aspect-square bg-white rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-center p-2 text-center text-xs overflow-hidden ${
                activeMedia === 'leveling' ? 'border-stone-900 ring-2 ring-stone-900/10' : 'border-stone-200 hover:border-stone-400'
              }`}
            >
              <span className="text-lg animate-pulse">⏰🛸</span>
              <span className="text-[9px] font-sans font-bold tracking-widest uppercase text-stone-500 mt-1">4. Leveling Loop</span>
            </button>
          </div>
        </div>

        {/* SECTION 1: THE CONVERSION COLUMN */}
        <div className="lg:col-span-5 flex flex-col space-y-8 sticky top-28 self-start">
          
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 mb-1 bg-stone-100 flex self-start py-1 px-3 rounded-full text-xs font-semibold text-stone-600 tracking-wider">
              <Award className="w-3.5 h-3.5 text-rose-500" />
              <span>HEMA-Free Professional Certified</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-amber-500 text-sm flex">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </span>
              <span className="text-xs text-stone-500 font-sans font-semibold">(4.9/5 based on 2,431 verified reviews)</span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl leading-tight font-bold text-stone-950">
              Professional BIAB Formula - 15ml
            </h1>

            <div className="flex items-baseline gap-3">
              <p className="text-2xl font-bold text-stone-900 font-mono">$24.00</p>
              <p className="text-xs text-stone-400 font-sans">15ml / 0.51 fl oz (Approx. 40 Full Coverages)</p>
            </div>
            
            <p className="text-xs text-stone-400 bg-white border border-stone-200 px-3.5 py-1.5 rounded-lg flex inline-flex items-center gap-1.5 font-sans">
              <span className="font-semibold text-stone-700">Afterpay available:</span> or 4 interest-free payments of $6.00
            </p>
          </div>

          {/* Interactive Shade Selector */}
          <div className="space-y-4 border-y border-stone-200/80 py-6">
            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-stone-500">
              <span>Select Core shade:</span>
              <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md font-bold">{selectedShade.name}</span>
            </div>

            <div className="flex gap-4">
              {shades.map((swatch) => (
                <button
                  key={swatch.id}
                  onClick={() => setSelectedShade(swatch)}
                  className={`w-12 h-12 rounded-full relative transition-transform hover:scale-110 flex items-center justify-center cursor-pointer ${
                    selectedShade.id === swatch.id 
                      ? 'ring-2 ring-stone-900 ring-offset-2 scale-105' 
                      : 'border border-stone-300'
                  }`}
                  style={{ backgroundColor: swatch.hex }}
                  aria-label={swatch.name}
                  title={swatch.name}
                >
                  {selectedShade.id === swatch.id && (
                    <Check className="w-4 h-4 text-stone-900 filter invert mix-blend-difference" />
                  )}
                </button>
              ))}
            </div>

            {/* active shade description */}
            <div className="bg-stone-150 p-4 rounded-xl border border-stone-100 text-xs text-stone-600 space-y-1">
              <span className="font-bold text-stone-800 font-sans tracking-wide block">Hue Profile:</span>
              <p className="leading-relaxed">{selectedShade.longDescription}</p>
            </div>
          </div>

          {/* Add to Cart Trigger */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-stone-900 text-stone-50 px-8 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-stone-800 transition-all transform active:scale-[0.98] cursor-pointer shadow-lg flex items-center justify-center gap-2"
          >
            <span>{isAdded ? '✓ Item Added To Selection' : `Add to Cart — $24.00`}</span>
          </button>

          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <p className="text-xs text-stone-700 leading-relaxed">
              <strong>Zero Friction Guarantee:</strong> We pack and route all cosmetics within 24 hours. Enjoy free exchange privileges if the shade isn't an absolute skin-tone match.
            </p>
          </div>

          {/* SECTION 2: PROGRESSIVE DISCLOSURE TABS */}
          <div className="border-t border-stone-200 pt-6 space-y-3">
            
            {/* Tab 1: Ingredients & Safety */}
            <div className="border border-stone-200 rounded-2xl bg-white overflow-hidden shadow-sm">
              <button 
                onClick={() => toggleTab('ingredients')}
                className="w-full py-4 px-5 flex justify-between items-center text-sm font-bold tracking-wider uppercase text-left text-stone-900 transition-colors hover:bg-stone-50 cursor-pointer"
              >
                <span>Ingredients &amp; Sensitisation Safety</span>
                <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${openTabs.ingredients ? 'rotate-180' : ''}`} />
              </button>
              {openTabs.ingredients && (
                <div className="px-5 pb-5 pt-1 text-stone-600 text-xs leading-relaxed space-y-2 border-t border-stone-100 animate-slide-fade">
                  <p>
                    Formulated with clinical responsibility toward your native nail structure. Our <strong>100% HEMA-Free composition</strong> removes all high-sensitizing acrylates that trigger contact allergies.
                  </p>
                  <p className="text-stone-400 font-mono text-[9px] uppercase tracking-wider bg-stone-100 p-2 rounded">
                    Full INCI: Polyurethane Acrylate Oligomer, Aliphatic Urethane Acrylate, Isobornyl Methacrylate, Benzoyl Isopropanol, Trimethylbenzoyl Diphenylphosphine Oxide, Pigments.
                  </p>
                  <p className="flex items-center gap-1.5 text-emerald-600 font-bold">
                    ✓ Clean beauty • Vegan • Cruelty Free
                  </p>
                </div>
              )}
            </div>

            {/* Tab 2: How to Cure */}
            <div className="border border-stone-200 rounded-2xl bg-white overflow-hidden shadow-sm">
              <button 
                type="button"
                onClick={() => toggleTab('cure')}
                className="w-full py-4 px-5 flex justify-between items-center text-sm font-bold tracking-wider uppercase text-left text-stone-900 transition-colors hover:bg-stone-50 cursor-pointer"
              >
                <span>Chronological Curing Cycle</span>
                <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${openTabs.cure ? 'rotate-180' : ''}`} />
              </button>
              {openTabs.cure && (
                <div className="px-5 pb-5 pt-1 text-stone-600 text-xs leading-relaxed space-y-2 border-t border-stone-100 animate-slide-fade">
                  <p>
                    Optimized for dual-wavelength LED/UV emitters. Cures safely in:
                  </p>
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li><strong>60 Seconds</strong> under a professional 48W LED lamp (365nm + 405nm hybrid)</li>
                    <li><strong>2 Minutes</strong> under general legacy 36W UV chambers</li>
                  </ul>
                  <p className="text-stone-500">
                    Never interrupt the cycles. The built-in photo-initiator hardens the chemical links gradually to eliminate the classic painful "heat spike".
                  </p>
                </div>
              )}
            </div>

            {/* Tab 3: Pro Tips */}
            <div className="border border-stone-200 rounded-2xl bg-white overflow-hidden shadow-sm">
              <button 
                type="button"
                onClick={() => toggleTab('tips')}
                className="w-full py-4 px-5 flex justify-between items-center text-sm font-bold tracking-wider uppercase text-left text-stone-900 transition-colors hover:bg-stone-50 cursor-pointer"
              >
                <span>Pro Tips (Zero Lifting Mechanics)</span>
                <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${openTabs.tips ? 'rotate-180' : ''}`} />
              </button>
              {openTabs.tips && (
                <div className="px-5 pb-5 pt-1 text-stone-600 text-xs leading-relaxed space-y-2 border-t border-stone-100/60 animate-slide-fade">
                  <p className="font-semibold text-stone-950">Preparation is absolute key:</p>
                  <ol className="list-decimal pl-4 space-y-1.5 text-stone-500">
                    <li>Thoroughly dehydrated natural nail and sweep away any micro-cuticle debris.</li>
                    <li>Swipe a micro-thin slip layer over the entire plate. <strong>Do not cure this yet!</strong></li>
                    <li>Float a larger droplet down the nail's mechanical center. Let the slip layer pull the gel flat for 5 seconds before curing.</li>
                  </ol>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* ADDITIONAL REVIEWS HUB */}
      <section className="bg-white border-t border-stone-250 py-16 mt-12">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="flex items-center justify-between border-b border-stone-100 pb-5">
            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold">Community Experiences</h3>
              <p className="text-xs text-stone-500 font-sans">Reviews filtered from active salon salons and consumers.</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-right">
                <span className="block text-sm font-bold font-mono">4.92 / 5.0</span>
                <span className="block text-[10px] text-stone-400">2,431 Reviews overall</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 divide-y divide-stone-100">
            {reviews.map((rev) => (
              <div key={rev.id} className="pt-6 first:pt-0 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-800">{rev.name}</span>
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest">Verified Purches</span>
                  </div>
                  <span className="text-stone-400 text-[10px]">{rev.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex text-amber-500 text-xs">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </span>
                  <span className="text-[10px] text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold font-mono">
                    Shade: {rev.shade}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">"{rev.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STICKY BOTTOM CARD FOR MOBILE CONVERSION */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-stone-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-40 md:hidden flex justify-between items-center animate-slide-up">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl relative border border-stone-100 flex items-center justify-center shadow-inner" style={{ backgroundColor: selectedShade.hex }}>
            <span className="w-4 h-4 rounded-full border border-white/40 block" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-stone-900">Professional BIAB</span>
            <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider">{selectedShade.name}</span>
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="bg-stone-900 text-stone-50 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer"
        >
          {isAdded ? '✓ Added' : 'Add — $24'}
        </button>
      </div>

    </div>
  );
}
