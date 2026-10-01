import { Fragment, useEffect, useRef, useState } from 'react';
import { animate, AnimatePresence, motion, useInView, useScroll, useTransform } from 'motion/react';
import { HERO_SLIDES, HERO_STATS, waLink } from '../data/site';
import { useSite } from '../context/SiteContext';
import { EASE, withBlur } from './Motion';
import { WhatsAppIcon } from './Icons';

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const [riseHidden, riseShown] = withBlur({ opacity: 0, y: 28 }, { opacity: 1, y: 0 });
const rise = {
    hidden: riseHidden,
    show: { ...riseShown, transition: { duration: 1.1, ease: EASE } },
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

const SLIDE_MS = 6500;

export default function Hero({ loaded }) {
    const { openModal } = useSite();
    const ref = useRef(null);
    const [slide, setSlide] = useState(0);

    // Advance after each interval; restarts when a tab is clicked
    useEffect(() => {
        if (!loaded) return undefined;
        const t = setTimeout(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), SLIDE_MS);
        return () => clearTimeout(t);
    }, [slide, loaded]);

    // Warm the cache so each crossfade starts with the image ready
    useEffect(() => {
        HERO_SLIDES.forEach((s) => {
            const img = new Image();
            img.src = `/assets/${s.src}`;
        });
    }, []);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
    const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const state = loaded ? 'show' : 'hidden';

    return (
        <section className="hero" id="home" ref={ref}>
            <motion.div className="hero-bg" style={{ y: bgY }}>
                <AnimatePresence initial={false}>
                    <motion.div
                        key={slide}
                        className="hero-slide"
                        style={{
                            backgroundImage: `url('/assets/${HERO_SLIDES[slide].src}')`,
                            backgroundPosition: HERO_SLIDES[slide].position,
                        }}
                        initial={{ opacity: 0, scale: 1.14 }}
                        animate={{ opacity: 1, scale: 1.02 }}
                        exit={{ opacity: 0 }}
                        transition={{ opacity: { duration: 1.8, ease: 'easeInOut' }, scale: { duration: SLIDE_MS / 1000 + 2, ease: 'linear' } }}
                    />
                </AnimatePresence>
                <div className="hero-overlay" />
            </motion.div>

            {/* Slide labels with progress bars */}
            <motion.div
                className="hero-slide-nav"
                initial={{ opacity: 0, y: 12 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.6, duration: 0.9, ease: EASE }}
            >
                {HERO_SLIDES.map((s, i) => (
                    <button
                        key={s.src}
                        type="button"
                        className={`hero-slide-tab${i === slide ? ' active' : ''}`}
                        onClick={() => setSlide(i)}
                        aria-label={`Show ${s.label}`}
                    >
                        <span className="hero-slide-num">0{i + 1}</span>
                        <span className="hero-slide-label">{s.label}</span>
                        <span className="hero-slide-bar">
                            {i === slide && loaded && (
                                <motion.span
                                    key={slide}
                                    className="hero-slide-bar-fill"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                                />
                            )}
                        </span>
                    </button>
                ))}
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
