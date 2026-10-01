import { useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { NAV_LINKS } from '../data/site';
import { EASE } from './Motion';
import { lockScroll, unlockScroll } from '../lib/smoothScroll';

export default function Navbar({ loaded }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState('#home');

    const { scrollY, scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

    useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 50));

    // Highlight the nav link for whichever section sits in the middle of the viewport
    useEffect(() => {
        const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(`#${entry.target.id}`);
                });
            },
            { rootMargin: '-45% 0px -50% 0px' }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!menuOpen) return undefined;
        lockScroll();
        const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
        document.addEventListener('keydown', onKey);
        return () => {
            unlockScroll();
            document.removeEventListener('keydown', onKey);
        };
    }, [menuOpen]);

    const toggleMenu = () => setMenuOpen((o) => !o);

    return (
        <motion.header
            className="header"
            initial={{ y: -90, opacity: 0 }}
            animate={loaded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        >
            <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
                <div className="nav-container">
                    <a href="#home" className="logo">
                        <img src="/assets/SPP PIC.webp" alt="SPP Logo" className="logo-img" />
                        <div className="logo-text">
                            <span className="logo-title">SRI PADMAVATI</span>
                            <span className="logo-subtitle">PLEASANTS</span>
                        </div>
                    </a>

                    <ul className={`nav-menu${menuOpen ? ' active' : ''}`} data-lenis-prevent>
                        {NAV_LINKS.map((link) => (
                            <li className="nav-item" key={link.href}>
                                <a
                                    href={link.href}
                                    className={`nav-link${active === link.href ? ' active' : ''}`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                        <li className="nav-item">
                            <a href="#contact" className="nav-link nav-btn-cta" onClick={() => setMenuOpen(false)}>
                                Book Room
                            </a>
                        </li>
                    </ul>

                    <div
                        className={`hamburger${menuOpen ? ' active' : ''}`}
                        role="button"
                        tabIndex={0}
                        aria-label="Toggle navigation menu"
                        aria-expanded={menuOpen}
                        onClick={toggleMenu}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggleMenu();
                            }
                        }}
                    >
                        <span className="bar" />
                        <span className="bar" />
                        <span className="bar" />
                    </div>
                </div>
                <motion.div className="nav-progress" style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }} />
            </nav>
        </motion.header>
    );
}
