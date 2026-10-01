import { motion } from 'motion/react';

export const EASE = [0.22, 1, 0.36, 1];

// Phones and touch devices skip blur filters: each blurred element becomes its own
// GPU layer, which makes scrolling stutter on mid-range phones
export const LITE =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;

// Adds a soft blur to a hidden/shown pair of states on desktop only
export const withBlur = (hidden, shown, px = 6) =>
    LITE ? [hidden, shown] : [{ ...hidden, filter: `blur(${px}px)` }, { ...shown, filter: 'blur(0px)' }];

const [revealHidden, revealShown] = withBlur({ opacity: 0, y: LITE ? 24 : 36 }, { opacity: 1, y: 0 });

// Soft rise (blur-to-sharp on desktop) used for all scroll reveals
export const fadeUp = {
    hidden: revealHidden,
    show: { ...revealShown, transition: { duration: LITE ? 0.8 : 1, ease: EASE } },
};

export const stagger = (step = 0.1, delay = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren: step, delayChildren: delay } },
});

const VIEWPORT = { once: true, amount: 0.2, margin: '0px 0px -60px 0px' };

// Reveals itself when scrolled into view
export function Reveal({ as = 'div', delay = 0, className, children, ...rest }) {
    const Tag = motion[as];
    // A variant's own transition wins over the transition prop, so put the delay inside it
    const variants = delay
        ? { hidden: fadeUp.hidden, show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay } } }
        : fadeUp;
    return (
        <Tag
            className={className}
            variants={variants}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            {...rest}
        >
            {children}
        </Tag>
    );
}

// Container that cascades its <RevealItem> children in one after another
export function RevealGroup({ as = 'div', step = 0.1, delay = 0, className, children, ...rest }) {
    const Tag = motion[as];
    return (
        <Tag className={className} variants={stagger(step, delay)} initial="hidden" whileInView="show" viewport={VIEWPORT} {...rest}>
            {children}
        </Tag>
    );
}

export function RevealItem({ as = 'div', className, children, ...rest }) {
    const Tag = motion[as];
    return (
        <Tag className={className} variants={fadeUp} {...rest}>
            {children}
        </Tag>
    );
}

// Eyebrow + title + animated gold divider
export function SectionHeader({ eyebrow, title }) {
    return (
        <RevealGroup className="section-header" step={0.12}>
            <RevealItem as="span" className="section-subtitle-top">{eyebrow}</RevealItem>
            <RevealItem as="h2" className="section-title">{title}</RevealItem>
            <div className="section-divider">
                <motion.span
                    className="div-line"
                    style={{ originX: 1 }}
                    variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease: EASE, delay: 0.3 } } }}
                />
                <motion.span
                    className="div-flower"
                    variants={{ hidden: { opacity: 0, rotate: -45, scale: 0 }, show: { opacity: 1, rotate: 45, scale: 1, transition: { duration: 0.8, ease: EASE, delay: 0.5 } } }}
                >
                    ♦
                </motion.span>
                <motion.span
                    className="div-line"
                    style={{ originX: 0 }}
                    variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease: EASE, delay: 0.3 } } }}
                />
            </div>
        </RevealGroup>
    );
}
