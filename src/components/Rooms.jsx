import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ROOMS } from '../data/site';
import { useSite } from '../context/SiteContext';
import { Icon } from './Icons';
import { fadeUp, RevealGroup, SectionHeader } from './Motion';

// Card that tilts softly toward the cursor (mouse only — touch devices stay flat)
function RoomCard({ room, onView }) {
    const { setSelectedRoom } = useSite();
    const mx = useMotionValue(0.5);
    const my = useMotionValue(0.5);
    const spring = { stiffness: 150, damping: 18 };
    const rotateX = useSpring(useTransform(my, [0, 1], [5, -5]), spring);
    const rotateY = useSpring(useTransform(mx, [0, 1], [-5, 5]), spring);
    const glareX = useTransform(mx, [0, 1], ['0%', '100%']);

    const onMove = (e) => {
        if (e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
    };
    const onLeave = () => {
        mx.set(0.5);
        my.set(0.5);
    };

    return (
        <motion.div className="plan-card-wrap" variants={fadeUp} style={{ perspective: 1200 }}>
            <motion.div
                className="plan-card"
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                onPointerMove={onMove}
                onPointerLeave={onLeave}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
                <div className="plan-image-wrapper" onClick={onView} role="button" tabIndex={0} aria-label={`View ${room.name} photo`}
                    onKeyDown={(e) => e.key === 'Enter' && onView()}>
                    <img src={room.image} alt={`${room.name} Accommodation`} className="plan-img" />
                    <motion.div className="plan-glare" style={{ '--glare-x': glareX }} />
                    <div className="plan-zoom-overlay">
                        <span className="zoom-btn">
                            <Icon name="zoom" size={20} strokeWidth={2} /> View Room Photo
                        </span>
                    </div>
                </div>
                <div className="plan-details">
                    <div className="plan-badge">{room.badge}</div>
                    <h3>{room.name}</h3>
                    <div className="plan-price">
                        <span className="plan-price-amt">{room.price}</span>
                        <span className="plan-price-unit">/ night</span>
                    </div>
                    <p className="plan-meta">Occupancy: <span>{room.occupancy}</span></p>
                    <p className="plan-desc">{room.desc}</p>
                    <ul className="plan-features">
                        {room.features.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                    <div className="plan-actions">
                        <a href="#contact" className="btn btn-outline-gold" onClick={() => setSelectedRoom(room.id)}>
                            Book This Room
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Rooms({ onViewImage }) {
    return (
        <section className="section floor-plans" id="rooms">
            <div className="container">
                <SectionHeader eyebrow="LUXURY ACCOMMODATIONS" title="Our Premium Rooms" />
                <RevealGroup className="rooms-grid" step={0.15}>
                    {ROOMS.map((room) => (
                        <RoomCard
                            key={room.id}
                            room={room}
                            onView={() => onViewImage([{ src: room.image, alt: `${room.name} Accommodation`, title: room.name }], 0)}
                        />
                    ))}
                </RevealGroup>
            </div>
        </section>
    );
}
