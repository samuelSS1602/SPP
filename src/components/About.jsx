import { FEATURES } from '../data/site';
import { Icon } from './Icons';
import { RevealGroup, RevealItem, SectionHeader } from './Motion';

const lift = { y: -6, transition: { type: 'spring', stiffness: 300, damping: 22 } };

export default function About() {
    return (
        <section className="section about-project" id="about">
            <div className="container">
                <SectionHeader eyebrow="THE SANCTUARY OF COMFORT" title="About Sri Padmavati Pleasants" />

                <div className="about-grid">
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
                    </RevealGroup>

                    <div className="about-features-col">
                        <RevealGroup className="features-grid" step={0.09}>
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
                </div>
            </div>
        </section>
    );
}
