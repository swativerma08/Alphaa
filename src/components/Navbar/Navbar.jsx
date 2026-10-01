import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onOpenContact, onNavigate, isScrolled = false }) => {
  const [internalScrolled, setInternalScrolled] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const container = 
        document.querySelector('.canvas-container > div[style*="overflow"]') ||
        document.querySelector('.canvas-container .scroll-area')?.parentElement ||
        document.querySelector('.canvas-container .scroll-area');
      if (container) {
        setInternalScrolled(container.scrollTop > 20);
      }
    };
    const timer = setTimeout(checkScroll, 300);
    const container = document.querySelector('.canvas-container > div[style*="overflow"]');
    if (container) {
      container.addEventListener('scroll', checkScroll, { passive: true });
      return () => {
        clearTimeout(timer);
        container.removeEventListener('scroll', checkScroll);
      };
    }
    return () => clearTimeout(timer);
  }, []);

  const hasScrolled = isScrolled || internalScrolled;

  return (
    <motion.nav 
      className={`navbar ${hasScrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="navbar-container">
        <a 
          href="#" 
          className="logo" 
          onClick={(e) => { 
            e.preventDefault(); 
            if (onNavigate) onNavigate(0); 
          }}
          aria-label="AlphaaTechify Home"
        >
          <span className="logo-text text-gradient">ALPHAATECHIFY</span>
        </a>

        <div className="navbar-actions">
          <button 
            type="button"
            className="btn-primary connect-nav-btn" 
            onClick={(e) => { 
              e.preventDefault(); 
              onOpenContact(); 
            }}
          >
            <span>Connect</span>
            <ArrowUpRight size={17} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
