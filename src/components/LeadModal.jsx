import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CONTACT } from '../data/site';
import { useSite } from '../context/SiteContext';
import BookingForm from './BookingForm';
import { EASE } from './Motion';

const SHOWN_KEY = 'spp_lead_modal_shown';
const AUTO_OPEN_MS = 10000;

// Storage access can throw (private mode, blocked site data), so guard it
const storageGet = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const storageSet = (k, v) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } };

const list = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } } };
const item = { hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } } };

export default function LeadModal() {
    const { modalOpen, openModal, closeModal } = useSite();

    // Auto-open once per visitor, unless something else (lightbox, menu) is open
    useEffect(() => {
        if (storageGet(SHOWN_KEY)) return undefined;
        const t = setTimeout(() => {
            // Body scroll is locked while the lightbox or mobile menu is open
            if (document.body.style.overflow === 'hidden') return;
            openModal();
            storageSet(SHOWN_KEY, 'true');
        }, AUTO_OPEN_MS);
        return () => clearTimeout(t);
    }, [openModal]);

    useEffect(() => {
        if (!modalOpen) return undefined;
        const onKey = (e) => e.key === 'Escape' && closeModal();
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [modalOpen, closeModal]);

    return (
        <AnimatePresence>
            {modalOpen && (
                <motion.div
                    className="lead-modal show-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="leadModalTitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="lead-modal-backdrop" onClick={closeModal} />
                    <motion.div
                        className="lead-modal-container"
                        data-lenis-prevent
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                    >
                        <button type="button" className="lead-modal-close" aria-label="Close modal" onClick={closeModal}>&times;</button>
                        <div className="lead-modal-content">
                            <div
                                className="lead-modal-left"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(to bottom, rgba(10, 22, 40, 0.7), rgba(10, 22, 40, 0.95)), url('/assets/MALAI.webp')",
                                }}
                            >
                                <motion.div className="lead-modal-left-inner" variants={list} initial="hidden" animate="show">
                                    <motion.div className="lead-modal-brand" variants={item}>
                                        <img src="/assets/SPP PIC.webp" alt="SPP Logo" className="modal-brand-logo" />
                                        <span>Sri Padmavati Pleasants</span>
                                    </motion.div>
                                    <motion.div className="lead-modal-badge" variants={item}>Exclusive Rates</motion.div>
                                    <motion.h3 variants={item}>Reserve Your Temple Stay</motion.h3>
                                    <motion.p variants={item}>
                                        Book directly with us to secure the best rates, flexible check-in adjustments, and free
                                        spacious private vehicle parking.
                                    </motion.p>
                                    <ul className="modal-benefits-list">
                                        {['Direct Booking Discount', 'Flexible Check-in Timings', 'Free High-Speed WiFi & Parking'].map((b) => (
                                            <motion.li key={b} variants={item}><span>✓</span> {b}</motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>

                            <div className="lead-modal-right">
                                <h3 className="modal-right-title" id="leadModalTitle">Request Availability &amp; Rates</h3>
                                <p className="modal-right-desc">
                                    Provide your travel dates and requirements below. Our desk agent will contact you immediately
                                    to confirm room availability and direct reservation details.
                                </p>
                                <BookingForm idPrefix="modalForm" onDone={closeModal} />
                                <div className="modal-footer-phone">
                                    Or Call Us Directly: <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
