import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CONTACT, TESTIMONIALS } from '../data/site';
import { EASE, Reveal, SectionHeader } from './Motion';

const AUTOPLAY_MS = 7000;

const slide = {
    enter: (dir) => ({ opacity: 0, x: dir * 60, filter: 'blur(6px)' }),
    center: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: (dir) => ({ opacity: 0, x: dir * -60, filter: 'blur(6px)' }),
};

export default function Testimonials() {
    const [[index, dir], setState] = useState([0, 1]);
    const [paused, setPaused] = useState(false);
    const count = TESTIMONIALS.length;

    const go = useCallback((step) => setState(([i]) => [(i + step + count) % count, step]), [count]);
    const goTo = (i) => setState(([cur]) => [i, i > cur ? 1 : -1]);

    // Restarts whenever the slide changes, so manual navigation resets the timer
    useEffect(() => {
        if (paused) return undefined;
        const t = setTimeout(() => go(1), AUTOPLAY_MS);
        return () => clearTimeout(t);
    }, [index, paused, go]);

    const t = TESTIMONIALS[index];

    return (
        <section className="section testimonials" id="testimonials">
            <div className="container">
                <SectionHeader eyebrow="GUEST REVIEWS" title="Verified Google Reviews" />

                <Reveal
                    className="testimonials-carousel-wrapper"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <div className="testimonials-carousel">
                        <AnimatePresence mode="wait" custom={dir} initial={false}>
                            <motion.div
                                key={index}
                                className="testimonial-slide active"
                                custom={dir}
                                variants={slide}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.6, ease: EASE }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.4}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x < -60) go(1);
                                    else if (info.offset.x > 60) go(-1);
                                }}
                            >
                                <div className="testimonial-quote-icon">&ldquo;</div>
                                <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
                                <div className="testimonial-author">
                                    <div className="author-avatar-text">{t.initials}</div>
                                    <div className="author-details">
                                        <h4 className="author-name">{t.name}</h4>
                                        <p className="author-role">{t.role}</p>
                                        <div className="rating-stars" aria-label="5 out of 5 stars">★★★★★</div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="carousel-dots">
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                className={`carousel-dot${i === index ? ' active' : ''}`}
                                aria-label={`Go to testimonial slide ${i + 1}`}
                                onClick={() => goTo(i)}
                            >
                                {/* Fills over the autoplay interval */}
                                {i === index && !paused && (
                                    <motion.span
                                        className="carousel-dot-fill"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="carousel-arrows">
                        <button type="button" className="carousel-btn prev-btn" aria-label="Previous review" onClick={() => go(-1)}>&#10094;</button>
                        <button type="button" className="carousel-btn next-btn" aria-label="Next review" onClick={() => go(1)}>&#10095;</button>
                    </div>
                </Reveal>

                <Reveal className="google-reviews-cta">
                    <a href={CONTACT.reviewsUrl} target="_blank" rel="noopener" className="btn btn-primary">
                        Read All Reviews on Google
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
