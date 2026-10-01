// All site content lives here — edit text, prices and photos without touching components.

export const CONTACT = {
    phone: '+916369216621',
    phoneDisplay: '+91 63692 16621',
    phoneShort: '63692-16621',
    whatsapp: '916369216621',
    email: 'info@sripadmavatipleasants.com',
    addressLines: ['Sri Padmavati Pleasants,', '92/1A2, Idumban Kovil Road,', 'Palani - 624601, Tamil Nadu'],
    mapsUrl: 'https://maps.app.goo.gl/jpgcTg5xoX3SN8fy5',
    reviewsUrl:
        'https://www.google.com/maps/place/SRI+PADMAVATI+PLEASANTS/@10.445942,77.5254635,17z/data=!4m8!3m7!1s0x3ba9df8026a9a8b9:0xae5cccf5a7b5df01!8m2!3d10.445942!4d77.5254635!9m1!1b1',
    mapEmbed:
        'https://maps.google.com/maps?q=Sri%20Padmavati%20Pleasants,%20Idumban%20Kovil%20Road,%20Palani&t=&z=15&ie=UTF8&iwloc=&output=embed',
};

export const waLink = (text) => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

export const NAV_LINKS = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About Lodge' },
    { href: '#amenities', label: 'Amenities' },
    { href: '#rooms', label: 'Our Rooms' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#location', label: 'Location' },
    { href: '#testimonials', label: 'Reviews' },
    { href: '#faq', label: 'FAQ' },
];

export const HERO_STATS = [
    { value: 9, suffix: '+', label: 'Premium Rooms', count: true },
    { value: 700, suffix: '+', label: 'Happy Guests', count: true },
    { value: '100%', label: 'Safe & Secured' },
    { value: '24/7', label: 'Support Desk' },
];

export const FEATURES = [
    { icon: 'pin', title: 'Near Palani Temple', text: 'Located on Idumban Kovil Road, offering immediate proximity to major pilgrimage spots and the hill path.' },
    { icon: 'shield', title: 'Sparkling Clean Rooms', text: 'Rigorous hygiene guidelines, fresh premium linens, sanitized floors, and spotless bathrooms.' },
    { icon: 'car', title: 'Safe Private Parking', text: 'Spacious, secure private parking space on-site, perfectly suited for family cars and tourist buses.' },
    { icon: 'bolt', title: '24/7 Hot Water & Power', text: 'Equipped with geysers in all bathrooms and round-the-clock power backup generators.' },
    { icon: 'users', title: 'Family Pilgrim Friendly', text: 'Peaceful, safe, and homely atmosphere designed to accommodate pilgrimage families and tour groups.' },
    { icon: 'phone', title: '24/7 Desk Assistance', text: 'Responsive reception team to assist with room service, local guidance, and taxi arrangements.' },
];

export const AMENITIES = [
    { icon: 'snow', title: 'Split A/C Cooling', text: 'High-end split air conditioning systems in Deluxe A/C rooms to escape the outside heat.' },
    { icon: 'tv', title: 'LED Smart TVs', text: 'Wall-mounted Smart TVs in all rooms featuring international satellite entertainment and news channels.' },
    { icon: 'wifi', title: 'Free High-Speed WiFi', text: 'Abundant high-speed wireless internet connection spanning across all rooms and common areas.' },
    { icon: 'drop', title: 'Hot Water Geysers', text: 'Dedicated geysers fitted in every room bathroom, assuring hot water anytime of the day.' },
    { icon: 'lock', title: '24/7 Security CCTV', text: 'Secured perimeter monitored constantly with CCTV surveillance cameras and active wardens.' },
    { icon: 'user', title: 'Room Service', text: 'Prompt standard room service ensuring towels, fresh water, and linens are just a bell-call away.' },
    { icon: 'car', title: 'Safe Private Parking', text: 'Free spacious parking area protected by boundary walls, safe for family SUVs and pilgrim buses.' },
    { icon: 'bolt', title: 'Power Generator Backup', text: '100% automatic power backup generators, ensuring lights, fans, and geysers function during outages.' },
];

export const ROOMS = [
    {
        id: 'Deluxe Room A/C',
        name: 'Deluxe Room A/C',
        badge: 'Most Popular',
        price: '₹3,000',
        image: '/assets/ROOM2.webp',
        occupancy: '2 Adults + 1 Kid',
        desc: 'Spacious and elegantly furnished room with modern split air conditioning, King bed, attached bathroom with geyser, and LED Smart TV.',
        features: ['Split A/C', 'King Bed', 'Smart TV', 'Hot Water', 'Free WiFi'],
    },
    {
        id: 'Deluxe Room Non A/C',
        name: 'Deluxe Room Non A/C',
        badge: 'Best Value',
        price: '₹2,000',
        image: '/assets/ROOM6.webp',
        occupancy: '2 Adults + 1 Kid',
        desc: 'Comfortable and highly sanitised room featuring standard ceiling fan ventilation, King bed, attached bathroom with hot geyser, and LED Smart TV.',
        features: ['Ceiling Fan', 'King Bed', 'Smart TV', 'Hot Water', 'Free WiFi'],
    },
];

export const ROOM_OPTIONS = [
    { value: 'Deluxe Room A/C', label: 'Deluxe Room A/C (₹3,000 / Night)' },
    { value: 'Deluxe Room Non A/C', label: 'Deluxe Room Non A/C (₹2,000 / Night)' },
    { value: 'General Enquiry', label: 'General Lodging Enquiry' },
];

export const GUEST_OPTIONS = ['1 Adult', '2 Adults', '3 Adults', 'Family Group (4+)'];

export const GALLERY_FILTERS = [
    { key: 'all', label: 'All Photos' },
    { key: 'rooms', label: 'Rooms' },
    { key: 'bathrooms', label: 'Bathrooms' },
    { key: 'corridors', label: 'Corridors & Stairs' },
    { key: 'parking', label: 'Parking' },
    { key: 'exterior', label: 'Exterior' },
];

export const GALLERY = [
    { src: 'ROOM2.webp', cat: 'rooms', title: 'Deluxe King Room', alt: 'Deluxe room with king bed, gold accent bedding and dressing mirror', featured: true },
    { src: 'ROOM3.webp', cat: 'rooms', title: 'Room Interior', alt: 'Deluxe room interior with cove lighting, mirror and wardrobe' },
    { src: 'ROOM6.webp', cat: 'rooms', title: 'Swan Towel Welcome', alt: 'King bed dressed with swan towel art' },
    { src: 'ROOM8.webp', cat: 'rooms', title: 'LED Smart TV', alt: 'Wall-mounted LED smart TV beside wardrobe' },
    { src: 'ROOM4.webp', cat: 'rooms', title: 'Tea & Coffee Tray', alt: 'Kettle, branded drinking water and tea and coffee sachets' },
    { src: 'ROOM10.webp', cat: 'rooms', title: 'Spacious Wardrobe', alt: 'Open wardrobe with hangers, shelves and drawers' },
    { src: 'ROOM9.webp', cat: 'rooms', title: 'Ambient Lighting', alt: 'Room corner with cove ceiling lighting and wardrobe' },
    { src: 'BATHROOM1.webp', cat: 'bathrooms', title: 'Marble-Finish Bathroom', alt: 'Bathroom with grey marble tiles, wash basin and wall-hung toilet', featured: true },
    { src: 'BATHROOM3.webp', cat: 'bathrooms', title: 'Rain Shower', alt: 'Shower area with rain shower head and hot water geyser' },
    { src: 'BATHROOM0.webp', cat: 'bathrooms', title: 'Vanity & Mirror', alt: 'Wash basin with etched mirror' },
    { src: 'BATHROOM2.webp', cat: 'bathrooms', title: 'Sanitised Fittings', alt: 'Wall-hung toilet with sanitised seal' },
    { src: 'CORRIDOR0.webp', cat: 'corridors', title: 'Marble Corridor', alt: 'Long marble corridor with warm cove lighting' },
    { src: 'CORRIDOR2.webp', cat: 'corridors', title: 'Room Entrances', alt: 'Corridor with room doors and marble walls' },
    { src: 'CORRIDOR1.webp', cat: 'corridors', title: 'Room 105', alt: 'Room 105 entrance with lotus nameplate' },
    { src: 'CORRIDOR3.webp', cat: 'corridors', title: 'Grand Staircase', alt: 'Marble staircase with steel railings' },
    { src: 'CORRIDOR4.webp', cat: 'corridors', title: 'Staircase Landing', alt: 'Staircase landing with curtained window' },
    { src: 'PARKING.png', cat: 'parking', title: 'Covered Private Parking', alt: 'Covered private parking area with cars parked', featured: true },
    { src: 'FRONTAGE.png', cat: 'exterior', title: 'Lodge Frontage', alt: 'Sri Padmavati Pleasants building exterior' },
    { src: 'BOARD.png', cat: 'exterior', title: 'Lodge Signboard', alt: 'Sri Padmavati Pleasants signboard listing A/C rooms, hot water, WiFi and parking' },
];

export const CATEGORY_LABELS = {
    rooms: 'Rooms',
    bathrooms: 'Bathrooms',
    corridors: 'Corridors & Stairs',
    parking: 'Parking',
    exterior: 'Exterior',
};

// The 147 MB reel lives in /media (outside public/, so it isn't copied into every build).
// Production streams it from GitHub's LFS media CDN because the host doesn't serve LFS
// files; the Vite dev server can serve the local copy directly.
export const REEL_URL = import.meta.env.DEV
    ? '/media/REEL.mp4'
    : 'https://media.githubusercontent.com/media/samuelSS1602/SPP/main/media/REEL.mp4';

export const LANDMARKS = [
    { icon: '🛕', title: 'Palani Murugan Hill Temple (Adivaram)', text: 'Foothills access, ropecar and winch station', time: '5 Min' },
    { icon: '⛰️', title: 'Idumban Hill Temple', text: 'Scenic hilltop temple located right nearby', time: '2 Min' },
    { icon: '🚄', title: 'Palani Railway Station', text: 'Connecting trains to Madurai, Coimbatore, and Chennai', time: '7 Min' },
    { icon: '🚌', title: 'Palani Central Bus Stand', text: 'Main transport terminal with continuous shuttle buses', time: '8 Min' },
    { icon: '🛣️', title: 'Dindigul-Palani Highway', text: 'Smooth state highway access for fast weekend drives', time: '3 Min' },
];

export const TESTIMONIALS = [
    { initials: 'SM', name: 'S Moovendhan', role: 'Verified Google Local Guide', text: 'Really amazing hospitality, friendly staff and clean rooms. Would highly recommend for families visiting Palani. The location is very peaceful and safe.' },
    { initials: 'SK', name: 'shyam kumar', role: 'Verified Pilgrim Traveler', text: 'Had a wonderful stay at this hotel! The hospitality was exceptional — staff was extremely polite and helpful. Rooms were neat, clean, and well-maintained.' },
    { initials: 'VK', name: 'VINOTH KANNAN', role: 'Family Traveler', text: 'Rooms are very neat and clean.... Excellent service..... 👌👌👌 Highly satisfied with the bathroom sanitization and hot water facility.' },
    { initials: 'KK', name: 'Kavin K V', role: 'Verified Google Reviewer', text: 'Good for family and good service and safety. The parking facilities are nice and very spacious. Will definitely stay here again on our next temple visit.' },
];

export const FAQS = [
    { q: 'What are the check-in and check-out timings?', a: 'Check-in starts at 11 am and Check-out is at 10 am. You can coordinate with our front desk during booking if you need early check-in or late check-out arrangements based on availability.' },
    { q: 'How close is the lodge to the main Palani temple?', a: 'Sri Padmavati Pleasants is situated on Idumban Kovil Road. The main hill temple winch/ropecar station (Adivaram) is just 5 minutes drive from our lodge, making it highly convenient for early morning or late evening darsan visits.' },
    { q: 'Do you have on-site car and bus parking facilities?', a: 'Yes, we have a safe and spacious private parking compound on-site. It is fully gated, monitored, and free of charge for all our lodging guests. There is plenty of space for multiple family SUVs as well as pilgrim vans and tour buses.' },
    { q: 'Are extra beds/mattresses available for larger families?', a: 'Yes, we can arrange extra clean mattresses and beddings upon request for larger families sharing a room. A nominal fee will apply. Please specify this requirement during your booking inquiry or inform the front desk.' },
    { q: 'What is the easiest way to book a room?', a: 'You can instantly check availability and book a room by completing our Booking Consultation form on this website, calling our front desk directly at 63692-16621, or tapping the floating WhatsApp chat widget to converse directly with our booking agent.' },
    { q: 'Does the lodge have a lift or elevator?', a: 'No, our lodge currently does not have a lift/elevator facility. All floors are accessible through well-maintained, well-lit staircases. However, our staff is always available to assist guests with their luggage. We recommend guests who may have difficulty with stairs to request a ground-floor room when booking.' },
];
