import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ROOM_OPTIONS } from '../data/site';
import { lockScroll, unlockScroll } from '../lib/smoothScroll';

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
    const [selectedRoom, setSelectedRoom] = useState(ROOM_OPTIONS[0].value);
    const [modalOpen, setModalOpen] = useState(false);
    const [toast, setToast] = useState(null);
    const toastTimer = useRef();

    const openModal = useCallback(() => setModalOpen(true), []);
    const closeModal = useCallback(() => setModalOpen(false), []);

    useEffect(() => {
        if (!modalOpen) return undefined;
        lockScroll();
        return unlockScroll;
    }, [modalOpen]);

    const showToast = useCallback((message, type = 'success') => {
        clearTimeout(toastTimer.current);
        setToast({ message, type, id: Date.now() });
        toastTimer.current = setTimeout(() => setToast(null), 4500);
    }, []);

    return (
        <SiteContext.Provider value={{ selectedRoom, setSelectedRoom, modalOpen, openModal, closeModal, showToast }}>
            {children}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        key={toast.id}
                        className={`toast toast-${toast.type} show`}
                        role="status"
                        aria-live="polite"
                        initial={{ opacity: 0, y: 24, x: '-50%', scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
                        exit={{ opacity: 0, y: 16, x: '-50%', scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    >
                        {toast.message}
                    </motion.div>
                )}
            </AnimatePresence>
        </SiteContext.Provider>
    );
}

export const useSite = () => useContext(SiteContext);
