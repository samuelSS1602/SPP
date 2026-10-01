import { CONTACT, waLink } from '../data/site';
import BookingForm from './BookingForm';
import { WhatsAppIcon } from './Icons';
import { Reveal, RevealGroup, RevealItem, SectionHeader } from './Motion';

export default function Booking() {
    return (
        <section className="section contact" id="contact">
            <div className="container">
                <SectionHeader eyebrow="SECURE YOUR STAY" title="Book a Room & Enquire" />

                <div className="contact-grid">
                    <Reveal className="contact-form-wrapper">
                        <h3 className="contact-form-title">Request Availability &amp; Rates</h3>
                        <p className="contact-form-desc">
                            Provide your travel dates and requirements below. Our desk agent will contact you immediately to
                            confirm room availability and direct reservation details.
                        </p>
                        <BookingForm idPrefix="form" />
                    </Reveal>

                    <Reveal className="contact-info-wrapper" delay={0.15}>
                        <div className="info-card-premium">
                            <h3 className="info-card-title">Front Desk &amp; Reception</h3>
                            <div className="info-divider-gold" />

                            <RevealGroup as="ul" className="info-list" step={0.12} delay={0.2}>
                                <RevealItem as="li">
                                    <div className="info-icon-circle">📍</div>
                                    <div className="info-text-block">
                                        <span className="info-lbl">Lodge Address</span>
                                        <p className="info-val">
                                            {CONTACT.addressLines.map((line, i) => (
                                                <span key={line}>{line}{i < CONTACT.addressLines.length - 1 && <br />}</span>
                                            ))}
                                        </p>
                                    </div>
                                </RevealItem>
                                <RevealItem as="li">
                                    <div className="info-icon-circle">📞</div>
                                    <div className="info-text-block">
                                        <span className="info-lbl">Front Desk Mobile</span>
                                        <p className="info-val"><a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a></p>
                                    </div>
                                </RevealItem>
                                <RevealItem as="li">
                                    <div className="info-icon-circle">✉️</div>
                                    <div className="info-text-block">
                                        <span className="info-lbl">Official Email</span>
                                        <p className="info-val"><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
                                    </div>
                                </RevealItem>
                            </RevealGroup>

                            <div className="quick-call-cta">
                                <h4>Want Instant Confirmation?</h4>
                                <p>
                                    Connect directly with our booking coordinator on WhatsApp for immediate availability and
                                    customized family package rates.
                                </p>
                                <a
                                    href={waLink("Hi! I'm inquiring about room availability at Sri Padmavati Pleasants. Please send details.")}
                                    target="_blank"
                                    rel="noopener"
                                    className="btn btn-whatsapp-large"
                                >
                                    <WhatsAppIcon className="btn-icon" />
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
