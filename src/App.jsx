import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { SiteProvider } from './context/SiteContext';
import { initSmoothScroll } from './lib/smoothScroll';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import PhotoRibbon from './components/PhotoRibbon';
import Booking from './components/Booking';
import Amenities from './components/Amenities';
import Rooms from './components/Rooms';
import Gallery from './components/Gallery';
import Lightbox from './components/Lightbox';
import VideoReel from './components/VideoReel';
import Location from './components/Location';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import LeadModal from './components/LeadModal';

export default function App() {
    const [loaded, setLoaded] = useState(false);
    const [lightbox, setLightbox] = useState({ images: null, index: 0 });

    useEffect(() => initSmoothScroll(), []);

    const onPreloaderOpen = useCallback(() => setLoaded(true), []);
    const openLightbox = useCallback((images, index) => setLightbox({ images, index }), []);
    const closeLightbox = useCallback(() => setLightbox((l) => ({ ...l, images: null })), []);

    return (
        // reducedMotion="user" turns transform/scroll animations off for visitors who ask for less motion
        <MotionConfig reducedMotion="user">
            <SiteProvider>
                <Preloader onOpen={onPreloaderOpen} />
                <Navbar loaded={loaded} />
                <main>
                    <Hero loaded={loaded} />
                    <About />
                    <PhotoRibbon onViewImage={openLightbox} />
                    <Booking />
                    <Amenities />
                    <Rooms onViewImage={openLightbox} />
                    <Gallery onViewImage={openLightbox} />
                    <VideoReel />
                    <Location />
                    <Testimonials />
                    <Faq />
                </main>
                <Footer />
                <FloatingActions loaded={loaded} />
                <Lightbox images={lightbox.images} startIndex={lightbox.index} onClose={closeLightbox} />
                <LeadModal />
            </SiteProvider>
        </MotionConfig>
    );
}
