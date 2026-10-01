import React, { useEffect, useState } from 'react';
import { 
  ArrowUpRight, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Code, 
  Cpu, 
  Globe, 
  Handshake, 
  Layers, 
  Mail, 
  MessageSquare, 
  UserRound, 
  X, 
  Zap 
} from 'lucide-react';
import './ContactPopup.css';

const serviceOptions = [
  { id: 'software', label: 'Software & SaaS', Icon: Code },
  { id: 'ecosystems', label: 'Digital Ecosystems', Icon: Globe },
  { id: 'consulting', label: 'IT Consulting', Icon: Briefcase },
  { id: 'commercialization', label: 'Tech Commercialization', Icon: Cpu },
  { id: 'allied', label: 'Allied Operations', Icon: Zap }
];

const ContactPopup = ({ isOpen, onClose }) => {
  const [selectedService, setSelectedService] = useState('software');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.classList.add('contact-modal-open');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('contact-modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setIsSubmitting(false);
      setSelectedService('software');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="contact-popup-overlay" onMouseDown={onClose}>
      <div
        className="contact-popup-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="close-btn" type="button" onClick={onClose} aria-label="Close connection form">
          <X size={19} />
        </button>

        {!submitted ? (
          <>
            <div className="contact-header-section">
              <div className="contact-greeting-badge">
                <Handshake size={14} className="badge-icon" />
                <span>Enterprise Collaboration</span>
              </div>
              <h2 id="contact-title">Let’s build what’s next.</h2>
              <p className="contact-modal-intro">
                Tell us about your project or domain needs and we'll engineer the right solution for you.
              </p>

              {/* Service SLA & Availability Banner */}
              <div className="contact-info-strip">
                <div className="info-strip-item">
                  <Clock size={14} />
                  <span>Response SLA: <strong>Within 24 Hours</strong></span>
                </div>
                <div className="info-strip-divider" />
                <div className="info-strip-item">
                  <span>Schedule: <strong>Mon - Fri (09:00 - 18:00 IST)</strong></span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              {/* Service Selection Pills */}
              <div className="service-selection-group">
                <span className="contact-field-label">
                  <Layers size={14} /> Select Service Domain
                </span>
                <div className="service-chips-grid">
                  {serviceOptions.map((service) => {
                    const ServiceIcon = service.Icon;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        className={`service-chip ${selectedService === service.id ? 'active' : ''}`}
                        onClick={() => setSelectedService(service.id)}
                      >
                        <ServiceIcon size={14} className="chip-vector-icon" />
                        <span>{service.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-fields-grid">
                <label className="contact-field">
                  <span className="contact-field-label"><UserRound size={14} /> Your name</span>
                  <input type="text" name="name" required autoComplete="name" placeholder="Full name" />
                </label>

                <label className="contact-field">
                  <span className="contact-field-label"><Mail size={14} /> Work email</span>
                  <input type="email" name="email" required autoComplete="email" placeholder="you@company.com" />
                </label>
              </div>

              <label className="contact-field">
                <span className="contact-field-label"><MessageSquare size={14} /> Project brief & objectives</span>
                <textarea name="message" rows="3" required placeholder="Tell us about your scope, timelines, or platform requirements…" />
              </label>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Initializing Connection…' : 'Start the Conversation'}</span>
                {!isSubmitting && <ArrowUpRight size={17} />}
              </button>
            </form>
          </>
        ) : (
          <div className="contact-success">
            <div className="contact-success-icon"><CheckCircle2 size={36} /></div>
            <div className="contact-modal-kicker">Connection Initialized</div>
            <h2>Thanks for reaching out.</h2>
            <p>
              Your request for <strong>{serviceOptions.find(s => s.id === selectedService)?.label}</strong> has been logged. Our engineering team will review your project brief and get back to you within 24 hours.
            </p>
            <button type="button" className="submit-btn" onClick={onClose}>Done & Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPopup;
