import { useState } from 'react';
import { Sparkles, HelpCircle, Check, ArrowRight, RotateCcw, ShieldCheck, Heart } from 'lucide-react';
import { Shade } from '../types';

interface ShadeQuizProps {
  shades: Shade[];
  onAddShadeToCart: (shade: Shade) => void;
}

interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    description: string;
    value: string;
    emoji: string;
  }[];
}

export default function ShadeQuiz({ shades, onAddShadeToCart }: ShadeQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [recommendedShade, setRecommendedShade] = useState<Shade | null>(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      text: "How would you describe your skin's natural undertone?",
      options: [
        { label: "Cool & Rosy", description: "Silver jewelry pop; veins look purplish/blue", value: "dolly", emoji: "🌸" },
        { label: "Warm & Golden", description: "Gold jewelry glows; veins look greenish/olive", value: "teddy", emoji: "☀️" },
        { label: "Neutral & Creamy", description: "Both metals look gorgeous; veins look blue-green", value: "milky", emoji: "✨" },
        { label: "Vibrant Transparency", description: "I prefer seeing the clean organic pink of my real nail beds", value: "clear", emoji: "💎" }
      ]
    },
    {
      id: 2,
      text: "What is your primary cosmetic manicure aesthetic?",
      options: [
        { label: "High-Fashion Bare Blush", description: "Delectable, bare French pink overlay", value: "dolly", emoji: "🩰" },
        { label: "Warm Editorial Nudes", description: "Classic espresso/latte tone chic", value: "teddy", emoji: "🪵" },
        { label: "Crisp Milky Opal", description: "Modern, clean, semi-opaque quartz look", value: "milky", emoji: "🥛" },
        { label: "High-Gloss Structural Gloss", description: "100% transparent high-shine shield layer", value: "clear", emoji: "💧" }
      ]
    },
    {
      id: 3,
      text: "How would you rate the current mechanical condition of your nails?",
      options: [
        { label: "Paper-Thin & Peeling", description: "Nails bend easily and flake off at tips", value: "dolly", emoji: "🍂" },
        { label: "Recovering from Acrylics", description: "Requires thick, dense structural rehabilitation", value: "teddy", emoji: "🛠️" },
        { label: "Healthy but Fragile", description: "Looks smooth but breaks easily under stress", value: "milky", emoji: "🌿" },
        { label: "Naturally Thick but Cracking", description: "Just need structural shield to hold shape", value: "clear", emoji: "🥥" }
      ]
    },
    {
      id: 4,
      text: "What is your typical daily hands-on activity level?",
      options: [
        { label: "Active Keyboard Typing", description: "Continuous fingertip taps, coding or writing", value: "dolly", emoji: "💻" },
        { label: "Heavy Manual/Tactile", description: "Gardening, sports, or high hands-on activity", value: "teddy", emoji: "🏺" },
        { label: "Medical/Frequent Washing", description: "Constant sanitizer use and hot water exposure", value: "milky", emoji: "🩺" },
        { label: "Everyday Urban Chic", description: "Moderate typing, lifestyle activities", value: "clear", emoji: "🥂" }
      ]
    }
  ];

  const handleSelectOption = (value: string) => {
    const updatedAnswers = { ...answers, [questions[currentStep].id]: value };
    setAnswers(updatedAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate Recommendation Recommendation logic based on answers
      const counts: Record<string, number> = { dolly: 0, teddy: 0, milky: 0, clear: 0 };
      Object.values(updatedAnswers).forEach((val) => {
        const valStr = val as string;
        if (valStr in counts) {
          counts[valStr] = (counts[valStr] || 0) + 1;
        }
      });

      // Find the value with maximum count
      let topVal = 'dolly';
      let maxCount = -1;
      for (const [key, count] of Object.entries(counts)) {
        if (count > maxCount) {
          maxCount = count;
          topVal = key;
        }
      }

      // Map top value to shades
      let selected: Shade | undefined;
      if (topVal === 'dolly') selected = shades.find((s) => s.id === 'dolly');
      else if (topVal === 'teddy') selected = shades.find((s) => s.id === 'teddy');
      else if (topVal === 'milky') selected = shades.find((s) => s.id === 'milky');
      else selected = shades.find((s) => s.id === 'clear');

      // fallback
      if (!selected) selected = shades[0];

      setRecommendedShade(selected);
      setQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setQuizCompleted(false);
    setRecommendedShade(null);
    setAddedSuccess(false);
  };

  const handleAddRecommended = () => {
    if (recommendedShade) {
      onAddShadeToCart(recommendedShade);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2000);
    }
  };

  return (
    <div className="font-sans text-stone-900 bg-stone-50 min-h-screen py-16 flex items-center justify-center">
      <div className="max-w-xl w-full mx-6">
        
        {/* Progress Bar indicating position */}
        {!quizCompleted && (
          <div className="mb-6 flex justify-between items-center text-xs font-mono text-stone-400">
            <span>SHADE PROFILE MATCH PROCESS</span>
            <span className="font-semibold text-rose-500">Step {currentStep + 1} of {questions.length}</span>
          </div>
        )}

        <div className="bg-white rounded-[32px] border border-stone-200 p-8 shadow-xl space-y-8 relative overflow-hidden">
          
          {/* Decorative smooth blush background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100 rounded-full blur-[80px] -z-10" />

          {quizCompleted && recommendedShade ? (
            /* Results State */
            <div className="space-y-6 text-center animate-fade-in py-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full inline-block">
                  Your Scientific Shade Recommendation
                </span>
                <h3 className="font-serif text-3xl font-black text-stone-950 mt-1">
                  {recommendedShade.name}
                </h3>
              </div>

              {/* Swatch Blob Rendering with realistic color */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <div 
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg animate-pulse"
                  style={{ backgroundColor: recommendedShade.hex }} 
                />
                <span className="text-xs text-stone-400 font-mono italic">Built-in apex high gloss formula</span>
              </div>

              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-100 text-left space-y-3">
                <h4 className="font-serif text-base font-bold text-stone-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-rose-500 animate-pulse" />
                  <span>Why {recommendedShade.name} is your bespoke fit:</span>
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {recommendedShade.longDescription}
                </p>
                
                <div className="border-t border-stone-200/60 pt-3 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-400" /> HEMA-Free Cert
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-400" /> Supports Keratin
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-3">
                <button
                  onClick={handleAddRecommended}
                  className="w-full bg-stone-900 text-stone-50 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-stone-800 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{addedSuccess ? '✓ Shade Configured to bag' : `Add 15ml ${recommendedShade.name} — $24.00`}</span>
                  {!addedSuccess && <ArrowRight className="w-4 h-4" />}
                </button>

                <button
                  onClick={handleResetQuiz}
                  className="mx-auto flex items-center gap-1 text-xs text-stone-400 hover:text-stone-900 font-mono uppercase tracking-wider py-2 transition-colors duration-200 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Re-examine My Profile</span>
                </button>
              </div>

            </div>
          ) : (
            /* Questions Step State */
            <div className="space-y-6">
              
              {/* Question Headline */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 font-sans">
                  Formula diagnostics quiz
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                  {questions[currentStep].text}
                </h4>
              </div>

              {/* Progress bar line */}
              <div className="w-full bg-stone-100 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-rose-400 h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Interactive choices cards */}
              <div className="space-y-3.5">
                {questions[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.value)}
                    className="w-full text-left p-4 rounded-2xl border border-stone-250 bg-stone-50/40 hover:bg-rose-50/20 hover:border-rose-300 transition-all flex items-center justify-between gap-4 cursor-pointer group active:scale-[0.99] hover:shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl pt-0.5 shrink-0 block">{opt.emoji}</span>
                      <div className="space-y-0.5">
                        <span className="text-sm font-bold text-stone-900 block group-hover:text-stone-950">
                          {opt.label}
                        </span>
                        <span className="text-xs text-stone-500 leading-relaxed block">
                          {opt.description}
                        </span>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border border-stone-300 group-hover:border-rose-400 group-hover:bg-rose-50 shrink-0 flex items-center justify-center transition-colors">
                      <span className="w-2.5 h-2.5 rounded-full bg-transparent group-hover:bg-rose-500 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
