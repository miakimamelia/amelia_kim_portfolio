/* ==========================================
   PORTFOLIO NAVIGATION & INTERACTION
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initMobileMenu();
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
