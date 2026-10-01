import { useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { CONTACT, waLink } from '../data/site';
import { Icon, WhatsAppIcon } from './Icons';
import { scrollToTarget } from '../lib/smoothScroll';

const pop = {
    hidden: { opacity: 0, scale: 0.4, y: 20 },
    // Entrance waits for the preloader; afterwards the delay is dropped so hover-out settles instantly
    show: ({ i, entered }) => ({ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 20, delay: entered ? 0 : 2 + i * 0.12 } }),
};

const HOVER = { scale: 1.1, y: -3 };
const TAP = { scale: 0.94 };

export default function FloatingActions({ loaded }) {
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

            <motion.a
                href={waLink("Hello! I'm inquiring about booking rooms at Sri Padmavati Pleasants. Please share room availability details.")}
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
