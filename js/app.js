// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');
const sidebar = document.getElementById('sidebar');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const currentYear = document.getElementById('current-year');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeScrollToTop();
    initializeCurrentYear();
    initializeBookCardInteractions();
    initializeSmoothScroll();
    initializeA11yFeatures();
    initializePageTransitions();
});

// ====== MOBILE MENU FUNCTIONALITY ======
function initializeMobileMenu() {
    if (!menuToggle || !sidebar) return;
    
    menuToggle.addEventListener('click', toggleMobileMenu);
    menuOverlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking on links (for single page navigation)
    const navLinks = document.querySelectorAll('.genre-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const isActive = sidebar.classList.contains('active');
    
    if (isActive) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    sidebar.classList.add('active');
    menuToggle.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    setTimeout(() => {
        const firstNavLink = sidebar.querySelector('a');
        if (firstNavLink) firstNavLink.focus();
    }, 100);
}

function closeMobileMenu() {
    sidebar.classList.remove('active');
    menuToggle.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Return focus to menu toggle button
    menuToggle.focus();
}

// ====== SCROLL TO TOP FUNCTIONALITY ======
function initializeScrollToTop() {
    if (!scrollToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', toggleScrollToTopButton);
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', scrollToTop);
}

function toggleScrollToTopButton() {
    if (!scrollToTopBtn) return;
    
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
        setTimeout(() => {
            scrollToTopBtn.style.opacity = '1';
        }, 10);
    } else {
        scrollToTopBtn.style.opacity = '0';
        setTimeout(() => {
            if (scrollToTopBtn.style.opacity === '0') {
                scrollToTopBtn.style.display = 'none';
            }
        }, 200);
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Focus management for accessibility
    const skipLink = document.querySelector('a[href="#main"]') || 
                     document.querySelector('.main-content');
    if (skipLink) skipLink.focus();
}

// ====== CURRENT YEAR ======
function initializeCurrentYear() {
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

// ====== BOOK CARD INTERACTIONS ======
function initializeBookCardInteractions() {
    const bookCards = document.querySelectorAll('.book-card');
    
    bookCards.forEach(card => {
        // Add keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('.review-link, a');
                if (link) link.click();
            }
        });
        
        // Add focus styles
        card.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        card.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
        
        // Lazy load images
        const images = card.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        });
    });
}

// ====== SMOOTH SCROLL ======
function initializeSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or external link
            if (href === '#' || href.includes('://') || href.startsWith('mailto:')) {
                return;
            }
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
                    closeMobileMenu();
                }
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Focus the target for accessibility
                setTimeout(() => {
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                }, 500);
            }
        });
    });
}

// ====== ACCESSIBILITY FEATURES ======
function initializeA11yFeatures() {
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Handle skip link
    skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const mainContent = document.querySelector('.main-content') || 
                           document.querySelector('main');
        if (mainContent) {
            mainContent.setAttribute('tabindex', '-1');
            mainContent.focus();
            setTimeout(() => mainContent.removeAttribute('tabindex'), 1000);
        }
    });
    
    // Add aria-labels to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    interactiveElements.forEach(el => {
        if (!el.hasAttribute('aria-label') && !el.textContent.trim()) {
            const type = el.tagName.toLowerCase();
            el.setAttribute('aria-label', `${type} element`);
        }
    });
    
    // Handle focus visible for keyboard users
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-user');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-user');
    });
}

// ====== PAGE TRANSITIONS ======
function initializePageTransitions() {
    // Add fade-in animation to main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            mainContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Stagger animation for book cards
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
}

// ====== BOOK RATING COLOR GENERATOR ======
// Utility function to get rating color class
function getRatingClass(rating) {
    if (rating >= 9) return 'rating-9';
    if (rating >= 8) return 'rating-8';
    if (rating >= 7) return 'rating-7';
    if (rating >= 6) return 'rating-6';
    if (rating >= 5) return 'rating-5';
    if (rating >= 4) return 'rating-4';
    if (rating >= 3) return 'rating-3';
    if (rating >= 2) return 'rating-2';
    return 'rating-1';
}

// ====== RESIZE HANDLER ======
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
            closeMobileMenu();
        }
    }, 250);
});

// ====== LOADING STATES ======
// Show loading state for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        // Add loading class
        img.classList.add('loading');
        
        // Remove loading class when loaded
        if (img.complete) {
            img.classList.remove('loading');
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.remove('loading');
                this.classList.add('loaded');
            });
            
            img.addEventListener('error', function() {
                this.classList.remove('loading');
                this.classList.add('error');
                this.alt = 'Failed to load book cover';
            });
        }
    });
});

// ====== PREFERS REDUCED MOTION ======
// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    // Disable animations
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-medium', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
    
    // Remove transition styles
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
        el.style.transition = 'none';
        el.style.animation = 'none';
    });
}
