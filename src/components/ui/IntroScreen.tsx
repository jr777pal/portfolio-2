import React, { useState, useRef } from 'react';

const IntroScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'waiting' | 'show' | 'glitch' | 'fade'>('waiting');
  const bladeAudioRef = useRef<HTMLAudioElement | null>(null);
  const swordAudioRef = useRef<HTMLAudioElement | null>(null);

  const startIntro = () => {
    setPhase('show');
    
    // Start the animation sequence
    setTimeout(() => {
      setPhase('glitch');
      // Play both sound effects (now allowed after user interaction)
      if (bladeAudioRef.current) {
        bladeAudioRef.current.volume = 0.5;
        bladeAudioRef.current.play().catch(console.error);
      }
      setTimeout(() => {
        if (swordAudioRef.current) {
          swordAudioRef.current.volume = 0.4;
          swordAudioRef.current.play().catch(console.error);
        }
      }, 200);
    }, 800);
    
    // Fade out after glitch
    setTimeout(() => setPhase('fade'), 2000);
    // Complete
    setTimeout(() => onComplete(), 2500);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${
        phase === 'fade' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Audio elements */}
      <audio
        ref={bladeAudioRef}
        src="https://cdn.freesound.org/previews/500/500168_10958883-lq.mp3"
        preload="auto"
      />
      <audio
        ref={swordAudioRef}
        src="https://cdn.freesound.org/previews/319/319590_5436764-lq.mp3"
        preload="auto"
      />

      {/* Waiting phase - Click to enter */}
      {phase === 'waiting' && (
        <button
          onClick={startIntro}
          className="group relative px-12 py-6 text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          <span className="relative z-10 gradient-text">CLICK TO ENTER</span>
          <div className="absolute inset-0 border-2 border-primary/50 rounded-lg group-hover:border-primary transition-colors" />
          <div className="absolute inset-0 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors" />
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      )}

      {/* Laser cut effects during glitch - cyan/purple theme */}
      {phase === 'glitch' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Horizontal cyan laser cuts */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`laser-h-${i}`}
              className="absolute h-[3px] animate-laser-horizontal"
              style={{
                top: `${15 + i * 14}%`,
                left: '-100%',
                width: '200%',
                animationDelay: `${i * 0.08}s`,
                background: 'linear-gradient(90deg, transparent, hsl(190, 95%, 50%), hsl(250, 84%, 64%), transparent)',
                boxShadow: '0 0 20px hsl(190, 95%, 50%), 0 0 40px hsl(250, 84%, 64%), 0 0 60px hsl(190, 95%, 50%)',
              }}
            />
          ))}
          {/* Diagonal purple laser cuts */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`laser-d-${i}`}
              className="absolute h-[3px] animate-laser-diagonal"
              style={{
                top: `${20 + i * 20}%`,
                left: '-100%',
                width: '250%',
                transform: `rotate(${-25 + i * 15}deg)`,
                animationDelay: `${0.1 + i * 0.1}s`,
                background: 'linear-gradient(90deg, transparent, hsl(280, 87%, 65%), hsl(320, 87%, 60%), transparent)',
                boxShadow: '0 0 15px hsl(280, 87%, 65%), 0 0 30px hsl(320, 87%, 60%), 0 0 45px hsl(280, 87%, 65%)',
              }}
            />
          ))}
          {/* Spark particles - mixed cyan/purple */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`spark-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full animate-spark-burst"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.6}s`,
                background: i % 2 === 0 ? 'hsl(190, 95%, 50%)' : 'hsl(280, 87%, 65%)',
                boxShadow: i % 2 === 0 
                  ? '0 0 8px hsl(190, 95%, 50%), 0 0 16px hsl(190, 95%, 50%)' 
                  : '0 0 8px hsl(280, 87%, 65%), 0 0 16px hsl(280, 87%, 65%)',
              }}
            />
          ))}
        </div>
      )}

      {/* Welcome text - shown during 'show' and 'glitch' phases */}
      {(phase === 'show' || phase === 'glitch') && (
        <div className="relative text-center select-none">
          {/* WELCOME TO MY - glitches right to left */}
          <h1
            className={`text-3xl md:text-5xl lg:text-7xl font-black tracking-[0.2em] uppercase mb-4 text-foreground transition-all duration-200 ${
              phase === 'glitch' ? 'animate-glitch-rtl' : 'animate-fade-up'
            }`}
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            WELCOME TO MY
          </h1>

          {/* PORTFOLIO - glitches left to right */}
          <h1
            className={`text-4xl md:text-6xl lg:text-8xl font-black tracking-[0.3em] uppercase gradient-text transition-all duration-200 ${
              phase === 'glitch' ? 'animate-glitch-ltr' : 'animate-fade-up'
            }`}
            style={{ fontFamily: "'Orbitron', sans-serif", animationDelay: '0.1s' }}
          >
            PORTFOLIO
          </h1>

          {/* Glitch overlay layers */}
          {phase === 'glitch' && (
            <>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1
                  className="text-3xl md:text-5xl lg:text-7xl font-black tracking-[0.2em] uppercase mb-4 text-accent opacity-60 animate-glitch-layer-1"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  WELCOME TO MY
                </h1>
                <h1
                  className="text-4xl md:text-6xl lg:text-8xl font-black tracking-[0.3em] uppercase opacity-60 animate-glitch-layer-1"
                  style={{ fontFamily: "'Orbitron', sans-serif", color: 'hsl(320, 87%, 60%)' }}
                >
                  PORTFOLIO
                </h1>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1
                  className="text-3xl md:text-5xl lg:text-7xl font-black tracking-[0.2em] uppercase mb-4 opacity-60 animate-glitch-layer-2"
                  style={{ fontFamily: "'Orbitron', sans-serif", color: 'hsl(320, 87%, 60%)' }}
                >
                  WELCOME TO MY
                </h1>
                <h1
                  className="text-4xl md:text-6xl lg:text-8xl font-black tracking-[0.3em] uppercase text-accent opacity-60 animate-glitch-layer-2"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  PORTFOLIO
                </h1>
              </div>
            </>
          )}
        </div>
      )}

      {/* Scanlines overlay */}
      <div className="absolute inset-0 bg-scanlines opacity-5 pointer-events-none" />
    </div>
  );
};

export default IntroScreen;