import React from 'react';
import { motion } from 'framer-motion';

const WhatIsSection = () => {
  return (
    <section id="what-is" className="py-24 relative" data-testid="what-is-section">
      <div className="ark-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Terminal Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot red" />
                <div className="terminal-dot yellow" />
                <div className="terminal-dot green" />
                <span className="terminal-title">ARK Status</span>
              </div>
              <div className="terminal-body text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#666] mb-1">System Status</p>
                    <p className="text-[#22c55e]">● Online</p>
                  </div>
                  <div>
                    <p className="text-[#666] mb-1">Last Check</p>
                    <p>2 min ago</p>
                  </div>
                  <div>
                    <p className="text-[#666] mb-1">Network</p>
                    <p>mainnet-beta</p>
                  </div>
                  <div>
                    <p className="text-[#666] mb-1">RPC Health</p>
                    <p className="text-[#22c55e]">Healthy</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#333]">
                  <p className="text-[#666] mb-2">Recent Verifications</p>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-[#22c55e]">✓</span> 7xKXtg... verified as safe</p>
                    <p><span className="text-[#22c55e]">✓</span> EPjFWd... verified as safe</p>
                    <p><span className="text-yellow-400">!</span> ScamSc... flagged as risky</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-mono text-4xl md:text-5xl font-bold">
              What is<br />
              <span className="gradient-text italic">ARK Protocol?</span>
            </h2>
            
            <div className="space-y-4 text-[#A3A3A3] leading-relaxed">
              <p>
                <span className="text-[#E5E5E5]">ARK is building trust infrastructure for the Solana ecosystem.</span>{' '}
                AI agents and automated systems need reliable ways to verify wallet addresses before interacting with them.
              </p>
              <p>
                Today, bots guess which addresses are safe, retry failed transactions, and waste resources on compromised wallets. 
                At scale, this results in millions of dollars lost.
              </p>
              <p>
                <span className="text-[#22c55e]">ARK removes that friction</span> by verifying what's actually safe, 
                so agents succeed on the first attempt.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
