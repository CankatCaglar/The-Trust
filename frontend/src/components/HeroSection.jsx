import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileText, Shield } from 'lucide-react';

const ASCII_LOGO = `
   █████╗ ██████╗ ██╗  ██╗
  ██╔══██╗██╔══██╗██║ ██╔╝
  ███████║██████╔╝█████╔╝ 
  ██╔══██║██╔══██╗██╔═██╗ 
  ██║  ██║██║  ██║██║  ██╗
  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
`;

const TERMINAL_LINES = [
  '$ solana address verify 7xKXtg...',
  '',
  'Last login: Thu Dec 25 17:08:38 on ttys001',
  '',
  'ARK@protocol ~ $ _'
];

const HeroSection = () => {
  const [terminalText, setTerminalText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const currentLine = TERMINAL_LINES[lineIndex] || '';
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (charIndex <= currentLine.length) {
        setTerminalText(
          TERMINAL_LINES.slice(0, lineIndex).join('\n') + 
          (lineIndex > 0 ? '\n' : '') + 
          currentLine.slice(0, charIndex)
        );
        charIndex++;
      } else {
        clearInterval(typeInterval);
        if (lineIndex < TERMINAL_LINES.length - 1) {
          setTimeout(() => setLineIndex(prev => prev + 1), 300);
        }
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [lineIndex]);

  return (
    <section className="min-h-screen pt-24 pb-16 relative overflow-hidden" data-testid="hero-section">
      {/* Background Effects */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.3) 0%, transparent 70%)'
        }}
      />

      <div className="ark-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* ASCII Logo */}
            <pre className="ascii-art hidden sm:block" data-testid="ascii-logo">
              {ASCII_LOGO}
            </pre>
            
            {/* Mobile Logo */}
            <div className="sm:hidden flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#22c55e] to-[#10b981] flex items-center justify-center shadow-[0_0_25px_rgba(34,197,94,0.5)]">
                <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="font-mono font-bold text-3xl gradient-text">ARK</span>
            </div>

            <p className="text-[#A3A3A3] text-lg md:text-xl max-w-xl leading-relaxed">
              Trust infrastructure for the Solana ecosystem.
              <br />
              <span className="text-[#E5E5E5]">AI-powered wallet verification.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a href="/docs" className="btn-secondary" data-testid="btn-docs">
                <FileText className="w-4 h-4" />
                Docs
              </a>
              <a href="#verify" className="btn-primary" data-testid="btn-verify-now">
                <Shield className="w-4 h-4" />
                Verify Now
              </a>
            </div>
          </motion.div>

          {/* Right Column - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="terminal-window animate-float" data-testid="terminal-preview">
              <div className="terminal-header">
                <div className="terminal-dot red" />
                <div className="terminal-dot yellow" />
                <div className="terminal-dot green" />
                <span className="terminal-title">ark@protocol</span>
              </div>
              <div className="terminal-body">
                <pre className="whitespace-pre-wrap">
                  {terminalText}
                  <span className="terminal-cursor" />
                </pre>
              </div>
            </div>

            {/* Decorative glow */}
            <div 
              className="absolute -inset-4 rounded-2xl opacity-20 blur-2xl -z-10"
              style={{ background: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.4) 0%, transparent 70%)' }}
            />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[#22c55e] text-sm font-mono">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5 text-[#22c55e]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
