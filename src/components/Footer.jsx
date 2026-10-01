import { CONTACT, NAV_LINKS } from '../data/site';
import { RevealGroup, RevealItem } from './Motion';

const FOOTER_LABELS = {
    '#gallery': 'Showcase Gallery',
    '#location': 'Location Advantage',
    '#testimonials': 'Guest Reviews',
    '#rooms': 'Rooms',
};

export default function Footer() {
    return (
        <footer className="footer">
            <RevealGroup className="container footer-top-grid" step={0.12}>
                <RevealItem className="footer-col footer-col-about">
                    <a href="#home" className="footer-logo">
                        <img src="/assets/SPP PIC.webp" alt="SPP Logo" className="footer-logo-img" />
                        <div className="footer-logo-text">
                            <span className="footer-logo-title">SRI PADMAVATI</span>
                            <span className="footer-logo-subtitle">PLEASANTS</span>
                        </div>
                    </a>
                    <p className="footer-desc">
                        Providing premium lodge accommodations nested close to the spiritual foothills of Palani. Committed to
                        extreme cleanliness, family-friendly security, and high-quality guest comfort.
                    </p>
                    <div className="footer-badges">
                        <span className="badge-dtcp">FAMILY SAFE</span>
                        <span className="badge-gated">24/7 SUPPORT</span>
                    </div>
                </RevealItem>

                <RevealItem className="footer-col">
                    <h3 className="footer-col-title">Quick Navigation</h3>
                    <div className="footer-col-divider" />
                    <ul className="footer-links">
                        {NAV_LINKS.map((l) => (
                            <li key={l.href}><a href={l.href}>{FOOTER_LABELS[l.href] || l.label}</a></li>
                        ))}
                    </ul>
                </RevealItem>

                <RevealItem className="footer-col">
                    <h3 className="footer-col-title">Lodge Front Office</h3>
                    <div className="footer-col-divider" />
                    <ul className="footer-contact-details">
                        <li>
                            <span className="footer-contact-icon">📍</span>
                            <span>Sri Padmavati Pleasants, 92/1A2, Idumban Kovil Road, Palani - 624601</span>
                        </li>
                        <li>
                            <span className="footer-contact-icon">📞</span>
                            <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>
                        </li>
                        <li>
                            <span className="footer-contact-icon">✉️</span>
                            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                        </li>
                    </ul>
                </RevealItem>
            </RevealGroup>

            <div className="footer-bottom">
                <div className="container footer-bottom-flex">
                    <p className="copyright">&copy; {new Date().getFullYear()} Sri Padmavati Pleasants. All rights reserved.</p>
                    <div className="footer-meta-links">
                        <a href="https://spp-admin-alpha.vercel.app/" target="_blank" rel="noopener" className="admin-portal-link">
                            <span className="lock-icon">🔑</span> Lodging Administrator
                        </a>
                        <span className="meta-separator">|</span>
                        <span className="developer-credit">
                            Developed by <strong><a href="https://codecrafters-pi.vercel.app/" target="_blank" rel="noopener">CodeCrafters</a></strong>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
