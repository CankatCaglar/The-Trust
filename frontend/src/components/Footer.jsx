import React from 'react';
import { Shield, FileText } from 'lucide-react';

const ASCII_LOGO_SMALL = `
┌─┐┬─┐┬┌─
├─┤├┬┘├┴┐
┴ ┴┴└─┴ ┴
`;

const FOOTER_LINKS = {
  Products: [
    { label: 'VerifyShield', href: '#verify', active: true },
    { label: 'Platform', href: '#', comingSoon: true }
  ],
  Resources: [
    { label: 'Docs', href: '/docs', active: true },
    { label: 'API Reference', href: '/docs#api', active: true },
    { label: 'Treasury', href: '#', comingSoon: true }
  ],
  Connect: [
    { label: 'X', href: 'https://x.com/ARK_Protocol_', isX: true, active: true },
    { label: 'Telegram', href: '#', isTelegram: true, comingSoon: true }
  ]
};

const Footer = () => {
  return (
    <footer className="border-t border-[#27272a] py-16 relative" data-testid="footer">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="ark-container relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <pre className="ascii-art text-xs mb-4" data-testid="footer-logo">
              {ASCII_LOGO_SMALL}
            </pre>
            <p className="text-[#A3A3A3] mb-6 max-w-sm">
              Trust infrastructure for the autonomous economy.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://x.com/ARK_Protocol_" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A3A3A3] hover:text-[#22c55e] transition-colors"
                data-testid="footer-twitter"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-[#A3A3A3] hover:text-[#22c55e] transition-colors"
                data-testid="footer-telegram"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </a>
              <a 
                href="/docs" 
                className="text-[#A3A3A3] hover:text-[#22c55e] transition-colors"
                data-testid="footer-docs"
              >
                <FileText className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-mono font-semibold text-[#E5E5E5] mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.comingSoon ? (
                      <span 
                        className="footer-link flex items-center gap-2 opacity-50 cursor-not-allowed"
                        data-testid={`footer-link-${link.label.toLowerCase().replace(' ', '-')}`}
                      >
                        {link.icon && <link.icon className="w-4 h-4" />}
                        {link.isX && (
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        )}
                        {link.isTelegram && (
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                          </svg>
                        )}
                        {link.label}
                        <span className="text-xs text-[#666]">(Coming Soon)</span>
                      </span>
                    ) : (
                      <a 
                        href={link.href} 
                        className="footer-link flex items-center gap-2"
                        data-testid={`footer-link-${link.label.toLowerCase().replace(' ', '-')}`}
                      >
                        {link.icon && <link.icon className="w-4 h-4" />}
                        {link.isX && (
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        )}
                        {link.isTelegram && (
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                          </svg>
                        )}
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#27272a] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#666] text-sm">
            © 2025 ARK Protocol. All rights reserved.
          </p>
          <p className="text-[#666] text-sm font-mono">
            Built for the autonomous economy.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
