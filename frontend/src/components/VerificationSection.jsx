import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, AlertTriangle, XCircle, Loader2, Copy, ExternalLink } from 'lucide-react';
import useVerification from '../hooks/useVerification';

const EXAMPLE_ADDRESSES = [
  { address: 'So11111111111111111111111111111111111111112', label: 'Wrapped SOL' },
  { address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', label: 'USDC' }
];

const VerificationSection = () => {
  const [inputAddress, setInputAddress] = useState('');
  const { isVerifying, stepStatuses, result, error, verifyAddress, resetVerification } = useVerification();
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyAddress(inputAddress);
  };

  const handleExampleClick = (address) => {
    setInputAddress(address);
    verifyAddress(address);
  };

  const handleCopy = async () => {
    if (result?.address) {
      await navigator.clipboard.writeText(result.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case 'safe':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'risky':
        return <AlertTriangle className="w-6 h-6 text-yellow-400" />;
      default:
        return <XCircle className="w-6 h-6 text-red-400" />;
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'safe': return 'safe';
      case 'risky': return 'risky';
      default: return 'invalid';
    }
  };

  return (
    <section id="verify" className="py-24 relative" data-testid="verification-section">
      <div className="ark-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-mono text-4xl md:text-5xl font-bold mb-4">
            Try it <span className="gradient-text italic">now</span>
          </h2>
          <p className="text-[#A3A3A3] text-lg max-w-2xl mx-auto">
            Enter any Solana wallet address to verify its authenticity and check for risks.
          </p>
        </motion.div>

        {/* Verification Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="terminal-window" data-testid="verification-terminal">
            <div className="terminal-header">
              <div className="terminal-dot red" />
              <div className="terminal-dot yellow" />
              <div className="terminal-dot green" />
              <span className="terminal-title">ark verify</span>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Input Form */}
              <form onSubmit={handleSubmit}>
                <div className="verify-input-wrapper" data-testid="verify-input-wrapper">
                  <Search className="w-5 h-5 text-[#666]" />
                  <input
                    type="text"
                    value={inputAddress}
                    onChange={(e) => setInputAddress(e.target.value)}
                    placeholder="Enter Solana wallet address..."
                    className="verify-input"
                    disabled={isVerifying}
                    data-testid="wallet-input"
                  />
                  <button
                    type="submit"
                    disabled={isVerifying || !inputAddress.trim()}
                    className="btn-primary py-2 px-6"
                    data-testid="verify-button"
                  >
                    {isVerifying ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Verify'
                    )}
                  </button>
                </div>
              </form>

              {/* Example Addresses */}
              <div className="flex flex-wrap gap-2">
                <span className="text-[#666] text-sm">Try:</span>
                {EXAMPLE_ADDRESSES.map((item) => (
                  <button
                    key={item.address}
                    onClick={() => handleExampleClick(item.address)}
                    className="text-sm text-[#22c55e] hover:text-[#16a34a] font-mono transition-colors"
                    disabled={isVerifying}
                    data-testid={`example-${item.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Verification Steps */}
              <AnimatePresence>
                {stepStatuses.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 border-t border-[#333] pt-6"
                  >
                    {stepStatuses.map((step, idx) => (
                      <motion.div
                        key={step.step}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3"
                        data-testid={`verification-step-${step.step}`}
                      >
                        <div className="w-6 h-6 flex items-center justify-center">
                          {step.status === 'processing' && (
                            <Loader2 className="w-4 h-4 text-[#22c55e] animate-spin" />
                          )}
                          {step.status === 'completed' && (
                            <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                          )}
                          {step.status === 'failed' && (
                            <XCircle className="w-4 h-4 text-red-400" />
                          )}
                          {step.status === 'pending' && (
                            <div className="w-2 h-2 rounded-full bg-[#333]" />
                          )}
                        </div>
                        <span className={`font-mono text-sm ${
                          step.status === 'processing' ? 'text-[#22c55e]' :
                          step.status === 'completed' ? 'text-[#E5E5E5]' :
                          step.status === 'failed' ? 'text-red-400' :
                          'text-[#666]'
                        }`}>
                          {step.name}
                          {step.result && step.status === 'completed' && (
                            <span className="text-[#666] ml-2">• {step.result}</span>
                          )}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
                    data-testid="error-message"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Result Card */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`result-card ${getRiskColor(result.risk_level)}`}
                    data-testid="verification-result"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getRiskIcon(result.risk_level)}
                        <div>
                          <h4 className="font-mono font-semibold text-lg capitalize">
                            {result.risk_level === 'safe' ? 'Verified Safe' :
                             result.risk_level === 'risky' ? 'Potential Risk' : 'Invalid Address'}
                          </h4>
                          <p className="text-sm text-[#A3A3A3] font-mono truncate max-w-xs">
                            {result.address.slice(0, 8)}...{result.address.slice(-8)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleCopy}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                          title="Copy address"
                          data-testid="copy-address"
                        >
                          <Copy className={`w-4 h-4 ${copied ? 'text-[#22c55e]' : 'text-[#666]'}`} />
                        </button>
                        <a
                          href={`https://solscan.io/account/${result.address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                          title="View on Solscan"
                          data-testid="view-solscan"
                        >
                          <ExternalLink className="w-4 h-4 text-[#666]" />
                        </a>
                      </div>
                    </div>

                    <p className="text-[#A3A3A3] mb-4">{result.summary}</p>

                    {result.balance !== null && (
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        <div>
                          <p className="text-[#666] text-sm">Balance</p>
                          <p className="font-mono font-semibold">{result.balance}</p>
                        </div>
                        <div>
                          <p className="text-[#666] text-sm">Transactions</p>
                          <p className="font-mono font-semibold">{result.transaction_count?.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Reset Button */}
              {(result || error) && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => {
                    resetVerification();
                    setInputAddress('');
                  }}
                  className="text-[#666] hover:text-[#A3A3A3] text-sm font-mono transition-colors"
                  data-testid="reset-button"
                >
                  ← Verify another address
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VerificationSection;
