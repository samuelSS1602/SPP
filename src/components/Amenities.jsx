import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { AMENITIES } from '../data/site';
import { Icon } from './Icons';
import { EASE, Reveal, RevealGroup, RevealItem, SectionHeader } from './Motion';

const lift = { y: -6, transition: { type: 'spring', stiffness: 300, damping: 22 } };

function NoLiftNotice() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    const [expanded, setExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const onChange = (e) => setIsMobile(e.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    // Auto-open shortly after it scrolls into view
    useEffect(() => {
        if (!inView) return undefined;
        const t = setTimeout(() => setExpanded(true), 800);
        return () => clearTimeout(t);
    }, [inView]);

    const open = expanded || isMobile;

    return (
        <Reveal className={`no-lift-notice${open ? ' expanded' : ''}`}>
            <div
                ref={ref}
                className="no-lift-notice-inner"
                role="button"
                tabIndex={0}
                aria-expanded={open}
                onClick={() => setExpanded((e) => !e)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setExpanded((x) => !x))}
            >
                <div className="no-lift-icon-wrap">
                    <Icon name="stairs" className="no-lift-stairs-icon" />
                </div>
                <div className="no-lift-content">
                    <h4 className="no-lift-title">
                        <span className="no-lift-badge">Good to Know</span>
                        Staircase Access Only &mdash; No Lift Available
                    </h4>
                    <AnimatePresence initial={false}>
                        {open && (
                            <motion.p
                                className="no-lift-text"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.6, ease: EASE }}
                            >
                                Our lodge does not have a lift/elevator facility. All floors are accessible via well-maintained,
                                well-lit staircases. Our friendly staff will happily assist you with luggage upon request.
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
                <motion.div className="no-lift-expand-indicator" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.5, ease: EASE }}>
                    <Icon name="chevronDown" strokeWidth={2} />
                </motion.div>
            </div>
        </Reveal>
    );
}

export default function Amenities() {
    return (
        <section className="section amenities" id="amenities">
            <div className="container">
                <SectionHeader eyebrow="EXCEPTIONAL HOSPITALITY" title="Lodge Facilities & Room Amenities" />

                <RevealGroup className="amenities-grid" step={0.08}>
                    {AMENITIES.map((a) => (
                        <RevealItem className="amenity-card amenity-card--photo" key={a.title} whileHover={lift}>
                            <div className="amenity-photo">
                                <img src={`/assets/${a.image}`} alt="" loading="lazy" decoding="async" />
                            </div>
                            <div className="amenity-visual">
                                <div className="amenity-icon-box">
                                    <Icon name={a.icon} />
                                </div>
                            </div>
                            <div className="amenity-body">
                                <h3>{a.title}</h3>
                                <p>{a.text}</p>
                            </div>
                        </RevealItem>
                    ))}
                </RevealGroup>

                <NoLiftNotice />
            </div>
        </section>
    );
}
