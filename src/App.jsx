import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import Scene3D, { ScrollTracker } from './components/Scene3D/Scene3D';
import ContactPopup from './components/ContactPopup/ContactPopup';
import LegalModal from './components/LegalModal/LegalModal';
import Navbar from './components/Navbar/Navbar';
import './ScrollContent.css';

const navPages = [
  { id: 0, label: "01 Universe" },
  { id: 1, label: "02 Objects 01-02" },
  { id: 2, label: "03 Objects 03-05" },
  { id: 3, label: "04 Connect" }
];

function App() {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [legalModal, setLegalModal] = useState({ isOpen: false, type: 'privacy' });
  const [activePage, setActivePage] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToPage = (pageIndex) => {
    const container =
      document.querySelector('.canvas-container > div[style*="overflow"]') ||
      document.querySelector('.canvas-container .scroll-area')?.parentElement ||
      document.querySelector('.canvas-container .scroll-area');
    if (container) {
      const maxScroll = container.scrollHeight - container.clientHeight;
      const targetScroll = (pageIndex / 3) * maxScroll;
      container.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar
        onOpenContact={() => setIsContactPopupOpen(true)}
        onNavigate={scrollToPage}
        isScrolled={isScrolled}
        activePage={activePage}
      />

      {/* Floating Side Page Navigator */}
      <nav className="page-navigator" aria-label="Page Navigation">
        {navPages.map((page) => (
          <button
            key={page.id}
            type="button"
            className={`nav-dot-item ${activePage === page.id ? 'active' : ''}`}
            onClick={() => scrollToPage(page.id)}
            aria-label={page.label}
          >
            <span className="nav-dot"></span>
            <span className="nav-dot-label">{page.label}</span>
          </button>
        ))}
      </nav>

      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 45 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          <ScrollControls pages={4} distance={1} damping={0.15}>
            <ScrollTracker onPageChange={setActivePage} onScrollOffset={setIsScrolled} />
            <Scene3D
              onOpenContact={() => setIsContactPopupOpen(true)}
              onOpenPrivacy={() => setLegalModal({ isOpen: true, type: 'privacy' })}
              onOpenTerms={() => setLegalModal({ isOpen: true, type: 'terms' })}
            />
          </ScrollControls>
        </Canvas>

        <ContactPopup
          isOpen={isContactPopupOpen}
          onClose={() => setIsContactPopupOpen(false)}
        />

        <LegalModal
          isOpen={legalModal.isOpen}
          type={legalModal.type}
          onClose={() => setLegalModal((prev) => ({ ...prev, isOpen: false }))}
        />
      </div>
    </>
  );
}

export default App;
