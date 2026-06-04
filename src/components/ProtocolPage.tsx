import { useState, useEffect } from 'react';
import { Clock, ShieldCheck, Check, Sparkles, Flame, Play, Volume2, HelpCircle, Activity, Heart, Info, RefreshCw } from 'lucide-react';

export default function ProtocolPage() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Auto decrement UV Timer
  useEffect(() => {
    let interval: any;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
      setTimerCompleted(true);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const handleStartCure = () => {
    setTimerSeconds(10); // 10s for interactive simulation comfort
    setTimerRunning(true);
    setTimerCompleted(false);
  };

  const resetCureSimulator = () => {
    setTimerSeconds(60);
    setTimerRunning(false);
    setTimerCompleted(false);
  };

  const stepsDetails = [
    {
      step: 1,
      title: "The Canvas Prep",
      tagline: "Oil-Free Keratin Preparation",
      description: "Prise open and dehydrate the natural nail plate. A pristine, lipid-free surface is the absolute key to preventing lift-off at the lateral folds.",
      proTip: "Use code-grade isopropyl alcohol (99%) and lint-free wipes. Sweep away every micro-speck of dust and push back the invisible cuticle entirely.",
      warning: "Never touch the prepared nail with your fingers; skin oil instantly decreases adhesion by up to 80%.",
      time: "3 Mins",
      tools: "Stone buffer, Dual-sided cuticle pusher, Dehydrating prep fluid",
      emoji: "🧹",
      videoUrl: "#"
    },
    {
      step: 2,
      title: "The Slip Layer",
      tagline: "Guide Base Capillary Layer",
      description: "Apply a micro-thin, sparse layer over the entire nail plate surface. Crucial: Do not cure yet. This wet layer acts as a mechanical track for your following bead.",
      proTip: "Scrub the gel lightly into the nail plate fibers. Keep it off the sidewalls and surrounding proximal fold.",
      warning: "Ensure the slip layer doesn't touch the cuticle surrounding skin, otherwise the gel will bleed and lift on growth.",
      time: "1 Min",
      tools: "BIAB 15ml Formula, Precision Detailer Brush",
      emoji: "🖌️",
      videoUrl: "#"
    },
    {
      step: 3,
      title: "The Apex Bead",
      tagline: "Self-Leveling Build Arc",
      description: "Float a larger bead down the center apex. Watch as the polymer matrix leverages gravity and surface tension to flatten out seamlessly.",
      proTip: "Hover the brush bristles 1mm above the nail bed; do not press down. Let the gel roll smoothly off the tip.",
      warning: "If leveling seems uneven, simply invert your hand upside down for 5 seconds to load the apex center naturally before flipping to cure.",
      time: "2 Mins",
      tools: "BIAB 15ml Formula",
      emoji: "💧",
      videoUrl: "#"
    },
    {
      step: 4,
      title: "The Cure & Lock",
      tagline: "Cool-Mode LED Crosslinking",
      description: "Cure for 60 seconds under the 48W LED lamp. Our cool-cure chemical triggers prevent any high thermal heat-spikes.",
      proTip: "Use the 48W cool-mode if you have hyper-thin sensitive nails. This pulses the wavelength gradually.",
      warning: "Do not touch the sticky inhibition layer left on top after curing. It is necessary for top coat adherence or can be wiped clear with non-wipe fluid.",
      time: "60 Secs",
      tools: "Professional LED UV 48W Lamp",
      emoji: "⚡",
      videoUrl: "#"
    }
  ];

  return (
    <div className="font-sans text-stone-900 bg-white min-h-screen py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold bg-stone-100 text-stone-700 font-sans tracking-widest uppercase px-3.5 py-1.5 rounded-full inline-block">
            Scientific Application Rituals
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-stone-900 leading-snug">
            The Zero-Friction Protocol®
          </h1>
          <p className="text-stone-500 text-sm md:text-base leading-relaxed">
            Salon-grade architecture in four foolproof phases. Learn the exact mechanical fluid steps used by European designers to reinforce natural nails without painful filing.
          </p>
        </div>

        {/* Master Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-4">
          
          {/* Step list navigation column (Left) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 uppercase tracking-wide">
              Manicure Chronology
            </h3>

            <div className="space-y-4 relative">
              <div className="absolute top-4 bottom-4 left-6 w-0.5 bg-stone-100 hidden sm:block" />

              {stepsDetails.map((item) => (
                <div 
                  key={item.step}
                  onClick={() => setActiveStep(item.step)}
                  className={`w-full group cursor-pointer text-left p-5 rounded-2xl border transition-all flex items-start gap-4 relative ${
                    activeStep === item.step 
                      ? 'bg-rose-50/50 border-rose-200 shadow-sm ring-1 ring-rose-200' 
                      : 'bg-stone-50/40 border-stone-250 hover:bg-stone-50'
                  }`}
                >
                  {/* Circular Step Badge */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border transition-colors ${
                    activeStep === item.step 
                      ? 'bg-stone-900 text-stone-100 border-stone-900 font-serif' 
                      : 'bg-white text-stone-400 group-hover:text-stone-900 border-stone-200 font-serif'
                  }`}>
                    {item.step}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] tracking-widest uppercase text-rose-500 font-black">
                      Phase {item.step} • {item.time}
                    </span>
                    <h4 className="font-serif text-lg text-stone-900 font-bold leading-tight flex items-center gap-1.5">
                      <span>{item.title}</span>
                      <span className="text-base">{item.emoji}</span>
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deep inspection details panel (Right) */}
          <div className="lg:col-span-7 bg-stone-50/80 rounded-[32px] border border-stone-250 p-6 md:p-8 space-y-8 shadow-sm">
            
            {/* Active Details Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/60 pb-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 font-sans">
                  Phase {activeStep} Deep-Dive Inspector
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  {stepsDetails[activeStep - 1].title} — {stepsDetails[activeStep - 1].tagline}
                </h3>
              </div>
              <div className="bg-white px-3.5 py-1.5 rounded-xl border border-stone-200/80 text-[10px] font-mono uppercase font-semibold text-stone-500 shrink-0">
                ⌛ Takt: {stepsDetails[activeStep - 1].time}
              </div>
            </div>

            {/* Core mechanical instruction */}
            <div className="space-y-4">
              <h5 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Mechanical Guideline</h5>
              <p className="text-sm text-stone-700 leading-relaxed">
                {stepsDetails[activeStep - 1].description}
              </p>
            </div>

            {/* Micro layout tools */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-stone-200/80 space-y-1">
                <span className="font-bold text-stone-400 uppercase tracking-widest text-[9px] block">Active Arsenal</span>
                <span className="font-semibold text-stone-800 leading-snug">{stepsDetails[activeStep - 1].tools}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-stone-200/80 space-y-1">
                <span className="font-bold text-stone-400 uppercase tracking-widest text-[9px] block">Curing Priority</span>
                <span className="font-semibold text-rose-600 leading-snug">Zero Thermal Spike Threshold</span>
              </div>
            </div>

            {/* Tips and warnings widgets */}
            <div className="space-y-4">
              {/* Pro Tip Callout */}
              <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-rose-900 uppercase tracking-wide">Pro-level Hack</span>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {stepsDetails[activeStep - 1].proTip}
                  </p>
                </div>
              </div>

              {/* Warning/Hazard Callout */}
              <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">Chemical Caveat</span>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {stepsDetails[activeStep - 1].warning}
                  </p>
                </div>
              </div>
            </div>

            {/* LED timer simulator specifically for Curing (Step 4) */}
            {activeStep === 4 && (
              <div className="border-t border-stone-200/80 pt-6 space-y-4">
                <h5 className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-rose-500" />
                  <span>Interactive cool-cure UV-LED Simulator</span>
                </h5>

                <div className={`p-6 rounded-2xl border transition-all flex flex-col items-center justify-center space-y-4 relative overflow-hidden ${
                  timerRunning 
                    ? 'bg-violet-950 text-white border-violet-800 shadow-xl' 
                    : 'bg-white text-stone-900 border-stone-200/80 shadow-sm'
                }`}>
                  
                  {/* Animated violet UV back-shadow */}
                  {timerRunning && (
                    <div className="absolute inset-0 bg-violet-600/10 animate-pulse duration-1000" />
                  )}

                  <div className="text-center space-y-1 z-10">
                    <p className={`text-xs uppercase font-mono tracking-widest ${timerRunning ? 'text-violet-300 animate-pulse' : 'text-stone-400'}`}>
                      {timerRunning ? '⚡ Active Wavelength: 365nm + 405nm' : '⏱️ Standby Cool-Mode'}
                    </p>
                    <span className="text-5xl font-mono font-black block tracking-tight">
                      {timerSeconds}s
                    </span>
                  </div>

                  {timerCompleted ? (
                    <div className="bg-emerald-50 text-emerald-800 text-xs px-4 py-2 rounded-full font-bold uppercase tracking-wider animate-scale-in">
                      ✓ Polymer Crosslinked! Glass-hard gloss locked.
                    </div>
                  ) : null}

                  <div className="flex gap-2.5 z-10 w-full max-w-xs">
                    {!timerRunning ? (
                      <button
                        onClick={handleStartCure}
                        className="flex-1 bg-stone-900 hover:bg-stone-800 text-stone-50 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer"
                      >
                        Start Safe-Cure Cycle
                      </button>
                    ) : (
                      <button
                        onClick={resetCureSimulator}
                        className="flex-1 bg-violet-800 hover:bg-violet-700 text-white py-2.5 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Reset Reactor</span>
                      </button>
                    )}
                  </div>

                  <p className={`text-[10px] text-center font-sans tracking-wide leading-relaxed max-w-sm ${timerRunning ? 'text-violet-300' : 'text-stone-400'}`}>
                    Simulates our 48W Cool LED Lamp emitter pulsing technology. Rapid curing monomers align neatly at lower temperature gradient intervals, completely bypassing nail heat spikes.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Science and Formula Polymer Overview */}
        <div className="mt-20 border-t border-stone-200/80 pt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-black tracking-widest text-rose-500 uppercase">Elastic Matrix</span>
            <h4 className="font-serif text-lg font-bold">Thixotropic Leveling</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              When stirred, the gel decreases in viscosity, yielding smooth brush action. When resting on the nail bed, the particles locks back in place instantly to protect your perfect apex curve.
            </p>
          </div>

          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-black tracking-widest text-rose-500 uppercase">Chemical Barrier</span>
            <h4 className="font-serif text-lg font-bold">Oxygenation Layer</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Formulated with organic oligomers that are fully porous to allow micro-capillary air diffusion. Natural fingernail beds are defended against dehydration and fungal buildup.
            </p>
          </div>

          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-black tracking-widest text-rose-500 uppercase">Cool Cure Tech</span>
            <h4 className="font-serif text-lg font-bold">Zero Heat Spikes</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              High-quality photoinitiators require smaller quantities of UV radiation to start alignment. Crosslinking completes without the high energy friction bursts that cause burning sensations on skin folds.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
