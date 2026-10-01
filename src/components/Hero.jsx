import { Fragment, useEffect, useRef } from 'react';
import { animate, motion, useInView, useScroll, useTransform } from 'motion/react';
import { HERO_STATS, waLink } from '../data/site';
import { useSite } from '../context/SiteContext';
import { EASE } from './Motion';
import { WhatsAppIcon } from './Icons';

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const rise = {
    hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease: EASE } },
};

// Each word slides up from behind a mask
const word = {
    hidden: { y: '110%' },
    show: { y: '0%', transition: { duration: 1.1, ease: EASE } },
};

function SplitWords({ text, className }) {
    // The space must sit outside the inline-block mask, or it collapses and words run together
    return text.split(' ').map((w, i) => (
        <Fragment key={`${w}-${i}`}>
            <span className="word-mask">
                <motion.span className={`word ${className || ''}`} variants={word}>
                    {w}
                </motion.span>
            </span>{' '}
        </Fragment>
    ));
}

function CountUp({ to }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return undefined;
        const controls = animate(0, to, {
            duration: 2.2,
            ease: EASE,
            onUpdate: (v) => {
                if (ref.current) ref.current.textContent = Math.round(v);
            },
        });
        return () => controls.stop();
    }, [inView, to]);

    return <span ref={ref} className="stat-badge-num">0</span>;
}

export default function Hero({ loaded }) {
    const { openModal } = useSite();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
    const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const state = loaded ? 'show' : 'hidden';

    return (
        <section className="hero" id="home" ref={ref}>
            <motion.div className="hero-bg" style={{ y: bgY }}>
                <div
                    className="hero-image-zoom"
                    style={{
                        backgroundImage:
                            "linear-gradient(to bottom, rgba(10, 22, 40, 0.8), rgba(10, 22, 40, 0.9)), url('/assets/MALAI.webp')",
                    }}
                />
            </motion.div>

            <motion.div className="hero-content-wrapper container" style={{ y: contentY, opacity: contentOpacity }}>
                <motion.div className="hero-content" variants={container} initial="hidden" animate={state}>
                    <motion.span className="hero-tagline" variants={rise}>
                        <span className="gold-dot" /> PREMIUM COMFORT IN PALANI
                    </motion.span>

                    <motion.h1 className="hero-title" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}>
                        <SplitWords text="Experience Premium Living At" />
                        <br />
                        <span className="highlight-gold">
                            <SplitWords text="Sri Padmavati Pleasants" className="gold-word" />
                        </span>
                    </motion.h1>

                    <motion.p className="hero-description" variants={rise}>
                        Nestled in the serene foothills of Palani, our luxury lodge offers elegantly designed, clean, and
                        comfortable accommodations tailored for families, pilgrims, and business travelers.
                    </motion.p>

                    <motion.div className="hero-ctas" variants={rise}>
                        <a href="#rooms" className="btn btn-primary">View Deluxe Rooms</a>
                        <button type="button" className="btn btn-secondary" onClick={openModal}>Book A Room</button>
                        <a
                            href={waLink('Hello, I want to enquire about booking a room at Sri Padmavati Pleasants. Please send availability details.')}
                            target="_blank"
                            rel="noopener"
                            className="btn btn-outline"
                        >
                            <WhatsAppIcon className="btn-icon" />
                            WhatsApp Booking
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div className="hero-stats-row" variants={container} initial="hidden" animate={state}>
                    {HERO_STATS.map((stat, i) => (
                        <motion.div
                            className="stat-badge"
                            key={stat.label}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay: 0.7 + i * 0.1 } },
                            }}
                        >
                            <span className="stat-badge-value">
                                {stat.count && loaded ? <CountUp to={stat.value} /> : <span className="stat-badge-num">{stat.count ? 0 : stat.value}</span>}
                                {stat.suffix && <span className="stat-badge-plus">{stat.suffix}</span>}
                            </span>
                            <span className="stat-badge-lbl">{stat.label}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            <motion.div
                className="hero-scroll-indicator"
                initial={{ opacity: 0 }}
                animate={loaded ? { opacity: 1 } : {}}
                transition={{ delay: 1.8, duration: 1 }}
            >
                <a href="#about" className="scroll-down-arrow" aria-label="Scroll to About section">
                    <span />
                </a>
            </motion.div>
        </section>
    );
}
