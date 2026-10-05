import React from 'react';
import { ArrowUpRight, Mail, MapPin, Sparkles } from 'lucide-react';
import './Footer.css';

const Footer = ({ onOpenPrivacy, onOpenTerms }) => {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-shell">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#" className="logo" aria-label="AlphaaTechify home">
                <img src="/logo-icon.png" alt="AlphaaTechify Logo" className="logo-image" />
                <span className="logo-text text-gradient">ALPHAATECHIFY</span>
              </a>

              <p className="footer-desc">
                Building enterprise software, cloud platforms, AI solutions, and digital ecosystems for ambitious organizations.
              </p>

              <div className="footer-status">
                <span className="footer-status-dot" aria-hidden="true" />
                <span>Digital transformation, thoughtfully engineered.</span>
              </div>
            </div>

            <div className="footer-column">
              <p className="footer-kicker">Explore</p>
              <h4 className="footer-heading">Core domains</h4>
              <ul className="footer-links">
                <li><a href="#services">Software & SaaS <ArrowUpRight size={14} /></a></li>
                <li><a href="#services">Digital Ecosystems <ArrowUpRight size={14} /></a></li>
                <li><a href="#services">IT Consulting <ArrowUpRight size={14} /></a></li>
                <li><a href="#services">Tech Commercialization <ArrowUpRight size={14} /></a></li>
              </ul>
            </div>

            <div className="footer-column footer-connect">
              <p className="footer-kicker">Connect</p>
              <h4 className="footer-heading">Start a conversation</h4>
              <p className="footer-connect-copy">
                Have a product, platform, or transformation idea? Let’s build the next step together.
              </p>
              <a className="footer-email" href="mailto:hello@alphaatechify.tech">
                <span className="footer-icon"><Mail size={16} /></span>
                hello@alphaatechify.tech
                <ArrowUpRight size={15} />
              </a>
              <div className="footer-location">
                <MapPin size={16} />
                <span>Raipur, India</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-meta">
              <Sparkles size={14} />
              <span>© {year} AlphaaTechify. All rights reserved.</span>
            </div>
            <div className="legal-links">
              <button 
                type="button" 
                className="legal-link-btn" 
                onClick={(e) => { e.preventDefault(); if (onOpenPrivacy) onOpenPrivacy(); }}
              >
                Privacy Policy
              </button>
              <button 
                type="button" 
                className="legal-link-btn" 
                onClick={(e) => { e.preventDefault(); if (onOpenTerms) onOpenTerms(); }}
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
