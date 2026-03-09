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
            scrollToTop();
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
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.sidebar') && !e.target.closest('.mobile-menu-toggle')) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.remove('active');
    }
}

// ==========================================
// CONTACT FORM
// ==========================================

// Contact form now handled by Formspree

console.log('🎨 Welcome to Amelia Kim\'s portfolio website!');
