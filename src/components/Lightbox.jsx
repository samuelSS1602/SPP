import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { EASE } from './Motion';
import { lockScroll, unlockScroll } from '../lib/smoothScroll';

const slide = {
    enter: (dir) => ({ opacity: 0, x: dir * 80, scale: 0.96 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir) => ({ opacity: 0, x: dir * -80, scale: 0.96 }),
};

// images: [{ src, alt, title }] — null when closed
export default function Lightbox({ images, startIndex, onClose }) {
    const [[index, dir], setState] = useState([startIndex, 0]);
    const open = Boolean(images);

    useEffect(() => setState([startIndex, 0]), [startIndex, images]);

    const go = useCallback(
        (step) => {
            if (!images || images.length < 2) return;
            setState(([i]) => [(i + step + images.length) % images.length, step]);
        },
        [images]
    );

    useEffect(() => {
        if (!open) return undefined;
        lockScroll();
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') go(-1);
            if (e.key === 'ArrowRight') go(1);
        };
        document.addEventListener('keydown', onKey);
        return () => {
            unlockScroll();
            document.removeEventListener('keydown', onKey);
        };
    }, [open, go, onClose]);

    const current = images?.[index];
    const multiple = images && images.length > 1;

    return (
        <AnimatePresence>
            {open && current && (
                <motion.div
                    className="lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Photo viewer"
                    data-lenis-prevent
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={(e) => e.target === e.currentTarget && onClose()}
                >
                    <button type="button" className="lightbox-close" aria-label="Close" onClick={onClose}>&times;</button>
                    {multiple && (
                        <>
                            <button type="button" className="lightbox-arrow lightbox-prev" aria-label="Previous image" onClick={() => go(-1)}>&#10094;</button>
                            <button type="button" className="lightbox-arrow lightbox-next" aria-label="Next image" onClick={() => go(1)}>&#10095;</button>
                        </>
                    )}

                    <div className="lightbox-content-wrapper">
                        <AnimatePresence initial={false} custom={dir} mode="popLayout">
                            <motion.img
                                key={current.src}
                                className="lightbox-content"
                                src={current.src}
                                alt={current.alt}
                                custom={dir}
                                variants={slide}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.55, ease: EASE }}
                                drag={multiple ? 'x' : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.6}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x < -80) go(1);
                                    else if (info.offset.x > 80) go(-1);
                                }}
                                draggable={false}
                            />
                        </AnimatePresence>
                        <motion.div
                            key={`cap-${current.src}`}
                            className="lightbox-caption"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
                        >
                            {current.title || current.alt}
                            {multiple && <span className="lightbox-counter">{index + 1} / {images.length}</span>}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
