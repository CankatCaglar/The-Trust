import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Book, 
  Rocket, 
  Shield, 
  Code, 
  Terminal, 
  Zap, 
  Lock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: Book },
    { id: 'getting-started', title: 'Getting Started', icon: Rocket },
    { id: 'verification', title: 'Wallet Verification', icon: Shield },
    { id: 'api', title: 'API Reference', icon: Code },
    { id: 'integration', title: 'Integration Guide', icon: Terminal },
    { id: 'security', title: 'Security', icon: Lock },
  ];

  // Scroll-based active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash-based navigation on page load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveSection(hash);
        }
      }, 100);
    }
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="ark-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 mb-6">
              <Book className="w-4 h-4 text-[#22c55e]" />
              <span className="text-[#22c55e] text-sm font-mono">Documentation</span>
            </div>
            
            <h1 className="font-mono text-4xl md:text-6xl font-bold mb-6">
              ARK Protocol <span className="gradient-text">Docs</span>
            </h1>
            
            <p className="text-[#A3A3A3] text-lg leading-relaxed">
              Complete documentation for integrating ARK Protocol's trust infrastructure 
              into your Solana applications. Learn how to verify wallet addresses, 
              detect risks, and build safer dApps.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 relative">
        <div className="ark-container">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 glass rounded-xl p-6 border border-[#27272a]">
                <h3 className="font-mono font-semibold text-[#E5E5E5] mb-4">Contents</h3>
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                          activeSection === section.id
                            ? 'bg-[#22c55e]/10 text-[#22c55e]'
                            : 'text-[#A3A3A3] hover:text-[#E5E5E5] hover:bg-[#111]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{section.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </motion.aside>

            {/* Documentation Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3 space-y-16"
            >
              {/* Introduction */}
              <section id="introduction" className="docs-section">
                <h2 className="docs-heading">
                  <Book className="w-6 h-6" />
                  Introduction
                </h2>
                
                <div className="docs-content">
                  <p>
                    ARK Protocol is a trust infrastructure layer for the Solana ecosystem. 
                    It provides AI-powered wallet verification and risk detection to help 
                    developers build safer, more reliable decentralized applications.
                  </p>

                  <h3 className="docs-subheading">What is ARK Protocol?</h3>
                  <p>
                    ARK Protocol solves a critical problem in the Solana ecosystem: 
                    <strong className="text-[#E5E5E5]"> how do you know if a wallet address is safe to interact with?</strong>
                  </p>

                  <p>
                    Today, bots and automated systems guess which addresses are safe, 
                    retry failed transactions, and waste resources on compromised wallets. 
                    At scale, this results in millions of dollars lost.
                  </p>

                  <div className="docs-callout">
                    <CheckCircle className="w-5 h-5 text-[#22c55e]" />
                    <div>
                      <strong>ARK removes that friction</strong> by verifying what's actually safe, 
                      so agents and applications succeed on the first attempt.
                    </div>
                  </div>

                  <h3 className="docs-subheading">Key Features</h3>
                  <ul className="docs-list">
                    <li>
                      <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                      <strong>Real-time Verification:</strong> Instant wallet address validation using live Solana blockchain data
                    </li>
                    <li>
                      <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                      <strong>AI Risk Detection:</strong> Advanced pattern analysis to identify suspicious wallet behavior
                    </li>
                    <li>
                      <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                      <strong>On-Chain Analysis:</strong> Fetch real balance, transaction history, and token holdings
                    </li>
                    <li>
                      <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                      <strong>RESTful API:</strong> Easy integration with any application or service
                    </li>
                  </ul>
                </div>
              </section>

              {/* Getting Started */}
              <section id="getting-started" className="docs-section">
                <h2 className="docs-heading">
                  <Rocket className="w-6 h-6" />
                  Getting Started
                </h2>
                
                <div className="docs-content">
                  <h3 className="docs-subheading">Quick Start</h3>
                  <p>
                    Get started with ARK Protocol in less than 5 minutes. 
                    No API key required for basic usage.
                  </p>

                  <h4 className="text-[#E5E5E5] font-semibold mt-6 mb-3">1. Make Your First Request</h4>
                  <div className="docs-code">
                    <pre>
{`curl -X POST https://ark-backend.up.railway.app/api/verify \\
  -H "Content-Type: application/json" \\
  -d '{
    "address": "CuieVDEDtLo7FypA9SbLM9saXFdb1dsshEkyErMqkRQq"
  }'`}
                    </pre>
                  </div>

                  <h4 className="text-[#E5E5E5] font-semibold mt-6 mb-3">2. Understand the Response</h4>
                  <div className="docs-code">
                    <pre>
{`{
  "address": "CuieVDEDtLo7FypA9SbLM9saXFdb1dsshEkyErMqkRQq",
  "is_valid": true,
  "risk_level": "safe",
  "balance": 0.0057,
  "transaction_count": 1000,
  "steps": [...],
  "summary": "This wallet address is verified and appears safe."
}`}
                    </pre>
                  </div>

                  <div className="docs-callout">
                    <Zap className="w-5 h-5 text-[#22c55e]" />
                    <div>
                      <strong>That's it!</strong> You're now using ARK Protocol to verify Solana wallet addresses.
                    </div>
                  </div>
                </div>
              </section>

              {/* Wallet Verification */}
              <section id="verification" className="docs-section">
                <h2 className="docs-heading">
                  <Shield className="w-6 h-6" />
                  Wallet Verification
                </h2>
                
                <div className="docs-content">
                  <h3 className="docs-subheading">How Verification Works</h3>
                  <p>
                    ARK Protocol uses a 4-step verification process to ensure maximum accuracy and security:
                  </p>

                  <div className="space-y-4 mt-6">
                    <div className="docs-step">
                      <div className="docs-step-number">1</div>
                      <div>
                        <h4 className="text-[#E5E5E5] font-semibold mb-2">AI Pattern Analysis</h4>
                        <p className="text-[#A3A3A3] text-sm">
                          Validates the address format using Base58 encoding standards. 
                          Ensures the address is a valid Solana public key (32-44 characters).
                        </p>
                      </div>
                    </div>

                    <div className="docs-step">
                      <div className="docs-step-number">2</div>
                      <div>
                        <h4 className="text-[#E5E5E5] font-semibold mb-2">On-Chain Scan</h4>
                        <p className="text-[#A3A3A3] text-sm">
                          Fetches real-time data from Solana mainnet-beta including SOL balance, 
                          transaction count, and token holdings.
                        </p>
                      </div>
                    </div>

                    <div className="docs-step">
                      <div className="docs-step-number">3</div>
                      <div>
                        <h4 className="text-[#E5E5E5] font-semibold mb-2">AI Risk Detection</h4>
                        <p className="text-[#A3A3A3] text-sm">
                          Analyzes wallet activity patterns to detect suspicious behavior. 
                          Flags wallets with low activity, dust amounts, or unusual transaction patterns.
                        </p>
                      </div>
                    </div>

                    <div className="docs-step">
                      <div className="docs-step-number">4</div>
                      <div>
                        <h4 className="text-[#E5E5E5] font-semibold mb-2">Terminal Verification</h4>
                        <p className="text-[#A3A3A3] text-sm">
                          Final verification step confirming the address exists on Solana mainnet-beta 
                          and all checks have passed successfully.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="docs-subheading mt-8">Risk Levels</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-[#22c55e]/5 border border-[#22c55e]/20">
                      <CheckCircle className="w-5 h-5 text-[#22c55e] mt-0.5" />
                      <div>
                        <strong className="text-[#22c55e]">Safe:</strong>
                        <span className="text-[#A3A3A3] ml-2">
                          Wallet has significant activity (10+ transactions) and normal balance. Safe to interact with.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                      <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div>
                        <strong className="text-yellow-500">Risky:</strong>
                        <span className="text-[#A3A3A3] ml-2">
                          Low activity (&lt;5 transactions) or suspicious patterns detected. Proceed with caution.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <strong className="text-red-500">Invalid:</strong>
                        <span className="text-[#A3A3A3] ml-2">
                          Address format is invalid or not a valid Solana public key. Do not interact.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* API Reference */}
              <section id="api" className="docs-section">
                <h2 className="docs-heading">
                  <Code className="w-6 h-6" />
                  API Reference
                </h2>
                
                <div className="docs-content">
                  <h3 className="docs-subheading">Base URL</h3>
                  <div className="docs-code">
                    <pre>https://ark-backend.up.railway.app</pre>
                  </div>

                  <h3 className="docs-subheading mt-8">Endpoints</h3>
                  
                  <div className="docs-endpoint">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="docs-method">POST</span>
                      <code className="text-[#22c55e]">/api/verify</code>
                    </div>
                    
                    <p className="text-[#A3A3A3] mb-4">
                      Verify a Solana wallet address and get risk assessment.
                    </p>

                    <h4 className="text-[#E5E5E5] font-semibold mb-3">Request Body</h4>
                    <div className="docs-code mb-4">
                      <pre>
{`{
  "address": "string"  // Solana wallet address (Base58)
}`}
                      </pre>
                    </div>

                    <h4 className="text-[#E5E5E5] font-semibold mb-3">Response</h4>
                    <div className="docs-code">
                      <pre>
{`{
  "address": "string",           // Verified address
  "is_valid": boolean,           // Address validity
  "risk_level": "safe|risky|invalid",
  "balance": number,             // SOL balance
  "transaction_count": number,   // Total transactions
  "steps": [                     // Verification steps
    {
      "step": number,
      "name": "string",
      "status": "completed|failed",
      "result": "string"
    }
  ],
  "summary": "string"            // Human-readable summary
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="docs-endpoint mt-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="docs-method">GET</span>
                      <code className="text-[#22c55e]">/api/status</code>
                    </div>
                    
                    <p className="text-[#A3A3A3] mb-4">
                      Check API health and status.
                    </p>

                    <h4 className="text-[#E5E5E5] font-semibold mb-3">Response</h4>
                    <div className="docs-code">
                      <pre>
{`{
  "status": "ok",
  "message": "ARK Protocol API is running"
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </section>

              {/* Integration Guide */}
              <section id="integration" className="docs-section">
                <h2 className="docs-heading">
                  <Terminal className="w-6 h-6" />
                  Integration Guide
                </h2>
                
                <div className="docs-content">
                  <h3 className="docs-subheading">JavaScript / TypeScript</h3>
                  <div className="docs-code">
                    <pre>
{`// Using fetch
async function verifyWallet(address) {
  const response = await fetch('https://ark-backend.up.railway.app/api/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ address }),
  });
  
  const data = await response.json();
  return data;
}

// Example usage
const result = await verifyWallet('CuieVDEDtLo7FypA9SbLM9saXFdb1dsshEkyErMqkRQq');
console.log(result.risk_level); // "safe"`}
                    </pre>
                  </div>

                  <h3 className="docs-subheading mt-8">Python</h3>
                  <div className="docs-code">
                    <pre>
{`import requests

def verify_wallet(address):
    url = "https://ark-backend.up.railway.app/api/verify"
    payload = {"address": address}
    
    response = requests.post(url, json=payload)
    return response.json()

# Example usage
result = verify_wallet("CuieVDEDtLo7FypA9SbLM9saXFdb1dsshEkyErMqkRQq")
print(result["risk_level"])  # "safe"`}
                    </pre>
                  </div>

                  <h3 className="docs-subheading mt-8">React Hook</h3>
                  <div className="docs-code">
                    <pre>
{`import { useState } from 'react';

function useWalletVerification() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const verify = async (address) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://ark-backend.up.railway.app/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { verify, loading, result, error };
}`}
                    </pre>
                  </div>
                </div>
              </section>

              {/* Security */}
              <section id="security" className="docs-section">
                <h2 className="docs-heading">
                  <Lock className="w-6 h-6" />
                  Security
                </h2>
                
                <div className="docs-content">
                  <h3 className="docs-subheading">Data Privacy</h3>
                  <p>
                    ARK Protocol takes security and privacy seriously:
                  </p>

                  <ul className="docs-list">
                    <li>
                      <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                      <strong>No Personal Data:</strong> We only process public blockchain addresses
                    </li>
                    <li>
                      <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                      <strong>No Storage:</strong> Verification results are not permanently stored
                    </li>
                    <li>
                      <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                      <strong>HTTPS Only:</strong> All API communication is encrypted
                    </li>
                    <li>
                      <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                      <strong>Open Source:</strong> Verification logic is transparent and auditable
                    </li>
                  </ul>

                  <h3 className="docs-subheading mt-8">Rate Limiting</h3>
                  <p>
                    To ensure fair usage and system stability:
                  </p>
                  <ul className="docs-list">
                    <li>
                      <ChevronRight className="w-4 h-4 text-[#22c55e]" />
                      Free tier: 100 requests per hour per IP
                    </li>
                    <li>
                      <ChevronRight className="w-4 h-4 text-[#22c55e]" />
                      Rate limit headers included in responses
                    </li>
                  </ul>

                  <h3 className="docs-subheading mt-8">Best Practices</h3>
                  <div className="docs-callout">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <div>
                      <strong>Important:</strong> ARK Protocol provides risk assessment, 
                      not financial advice. Always perform your own due diligence before 
                      interacting with any wallet address.
                    </div>
                  </div>
                </div>
              </section>

              {/* Support */}
              <section className="docs-section">
                <div className="glass rounded-xl p-8 border border-[#27272a] text-center">
                  <h3 className="font-mono text-2xl font-bold mb-4">
                    Need Help?
                  </h3>
                  <p className="text-[#A3A3A3] mb-6">
                    Join our community or reach out to the team for support.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <a 
                      href="https://x.com/ARK_Protocol_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      X (Twitter)
                    </a>
                    <a 
                      href="#" 
                      className="btn-primary"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                      </svg>
                      Telegram
                    </a>
                  </div>
                </div>
              </section>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DocsPage;
