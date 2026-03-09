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
    const navItems = document.querySelectorAll('.nav-item');
    const portfolioLink = document.querySelector('.portfolio-link');

    if (portfolioLink) {
        portfolioLink.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('portfolio-index');
            // clear active states
            updateActiveNavItem(null);
            closeMobileMenu();
        });
    }

    navItems.forEach(item => {
        const workId = item.getAttribute('data-work');
        const sectionId = item.getAttribute('data-section');
        const target = workId || sectionId;
        if (target) {
            item.setAttribute('href', `#${target}`);
        }

        item.addEventListener('click', function(e) {
            e.preventDefault();
            const id = workId || sectionId;
            if (id) {
                scrollToSection(id);
                updateActiveNavItem(id, workId ? 'data-work' : 'data-section');
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
    const container = document.querySelector('.main-content');
    if (el && container) {
        // compute position of element relative to container
        const yOffset = -10; // small offset inside container if needed
        const targetY = el.offsetTop + yOffset;
        container.scrollTo({ top: targetY, behavior: 'smooth' });
    }
}

function navigateToSection(sectionId) {
    // legacy helper, now replaced by scrollToSection
    scrollToSection(sectionId);
    updateActiveNavItem(sectionId, 'data-section');
}

function updateActiveNavItem(id, attributeName) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const activeItem = document.querySelector(`[${attributeName}="${id}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
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
