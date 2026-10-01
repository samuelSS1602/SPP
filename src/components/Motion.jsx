import { motion } from 'motion/react';

export const EASE = [0.22, 1, 0.36, 1];

// Soft blur-to-sharp rise used for all scroll reveals
export const fadeUp = {
    hidden: { opacity: 0, y: 36, filter: 'blur(6px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: EASE } },
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
