import { CONTACT, LANDMARKS } from '../data/site';
import { Icon } from './Icons';
import { Reveal, RevealGroup, RevealItem, SectionHeader } from './Motion';

const nudge = { x: 8, transition: { type: 'spring', stiffness: 300, damping: 22 } };

export default function Location() {
    return (
        <section className="section location-advantage" id="location">
            <div className="container">
                <SectionHeader eyebrow="TEMPLE PROXIMITY" title="Location & Proximity" />

                <div className="location-grid">
                    <Reveal className="map-container">
                        <iframe
                            title="Sri Padmavati Pleasants on Google Maps"
                            src={CONTACT.mapEmbed}
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="map-iframe"
                        />
                        <div className="map-actions-row">
                            <a href={CONTACT.mapsUrl} target="_blank" rel="noopener" className="btn btn-outline-gold w-100 mt-3">
                                <Icon name="mapPin" size={16} strokeWidth={2} className="mr-2" /> Open in Google Maps
                            </a>
                        </div>
                    </Reveal>

                    <div className="landmarks-container">
                        <Reveal as="h3" className="location-heading">Strategically Placed For Pilgrims</Reveal>
                        <Reveal as="p" className="location-desc" delay={0.1}>
                            Located right on Idumban Kovil Road, Sri Padmavati Pleasants provides quick access to the foothills
                            of the main hill temple (Adivaram) and surrounding spiritual shrines.
                        </Reveal>

                        <RevealGroup className="landmark-cards-stack" step={0.1}>
                            {LANDMARKS.map((l) => (
                                <RevealItem className="landmark-card" key={l.title} whileHover={nudge}>
                                    <div className="landmark-icon">{l.icon}</div>
                                    <div className="landmark-info">
                                        <h4>{l.title}</h4>
                                        <p>{l.text}</p>
                                    </div>
                                    <div className="landmark-distance">{l.time}</div>
                                </RevealItem>
                            ))}
                        </RevealGroup>
                    </div>
                </div>
            </div>
        </section>
    );
}
