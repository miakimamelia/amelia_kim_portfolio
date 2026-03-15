/* ==========================================
   PORTFOLIO NAVIGATION & INTERACTION
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initMobileMenu();
    initCarousels();
    initVideoTilePreview();
});

// ==========================================
// NAVIGATION
// ==========================================

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item, .overlay-link');
    const portfolioLinks = document.querySelectorAll('.portfolio-link, .overlay-link[data-target="portfolio-index"]');
    const topLinks = document.querySelectorAll('.artist-name-link, .mobile-overlay-name');

    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('portfolio-index');
            updateActiveNavItem(null);
            closeMobileMenu();
        });
    });

    topLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('portfolio-index');
            closeMobileMenu();
        });
    });

    navItems.forEach(item => {
        const workId = item.getAttribute('data-work');
        const sectionId = item.getAttribute('data-section');
        const hrefAttr = item.getAttribute('href');
        const target = item.getAttribute('data-target') || workId || sectionId || (hrefAttr ? hrefAttr.replace('#', '') : null);

        if (target) {
            item.setAttribute('href', `#${target}`);
        }

        item.addEventListener('click', function(e) {
            e.preventDefault();
            const id = target;
            if (id) {
                scrollToSection(id);
                const attr = workId ? 'data-work' : sectionId ? 'data-section' : null;
                if (attr) updateActiveNavItem(id, attr);
            }
            closeMobileMenu();
        });
    });
}

function navigateToWork(workId) {
    // legacy helper, now replaced by scrollToSection
    scrollToSection(workId);
    updateActiveNavItem(workId, 'data-work');
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;

    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    const yOffset = -10;

    if (isMobile) {
        const targetY = window.scrollY + el.getBoundingClientRect().top + yOffset;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
    } else {
        const container = document.querySelector('.main-content');
        if (container) {
            const targetY = el.offsetTop + yOffset;
            container.scrollTo({ top: targetY, behavior: 'smooth' });
        }
    }
}

function navigateToSection(sectionId) {
    // legacy helper, now replaced by scrollToSection
    scrollToSection(sectionId);
    updateActiveNavItem(sectionId, 'data-section');
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateActiveNavItem(id, attributeName) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    if (!id || !attributeName) return;

    const activeItem = document.querySelector(`[${attributeName}="${id}"]`);
    if (activeItem) activeItem.classList.add('active');
}

// When the page loads we can highlight the first item but sections are all visible
window.addEventListener('load', function() {
    const firstWorkItem = document.querySelector('[data-work]');
    if (firstWorkItem) {
        firstWorkItem.classList.add('active');
    }
});

// ==========================================
// MOBILE MENU
// ==========================================

function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const overlay = document.getElementById('mobile-overlay');
    const overlayLinks = document.querySelectorAll('.overlay-link');

    if (!menuToggle || !overlay) return;

    const toggleMenu = (e) => {
        if (e) e.stopPropagation();
        const isOpen = overlay.classList.toggle('open');
        menuToggle.classList.toggle('open', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen);
    };

    menuToggle.addEventListener('click', toggleMenu);

    overlayLinks.forEach(link => {
        link.addEventListener('click', () => closeMobileMenu());
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#mobile-overlay') && !e.target.closest('#mobile-menu-toggle')) {
            closeMobileMenu();
        }
    });

    // Reset menu state when returning to desktop
    window.addEventListener('resize', function() {
        if (!window.matchMedia('(max-width: 1024px)').matches) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const overlay = document.getElementById('mobile-overlay');
    const menuToggle = document.getElementById('mobile-menu-toggle');

    if (overlay) overlay.classList.remove('open');
    if (menuToggle) {
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
}

// ==========================================
// CONTACT FORM
// ==========================================

// Contact form now handled by Formspree

console.log('🎨 Welcome to Amelia Kim\'s portfolio website!');

// ==========================================
// VIDEO TILE LAST FRAME PREVIEW
// ==========================================

function initVideoTilePreview() {
    const video = document.getElementById('video-tile-preview');
    if (!video) return;
    video.addEventListener('loadedmetadata', function() {
        video.currentTime = 10;
    });
}

// ==========================================
// CAROUSEL
// ==========================================

function initCarousels() {
    document.querySelectorAll('.carousel').forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const dotsContainer = carousel.querySelector('.carousel-dots');

        if (slides.length <= 1) {
            prevBtn.classList.add('hidden');
            nextBtn.classList.add('hidden');
            return;
        }

        let current = 0;

        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        function goTo(index) {
            current = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${current * 100}%)`;
            carousel.querySelectorAll('.carousel-dot').forEach((d, i) => {
                d.classList.toggle('active', i === current);
            });
        }

        prevBtn.addEventListener('click', () => goTo(current - 1));
        nextBtn.addEventListener('click', () => goTo(current + 1));

        // Touch / swipe support
        let startX = 0;
        track.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        track.addEventListener('touchend', e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
                goTo(diff > 0 ? current + 1 : current - 1);
            }
        });
    });
}
