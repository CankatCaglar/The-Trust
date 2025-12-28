import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Shield, Database, Users } from 'lucide-react';

const FEATURES = [
  {
    id: 'Pl',
    icon: BarChart3,
    title: 'Platform',
    description: 'Test and research Solana endpoints with tool-equipped agents across 4 different verification layers simultaneously. See what works before your agents spend credits.',
    color: '#22c55e'
  },
  {
    id: 'Rs',
    icon: Shield,
    title: 'VerifyShield',
    description: 'AI-powered address analysis that verifies wallet authenticity and detects suspicious patterns, providing you a TRUST score which reflects the safety of the wallet.',
    color: '#10b981'
  },
  {
    id: 'Cs',
    icon: Users,
    title: 'Consult',
    description: 'DeFi projects can get their contracts tested by our infrastructure. Agent-driven insights help make your services more accessible and well-documented.',
    comingSoon: true,
    color: '#059669'
  },
  {
    id: 'Db',
    icon: Database,
    title: 'Database',
    description: 'We log successful and failed verifications, allowing agents to query our API and avoid interacting with flagged addresses before wasting resources.',
    color: '#047857'
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative" data-testid="features-section">
      {/* Section Divider */}
      <div className="section-divider">
        <span>COMING SOON</span>
      </div>

      <div className="ark-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-mono text-4xl md:text-5xl font-bold mb-4">
            Our trust<br />
            <span className="gradient-text italic">ecosystem</span>
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="space-y-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="feature-card group"
                data-testid={`feature-${feature.id.toLowerCase()}`}
              >
                <div className="flex items-start gap-6">
                  {/* Icon Badge */}
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <span 
                      className="font-mono font-bold text-lg"
                      style={{ color: feature.color }}
                    >
                      {feature.id}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-mono font-semibold text-xl text-[#E5E5E5]">
                        {feature.title}
                      </h3>
                      {feature.comingSoon && (
                        <span className="px-2 py-0.5 rounded-full bg-[#22c55e]/10 text-[#22c55e] text-xs font-mono">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-[#A3A3A3] leading-relaxed max-w-2xl">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
