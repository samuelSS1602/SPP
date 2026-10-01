import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FAQS } from '../data/site';
import { Icon } from './Icons';
import { EASE, RevealGroup, RevealItem, SectionHeader } from './Motion';

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="section faq" id="faq">
            <div className="container">
                <SectionHeader eyebrow="COMMON INQUIRIES" title="Frequently Asked Questions" />

                <RevealGroup className="faq-accordion-wrapper" step={0.08}>
                    {FAQS.map((item, i) => {
                        const open = openIndex === i;
                        return (
                            <RevealItem className={`faq-item${open ? ' active' : ''}`} key={item.q}>
                                <button
                                    type="button"
                                    className="faq-question"
                                    aria-expanded={open}
                                    aria-controls={`faq-answer-${i}`}
                                    onClick={() => setOpenIndex(open ? null : i)}
                                >
                                    <span>{item.q}</span>
                                    <motion.span className="faq-icon" animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.4, ease: EASE }}>
                                        <Icon name="plus" strokeWidth={2} />
                                    </motion.span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {open && (
                                        <motion.div
                                            id={`faq-answer-${i}`}
                                            className="faq-answer"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: EASE }}
                                        >
                                            <motion.p initial={{ y: -8 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                                                {item.a}
                                            </motion.p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </RevealItem>
                        );
                    })}
                </RevealGroup>
            </div>
        </section>
    );
}
