import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Stars, Float, MeshDistortMaterial, Scroll, useScroll } from '@react-three/drei';
import { ArrowUpRight, X } from 'lucide-react';
import * as THREE from 'three';
import Footer from '../Footer/Footer';
import './NodePopup.css';

const Node = ({ position, title, fullDesc, color, speed, offset }) => {
  const meshRef = useRef();
  const localTime = useRef(0);
  const [hovered, setHovered] = useState(false);
  const closeTimeout = useRef(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    localTime.current += delta * speed * 1.0;
    meshRef.current.rotation.x += 0.012;
    meshRef.current.rotation.y += 0.012;

    // Position tracks localTime
    meshRef.current.position.x = Math.cos(localTime.current + offset) * position[0];
    meshRef.current.position.z = Math.sin(localTime.current + offset) * position[0];
    meshRef.current.position.y = Math.sin(localTime.current * 2 + offset) * position[1] + position[1];
  });

  const handlePointerOver = (e) => {
    if (e) e.stopPropagation();
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setHovered(true);
  };

  const handlePointerOut = (e) => {
    if (e) e.stopPropagation();
    closeTimeout.current = setTimeout(() => {
      setHovered(false);
    }, 200);
  };

  const toggleHover = (e) => {
    if (e) e.stopPropagation();
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setHovered((prev) => !prev);
  };

  return (
    <group ref={meshRef}>
      <mesh
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={toggleHover}
        scale={hovered ? 1.15 : 1}
      >
        <icosahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color={color}
          wireframe={!hovered}
          roughness={0.2}
          metalness={0.4}
          emissive={color}
          emissiveIntensity={hovered ? 0.7 : 0.1}
        />
      </mesh>

      {/* Full Objective Popup automatically shown on hover/tap with touch-friendly close button */}
      {hovered && (
        <Html center transform={false}>
          <div
            className="node-popup-container"
            onMouseEnter={handlePointerOver}
            onMouseLeave={handlePointerOut}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="node-popup" style={{ borderColor: color }}>
              <div className="popup-header">
                <div>
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: color,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.2rem'
                  }}>
                    Charter Objective
                  </span>
                  <h3 style={{ margin: 0 }}>{title}</h3>
                </div>
                <button
                  type="button"
                  className="popup-close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setHovered(false);
                  }}
                  aria-label="Close objective popup"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="popup-content">
                <p>{fullDesc}</p>
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

const Core = () => {
  const coreRef = useRef();

  useFrame(() => {
    if (!coreRef.current) return;
    coreRef.current.rotation.y += 0.005;
    coreRef.current.rotation.x += 0.002;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <group ref={coreRef}>
        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <MeshDistortMaterial
            color="#e2e8f0"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.3}
            roughness={0.15}
            distort={0.4}
            speed={2}
            emissive="#818cf8"
            emissiveIntensity={0.25}
          />
        </mesh>
        <mesh scale={1.2}>
          <icosahedronGeometry args={[2, 2]} />
          <meshBasicMaterial
            color="#4f46e5"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      </group>
    </Float>
  );
};

const CameraRig = () => {
  const scroll = useScroll();

  useFrame((state) => {
    // scroll.offset goes from 0 (top) to 1 (bottom)
    const offset = scroll.offset;
    const { width, height } = state.size;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isLandscapeShort = height < 520;

    // Animate camera position based on scroll and screen size
    const startZ = isMobile ? 18 : (isTablet ? 16 : 15);
    const endZ = isMobile ? 13 : (isTablet ? 9 : 6);
    const endX = isMobile ? 0 : (isTablet ? -2.2 : -3.5);
    const targetY = isLandscapeShort ? 1.0 : (isMobile ? 2.6 : 2.5);

    state.camera.position.z = THREE.MathUtils.lerp(startZ, endZ, offset);
    state.camera.position.y = THREE.MathUtils.lerp(0, targetY, offset);
    state.camera.position.x = THREE.MathUtils.lerp(0, endX, offset);

    // Always look at the center core
    state.camera.lookAt(0, 0, 0);
  });

  return null;
};

const companyObjects = [
  {
    num: "01",
    shortTitle: "Software & SaaS",
    title: "Software, Applications & SaaS Solutions",
    fullDesc: "1. To carry on the business of designing, developing, engineering, owning, licensing, acquiring, maintaining, operating, marketing, selling, distributing, implementing, and providing software, software applications, Software-as-a-Service (SaaS) solutions, cloud-based software, mobile applications, web applications, enterprise software, artificial intelligence (AI), machine learning, automation solutions, APIs, digital platforms, and other information technology products and services."
  },
  {
    num: "02",
    shortTitle: "Digital Ecosystems",
    title: "Digital Marketplaces & Ecosystem Platforms",
    fullDesc: "2. To establish, own, operate, manage, and maintain online platforms, digital marketplaces, technology-enabled platforms, on-demand service platforms, aggregator platforms, freelance and gig economy platforms, e-commerce platforms, business management systems, customer engagement platforms, payment-enabled platforms, and other digital ecosystems for businesses, professionals, service providers, organizations, government bodies, and individuals."
  },
  {
    num: "03",
    shortTitle: "IT Consulting",
    title: "IT Consulting & Custom Solutions",
    fullDesc: "3. To provide software development, custom software solutions, software consulting, IT consulting, system integration, cloud computing, digital transformation, technology support, software maintenance, implementation, outsourcing, managed services, and other information technology and technology-enabled services."
  },
  {
    num: "04",
    shortTitle: "Commercialization",
    title: "Tech Commercialization & IP Distribution",
    fullDesc: "4. To research, design, develop, acquire, license, commercialize, publish, market, distribute, export, import, and otherwise deal in software products, digital products, intellectual property, technology solutions, and related services under subscription, licensing, marketplace, transaction-based, or any other lawful business model."
  },
  {
    num: "05",
    shortTitle: "Allied Operations",
    title: "Allied Operations & Incidental Services",
    fullDesc: "5. To undertake all such activities as are incidental or conducive to the attainment of the above objects and to carry on any other lawful business relating to information technology, software development, digital platforms, technology products, and allied services."
  }
];

export const ScrollTracker = ({ onPageChange, onScrollOffset }) => {
  const scroll = useScroll();
  const lastPage = useRef(0);
  const lastScrolled = useRef(false);

  useFrame(() => {
    if (!scroll) return;
    const offset = scroll.offset;
    const isScrolled = offset > 0.015;
    if (isScrolled !== lastScrolled.current) {
      lastScrolled.current = isScrolled;
      if (onScrollOffset) onScrollOffset(isScrolled);
    }

    let page = 0;
    if (offset < 0.22) page = 0;
    else if (offset < 0.52) page = 1;
    else if (offset < 0.82) page = 2;
    else page = 3;

    if (page !== lastPage.current) {
      lastPage.current = page;
      if (onPageChange) onPageChange(page);
    }
  });

  return null;
};

const Scene3D = ({ onOpenContact, onOpenPrivacy, onOpenTerms }) => {
  const scroll = useScroll();
  const [activeP2, setActiveP2] = useState(0); // 0 (Object 01) or 1 (Object 02)
  const [activeP3, setActiveP3] = useState(0); // 0 (Object 03), 1 (Object 04), 2 (Object 05)

  return (
    <>
      <color attach="background" args={['#f8fafc']} />
      <fog attach="fog" args={['#f8fafc', 8, 32]} />

      <ambientLight intensity={0.85} />
      <directionalLight position={[0, 10, 5]} intensity={0.9} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#0284c7" />
      <pointLight position={[-10, -10, -10]} intensity={0.7} color="#818cf8" />

      <Stars
        radius={100}
        depth={50}
        count={850}
        factor={2}
        saturation={0.8}
        fade
        speed={1}
      />

      <Core />

      {/* Orbiting Service Nodes with 3D Popups representing the 5 Main Objects */}
      <Node
        position={[6, 2, 0]}
        title="Object 1: Software & SaaS"
        shortDesc="Software applications, SaaS solutions, cloud, AI/ML & digital platforms."
        fullDesc={companyObjects[0].fullDesc}
        color="#0284c7"
        speed={0.2}
        offset={0}
      />
      <Node
        position={[8, -1, 0]}
        title="Object 2: Digital Ecosystems"
        shortDesc="Online platforms, marketplaces, aggregator & on-demand service ecosystems."
        fullDesc={companyObjects[1].fullDesc}
        color="#059669"
        speed={0.15}
        offset={Math.PI * 0.4}
      />
      <Node
        position={[5, -3, 0]}
        title="Object 3: IT Consulting"
        shortDesc="Custom development, systems integration, cloud computing & transformation."
        fullDesc={companyObjects[2].fullDesc}
        color="#7c3aed"
        speed={0.25}
        offset={Math.PI * 0.8}
      />
      <Node
        position={[9, 1, 0]}
        title="Object 4: Tech Commercialization"
        shortDesc="IP licensing, digital products, publishing, export/import & technology solutions."
        fullDesc={companyObjects[3].fullDesc}
        color="#d97706"
        speed={0.1}
        offset={Math.PI * 1.2}
      />
      <Node
        position={[7, 3, 0]}
        title="Object 5: Allied Operations"
        shortDesc="Conducive & incidental activities, IT development & managed allied services."
        fullDesc={companyObjects[4].fullDesc}
        color="#e11d48"
        speed={0.18}
        offset={Math.PI * 1.6}
      />

      <CameraRig />

      {/* HTML Foreground Overlay rendered over the 3D scene synced with scroll */}
      <Scroll html className="scroll-area" style={{ width: '100vw' }}>

        {/* Page 1: Hero */}
        <section className="scroll-page hero-page" style={{ justifyContent: 'center' }}>
          <div className="hero-content">
            <span className="panel-badge">Enterprise Digital Charter</span>
            <h1 className="massive-title">Digital<br />Universe.</h1>
            <p className="hero-subtitle">MAIN OBJECTS OF THE COMPANY &bull; SCROLL TO EXPLORE</p>
            <button
              type="button"
              className="hero-explore-btn"
              onClick={() => {
                if (scroll && scroll.el) {
                  const maxScroll = scroll.el.scrollHeight - scroll.el.clientHeight;
                  scroll.el.scrollTo({ top: maxScroll / 3, behavior: 'smooth' });
                } else {
                  const container = document.querySelector('.canvas-container .scroll-area');
                  if (container) {
                    const maxScroll = container.scrollHeight - container.clientHeight;
                    container.scrollTo({ top: maxScroll / 3, behavior: 'smooth' });
                  }
                }
              }}
            >
              Explore Charter Objects ↓
            </button>
          </div>
        </section>

        {/* Page 2: Main Objects of the Company - Part 1 (Objects 1 & 2) */}
        <section className="scroll-page services-page right-aligned">
          <div className="glass-panel wide-panel">
            <div className="panel-header-row">
              <span className="panel-badge">Charter Objects &bull; 01 - 02</span>
              <div className="tab-pill-group">
                <button
                  type="button"
                  className={`tab-pill ${activeP2 === 0 ? 'active' : ''}`}
                  onClick={() => setActiveP2(0)}
                >
                  Object 01
                </button>
                <button
                  type="button"
                  className={`tab-pill ${activeP2 === 1 ? 'active' : ''}`}
                  onClick={() => setActiveP2(1)}
                >
                  Object 02
                </button>
              </div>
            </div>
            <h2 className="panel-title">MAIN OBJECTS OF THE COMPANY</h2>
            <div className="active-object-display">
              <div className="object-card active-card">
                <div className="object-card-header">
                  <span className="object-number">{companyObjects[activeP2].num}</span>
                  <h3>{companyObjects[activeP2].title}</h3>
                </div>
                <p className="object-text">{companyObjects[activeP2].fullDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Page 3: Main Objects of the Company - Part 2 (Objects 3, 4 & 5) */}
        <section className="scroll-page ecosystem-page left-aligned">
          <div className="glass-panel wide-panel">
            <div className="panel-header-row">
              <span className="panel-badge">Charter Objects &bull; 03 - 05</span>
              <div className="tab-pill-group">
                <button
                  type="button"
                  className={`tab-pill ${activeP3 === 0 ? 'active' : ''}`}
                  onClick={() => setActiveP3(0)}
                >
                  Object 03
                </button>
                <button
                  type="button"
                  className={`tab-pill ${activeP3 === 1 ? 'active' : ''}`}
                  onClick={() => setActiveP3(1)}
                >
                  Object 04
                </button>
                <button
                  type="button"
                  className={`tab-pill ${activeP3 === 2 ? 'active' : ''}`}
                  onClick={() => setActiveP3(2)}
                >
                  Object 05
                </button>
              </div>
            </div>
            <h2 className="panel-title">MAIN OBJECTS OF THE COMPANY</h2>
            <div className="active-object-display">
              <div className="object-card active-card">
                <div className="object-card-header">
                  <span className="object-number">{companyObjects[2 + activeP3].num}</span>
                  <h3>{companyObjects[2 + activeP3].title}</h3>
                </div>
                <p className="object-text">{companyObjects[2 + activeP3].fullDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Page 4: Finale (CTA + Footer) */}
        <section className="scroll-page finale-page">
          <div className="finale-inner">
            <div className="glass-panel large-panel cta-panel">
              <span className="panel-badge">Initiate Collaboration</span>
              <h2 className="panel-title">Ready for Transformation?</h2>
              <p className="panel-desc">Partner with us across our five core charter domains to engineer, scale, and transform your digital future.</p>
              <button className="contact-btn" onClick={onOpenContact}>
                <span>Initiate Connection</span>
                <ArrowUpRight size={18} />
              </button>
            </div>

            <div className="finale-footer-wrapper">
              <Footer onOpenPrivacy={onOpenPrivacy} onOpenTerms={onOpenTerms} />
            </div>
          </div>
        </section>

      </Scroll>
    </>
  );
};

export default Scene3D;
