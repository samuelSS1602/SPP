import { useEffect, useState } from 'react';

const NAME = 'Sri Padmavati Pleasants';
const MIN_SHOW_MS = 2100; // long enough for the name to spell out and the gold line to draw
const MAX_SHOW_MS = 3000; // never hold the page longer than this on slow loads
const EXIT_MS = 1400;     // curtain transition length in CSS

// Logo + name fade in, gold line draws, then the screen parts like curtains
export default function Preloader({ onOpen }) {
    const [opening, setOpening] = useState(false);
    const [gone, setGone] = useState(false);

    useEffect(() => {
        const start = performance.now();
        let done = false;
        const timers = [];

        const open = () => {
            if (done) return;
            done = true;
            setOpening(true);
            onOpen();
            timers.push(setTimeout(() => setGone(true), EXIT_MS));
        };

        const openAfterMinimum = () => {
            timers.push(setTimeout(open, Math.max(0, MIN_SHOW_MS - (performance.now() - start))));
        };

        if (document.readyState === 'complete') openAfterMinimum();
        else window.addEventListener('load', openAfterMinimum, { once: true });
        timers.push(setTimeout(open, MAX_SHOW_MS));

        return () => {
            window.removeEventListener('load', openAfterMinimum);
            timers.forEach(clearTimeout);
        };
    }, [onOpen]);

    if (gone) return null;

    return (
        <div id="preloader" className={opening ? 'is-done' : ''} aria-hidden="true">
            <div className="preloader-curtain preloader-curtain-top" />
            <div className="preloader-curtain preloader-curtain-bottom" />
            <div className="preloader-inner">
                <img src="/assets/SPP PIC.webp" alt="" className="preloader-logo" />
                <p className="preloader-text" aria-label={NAME}>
                    {NAME.split('').map((ch, i) => (
                        <span
                            key={i}
                            className="preloader-letter"
                            style={{ animationDelay: `${0.25 + i * 0.035}s` }}
                        >
                            {ch === ' ' ? ' ' : ch}
                        </span>
                    ))}
                </p>
                <div className="preloader-line"><span /></div>
                <span className="preloader-subtitle">Luxury Lodge &middot; Palani</span>
            </div>
        </div>
    );
}
