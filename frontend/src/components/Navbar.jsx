import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Rocket } from 'lucide-react';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
      data-testid="navbar"
    >
      <div className="ark-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3" data-testid="navbar-logo">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#22c55e] to-[#10b981] flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.4)]">
              <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="font-mono font-bold text-lg text-[#E5E5E5]">ARK Protocol</span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#what-is"
              className="text-[#A3A3A3] hover:text-[#22c55e] transition-colors text-sm font-medium"
              data-testid="nav-about"
            >
              About
            </a>
            <a
              href="#how-it-works"
              className="text-[#A3A3A3] hover:text-[#22c55e] transition-colors text-sm font-medium"
              data-testid="nav-how-it-works"
            >
              How it Works
            </a>
            <a
              href="#features"
              className="text-[#A3A3A3] hover:text-[#22c55e] transition-colors text-sm font-medium"
              data-testid="nav-features"
            >
              Features
            </a>
            <a
              href="#verify"
              className="text-[#A3A3A3] hover:text-[#22c55e] transition-colors text-sm font-medium"
              data-testid="nav-verify"
            >
              Verify
            </a>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-3">
            <a
              href="/docs"
              className="text-[#A3A3A3] hover:text-[#22c55e] transition-colors"
              title="Documentation"
              data-testid="nav-docs"
            >
              <FileText className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/ARK_Protocol_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A3A3A3] hover:text-[#22c55e] transition-colors"
              title="X (Twitter)"
              data-testid="nav-x"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="#"
              className="text-[#A3A3A3] hover:text-[#22c55e] transition-colors"
              title="Launch App"
              data-testid="nav-launch"
            >
              <Rocket className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
