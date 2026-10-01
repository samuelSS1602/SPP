import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ABOUT_PHOTOS, FEATURES } from '../data/site';
import { Icon } from './Icons';
import { EASE, RevealGroup, RevealItem, SectionHeader } from './Motion';

const lift = { y: -6, transition: { type: 'spring', stiffness: 300, damping: 22 } };

// Photo that unveils with a sliding clip mask when scrolled into view.
// The frame watches the viewport (a fully clipped image never counts as visible),
// and the image follows through variants.
function MaskPhoto({ photo, className, style, delay = 0 }) {
    return (
        <motion.figure
            className={`about-photo ${className}`}
            style={style}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.img
                src={`/assets/${photo.src}`}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                variants={{
                    hidden: { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.2 },
                    show: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, transition: { duration: 1.4, ease: EASE, delay } },
                }}
            />
        </motion.figure>
    );
}

export default function About() {
    const mediaRef = useRef(null);
    // Small photos drift at different speeds for depth
    const { scrollYProgress } = useScroll({ target: mediaRef, offset: ['start end', 'end start'] });
    const topY = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const bottomY = useTransform(scrollYProgress, [0, 1], [90, -40]);
    const badgeY = useTransform(scrollYProgress, [0, 1], [40, -30]);

    return (
        <section className="section about-project" id="about">
            <div className="container">
                <SectionHeader eyebrow="THE SANCTUARY OF COMFORT" title="About Sri Padmavati Pleasants" />

                <div className="about-grid about-grid--media">
                    <div className="about-media" ref={mediaRef}>
                        <MaskPhoto photo={ABOUT_PHOTOS.main} className="about-photo-main" />
                        <MaskPhoto photo={ABOUT_PHOTOS.top} className="about-photo-top" style={{ y: topY }} delay={0.25} />
                        <MaskPhoto photo={ABOUT_PHOTOS.bottom} className="about-photo-bottom" style={{ y: bottomY }} delay={0.4} />
                        <motion.div
                            className="about-badge"
                            style={{ y: badgeY }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.7 }}
                        >
                            <span className="about-badge-num">5</span>
                            <span className="about-badge-text">Min to<br />Palani Temple</span>
                        </motion.div>
                    </div>

                    <RevealGroup className="about-text-col" step={0.12}>
                        <RevealItem as="h3" className="about-heading">A Peaceful &amp; Sacred Gateway to Palani</RevealItem>
                        <RevealItem as="p" className="about-text">
                            Sri Padmavati Pleasants is a premier lodging destination committed to delivering exceptional
                            comfort, cleanliness, and premium hospitality experiences in the temple town of Palani. With our
                            beautifully designed spaces and attentive staff, we provide the perfect retreat for pilgrims,
                            families, and leisure travelers alike.
                        </RevealItem>
                        <RevealItem as="p" className="about-text">
                            Framed by the panoramic views of the Palani hills, our property features state-of-the-art
                            facilities, direct temple accessibility, and private parking. Whether you are visiting the holy
                            Murugan Temple for a pilgrimage or transitioning on a family vacation, we ensure a warm, secure,
                            and unforgettable home away from home.
                        </RevealItem>
                        <RevealItem className="about-signature-box">
                            <div className="sig-details">
                                <span className="sig-title">Sri Padmavati Lodging Team</span>
                                <span className="sig-subtitle">Uncompromising Hospitality, Cleanliness &amp; Value</span>
                            </div>
                        </RevealItem>
                        <RevealItem className="about-cta">
                            <a href="#rooms" className="btn btn-primary">Explore Our Rooms</a>
                        </RevealItem>
                    </RevealGroup>
                </div>

                <RevealGroup className="features-grid features-grid--wide" step={0.09}>
                    {FEATURES.map((f) => (
                        <RevealItem className="feature-card" key={f.title} whileHover={lift}>
                            <div className="feature-icon">
                                <Icon name={f.icon} />
                            </div>
                            <h4>{f.title}</h4>
                            <p>{f.text}</p>
                        </RevealItem>
                    ))}
                </RevealGroup>
            </div>
        </section>
    );
}
