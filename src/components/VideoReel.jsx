import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { REEL_URL } from '../data/site';
import { Reveal, SectionHeader } from './Motion';

export default function VideoReel() {
    const ref = useRef(null);
    // Video eases from slightly scaled-down to full size as it scrolls into place
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
    const radius = useTransform(scrollYProgress, [0, 1], [40, 22]);

    return (
        <section className="section video-reel" id="video">
            <div className="container">
                <SectionHeader eyebrow="VISUAL TOUR" title="Sri Padmavati Pleasants Reel" />

                <div className="video-reel-wrapper" ref={ref}>
                    <motion.div className="video-container" style={{ scale, borderRadius: radius }}>
                        <video className="video-reel-player" controls playsInline preload="none" width="100%" poster="/assets/FRONTAGE.webp">
                            <source src={REEL_URL} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </motion.div>
                    <Reveal className="video-reel-info" delay={0.2}>
                        <h3>Experience Sri Padmavati Pleasants</h3>
                        <p>
                            Watch our exclusive property reel showcasing our premium rooms, modern amenities, beautiful
                            corridors, and the exceptional hospitality that awaits every guest at Sri Padmavati Pleasants in
                            Palani.
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
