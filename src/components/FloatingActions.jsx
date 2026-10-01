import { useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { CONTACT, waLink } from '../data/site';
import { Icon, WhatsAppIcon } from './Icons';
import { scrollToTarget } from '../lib/smoothScroll';
import { useSite } from '../context/SiteContext';

const pop = {
    hidden: { opacity: 0, scale: 0.4, y: 20 },
    // Entrance waits for the preloader; afterwards the delay is dropped so hover-out settles instantly
    show: ({ i, entered }) => ({ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 20, delay: entered ? 0 : 2 + i * 0.12 } }),
};

const WA_LINK = waLink("Hello! I'm inquiring about booking rooms at Sri Padmavati Pleasants. Please share room availability details.");

const HOVER = { scale: 1.1, y: -3 };
const TAP = { scale: 0.94 };

export default function FloatingActions({ loaded }) {
    const { openModal } = useSite();
    const [showTop, setShowTop] = useState(false);
    const [entered, setEntered] = useState(false);
    const onDone = (def) => def === 'show' && setEntered(true);
    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, 'change', (y) => setShowTop(y > 500));

    const state = loaded ? 'show' : 'hidden';

    return (
        <>
            <button
                type="button"
                className={`scroll-to-top${showTop ? ' show-btn' : ''}`}
                aria-label="Scroll to top"
                onClick={() => scrollToTarget(0)}
            >
                <Icon name="chevronUp" strokeWidth={2.5} />
            </button>

            <motion.a href={`tel:${CONTACT.phone}`} className="floating-call-btn" aria-label="Call Front Desk" variants={pop} custom={{ i: 0, entered }} onAnimationComplete={onDone} initial="hidden" animate={state} whileHover={HOVER} whileTap={TAP}>
                <Icon name="phone" strokeWidth={2} className="call-icon-svg" />
                <span className="floating-btn-tooltip">Call: {CONTACT.phoneShort}</span>
            </motion.a>

            {/* Phones: one bottom bar instead of floating circles that cover content */}
            <motion.nav
                className="mobile-action-bar"
                aria-label="Quick contact"
                initial={{ y: 120 }}
                animate={loaded ? { y: 0 } : { y: 120 }}
                transition={{ type: 'spring', stiffness: 260, damping: 28, delay: loaded ? 1.6 : 0 }}
            >
                <a href={`tel:${CONTACT.phone}`} className="mab-item">
                    <Icon name="phone" size={18} strokeWidth={2} />
                    <span>Call</span>
                </a>
                <a href={WA_LINK} target="_blank" rel="noopener" className="mab-item mab-whatsapp">
                    <WhatsAppIcon className="mab-wa-icon" />
                    <span>WhatsApp</span>
                </a>
                <button type="button" className="mab-item mab-book" onClick={openModal}>
                    Book Now
                </button>
            </motion.nav>

            <motion.a
                href={WA_LINK}
                className="floating-whatsapp-btn"
                target="_blank"
                rel="noopener"
                aria-label="Book on WhatsApp"
                variants={pop}
                custom={{ i: 1, entered }}
                onAnimationComplete={onDone}
                initial="hidden"
                animate={state}
                whileHover={HOVER}
                whileTap={TAP}
            >
                <WhatsAppIcon className="whatsapp-icon-svg" />
                <span className="floating-btn-tooltip">WhatsApp: {CONTACT.phoneShort}</span>
            </motion.a>
        </>
    );
}
