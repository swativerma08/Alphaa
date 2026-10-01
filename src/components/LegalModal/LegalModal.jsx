import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import './LegalModal.css';

const LegalModal = ({ type, isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.classList.add('legal-modal-open');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('legal-modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="legal-modal-overlay" onMouseDown={onClose}>
      <div 
        className="legal-modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="legal-close-btn" type="button" onClick={onClose} aria-label="Close document">
          <X size={20} />
        </button>

        <div className="legal-modal-header">
          <div className="legal-modal-badge">
            {isPrivacy ? <ShieldCheck size={16} /> : <FileText size={16} />}
            <span>{isPrivacy ? 'Privacy & Data Protection' : 'Terms & Governance'}</span>
          </div>
          <h2 id="legal-modal-title">{isPrivacy ? 'Privacy Policy' : 'Terms of Service'}</h2>
          <p className="legal-modal-subtitle">
            Effective Date: September 30, 2026 &bull; AlphaaTechify Enterprise Policy
          </p>
        </div>

        <div className="legal-modal-body">
          {isPrivacy ? (
            <>
              <section className="legal-section">
                <h3>1. Introduction</h3>
                <p>
                  AlphaaTechify ("Company", "we", "our", or "us") is committed to safeguarding your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website, utilize our software applications, or engage with our enterprise technology services.
                </p>
              </section>

              <section className="legal-section">
                <h3>2. Information We Collect</h3>
                <p>We may collect information about you in a variety of ways, including:</p>
                <ul>
                  <li><strong>Personal Data:</strong> Name, work email address, company details, and project briefs provided voluntarily via our connection forms.</li>
                  <li><strong>Technical & Analytics Data:</strong> IP address, browser type, operating system, access times, and page interaction metrics collected automatically during navigation.</li>
                  <li><strong>Communication Logs:</strong> Correspondence and query logs when contacting our technical or support teams.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h3>3. How We Use Your Information</h3>
                <p>Having accurate information allows us to provide a smooth, efficient, and customized enterprise experience. Specifically, we use collected information to:</p>
                <ul>
                  <li>Architect, develop, and deliver requested software, SaaS platforms, and consulting services.</li>
                  <li>Respond to inquiries, initiate service agreements, and provide technical assistance.</li>
                  <li>Analyze usage trends to continuously improve our 3D interactive experiences and digital ecosystems.</li>
                  <li>Maintain system security, audit compliance, and protect against unauthorized access.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h3>4. Data Protection & Security</h3>
                <p>
                  We utilize administrative, technical, and physical security safeguards to protect your personal information. While we have taken robust steps to secure data, please note that no internet transmission is 100% immune against interception.
                </p>
              </section>

              <section className="legal-section">
                <h3>5. Data Sharing & Third Parties</h3>
                <p>
                  AlphaaTechify does not sell, trade, or rent your personal data to third parties. We share data only with trusted infrastructure providers required to operate our services, bound by strict confidentiality obligations.
                </p>
              </section>

              <section className="legal-section">
                <h3>6. Contact Us</h3>
                <p>
                  If you have questions, comments, or data rights requests concerning this Privacy Policy, please reach out to us at:
                </p>
                <p className="legal-contact-email">
                  <strong>Email:</strong> <a href="mailto:hello@alphaatechify.tech">hello@alphaatechify.tech</a>
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="legal-section">
                <h3>1. Acceptance of Terms</h3>
                <p>
                  By accessing, browsing, or using the AlphaaTechify website and digital platforms, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and to comply with all applicable laws and regulations.
                </p>
              </section>

              <section className="legal-section">
                <h3>2. Intellectual Property Rights</h3>
                <p>
                  All content, source code, 3D graphics, visual interfaces, logos, software architectures, trademarks, and documentation published on this site are the exclusive property of AlphaaTechify or its licensors and are protected under international copyright and intellectual property laws.
                </p>
              </section>

              <section className="legal-section">
                <h3>3. Permitted Use & Restrictions</h3>
                <p>You agree to use our digital assets strictly for lawful purposes. You shall not:</p>
                <ul>
                  <li>Reverse engineer, decompile, or attempt to extract source code or 3D shaders from our application.</li>
                  <li>Engage in automated scraping, data extraction, or network stress testing without prior written permission.</li>
                  <li>Use our brand marks, logos, or charter materials for unauthorized commercial purposes.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h3>4. Service Scope & Objects</h3>
                <p>
                  AlphaaTechify operates within five primary charter domains: (1) Software & SaaS Solutions, (2) Digital Marketplaces & Ecosystems, (3) IT Consulting & Custom Engineering, (4) Technology Commercialization & IP Licensing, and (5) Allied Technology Services. Specific service engagements are governed by dedicated master service agreements.
                </p>
              </section>

              <section className="legal-section">
                <h3>5. Disclaimer & Limitation of Liability</h3>
                <p>
                  This site and its interactive features are provided on an "as is" and "as available" basis. AlphaaTechify shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our digital services.
                </p>
              </section>

              <section className="legal-section">
                <h3>6. Governing Law & Jurisdiction</h3>
                <p>
                  These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Raipur, Chhattisgarh, India.
                </p>
              </section>
            </>
          )}
        </div>

        <div className="legal-modal-footer">
          <button type="button" className="legal-accept-btn" onClick={onClose}>
            Close & Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
