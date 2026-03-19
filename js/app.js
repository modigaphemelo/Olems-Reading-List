// ====== MOBILE MENU ======
function openNav() {
    document.getElementById("mySidenav").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeNav() {
    document.getElementById("mySidenav").classList.remove("active");
    document.body.style.overflow = "";
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const sidenav = document.getElementById("mySidenav");
    const openbtn = document.querySelector(".openbtn");
    
    if (sidenav.classList.contains("active") && 
        !sidenav.contains(event.target) && 
        event.target !== openbtn && 
        !openbtn.contains(event.target)) {
        closeNav();
    }
});

// Close menu with escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeNav();
    }
});

// ====== SCROLL TO TOP ======
window.onscroll = function() {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (scrollBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollBtn.style.display = "flex";
        } else {
            scrollBtn.style.display = "none";
        }
    }
};

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ====== INITIALIZATION ======
document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    const year = new Date().getFullYear();
    const copyright = document.querySelector('footer p:first-child');
    if (copyright && copyright.textContent.includes('2025')) {
        copyright.textContent = copyright.textContent.replace('2025', year);
    }
    
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', function() {
                this.style.transition = 'opacity 0.3s ease';
                this.style.opacity = '1';
            });
        }
    });
});

// Make functions available globally
window.openNav = openNav;
window.closeNav = closeNav;
window.topFunction = topFunction;
