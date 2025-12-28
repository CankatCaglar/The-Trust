import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Search, ShieldAlert, Terminal } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    icon: Brain,
    title: 'AI Pattern Analysis',
    description: 'An AI agent starts analyzing the address pattern autonomously.',
    terminal: [
      '$ ark analyze --pattern 7xKXtg2CW87...',
      '> Loading AI model...',
      '> Pattern: Base58 encoding verified',
      '> Checksum: Valid',
      '> Result: PASS'
    ]
  },
  {
    id: 2,
    icon: Search,
    title: 'On-Chain Scan',
    description: 'Scanning blockchain for transaction history and balance data.',
    terminal: [
      '$ solana balance 7xKXtg2CW87...',
      '> Connecting to mainnet-beta...',
      '> Balance: 12.5 SOL',
      '> Transactions: 847',
      '> Last activity: 2 hours ago'
    ]
  },
  {
    id: 3,
    icon: ShieldAlert,
    title: 'Risk Detection',
    description: 'AI scans for suspicious patterns, scam indicators, and risk factors.',
    terminal: [
      '$ ark risk-scan 7xKXtg2CW87...',
      '> Checking known scam databases...',
      '> Analyzing transaction patterns...',
      '> Blacklist check: Clear',
      '> Risk score: 0.12 (LOW)'
    ]
  },
  {
    id: 4,
    icon: Terminal,
    title: 'CLI Verification',
    description: 'Final verification using Solana CLI commands for cryptographic proof.',
    terminal: [
      '$ solana-keygen verify 7xKXtg2CW87...',
      '> Public key format: Valid',
      '> On-chain account: Exists',
      '> Owner program: System',
      '> STATUS: VERIFIED ✓'
    ]
  }
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [terminalLines, setTerminalLines] = useState([]);

  useEffect(() => {
    setTerminalLines([]);
    const currentStep = STEPS[activeStep];
    let lineIndex = 0;

    const interval = setInterval(() => {
      if (lineIndex < currentStep.terminal.length) {
        setTerminalLines(prev => [...prev, currentStep.terminal[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [activeStep]);

  useEffect(() => {
    const autoAdvance = setInterval(() => {
      setActiveStep(prev => (prev + 1) % STEPS.length);
    }, 5000);

    return () => clearInterval(autoAdvance);
  }, []);

  return (
    <section id="how-it-works" className="py-24 relative" data-testid="how-it-works-section">
      <div className="ark-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-mono text-4xl md:text-5xl font-bold mb-4">
            How it <span className="gradient-text italic">works</span>
          </h2>
          <p className="text-[#A3A3A3] text-lg max-w-2xl mx-auto">
            Four layers of verification ensure maximum security and trust.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Terminal Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="terminal-window" data-testid="how-it-works-terminal">
              <div className="terminal-header">
                <div className="terminal-dot red" />
                <div className="terminal-dot yellow" />
                <div className="terminal-dot green" />
                <span className="terminal-title">agent</span>
              </div>
              <div className="terminal-body min-h-[250px]">
                <AnimatePresence mode="wait">
                  {terminalLines.map((line, idx) => (
                    <motion.div
                      key={`${activeStep}-${idx}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={line && line.startsWith('$') ? 'text-[#E5E5E5]' : 'text-[#22c55e]'}
                    >
                      {line}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <span className="terminal-cursor" />
              </div>
            </div>

            {/* Step Description */}
            <motion.p
              key={activeStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-6 text-[#A3A3A3]"
            >
              {STEPS[activeStep].description}
            </motion.p>
          </motion.div>

          {/* Steps List */}
          <div className="order-1 lg:order-2 space-y-4" data-testid="steps-list">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === activeStep;
              
              return (
                <motion.button
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#0A0A0A] border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.15)]' 
                      : 'bg-transparent border-[#27272a] hover:border-[#333]'
                  }`}
                  data-testid={`step-${step.id}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                      isActive ? 'bg-[#22c55e]/20' : 'bg-[#111]'
                    }`}>
                      <Icon className={`w-6 h-6 ${isActive ? 'text-[#22c55e]' : 'text-[#666]'}`} />
                    </div>
                    <div>
                      <h3 className={`font-mono font-semibold mb-1 ${isActive ? 'text-[#E5E5E5]' : 'text-[#A3A3A3]'}`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-[#666]">Step {step.id} of 4</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {STEPS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === activeStep ? 'bg-[#22c55e] w-6' : 'bg-[#333]'
              }`}
              data-testid={`step-indicator-${idx}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
