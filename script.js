/**
 * Sri Padmavati Pleasants - Luxury Lodge Booking Interactive Logic
 * Vanilla JavaScript implementation for high performance and premium UX.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. PRELOADER
    // ==========================================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            // Smooth fade out
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 800); // 800ms elegant display duration
        });
        
        // Backup safety check: if load event already fired or fails to trigger
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 3000);
    }

    // ==========================================
    // 2. MOBILE MENU NAVIGATION
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 3. STICKY NAVBAR & ACTIVE NAVIGATION LINK TRACKING
    // ==========================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    const handleScrollEffects = () => {
        const scrollPos = window.scrollY;

        // Sticky nav transition
        if (navbar) {
            if (scrollPos > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }

        // Active link tracking
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', handleScrollEffects);
    // Trigger once on load to establish correct states
    handleScrollEffects();

    // ==========================================
    // 4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active-reveal');
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active-reveal'));
    }

    // ==========================================
    // 5. ANIMATED STATS COUNTER
    // ==========================================
    const countElements = document.querySelectorAll('.count');
    
    const startCounting = (el) => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 2000; // 2 seconds
        const stepTime = Math.max(Math.floor(duration / target), 15);
        let current = 0;
        
        const timer = setInterval(() => {
            current += Math.ceil(target / (duration / stepTime));
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = current;
            }
        }, stepTime);
    };

    if ('IntersectionObserver' in window && countElements.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounting(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        countElements.forEach(el => counterObserver.observe(el));
    } else {
        // Fallback
        countElements.forEach(el => {
            el.textContent = el.getAttribute('data-target');
        });
    }

    // ==========================================
    // 6. GALLERY MASONRY FILTER TABS
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Set active class
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                // Hide with transition
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // ==========================================
    // 7. LIGHTBOX GALLERY
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentGalleryImages = [];
    let currentImageIndex = 0;

    // Collect visible gallery images for navigation
    const updateActiveGallerySet = () => {
        currentGalleryImages = [];
        galleryItems.forEach(item => {
            if (item.style.display !== 'none') {
                const img = item.querySelector('img');
                const title = item.querySelector('h4');
                if (img) {
                    currentGalleryImages.push({
                        src: img.getAttribute('src'),
                        alt: img.getAttribute('alt'),
                        title: title ? title.textContent : ''
                    });
                }
            }
        });
    };

    const showLightboxImage = (index) => {
        if (index < 0 || index >= currentGalleryImages.length) return;
        
        currentImageIndex = index;
        const imgData = currentGalleryImages[currentImageIndex];
        
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.setAttribute('src', imgData.src);
            lightboxImg.setAttribute('alt', imgData.alt);
            lightboxCaption.textContent = imgData.title || imgData.alt;
            lightboxImg.style.opacity = '1';
        }, 150);
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            updateActiveGallerySet();
            const clickedSrc = item.querySelector('img').getAttribute('src');
            
            // Find index of clicked image
            currentImageIndex = currentGalleryImages.findIndex(img => img.src === clickedSrc);
            
            if (lightbox && currentImageIndex !== -1) {
                showLightboxImage(currentImageIndex);
                lightbox.style.display = 'flex';
                lightbox.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden'; // Stop scroll
            }
        });
    });

    // Room Image Zoom Click integration (re-uses plan-image-wrapper class from style system)
    const planImages = document.querySelectorAll('.plan-image-wrapper');
    planImages.forEach(plan => {
        plan.addEventListener('click', () => {
            const img = plan.querySelector('img');
            const title = plan.closest('.plan-card').querySelector('h3').textContent;
            
            currentGalleryImages = [{
                src: img.getAttribute('src'),
                alt: img.getAttribute('alt'),
                title: title
            }];
            currentImageIndex = 0;

            if (lightbox) {
                showLightboxImage(0);
                lightbox.style.display = 'flex';
                lightbox.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeLightbox = () => {
        if (lightbox) {
            lightbox.style.display = 'none';
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Restore scroll
        }
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    
    // Lightbox navigation click
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            let newIndex = currentImageIndex - 1;
            if (newIndex < 0) newIndex = currentGalleryImages.length - 1;
            showLightboxImage(newIndex);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            let newIndex = currentImageIndex + 1;
            if (newIndex >= currentGalleryImages.length) newIndex = 0;
            showLightboxImage(newIndex);
        });
    }

    // Close lightbox on click outside the image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Keyboard navigation support for lightbox
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') lightboxPrev.click();
            if (e.key === 'ArrowRight') lightboxNext.click();
        }
    });

    // ==========================================
    // 8. TESTIMONIALS CAROUSEL
    // ==========================================
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');
    let currentSlide = 0;
    let autoPlayInterval;

    if (testimonialSlides.length > 0) {
        // Build navigation dots dynamically
        testimonialSlides.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (idx === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to testimonial slide ${idx + 1}`);
            dot.addEventListener('click', () => goToSlide(idx));
            if (dotsContainer) dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.carousel-dot');

        const updateCarouselState = () => {
            testimonialSlides.forEach((slide, idx) => {
                slide.classList.remove('active');
                if (dots[idx]) dots[idx].classList.remove('active');
            });
            testimonialSlides[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        };

        const goToSlide = (idx) => {
            currentSlide = idx;
            updateCarouselState();
            resetAutoPlay();
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            updateCarouselState();
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            updateCarouselState();
        };

        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

        // Auto play loop
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(nextSlide, 7000); // Shift every 7 seconds
        };

        const resetAutoPlay = () => {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        };

        startAutoPlay();
    }

    // ==========================================
    // 9. FAQ ACCORDION
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            // Collapse all other items
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
            });

            // Toggle selected item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================
    // 10. ROOM SELECT UNIT BUTTON INTERACTION
    // ==========================================
    const selectUnitBtns = document.querySelectorAll('.select-unit-btn');
    const selectDropdown = document.getElementById('formInterest');

    selectUnitBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const unitName = btn.getAttribute('data-unit');
            if (selectDropdown) {
                // Find matching option
                for (let i = 0; i < selectDropdown.options.length; i++) {
                    if (selectDropdown.options[i].value === unitName) {
                        selectDropdown.selectedIndex = i;
                        break;
                    }
                }
            }
        });
    });

    // ==========================================
    // 11. LEAD MODAL POPUP LOGIC
    // ==========================================
    const leadModal = document.getElementById('leadModal');
    const modalCloseBtn = document.querySelector('.lead-modal-close');
    const triggerPopupVisitBtns = document.querySelectorAll('.trigger-popup-visit');

    const showModal = () => {
        if (leadModal) {
            leadModal.classList.add('show-modal');
            leadModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = () => {
        if (leadModal) {
            leadModal.classList.remove('show-modal');
            leadModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    
    // Trigger popup on clicking site visit buttons
    triggerPopupVisitBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal();
        });
    });

    // Close modal on click backdrop
    if (leadModal) {
        leadModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('lead-modal-backdrop')) {
                closeModal();
            }
        });
    }

    // Auto trigger popup after 10 seconds if not already shown/dismissed in this session
    const shownSessionKey = 'spp_lead_modal_shown';
    if (!localStorage.getItem(shownSessionKey)) {
        setTimeout(() => {
            // Double check that modal isn't already open
            if (leadModal && !leadModal.classList.contains('show-modal')) {
                showModal();
                localStorage.setItem(shownSessionKey, 'true');
            }
        }, 10000); // 10 seconds
    }

    // ==========================================
    // 12. SCROLL TO TOP WIDGET
    // ==========================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('show-btn');
            } else {
                scrollTopBtn.classList.remove('show-btn');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 13. FORM INQUIRY SUBMISSIONS (WhatsApp Message Redirection)
    // ==========================================
    
    // Main Booking Form
    const contactForm = document.getElementById('projectInquiryForm');
    const waNumber = '916369216621'; // Lodge reception number

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('formName').value.trim();
            const phone = document.getElementById('formPhone').value.trim();
            const checkin = document.getElementById('formCheckIn').value;
            const checkout = document.getElementById('formCheckOut').value;
            const roomType = document.getElementById('formInterest').value;
            const guests = document.getElementById('formGuests').value;
            const message = document.getElementById('formMessage').value.trim();

            if (!name || !phone || !checkin || !checkout) {
                alert('Please fill out all required fields.');
                return;
            }

            // Simple date range check
            const checkInDate = new Date(checkin);
            const checkOutDate = new Date(checkout);
            
            if (checkOutDate <= checkInDate) {
                alert('Check-out date must be after the check-in date.');
                return;
            }

            // Construct text message for WhatsApp API
            let text = `*New Lodge Booking Query - Sri Padmavati Pleasants*\n\n`;
            text += `*Guest Name:* ${name}\n`;
            text += `*Contact Phone:* ${phone}\n`;
            text += `*Room Category:* ${roomType}\n`;
            text += `*Check-in Date:* ${checkin}\n`;
            text += `*Check-out Date:* ${checkout}\n`;
            text += `*Total Guests:* ${guests}\n`;
            if (message) text += `*Special Requests:* ${message}\n`;

            const encodedText = encodeURIComponent(text);
            const waUrl = `https://wa.me/${waNumber}?text=${encodedText}`;

            // Provide visual completion alert before redirecting
            alert(`Thank you, ${name}! We will redirect you to WhatsApp to confirm room availability instantly with our reception desk.`);
            window.open(waUrl, '_blank');
            contactForm.reset();
        });
    }

    // Callback Popup Form
    const callbackForm = document.getElementById('modalCallbackForm');
    if (callbackForm) {
        callbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('modalName').value.trim();
            const phone = document.getElementById('modalPhone').value.trim();
            const unit = document.getElementById('modalUnit').value;

            if (!name || !phone) {
                alert('Please enter your Name and Phone number.');
                return;
            }

            let text = `*Room Availability Query - Sri Padmavati Pleasants*\n\n`;
            text += `*Name:* ${name}\n`;
            text += `*Phone:* ${phone}\n`;
            text += `*Room Type:* ${unit}\n`;
            text += `*Request:* Please call me back to confirm room bookings.`;

            const encodedText = encodeURIComponent(text);
            const waUrl = `https://wa.me/${waNumber}?text=${encodedText}`;

            alert(`Thank you, ${name}! Your inquiry is registered. Tapping OK will open WhatsApp to instant chat with our reception team.`);
            closeModal();
            window.open(waUrl, '_blank');
            callbackForm.reset();
        });
    }
});
