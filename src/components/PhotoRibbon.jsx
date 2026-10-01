import { RIBBON } from '../data/site';
import { Reveal } from './Motion';

// Endless, slowly drifting strip of lodge photos. The list is rendered twice and the
// track slides by half its width, so the loop is seamless. Hover pauses it.
export default function PhotoRibbon({ onViewImage }) {
    const images = RIBBON.map((r) => ({ src: `/assets/${r.src}`, alt: r.title, title: r.title }));
    const loop = [...RIBBON, ...RIBBON];

    return (
        <Reveal as="section" className="photo-ribbon" aria-label="Photo highlights">
            <div className="photo-ribbon-track">
                {loop.map((r, i) => {
                    const realIndex = i % RIBBON.length;
                    const duplicate = i >= RIBBON.length;
                    return (
                        <button
                            type="button"
                            key={`${r.src}-${i}`}
                            className="photo-ribbon-item"
                            onClick={() => onViewImage(images, realIndex)}
                            aria-label={`Open photo: ${r.title}`}
                            aria-hidden={duplicate}
                            tabIndex={duplicate ? -1 : 0}
                        >
                            <img src={`/assets/${r.src}`} alt="" loading="lazy" decoding="async" />
                            <span className="photo-ribbon-caption">{r.title}</span>
                        </button>
                    );
                })}
            </div>
        </Reveal>
    );
}
