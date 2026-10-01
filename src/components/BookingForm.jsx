import { useState } from 'react';
import { GUEST_OPTIONS, ROOM_OPTIONS, waLink } from '../data/site';
import { useSite } from '../context/SiteContext';

// Local YYYY-MM-DD (toISOString would shift the date across the UTC boundary)
const toDateValue = (d) => {
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const nextDay = (value) => {
    const d = new Date(`${value}T00:00:00`);
    d.setDate(d.getDate() + 1);
    return toDateValue(d);
};

const EMPTY = { name: '', phone: '', checkin: '', checkout: '', guests: GUEST_OPTIONS[0], message: '' };

export default function BookingForm({ idPrefix, onDone }) {
    const { selectedRoom, setSelectedRoom, showToast } = useSite();
    const [values, setValues] = useState(EMPTY);
    const today = toDateValue(new Date());

    const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

    const onCheckIn = (e) => {
        const checkin = e.target.value;
        setValues((v) => ({
            ...v,
            checkin,
            // Keep check-out after check-in
            checkout: v.checkout && checkin && v.checkout <= checkin ? nextDay(checkin) : v.checkout,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const name = values.name.trim();
        const phone = values.phone.trim();
        const message = values.message.trim();

        if (!name || !phone || !values.checkin || !values.checkout) {
            showToast('Please fill out all required fields.', 'error');
            return;
        }
        if (!/^[+\d][\d\s-]{6,}$/.test(phone)) {
            showToast('Please enter a valid phone number.', 'error');
            return;
        }
        // YYYY-MM-DD strings compare correctly as text
        if (values.checkout <= values.checkin) {
            showToast('Check-out date must be after the check-in date.', 'error');
            return;
        }

        let text = `*New Lodge Booking Query - Sri Padmavati Pleasants*\n\n`;
        text += `*Guest Name:* ${name}\n`;
        text += `*Contact Phone:* ${phone}\n`;
        text += `*Room Category:* ${selectedRoom}\n`;
        text += `*Check-in Date:* ${values.checkin}\n`;
        text += `*Check-out Date:* ${values.checkout}\n`;
        text += `*Total Guests:* ${values.guests}\n`;
        if (message) text += `*Special Requests:* ${message}\n`;

        // Open synchronously inside the submit gesture so popup blockers allow it
        const url = waLink(text);
        const win = window.open(url, '_blank');
        if (!win) window.location.href = url;

        showToast(`Thank you, ${name}! Opening WhatsApp to confirm your room.`);
        setValues(EMPTY);
        onDone?.();
    };

    const id = (field) => `${idPrefix}${field}`;

    return (
        <form className="project-inquiry-form" onSubmit={onSubmit} noValidate>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor={id('Name')}>Full Name *</label>
                    <input type="text" id={id('Name')} required placeholder="Eg: Rajan" value={values.name} onChange={set('name')} autoComplete="name" />
                </div>
                <div className="form-group">
                    <label htmlFor={id('Phone')}>Phone Number *</label>
                    <input type="tel" id={id('Phone')} required placeholder="Eg: 98765 43210" value={values.phone} onChange={set('phone')} autoComplete="tel" />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor={id('CheckIn')}>Check-In Date *</label>
                    <input type="date" id={id('CheckIn')} required min={today} value={values.checkin} onChange={onCheckIn} />
                </div>
                <div className="form-group">
                    <label htmlFor={id('CheckOut')}>Check-Out Date *</label>
                    <input
                        type="date"
                        id={id('CheckOut')}
                        required
                        min={values.checkin ? nextDay(values.checkin) : today}
                        value={values.checkout}
                        onChange={set('checkout')}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor={id('Interest')}>Room Category</label>
                    <select id={id('Interest')} value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
                        {ROOM_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor={id('Guests')}>Total Guests</label>
                    <select id={id('Guests')} value={values.guests} onChange={set('guests')}>
                        {GUEST_OPTIONS.map((g) => (
                            <option key={g} value={g}>{g === 'Family Group (4+)' ? 'Family Group (4+ Guests)' : g}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor={id('Message')}>Special Requests / Requirements</label>
                <textarea
                    id={id('Message')}
                    rows={3}
                    placeholder="Let us know if you need extra mattresses, early check-in assistance, or travel directions..."
                    value={values.message}
                    onChange={set('message')}
                />
            </div>

            <button type="submit" className="btn btn-primary w-100 text-center justify-center">
                Submit Booking Query
            </button>
        </form>
    );
}
