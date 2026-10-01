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
        let preloaderDone = false;

        // Fade the name out, then part the two curtain panels to reveal the page
        const hidePreloader = () => {
            if (preloaderDone) return;
            preloaderDone = true;
            preloader.classList.add('is-done');
            document.body.classList.add('is-loaded'); // starts the hero entrance
            setTimeout(() => { preloader.style.display = 'none'; }, 1400);
        };

        // Keep it up long enough for the gold line to finish drawing, even on fast loads
        const minShowMs = 1400;
        const shownAt = performance.now();
        const hideAfterMinimum = () => {
            setTimeout(hidePreloader, Math.max(0, minShowMs - (performance.now() - shownAt)));
        };

        if (document.readyState === 'complete') {
            hideAfterMinimum();
        } else {
            window.addEventListener('load', hideAfterMinimum);
        }

        // Backup safety check in case the load event is slow (large images, video)
        setTimeout(hidePreloader, 3000);
    }

    // ==========================================
    // 2. MOBILE MENU NAVIGATION
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        const setMenuOpen = (open) => {
            hamburger.classList.toggle('active', open);
            navMenu.classList.toggle('active', open);
            hamburger.setAttribute('aria-expanded', String(open));
            document.body.classList.toggle('menu-open', open);
        };

        hamburger.addEventListener('click', () => {
            setMenuOpen(!navMenu.classList.contains('active'));
        });

        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setMenuOpen(!navMenu.classList.contains('active'));
            }
        });

        // Close mobile menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => setMenuOpen(false));
        });
    }

    // ==========================================
    // 3. STICKY NAVBAR & ACTIVE NAVIGATION LINK TRACKING
    // ==========================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    const handleScrollEffects = () => {
        const scrollPos = window.scrollY;

        // Gold reading-progress line under the navbar
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        document.documentElement.style.setProperty('--scroll-progress', maxScroll > 0 ? (scrollPos / maxScroll).toFixed(4) : 0);

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

    window.addEventListener('scroll', handleScrollEffects, { passive: true });
    // Trigger once on load to establish correct states
    handleScrollEffects();

    // ==========================================
    // 4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    // Stagger siblings in grids (cards, gallery tiles) so they cascade in
    revealElements.forEach(el => {
        const siblings = el.parentElement
            ? Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal-on-scroll'))
            : [];
        if (siblings.length > 1) {
            const idx = siblings.indexOf(el);
            el.style.transitionDelay = `${Math.min(idx % 4, 3) * 110}ms`;
        }
    });

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    target.classList.add('active-reveal');
                    // Drop the stagger delay afterwards so hover/filter transitions stay snappy
                    setTimeout(() => { target.style.transitionDelay = ''; }, 1500);
                    // Stop observing once animated
                    observer.unobserve(target);
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

                // Cancel any pending show/hide from a previous click so rapid
                // filter switching can't leave items stuck hidden
                clearTimeout(item._filterTimer);

                // Hide with transition
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    item._filterTimer = setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    item._filterTimer = setTimeout(() => {
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
            if (item.style.display !== 'none' && item.style.opacity !== '0') {
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
            
            // Map to main booking form dropdown
            if (selectDropdown) {
                for (let i = 0; i < selectDropdown.options.length; i++) {
                    if (selectDropdown.options[i].value === unitName) {
                        selectDropdown.selectedIndex = i;
                        break;
                    }
                }
            }

            // Map to modal popup form dropdown
            const modalDropdown = document.getElementById('modalFormInterest');
            if (modalDropdown) {
                for (let i = 0; i < modalDropdown.options.length; i++) {
                    if (modalDropdown.options[i].value === unitName) {
                        modalDropdown.selectedIndex = i;
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
    // Storage access can throw (private mode, blocked site data), so guard it
    const shownSessionKey = 'spp_lead_modal_shown';
    const storageGet = (key) => { try { return localStorage.getItem(key); } catch (err) { return null; } };
    const storageSet = (key, val) => { try { localStorage.setItem(key, val); } catch (err) { /* ignore */ } };

    if (!storageGet(shownSessionKey)) {
        setTimeout(() => {
            // Don't interrupt if the modal, lightbox or mobile menu is already open
            const lightboxOpen = lightbox && lightbox.style.display === 'flex';
            const menuOpen = navMenu && navMenu.classList.contains('active');
            if (leadModal && !leadModal.classList.contains('show-modal') && !lightboxOpen && !menuOpen) {
                showModal();
                storageSet(shownSessionKey, 'true');
            }
        }, 10000); // 10 seconds
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && leadModal && leadModal.classList.contains('show-modal')) closeModal();
    });

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
        }, { passive: true });

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
    
    const waNumber = '916369216621'; // Lodge reception number

    // Lightweight toast in place of blocking alert() dialogs
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
    let toastTimer;

    const showToast = (msg, type = 'success') => {
        toast.textContent = msg;
        toast.className = `toast toast-${type} show`;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 4500);
    };

    // Local YYYY-MM-DD (toISOString would shift the date across the UTC boundary)
    const toDateInputValue = (d) => {
        const pad = (n) => String(n).padStart(2, '0');
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    };

    // Wire a booking form (main section form or popup form) by its field id prefix
    const setupBookingForm = (formId, prefix, onDone) => {
        const form = document.getElementById(formId);
        if (!form) return;

        const field = (name) => document.getElementById(`${prefix}${name}`);
        const checkInInput = field('CheckIn');
        const checkOutInput = field('CheckOut');

        // Block past dates and keep check-out after check-in
        const today = toDateInputValue(new Date());
        if (checkInInput) checkInInput.min = today;
        if (checkOutInput) checkOutInput.min = today;
        if (checkInInput && checkOutInput) {
            checkInInput.addEventListener('change', () => {
                if (!checkInInput.value) return;
                const next = new Date(`${checkInInput.value}T00:00:00`);
                next.setDate(next.getDate() + 1);
                checkOutInput.min = toDateInputValue(next);
                if (checkOutInput.value && checkOutInput.value <= checkInInput.value) {
                    checkOutInput.value = toDateInputValue(next);
                }
            });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = field('Name').value.trim();
            const phone = field('Phone').value.trim();
            const checkin = checkInInput.value;
            const checkout = checkOutInput.value;
            const roomType = field('Interest').value;
            const guests = field('Guests').value;
            const message = field('Message').value.trim();

            if (!name || !phone || !checkin || !checkout) {
                showToast('Please fill out all required fields.', 'error');
                return;
            }

            if (!/^[+\d][\d\s-]{6,}$/.test(phone)) {
                showToast('Please enter a valid phone number.', 'error');
                return;
            }

            // YYYY-MM-DD strings compare correctly as text
            if (checkout <= checkin) {
                showToast('Check-out date must be after the check-in date.', 'error');
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

            const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

            // Open synchronously inside the submit gesture so popup blockers allow it
            const win = window.open(waUrl, '_blank');
            if (!win) window.location.href = waUrl;

            showToast(`Thank you, ${name}! Opening WhatsApp to confirm your room.`);
            form.reset();
            if (onDone) onDone();
        });
    };

    setupBookingForm('projectInquiryForm', 'form');
    setupBookingForm('modalInquiryForm', 'modalForm', closeModal);

    // ==========================================
    // 10. NO LIFT NOTICE - CLICK TO EXPAND/COLLAPSE
    // ==========================================
    const noLiftNotice = document.getElementById('noLiftNotice');
    if (noLiftNotice) {
        const noticeInner = noLiftNotice.querySelector('.no-lift-notice-inner');
        if (noticeInner) {
            noticeInner.addEventListener('click', () => {
                noLiftNotice.classList.toggle('expanded');
            });

            // Auto-expand after a short delay when it scrolls into view
            if (!('IntersectionObserver' in window)) {
                noLiftNotice.classList.add('expanded');
                return;
            }
            const noticeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            noLiftNotice.classList.add('expanded');
                        }, 800);
                        noticeObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            noticeObserver.observe(noLiftNotice);
        }
    }
});
