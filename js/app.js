// ====== NAVIGATION ======
function openNav() {
    document.getElementById("mySidenav").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeNav() {
    document.getElementById("mySidenav").classList.remove("active");
    document.body.style.overflow = "";
}

// Close menu when clicking on overlay
document.addEventListener('click', function(event) {
    const sidenav = document.getElementById("mySidenav");
    const openbtn = document.querySelector(".openbtn");
    
    if (sidenav.classList.contains("active") && 
        !sidenav.contains(event.target) && 
        !openbtn.contains(event.target)) {
        closeNav();
    }
});

// ====== SCROLL TO TOP ======
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopBtn.style.display = "flex";
        setTimeout(() => {
            scrollToTopBtn.style.opacity = "1";
        }, 10);
    } else {
        scrollToTopBtn.style.opacity = "0";
        setTimeout(() => {
            if (scrollToTopBtn.style.opacity === "0") {
                scrollToTopBtn.style.display = "none";
            }
        }, 200);
    }
};

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ====== BOOK CARD INTERACTIONS ======
document.addEventListener('DOMContentLoaded', function() {
    // Make book cards clickable via review button
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Only trigger if not clicking a button or link
            if (!e.target.closest('a') && !e.target.closest('button')) {
                const link = this.querySelector('.review-button');
                if (link) {
                    link.click();
                }
            }
        });
        
        // Add hover effect on enter key
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const link = this.querySelector('.review-button');
                if (link) {
                    link.click();
                }
            }
        });
    });
    
    // Set current year in footer
    const yearSpan = document.querySelector('footer p:first-child');
    if (yearSpan) {
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2025', new Date().getFullYear());
    }
});

// ====== RESIZE HANDLER ======
window.addEventListener('resize', function() {
    // Close mobile menu on desktop resize
    if (window.innerWidth > 768) {
        closeNav();
    }
});

// ====== INITIALIZE ON LOAD ======
window.onload = function() {
    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('footer p');
    if (copyrightElement && copyrightElement.textContent.includes('2025')) {
        copyrightElement.textContent = copyrightElement.textContent.replace('2025', currentYear);
    }
    
    // Add loading animation to images
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.classList.add('loading');
        if (img.complete) {
            img.classList.remove('loading');
        } else {
            img.addEventListener('load', function() {
                this.classList.remove('loading');
            });
        }
    });
};
