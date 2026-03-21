let selectedRoom = '';
let pricePerNight = 0;

const roomsData = {
            deluxe: {
                title: 'Deluxe Room',
                description: 'Spacious and elegantly furnished room with modern amenities, perfect for Family and business travelers. Experience luxury and comfort in our premium deluxe suite.',
                icon: '🛏️',
                price: 2499,
                photos: ['assets/ROOM1.webp', 'assets/ROOM2.webp', 'assets/ROOM3.webp', 'assets/ROOM4.webp', 'assets/ROOM5.webp', 'assets/BATHROOM1.webp', 'assets/BATHROOM2.webp', 'assets/BATHROOM3.webp'],
                amenities: [
                    { icon: '🛏️', text: 'King Bed' },
                    { icon: '📺', text: 'Smart TV' },
                    { icon: '❄️', text: 'Air Conditioning' },
                    { icon: '🚿', text: 'Attached Bathroom' },
                    { icon: '📶', text: 'High-Speed WiFi' },
                    { icon: '🔒', text: '24/7 Security' },
                    { icon: '🧴', text: 'Luxury Toiletries' },
                    { icon: '☕', text: 'Tea & Coffee Maker' }
                ]
            },
            single: {
                title: 'Single Bed Room',
                description: 'Comfortable single bed room designed for two persons with essential amenities and modern furnishings. Perfect for budget-conscious travelers seeking comfort.',
                icon: '🛏️',
                price: 1499,
                photos: ['assets/ROOM4.webp', 'assets/ROOM5.webp', 'assets/ROOM6.webp', 'assets/BATHROOM2.webp'],
        amenities: [
            { icon: '🛏️', text: 'Single Bed' },
            { icon: '📺', text: 'Smart TV' },
            { icon: '❄️', text: 'Air Conditioning' },
            { icon: '🚿', text: 'Attached Bathroom' },
            { icon: '📶', text: 'High-Speed WiFi' },
            { icon: '🔒', text: '24/7 Security' },
            { icon: '🧴', text: 'Toiletries' },
            { icon: '☕', text: 'Tea & Coffee Maker' }
        ]
    }
};

function openRoomDetails(roomType) {
    const room = roomsData[roomType];
    if (!room) return;

    // Update modal content
    document.getElementById('roomDetailsTitle').textContent = room.title;
    document.getElementById('roomDetailsDescription').textContent = room.description;
    document.getElementById('roomDetailsIcon').textContent = room.icon;
    document.getElementById('roomDetailsPriceValue').textContent = `₹${room.price.toLocaleString('en-IN')}`;

    // Add photos
    const photosContainer = document.getElementById('roomPhotosGallery');
    photosContainer.innerHTML = room.photos.map(photo => 
                `<div class="room-photo-item"><img src="${photo}" alt="Room photo" width="100%" height="250" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;"></div>`
    ).join('');
    
    const amenitiesContainer = document.getElementById('roomAmenitiesContainer');
    amenitiesContainer.innerHTML = room.amenities.map(amenity => 
        `<div class="amenity-item">
            <div class="amenity-icon">${amenity.icon}</div>
            <div class="amenity-text">${amenity.text}</div>
        </div>`
    ).join('');

    // Store current room and show modal
    selectedRoom = room.title;
    pricePerNight = room.price;
    document.getElementById('roomDetailsModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeRoomDetails() {
    document.getElementById('roomDetailsModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openBookingFromDetails() {
    closeRoomDetails();
    openBooking(selectedRoom, pricePerNight);
}

function openBooking(room, price) {
    // Handle event if passed as first parameter
    if (room && room.stopPropagation) {
        room.stopPropagation();
        room = arguments[1];
        price = arguments[2];
    }

    selectedRoom = room;
    pricePerNight = price;
    document.getElementById('roomType').value = room;
    
    // Show enquiry form
    document.querySelectorAll('.booking-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById('enquiryForm').classList.add('active');
    
    document.getElementById('bookingModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkin').setAttribute('min', today);
    document.getElementById('checkout').setAttribute('min', today);
    
    calculateTotal();
}

function closeBooking() {
    document.getElementById('bookingModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function calculateTotal() {
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    
    if (checkin && checkout) {
        const start = new Date(checkin);
        const end = new Date(checkout);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        
        if (nights > 0) {
            const total = nights * pricePerNight;
            document.getElementById('totalPrice').textContent = `₹${total.toLocaleString('en-IN')}`;
            document.getElementById('nightsDisplay').textContent = `${nights} ${nights === 1 ? 'night' : 'nights'}`;
        } else {
            document.getElementById('totalPrice').textContent = '₹0';
            document.getElementById('nightsDisplay').textContent = 'Invalid dates';
        }
    } else {
        document.getElementById('totalPrice').textContent = '₹0';
        document.getElementById('nightsDisplay').textContent = 'Select dates to see total';
    }
}

document.getElementById('checkin').addEventListener('change', calculateTotal);
document.getElementById('checkout').addEventListener('change', calculateTotal);

function handleEnquiry(e) {
    e.preventDefault();
    
    const guestName = document.getElementById('guestName').value;
    const guestEmail = document.getElementById('guestEmail').value;
    const guestPhone = document.getElementById('guestPhone').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guestCount = document.getElementById('guestCount').value;
    const roomType = document.getElementById('roomType').value;

    if (!guestName || !guestEmail || !guestPhone || !checkin || !checkout || !guestCount) {
        alert('Please fill in all required fields');
        return;
    }

    // Store enquiry data
    const enquiryData = {
        room: roomType,
        name: guestName,
        email: guestEmail,
        phone: guestPhone,
        checkin: checkin,
        checkout: checkout,
        guests: guestCount,
        message: document.getElementById('specialRequests').value,
        amount: pricePerNight * calculateNights(checkin, checkout)
    };

    // Store globally for WhatsApp sending
    window.currentEnquiry = enquiryData;

    // Update confirmation details
    document.getElementById('confirmationRoom').innerHTML = `<strong>Room:</strong> ${enquiryData.room}`;
    document.getElementById('confirmationGuest').innerHTML = `<strong>Guest Name:</strong> ${enquiryData.name}`;
    document.getElementById('confirmationDates').innerHTML = `<strong>Dates:</strong> ${formatDate(enquiryData.checkin)} - ${formatDate(enquiryData.checkout)}`;
    document.getElementById('confirmationGuests').innerHTML = `<strong>Number of Guests:</strong> ${enquiryData.guests}`;
    document.getElementById('confirmationEmail').textContent = enquiryData.email;
    document.getElementById('confirmationPhone').textContent = enquiryData.phone;

    // Log enquiry data (in real app, this would be sent to server)
    console.log('Enquiry Data:', enquiryData);

    // Show confirmation step
    document.getElementById('enquiryForm').classList.remove('active');
    document.getElementById('enquiryConfirmationStep').classList.add('active');
}

function sendToWhatsApp() {
    if (!window.currentEnquiry) {
        alert('Enquiry data not found');
        return;
    }

    const data = window.currentEnquiry;
    const nights = calculateNights(data.checkin, data.checkout);
    
    // Format message
    const message = `*Sri Padmavati Pleasants - Room Enquiry*%0A%0A` +
        `*Guest Name:* ${data.name}%0A` +
        `*Email:* ${data.email}%0A` +
        `*Phone:* ${data.phone}%0A` +
        `*Room Type:* ${data.room}%0A` +
        `*Check-in:* ${formatDate(data.checkin)}%0A` +
        `*Check-out:* ${formatDate(data.checkout)}%0A` +
        `*Number of Guests:* ${data.guests}%0A` +
        `*Total Nights:* ${nights}%0A` +
        `*Estimated Cost:* ₹${data.amount.toLocaleString('en-IN')}%0A` +
        (data.message ? `%0A*Special Message:%0A${data.message}` : '');

    // WhatsApp API link
    const whatsappNumber = '916369216621'; // +91 India country code + number
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Open WhatsApp
    window.open(whatsappLink, '_blank');
}

function calculateNights(checkin, checkout) {
    if (!checkin || !checkout) return 0;
    const start = new Date(checkin);
    const end = new Date(checkout);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

window.onclick = function(event) {
    const bookingModal = document.getElementById('bookingModal');
    const roomDetailsModal = document.getElementById('roomDetailsModal');
    if (event.target === bookingModal) {
        closeBooking();
    }
    if (event.target === roomDetailsModal) {
        closeRoomDetails();
    }
}
