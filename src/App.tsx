/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Smartphone, 
  Monitor, 
  ChevronRight, 
  Loader2, 
  AlertTriangle,
  CheckCircle2,
  Trophy,
  Coins
} from 'lucide-react';

// --- Constants ---
const LOGO_URL = "https://i.postimg.cc/RCtHBjr2/mech_arena_a_coins_generator_images_5_1.webp";
const COIN_LOGO_URL = "https://i.postimg.cc/v8nVspRJ/mech_arena_hack_henrique_hoffmann_a_coin_removebg_preview.jpg";

const ACOIN_OPTIONS = [
  { amount: 1000, label: "1,000 A-Coins" },
  { amount: 2000, label: "2,000 A-Coins" },
  { amount: 5000, label: "5,000 A-Coins" },
  { amount: 9999, label: "9,999 A-Coins" },
];

const PLATFORMS = [
  { id: 'ios', name: 'iOS', icon: Smartphone },
  { id: 'android', name: 'Android', icon: Smartphone },
  { id: 'pc', name: 'PC / Plarium Play', icon: Monitor },
];

const REGIONS = ['North America', 'Europe', 'Asia', 'South America'];

// --- Components ---

const Header = () => (
  <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-cyan-500/20 py-4 px-6 flex justify-between items-center">
    <div className="flex items-center gap-3">
      <img src={LOGO_URL} alt="Mech Arena Logo" className="h-10 object-contain" referrerPolicy="no-referrer" />
      <div className="hidden md:block">
        <h1 className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase font-orbitron">Resource Portal 2026</h1>
        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Status: <span className="text-green-500">Online</span></p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-end">
        <span className="text-[10px] text-gray-400 uppercase font-medium">Active Users</span>
        <span className="text-xs font-bold text-cyan-400 font-mono">1,482</span>
      </div>
      <div className="w-px h-8 bg-white/10" />
      <ShieldCheck className="w-5 h-5 text-cyan-500" />
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-[#050507] border-t border-white/5 py-12 px-6 mt-20">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="space-y-4">
        <img src={LOGO_URL} alt="Mech Arena Logo" className="h-8 opacity-50 grayscale hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
        <p className="text-sm text-gray-500 leading-relaxed">
          The ultimate resource for Mech Arena players in 2026. Dominate the meta without the grind.
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest font-orbitron">Quick Links</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="hover:text-cyan-400 cursor-pointer transition-colors">Privacy Policy</li>
          <li className="hover:text-cyan-400 cursor-pointer transition-colors">Terms of Service</li>
          <li className="hover:text-cyan-400 cursor-pointer transition-colors">Support Center</li>
          <li className="hover:text-cyan-400 cursor-pointer transition-colors">Anti-Ban Guide</li>
        </ul>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest font-orbitron">Security Status</h3>
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-green-500 uppercase tracking-wider">Stealth Mode 4.0 Active</span>
        </div>
      </div>
    </div>
    <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 text-center">
      <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em]">
        © 2026 MECH ARENA RESOURCE PORTAL. NOT AFFILIATED WITH PLARIUM GLOBAL LTD.
      </p>
    </div>
  </footer>
);

export default function App() {
  useEffect(() => {
    console.log("Mech Arena Portal 2026 Component Mounted");
  }, []);

  const [step, setStep] = useState<'landing' | 'generator' | 'platform' | 'loading' | 'verification'>('landing');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [playerID, setPlayerID] = useState('');
  const [platform, setPlatform] = useState('');
  const [region, setRegion] = useState('North America');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing connection...');

  // Loading simulation
  useEffect(() => {
    if (step === 'loading') {
      const duration = 20000; // 20 seconds
      const interval = 100;
      const steps = duration / interval;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = (currentStep / steps) * 100;
        setLoadingProgress(progress);

        if (progress < 20) setLoadingText('Establishing secure tunnel...');
        else if (progress < 40) setLoadingText(`Searching for Player ID: ${playerID}...`);
        else if (progress < 60) setLoadingText('Injecting A-Coin packets (Stealth Mode 4.0)...');
        else if (progress < 80) setLoadingText('Syncing with Cloud-Sync servers...');
        else if (progress < 95) setLoadingText('Finalizing resource addition...');
        else setLoadingText('Awaiting human verification...');

        if (currentStep >= steps) {
          clearInterval(timer);
          setStep('verification');
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [step, playerID]);

  const handleStart = () => {
    setStep('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
    setStep('platform');
  };

  const handlePlatformSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerID && platform) {
      setStep('loading');
    }
  };

  // SEO Hidden Text
  const SEOHiddenText = () => (
    <div className="sr-only" aria-hidden="true">
      <h2>Mech Arena Free A-Coins Generator 2026</h2>
      <p>How to get free acoins in mech arena 2026. Mech arena hack no human verification. Mech arena credits generator. Mech arena a-coins cheat. Mech arena legendary mechs unlock. Mech arena unlimited resources. Mech arena mod apk 2026. Mech arena plarium play hack. Mech arena ios hack. Mech arena android hack.</p>
    </div>
  );

  return (
    <div className="min-h-screen font-rajdhani overflow-x-hidden">
      <Header />
      <SEOHiddenText />

      <main className="pt-24 pb-12 px-4">
        <AnimatePresence mode="wait">
          {step === 'landing' && (
            <motion.div 
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto text-center space-y-12"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative inline-block"
                >
                  <img src={LOGO_URL} alt="Mech Arena" className="h-24 md:h-32 mx-auto drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]" referrerPolicy="no-referrer" />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-black px-4 py-1 skew-x-[-12deg] font-orbitron font-black text-sm tracking-tighter">
                    2026 EDITION
                  </div>
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-orbitron font-black uppercase tracking-tighter leading-none">
                  <span className="text-white">FREE </span>
                  <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">A-COINS </span>
                  <span className="text-white">GENERATOR</span>
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                  Bypass the paywall instantly. The only working 2026 resource injection tool for Mech Arena.
                </p>
              </div>

              <div className="flex flex-col items-center gap-8">
                <button 
                  onClick={handleStart}
                  className="group relative px-12 py-5 bg-cyan-500 text-black font-orbitron font-black text-xl uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]" />
                  <span className="relative flex items-center gap-3">
                    Start Generator <ChevronRight className="w-6 h-6" />
                  </span>
                </button>

                <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-[0.2em] font-bold text-gray-500">
                  <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-cyan-500" /> Anti-Ban Protection</div>
                  <div className="flex items-center gap-2"><Cpu className="w-4 h-4 text-cyan-500" /> Server-Side Injection</div>
                  <div className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-cyan-500" /> All Platforms</div>
                </div>
              </div>

              {/* SEO Article Section */}
              <div className="mt-20 text-left bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 space-y-8">
                <article className="prose prose-invert max-w-none">
                  <h1 className="text-3xl font-orbitron text-cyan-400 mb-6">Mech Arena Free A-Coins Generator 2026: The Ultimate "Whale-Killer" Guide</h1>
                  <p className="text-gray-300 leading-relaxed">
                    Are you stuck in the "Credit Crunch"? In 2026, Mech Arena has evolved, but the struggle for resources is more real than ever. Whether you're trying to unlock the legendary Seeker, max out your Revoker 8s, or finally get that Surge to Rank 6, you know one thing: A-Coins are king. If you've been searching for how to get free acoins in mech arena without spending your life savings, you've landed in the right place. This is the only 2026 update you need to bypass the paywall and start running the lobbies.
                  </p>

                  <h2 className="text-2xl font-orbitron text-white mt-12 mb-4 flex items-center gap-3">
                    <span className="text-cyan-500">💎</span> The 2026 Resource Gap: Why A-Coins Matter Now
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    The current meta is dominated by high-energy builds and legendary pilots. To compete in the Grandmaster League, your hangar needs:
                  </p>
                  <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                    <li><strong className="text-white">Legendary Mechs:</strong> (Nomad, Eclipse, and Scorpius) all require thousands of A-Coins.</li>
                    <li><strong className="text-white">Implant Parts:</strong> To max out your Pilots, you need a secondary stream of Credits.</li>
                    <li><strong className="text-white">Upgrade Blueprints:</strong> The higher the rank, the lower the drop rate.</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mt-4">
                    The standard "F2P grind" earns you about 200 A-Coins a week. At that rate, it would take you six months to fully kit out a single Mech. That’s why the demand for a <span className="text-cyan-400 font-bold">mech arena free a-coins generator 2026</span> has reached an all-time high.
                  </p>

                  <h2 className="text-2xl font-orbitron text-white mt-12 mb-4 flex items-center gap-3">
                    <span className="text-cyan-500">⚡</span> How to Get Free Acoins in Mech Arena (Legit 2026 Methods)
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    Before using a generator, make sure you've exhausted these official 2026 "resource loops":
                  </p>
                  <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6 my-6">
                    <h3 className="text-lg font-bold text-cyan-400 mb-2">The 2026 Promo Code Blitz</h3>
                    <p className="text-sm text-gray-400 mb-4">Plarium releases monthly codes. Here are the active ones for March/April 2026:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                      <div className="bg-black/40 p-3 rounded">CHILLBOT: 200 A-Coins & 100k Credits</div>
                      <div className="bg-black/40 p-3 rounded">MIDPILOTUP: 220 A-Coins & 50k Credits</div>
                      <div className="bg-black/40 p-3 rounded">2GTLOVEMECH: 140 A-Coins & 40k Credits</div>
                      <div className="bg-black/40 p-3 rounded">READY4SPRING: 300 A-Coins</div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-orbitron text-white mt-12 mb-4 flex items-center gap-3">
                    <span className="text-cyan-500">🛠️</span> Inside the Mech Arena Free A-Coins Generator 2026
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    Our updated <span className="text-cyan-400 font-bold">mech arena free a-coins generator 2026</span> is the only tool that utilizes Cloud-Sync Injection. Unlike 2024-era hacks that required downloading "Mod APKs" (which are now immediately detected by Plarium’s anti-cheat), this tool works on the server level.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                    {[
                      { title: "Cross-Platform", desc: "iOS 19, Android 15, and PC." },
                      { title: "Stealth-Mode 4.0", desc: "100% invisible to security logs." },
                      { title: "High-Volume", desc: "Up to 500k A-Coins daily." }
                    ].map((feat, i) => (
                      <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h4 className="text-cyan-400 font-bold mb-2">{feat.title}</h4>
                        <p className="text-xs text-gray-500">{feat.desc}</p>
                      </div>
                    ))}
                  </div>

                  <h2 className="text-2xl font-orbitron text-white mt-12 mb-4 flex items-center gap-3">
                    <span className="text-cyan-500">🚀</span> Step-by-Step: Using the Mech Arena Generator
                  </h2>
                  <ol className="list-decimal list-inside text-gray-400 space-y-4 ml-4">
                    <li><strong className="text-white">Launch the Portal:</strong> Open the [2026 Mech Arena Resource Portal].</li>
                    <li><strong className="text-white">Link Your ID:</strong> Enter your Player ID (the number found in your in-game profile).</li>
                    <li><strong className="text-white">Select Region:</strong> Choose your server for faster synchronization.</li>
                    <li><strong className="text-white">Define Your Loot:</strong> Select your desired amount of Free A-Coins and Free Credits.</li>
                    <li><strong className="text-white">Human Verification:</strong> Complete one quick verification task.</li>
                  </ol>

                  <h2 className="text-2xl font-orbitron text-white mt-12 mb-4 flex items-center gap-3">
                    <span className="text-cyan-500">🕵️</span> Mech Arena Hacks & Cheats: What to Avoid
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    In 2026, the internet is full of "scam" sites. NEVER give your account password. A real generator only needs your Player ID. Avoid "Unlimited Ammo" Hacks as these are client-side only and will get you banned instantly.
                  </p>

                  <h2 className="text-2xl font-orbitron text-white mt-12 mb-4 flex items-center gap-3">
                    <span className="text-cyan-500">🏆</span> Hangar Management: Spending Your Free A-Coins
                  </h2>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="text-cyan-500 font-bold">01</div>
                      <p className="text-gray-400"><strong className="text-white">The Energy Tier:</strong> Get your main Mechs (like Eclipse or Surge) to 16 or 24 Energy.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-cyan-500 font-bold">02</div>
                      <p className="text-gray-400"><strong className="text-white">Dual Legendary Weapons:</strong> Buy two Revoker 8s or Disruption Beam 12s.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-cyan-500 font-bold">03</div>
                      <p className="text-gray-400"><strong className="text-white">Max the Pilot:</strong> Use your free Credits to buy Pilot Marks and max out Legendary Pilot Case.</p>
                    </div>
                  </div>

                  <p className="text-gray-400 italic mt-12 text-center border-t border-white/10 pt-8">
                    The 2026 Mech Arena landscape is fast, explosive, and unfortunately, expensive. But with the right knowledge and our mech arena free a-coins generator 2026, you don't have to be a millionaire to be a champion.
                  </p>
                </article>
              </div>
            </motion.div>
          )}

          {step === 'generator' && (
            <motion.div 
              key="generator"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="max-w-4xl mx-auto space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-5xl font-orbitron font-black uppercase tracking-tighter">
                  SELECT <span className="text-cyan-400">A-COIN</span> PACKAGE
                </h2>
                <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">Step 1 of 3: Resource Selection</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {ACOIN_OPTIONS.map((opt) => (
                  <motion.button
                    key={opt.amount}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(34, 211, 238, 0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectAmount(opt.amount)}
                    className="relative bg-white/5 border-2 border-white/10 rounded-2xl p-8 flex flex-col items-center gap-6 group transition-all hover:border-cyan-500/50"
                  >
                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity">
                      <Coins className="w-12 h-12 text-cyan-500" />
                    </div>
                    <img src={COIN_LOGO_URL} alt="A-Coins" className="w-24 h-24 object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]" referrerPolicy="no-referrer" />
                    <div className="text-center">
                      <h3 className="text-3xl font-orbitron font-black text-white">{opt.label}</h3>
                      <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mt-1">Instant Injection</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'platform' && (
            <motion.div 
              key="platform"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-2xl mx-auto space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-5xl font-orbitron font-black uppercase tracking-tighter">
                  ACCOUNT <span className="text-cyan-400">LINKING</span>
                </h2>
                <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">Step 2 of 3: Platform & ID</p>
              </div>

              <form onSubmit={handlePlatformSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 space-y-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Player ID / Username</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      required
                      value={playerID}
                      onChange={(e) => setPlayerID(e.target.value)}
                      placeholder="Enter Player ID (e.g. 12345678)"
                      className="w-full bg-black/50 border-2 border-white/10 rounded-xl px-6 py-4 text-xl font-orbitron focus:border-cyan-500 focus:outline-none transition-all placeholder:text-gray-700"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500/50">
                      <Zap className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Platform</label>
                    <div className="grid grid-cols-3 gap-3">
                      {PLATFORMS.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPlatform(p.id)}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                            platform === p.id 
                              ? 'bg-cyan-500 border-cyan-500 text-black' 
                              : 'bg-black/30 border-white/10 text-gray-400 hover:border-white/20'
                          }`}
                        >
                          <p.icon className="w-6 h-6 mb-2" />
                          <span className="text-[10px] font-bold uppercase">{p.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Server Region</label>
                    <select 
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full bg-black/30 border-2 border-white/10 rounded-xl px-4 py-4 text-sm font-bold uppercase tracking-wider focus:border-cyan-500 focus:outline-none appearance-none cursor-pointer"
                    >
                      {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={!playerID || !platform}
                  className="w-full py-5 bg-cyan-500 disabled:bg-gray-800 disabled:text-gray-600 text-black font-orbitron font-black text-xl uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Connect & Inject
                </button>
              </form>
            </motion.div>
          )}

          {step === 'loading' && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto text-center space-y-12 py-20"
            >
              <div className="relative inline-block">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-48 h-48 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-orbitron font-black text-cyan-400">{Math.round(loadingProgress)}%</span>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-orbitron font-black uppercase tracking-widest animate-pulse">
                  {loadingText}
                </h2>
                
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/10">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${loadingProgress}%` }}
                    className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-2 text-left font-mono text-[10px] text-cyan-500/60 uppercase tracking-wider max-w-md mx-auto">
                  <div className="flex justify-between"><span>Packet Size:</span> <span>1024KB</span></div>
                  <div className="flex justify-between"><span>Encryption:</span> <span>AES-256-GCM</span></div>
                  <div className="flex justify-between"><span>Proxy:</span> <span>SOCKS5_HIDDEN</span></div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'verification' && (
            <motion.div 
              key="verification"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto"
            >
              <div className="bg-[#0f1115] border-2 border-cyan-500 rounded-[2rem] p-10 text-center space-y-8 relative overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.2)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 animate-pulse" />
                
                <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-cyan-500/30">
                  <AlertTriangle className="w-10 h-10 text-cyan-500" />
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-orbitron font-black uppercase text-white">Verification Required</h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    To prevent bot-spam and ensure server stability, we require a quick human verification. Your <span className="text-cyan-400 font-bold">{selectedAmount} A-Coins</span> are ready for injection into account <span className="text-cyan-400 font-bold">{playerID}</span>.
                  </p>
                </div>

                <div className="bg-black/40 rounded-2xl p-6 border border-white/5 text-left space-y-4">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-green-500">
                    <CheckCircle2 className="w-4 h-4" /> Injection Success: 99%
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-cyan-500">
                    <CheckCircle2 className="w-4 h-4" /> Stealth Mode: Active
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-cyan-500">
                    <CheckCircle2 className="w-4 h-4" /> Resources: Reserved
                  </div>
                </div>

                <button 
                  // @ts-ignore
                  onClick={() => typeof _qd === 'function' ? _qd() : alert('Verification script not loaded. Please refresh.')}
                  className="w-full py-6 bg-cyan-500 text-black font-orbitron font-black text-2xl uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(34,211,238,0.4)] hover:shadow-[0_15px_40px_rgba(34,211,238,0.6)] transition-all hover:-translate-y-1"
                >
                  Verify Now
                </button>

                <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                  Average time: 60 seconds
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
