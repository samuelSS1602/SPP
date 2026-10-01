import Lenis from 'lenis';

// Single Lenis instance shared by the app (null when reduced motion is on)
let lenis = null;
let lockCount = 0;

export function initSmoothScroll() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return () => {};

    lenis = new Lenis({
        autoRaf: true,
        lerp: 0.09,
        anchors: { offset: -70 },
        // Let modals, the lightbox and the mobile menu scroll natively
        prevent: (node) => node.closest?.('[data-lenis-prevent]') != null,
    });

    return () => {
        lenis?.destroy();
        lenis = null;
    };
}

export function scrollToTarget(target) {
    if (lenis) {
        lenis.scrollTo(target, { offset: -70 });
    } else if (target === 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
}

// Reference-counted so the modal and lightbox can't unlock each other early
export function lockScroll() {
    lockCount += 1;
    if (lockCount === 1) {
        lenis?.stop();
        document.body.style.overflow = 'hidden';
    }
}

export function unlockScroll() {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
        lenis?.start();
        document.body.style.overflow = '';
    }
}
