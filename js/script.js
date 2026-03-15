/* ==========================================
   PORTFOLIO NAVIGATION & INTERACTION
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initMobileMenu();
    initGalleryLinks();
});

// ==========================================
// NAVIGATION
// ==========================================

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item, .overlay-link');
    const topLinks = document.querySelectorAll('.artist-name-link, .mobile-overlay-name');

    // Clicking artist name goes back to portfolio grid
    topLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showPortfolio();
            updateActiveNavItem(null);
            closeMobileMenu();
        });
    });

    // Nav items show their section
    navItems.forEach(item => {
        const workId = item.getAttribute('data-work');
        const sectionId = item.getAttribute('data-section');
        const target = workId || sectionId;

        item.addEventListener('click', function(e) {
            e.preventDefault();
            if (target) {
                showSection(target);
                const attr = workId ? 'data-work' : 'data-section';
                updateActiveNavItem(target, attr);
            }
            closeMobileMenu();
        });
    });
}

// Gallery grid items also navigate to sections
function initGalleryLinks() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href) {
                const id = href.replace('#', '');
                showSection(id);
                const attr = document.querySelector(`[data-work="${id}"]`) ? 'data-work' : 'data-section';
                updateActiveNavItem(id, attr);
            }
        });
    });
}

function showPortfolio() {
    // Hide all sections
    document.querySelectorAll('.work-section, .content-section').forEach(s => {
        s.classList.remove('active');
    });
    // Show portfolio grid
    const portfolio = document.getElementById('portfolio-index');
    if (portfolio) portfolio.classList.remove('hidden');

    // Scroll to top
    const container = document.querySelector('.main-content');
    if (container) container.scrollTop = 0;
    window.scrollTo(0, 0);
}

function showSection(id) {
    const el = document.getElementById(id);
    if (!el) return;

    // Hide portfolio grid
    const portfolio = document.getElementById('portfolio-index');
    if (portfolio) portfolio.classList.add('hidden');

    // Hide all sections
    document.querySelectorAll('.work-section, .content-section').forEach(s => {
        s.classList.remove('active');
    });

    // Show target section
    el.classList.add('active');

    // Scroll to top
    const container = document.querySelector('.main-content');
    if (container) container.scrollTop = 0;
    window.scrollTo(0, 0);
}

function updateActiveNavItem(id, attributeName) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    if (!id || !attributeName) return;

    const activeItem = document.querySelector(`.nav-item[${attributeName}="${id}"]`);
    if (activeItem) activeItem.classList.add('active');
}

// ==========================================
// MOBILE MENU
// ==========================================

function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const overlay = document.getElementById('mobile-overlay');

    if (!menuToggle || !overlay) return;

    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = overlay.classList.toggle('open');
        menuToggle.classList.toggle('open', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('#mobile-overlay') && !e.target.closest('#mobile-menu-toggle')) {
            closeMobileMenu();
        }
    });

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
