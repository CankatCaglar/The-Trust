import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ExternalLink } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 relative" data-testid="cta-section">
      <div className="ark-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 md:p-12 rounded-2xl border border-[#27272a] overflow-hidden"
        >
          {/* Background Glow */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.3) 0%, transparent 70%)'
            }}
          />
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 mb-6">
              <Rocket className="w-4 h-4 text-[#22c55e]" />
              <span className="text-[#22c55e] text-sm font-mono">Token Launch</span>
            </div>
            
            <h2 className="font-mono text-3xl md:text-4xl font-bold mb-4">
              $ARK Token <span className="gradient-text">Coming Soon</span>
            </h2>
            
            <p className="text-[#A3A3A3] max-w-xl mx-auto mb-8">
              Power the trust infrastructure. Stake $ARK to run verification nodes, 
              earn fees from API calls, and govern the protocol.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#" 
                className="btn-primary"
                data-testid="btn-pump-fun"
              >
                <Rocket className="w-4 h-4" />
                Pump.fun (Coming Soon)
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
