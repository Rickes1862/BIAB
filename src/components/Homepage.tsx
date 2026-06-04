import { useState } from 'react';
import { Sparkles, Check, Play, HelpCircle, ArrowRight, Star, ShieldCheck, Heart, Info, Clock, AlertCircle, X } from 'lucide-react';
import { Shade, CartItem } from '../types';

interface HomepageProps {
  onAddKitToCart: (shade: Shade) => void;
  onNavigateToPDP: () => void;
  onNavigateToProtocol: () => void;
  shades: Shade[];
}

export default function Homepage({ onAddKitToCart, onNavigateToPDP, onNavigateToProtocol, shades }: HomepageProps) {
  const [selectedKitShade, setSelectedKitShade] = useState<Shade>(shades[0]);
  const [activeTab, setActiveTab] = useState<'matrix' | 'details'>('matrix');
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  const handleAddKit = () => {
    onAddKitToCart(selectedKitShade);
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2500);
  };

  const comparisonFeatures = [
    {
      id: 'strength',
      name: 'Reinforcement & Strength',
      biab: 'High (Architectural support, flexible reinforcement)',
      gel: 'Low (Flexible, chips and peels easily)',
      acrylic: 'Very High (But rigid, prone to cracking/snaps)',
      details: 'BIAB builds a structural apex that protects natural nails from breaking. Traditional gel curves too easily under weight, while acrylic is so brittle that trauma to the finger often breaks the real nail plate underneath.'
    },
    {
      id: 'damage',
      name: 'Nail Damage Index',
      biab: 'Zero to Low (Supports recovery & growth)',
      gel: 'Low to Medium',
      acrylic: 'High (Heavy filing & harsh chemicals)',
      details: 'Our formula is 100% HEMA-free, eliminating risk of skin sensitivities. Traditional acrylics require grinding down the nail bed with coarse drills, introducing micro-tears that thin out and ruin your nails.'
    },
    {
      id: 'speed',
      name: 'Application Speed',
      biab: 'Fast (All-in-one base, builder & gloss self-leveling)',
      gel: 'Medium (Multiple curing cycles and coats)',
      acrylic: 'Slow (Requires manual liquid & powder mixing)',
      details: 'Because BIAB is self-leveling, gravity does the work in 5 seconds flat. You get flat-coat consistency without tedious detail work or heavy buffing.'
    },
    {
      id: 'removal',
      name: 'Removal Complexity',
      biab: 'Easy (Gentle acetone soak-off in 15 mins)',
      gel: 'Easy (Acetone soak-off)',
      acrylic: 'Difficult (Requires extensive filing/drilling)',
      details: 'No nail drilling machines required. BIAB can be safely and completely dissolved using gentle wraps, protecting the young keratin layers beneath.'
    },
    {
      id: 'cost',
      name: 'Salon Cost Equivalence',
      biab: '$85 – $120 per salon visit (Save 85%)',
      gel: '$45 – $65 per visit',
      acrylic: '$65 – $100 per visit',
      details: 'With our premium starter bundle, you execute exactly the same premium European-style overlays at home for less than $4 per manicure. The professional-grade 48W LED lamp yields lifetime returns.'
    },
  ];

  return (
    <div className="font-sans text-stone-900 bg-stone-50 min-h-screen">
      
      {/* ABOVE THE FOLD (HERO) */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 bg-rose-100 rounded-full text-xs font-bold tracking-widest uppercase text-rose-700">
            <Sparkles className="w-3 h-3 text-rose-500 animate-pulse" />
            <span>The Original Salon Secret</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-stone-900 tracking-tight">
            Stronger Nails, Bottled.<br className="hidden md:inline"/> Weeks of Flawless Wear.
          </h1>

          <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
            Meet the self-leveling, high-apex builder gel designed to reinforce and shield natural nails. No cracking, no peeling, and absolutely no painful heat spikes. Just pristine, salon-engineered strength delivered directly to your home.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => {
                const bundleSection = document.getElementById('starter-kit-section');
                if (bundleSection) bundleSection.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-stone-900 text-stone-50 px-8 py-4 rounded-full font-semibold hover:bg-stone-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Get the BIAB Starter Kit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setShowVideoModal(true)}
              className="border border-stone-300 bg-white text-stone-900 px-8 py-4 rounded-full font-semibold hover:bg-stone-100 transition-colors flex items-center justify-center gap-2.5 cursor-pointer shadow-sm"
            >
              <span className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </span>
              <span>Watch 60s Protocol</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-6 text-sm text-stone-600">
            <div className="flex items-center gap-1 text-amber-500 font-sans font-semibold">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <span className="text-stone-900 ml-1">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-500 italic">
              <Check className="w-4 h-4 text-rose-500 font-bold" />
              <span>Over 100,000+ flawless manicures created</span>
            </div>
          </div>
        </div>
        
        {/* MACRO PRODUCT ASSET */}
        <div className="lg:col-span-5 relative h-[500px] md:h-[580px] rounded-3xl overflow-hidden shadow-2xl border border-white flex items-center justify-center group">
          <img 
            src="/src/assets/images/biab_hero_1780580629490.png" 
            alt="Luxurious BIAB dripping professional bottle close-up" 
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          />
          {/* Subtle elegant gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 to-transparent" />
          
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm shadow px-3.5 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest text-stone-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            <span>Unmatched German Technology</span>
          </div>

          <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md px-5 py-4 rounded-2xl shadow-lg border border-white/60 space-y-1">
            <span className="text-[10px] tracking-widest uppercase font-bold text-rose-500">Shade Showcase</span>
            <p className="font-serif text-lg text-stone-950 leading-tight">Dolly Blush — The self-leveling secret</p>
            <div className="flex gap-1 pt-1.5">
              <span className="w-3 h-3 rounded-full bg-[#f4d6d2] border border-stone-300"></span>
              <span className="w-3 h-3 rounded-full bg-[#dcb8aa] border border-stone-300"></span>
              <span className="w-3 h-3 rounded-full bg-[#fdfbf7] border border-stone-300"></span>
              <span className="w-3 h-3 rounded-full bg-transparent border border-stone-400 relative"><span className="absolute inset-0.5 rounded-full border border-stone-100"></span></span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <section className="border-y border-stone-200/80 bg-white py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Pure CSS animated custom marquee-like layout with hover pause and high contrast */}
          <div className="flex flex-wrap md:flex-nowrap justify-between gap-6 md:gap-4 items-center text-xs md:text-sm font-semibold tracking-widest uppercase text-stone-400/95">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              <span>Cruelty-Free &amp; 100% Vegan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              <span>100% HEMA-Free Polish</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              <span>Up to 4 Weeks Wear Resistance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              <span>Architectural Self-Leveling Apex</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHY BIAB DEFEATS TRADITIONAL ALTERNATIVES */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest text-rose-500 uppercase">Chemical &amp; Mechanical Contrast</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-stone-900 font-semibold">
            How BIAB Outperforms traditional Nail Systems
          </h2>
          <p className="text-stone-600 text-sm md:text-base leading-relaxed">
            Unlike cheap traditional gels that require high-acidity primers, or acrylic which suffocates and chips your live keratine matrix, BIAB forms a breathable protective shell.
          </p>
        </div>

        {/* INTERACTIVE US VS THEM MATRIX */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
          <div className="p-6 md:p-8 border-b border-stone-100 flex flex-col md:flex-row items-center justify-between gap-4 bg-stone-100/40">
            <div className="space-y-1">
              <span className="text-xs font-bold text-stone-400 tracking-wider uppercase font-sans">Compare Systems</span>
              <h3 className="font-serif text-xl font-bold text-stone-900">Interactive Formula Evaluator</h3>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('matrix')}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all cursor-pointer ${
                  activeTab === 'matrix' ? 'bg-stone-900 text-stone-50' : 'bg-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                Simple Grid
              </button>
              <button 
                onClick={() => { setActiveTab('matrix'); setExpandedFeature(comparisonFeatures[0].id); }}
                className="text-xs text-rose-600 bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-full font-bold uppercase transition-all"
              >
                Expand Science Explanations
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-stone-200 bg-white/50 text-[11px] font-bold tracking-widest uppercase text-stone-500">
                  <th className="py-5 px-6 md:px-8">Feature Specification</th>
                  <th className="py-5 px-6 text-rose-700 bg-rose-50/50">BIAB (Our Formula)</th>
                  <th className="py-5 px-6">Regular Gel Polish</th>
                  <th className="py-5 px-6">Traditional Acrylics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {comparisonFeatures.map((row) => (
                  <tr 
                    key={row.id} 
                    className="hover:bg-stone-50/50 transition-colors group cursor-pointer"
                    onClick={() => setExpandedFeature(expandedFeature === row.id ? null : row.id)}
                  >
                    <td className="py-5 px-6 md:px-8 space-y-1 font-serif text-sm font-semibold text-stone-950">
                      <div className="flex items-center gap-1.5">
                        <span>{row.name}</span>
                        <Info className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-600 transition-colors" />
                      </div>
                      {expandedFeature === row.id && (
                        <p className="font-sans text-xs text-stone-500 leading-relaxed max-w-xs pt-1.5 transition-all">
                          {row.details}
                        </p>
                      )}
                    </td>
                    <td className="py-5 px-6 text-sm text-stone-950 bg-rose-50/20 font-sans font-semibold">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{row.biab}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-sm text-stone-500 font-sans">{row.gel}</td>
                    <td className="py-5 px-6 text-sm text-stone-500 font-sans">{row.acrylic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 md:p-6 bg-stone-50 border-t border-stone-100 text-xs text-stone-400 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
            <span>Click on any features in the table column to read the science, removal guides, and durability metrics.</span>
          </div>
        </div>
      </section>

      {/* DELUXE HERO BUNDLE SHOWCASE */}
      <section id="starter-kit-section" className="max-w-7xl mx-auto px-6 py-20 bg-white rounded-[40px] shadow-sm border border-stone-200/60 my-12">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-black tracking-widest text-rose-500 uppercase uppercase block">The Best Way to Begin</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            The Ultimate All-In-One BIAB Starter Kit
          </h2>
          <p className="text-stone-500 text-sm md:text-base leading-relaxed">
            Save $41.00 and purchase everything required to manifest flawless salon manicures on your native nails at home. Correct, harden, and shine.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Bundle Showcase Media */}
          <div className="lg:col-span-6 relative aspect-[4/3] bg-stone-50 rounded-3xl border border-stone-100 overflow-hidden shadow-md flex items-center justify-center">
            <img 
              src="/src/assets/images/biab_starter_kit_1780580647992.png" 
              alt="Professional BIAB Starter Kit Box showcasing LED Lamp, tool, bottle" 
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover" 
            />
            {/* Overlay showing what's inside */}
            <div className="absolute top-4 right-4 bg-stone-900/90 text-stone-50 backdrop-blur-sm px-4 py-2 rounded-2xl text-xs font-mono flex items-center gap-2 shadow-lg">
              <Clock className="w-3.5 h-3.5 text-rose-300" />
              <span>Full Manifestation Kit</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-md border border-white/60">
              <span className="text-[10px] text-rose-500 font-bold uppercase tracking-widest">Active shade choice in box</span>
              <p className="text-xs text-stone-600 font-medium">Changing the selection on the right updates the Shade Bottle shipped in this custom kit.</p>
            </div>
          </div>

          {/* Bundle Selection Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-serif text-stone-900 font-semibold leading-tight">
                Everything you require for pristine apex structures
              </h3>
              <p className="text-stone-500 text-sm">
                A carefully aggregated bundle tailored for complete beginners. Fast leveling, beautiful pink tones, and professional cooling LED components.
              </p>
            </div>

            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-100 space-y-3.5 text-sm">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Aggregate Bundle Inventory</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-stone-700">
                <li className="flex items-start gap-2 text-xs">
                  <Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-900 block">The Base &amp; Builder (15ml)</span>
                    <span className="text-[10px] text-stone-500">HEMA-Free high adherence matrix</span>
                  </div>
                </li>
                <li className="flex items-start gap-2 text-xs">
                  <Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-900 block">The Shade (Your Choice)</span>
                    <span className="text-[10px] text-stone-500">Curated organic hues</span>
                  </div>
                </li>
                <li className="flex items-start gap-2 text-xs">
                  <Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-900 block">Professional 48W LED Lamp</span>
                    <span className="text-[10px] text-stone-500">Cures in 60s flat with cool-mode</span>
                  </div>
                </li>
                <li className="flex items-start gap-2 text-xs">
                  <Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-900 block">Precision Prep Tools</span>
                    <span className="text-[10px] text-stone-500">Dual cuticle-pusher & buffer</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Interactive Swatch Selection inside Kit */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-stone-800">1. Tailor Starter Shade:</span>
                <span className="text-rose-600">{selectedKitShade.name}</span>
              </div>
              
              <div className="flex gap-3">
                {shades.map((swatch) => (
                  <button
                    key={swatch.id}
                    onClick={() => setSelectedKitShade(swatch)}
                    className={`relative p-1 rounded-full border-2 transition-all cursor-pointer ${
                      selectedKitShade.id === swatch.id ? 'border-stone-900 scale-110' : 'border-transparent hover:scale-105'
                    }`}
                    title={swatch.name}
                  >
                    <span 
                      className="w-8 h-8 rounded-full block border border-stone-200" 
                      style={{ backgroundColor: swatch.hex }}
                    />
                  </button>
                ))}
              </div>
              <p className="text-stone-400 text-[11px]">
                {selectedKitShade.description}
              </p>
            </div>

            {/* Price section and direct Cart CTA */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl font-serif font-bold text-stone-900">$79.00</span>
                  <span className="text-sm font-semibold text-stone-400 line-through">$120.00 Value</span>
                </div>
                <p className="text-[10px] text-stone-500 uppercase font-black tracking-widest text-emerald-600">Save 35% on bundle price</p>
              </div>

              <button
                onClick={handleAddKit}
                className="w-full sm:w-auto bg-stone-900 text-stone-50 px-8 py-4 rounded-full font-bold hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer max-w-xs"
              >
                <span>{isAddedSuccess ? '✓ Bundled Added To Bag!' : 'Add Kit to Cart'}</span>
                {!isAddedSuccess && <ArrowRight className="w-4 h-4 ml-1" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-50">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-rose-400" /> Fast Curing Optimized
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400" /> Free Exchanges on Shade
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* AN EXPLORATIVE BRAND TESTIMONIAL GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-stone-200">
        <h3 className="font-serif text-3xl text-center mb-12 font-medium">Loved By Professional Nail Artists</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm space-y-4">
            <div className="flex text-amber-400">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <p className="text-stone-600 text-xs italic leading-relaxed">
              "This self-leveling gel has slashed my manicure time by 20 minutes per client. I do not have to sit there and shape manually. 5 seconds underneath the UV and the leveling takes care of every bubble automatically!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-200 flex items-center justify-center font-bold text-[10px]">LM</div>
              <div>
                <p className="text-xs font-bold">Leah Montgomery</p>
                <p className="text-[10px] text-stone-400">Owner, Salon Elite NY</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm space-y-4">
            <div className="flex text-amber-400">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <p className="text-stone-600 text-xs italic leading-relaxed">
              "For years my clients complained about heat spike burns during UV curing. Switching to this HEMA-free cool formula completely resolved the issue. Extremely safe for clients with skin sensitivities."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center font-bold text-[10px]">KP</div>
              <div>
                <p className="text-xs font-bold">Keira Patel</p>
                <p className="text-[10px] text-stone-400">Senior Technician, Pure Bliss Lounge</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm space-y-4">
            <div className="flex text-amber-400">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <p className="text-stone-600 text-xs italic leading-relaxed">
              "I bought the starter kit as feedback to do my own manicures during travels. Best beauty expense of the year! The Dolly Blush is the perfect understated elegant shade and holds strongly for 32 days without lifting."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center font-bold text-[10px]">SF</div>
              <div>
                <p className="text-xs font-bold">Sophia Foster</p>
                <p className="text-[10px] text-stone-400">Beauty &amp; Fashion Director, Chic Mag</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 60s PROCESS PROTOCOL OVERLAY VIDEO MODAL */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-stone-100 relative">
            <button 
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 bg-stone-900 hover:bg-stone-800 text-stone-100 p-2 rounded-full cursor-pointer transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-8 space-y-6 text-center">
              <div className="space-y-1">
                <span className="text-[10px] text-rose-500 font-bold uppercase tracking-widest">Protocol Demonstration</span>
                <h4 className="font-serif text-2xl font-bold">60-Second Self-Leveling Protocol</h4>
              </div>

              {/* simulated cosmetic beauty video loop */}
              <div className="relative aspect-video bg-stone-950 rounded-2xl border-4 border-stone-100 overflow-hidden flex flex-col items-center justify-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-rose-200/20 backdrop-blur-sm border-2 border-rose-300 flex items-center justify-center text-rose-300 animate-pulse">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
                <div className="text-xs text-stone-400 max-w-xs leading-relaxed font-sans px-4">
                  <strong className="text-rose-300">Live Demonstrating:</strong> Floating the Apex Bead and watching gravity level the gel matrix in real-time.
                </div>
                
                {/* Visual indicator bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-stone-900">
                  <div className="bg-rose-400 h-full w-2/3 rounded-r-full animate-pulse" />
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => { setShowVideoModal(false); onNavigateToProtocol(); }}
                  className="bg-stone-900 text-stone-50 px-6 py-2.5 rounded-full text-xs font-bold hover:bg-stone-800 uppercase tracking-wider transition-all"
                >
                  Read Detailed 4-Step Guide
                </button>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="border border-stone-200 hover:bg-stone-100 text-stone-600 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Close Player
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
