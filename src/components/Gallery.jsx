import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useInView } from 'motion/react';
import { CATEGORY_LABELS, GALLERY, GALLERY_FILTERS } from '../data/site';
import { Icon } from './Icons';
import { EASE, Reveal, SectionHeader } from './Motion';

const counts = GALLERY.reduce((acc, item) => ({ ...acc, [item.cat]: (acc[item.cat] || 0) + 1 }), {});

const HIDDEN = { opacity: 0, scale: 0.92, filter: 'blur(6px)' };
const SHOWN = { opacity: 1, scale: 1, filter: 'blur(0px)' };

export default function Gallery({ onViewImage }) {
    const [filter, setFilter] = useState('all');
    const gridRef = useRef(null);
    // Tiles stay hidden until the grid scrolls into view, then cascade in
    const inView = useInView(gridRef, { once: true, amount: 0.1 });

    const visible = useMemo(
        () => (filter === 'all' ? GALLERY : GALLERY.filter((g) => g.cat === filter)),
        [filter]
    );

    const openAt = (index) => {
        onViewImage(
            visible.map((g) => ({ src: `/assets/${g.src}`, alt: g.alt, title: g.title })),
            index
        );
    };

    return (
        <section className="section gallery" id="gallery">
            <div className="container">
                <SectionHeader eyebrow="PHOTO TOUR" title="Lodge Gallery" />

                <Reveal className="gallery-filters" role="tablist" aria-label="Filter photos">
                    <LayoutGroup id="gallery-filters">
                        {GALLERY_FILTERS.map((f) => {
                            const isActive = filter === f.key;
                            return (
                                <button
                                    key={f.key}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    className={`filter-btn${isActive ? ' active' : ''}`}
                                    onClick={() => setFilter(f.key)}
                                >
                                    {/* Gold pill that glides between the active tabs */}
                                    {isActive && (
                                        <motion.span
                                            className="filter-pill"
                                            layoutId="filter-pill"
                                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                        />
                                    )}
                                    <span className="filter-label">{f.label}</span>
                                    <span className="filter-count">{f.key === 'all' ? GALLERY.length : counts[f.key]}</span>
                                </button>
                            );
                        })}
                    </LayoutGroup>
                </Reveal>

                <motion.div className="gallery-grid" layout ref={gridRef}>
                    <AnimatePresence mode="popLayout">
                        {visible.map((item, i) => (
                            <motion.button
                                type="button"
                                layout
                                key={item.src}
                                className={`gallery-item${item.featured ? ' is-featured' : ''}`}
                                initial={HIDDEN}
                                animate={inView ? SHOWN : HIDDEN}
                                exit={HIDDEN}
                                transition={{
                                    duration: 0.6,
                                    ease: EASE,
                                    delay: Math.min(i, 8) * 0.04,
                                    layout: { type: 'spring', stiffness: 260, damping: 30 },
                                }}
                                onClick={() => openAt(i)}
                                aria-label={`Open photo: ${item.title}`}
                            >
                                <div className="gallery-img-wrapper">
                                    <img src={`/assets/${item.src}`} alt={item.alt} loading="lazy" decoding="async" />
                                    <div className="gallery-overlay">
                                        <span className="gallery-category">{CATEGORY_LABELS[item.cat]}</span>
                                        <h4>{item.title}</h4>
                                        <span className="gallery-zoom-icon">
                                            <Icon name="zoom" size={18} strokeWidth={2} />
                                        </span>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
