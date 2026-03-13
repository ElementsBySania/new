// Initialize Lucide Icons
lucide.createIcons();

// Typing Animation
const typingText = document.querySelector('.typing-text');
const services = [
    'Branding Design',
    'UI/UX Design',
    'Social Media Design',
    'Web Graphics',
    'Marketing Materials',
    'Digital Products'
];

let serviceIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentService = services[serviceIndex];
    
    if (isDeleting) {
        typingText.textContent = currentService.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentService.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentService.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        serviceIndex = (serviceIndex + 1) % services.length;
        typeSpeed = 500; // Pause before next word
    }

    setTimeout(type, typeSpeed);
}

// Start typing
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// Scroll Reveal Animation with Stagger and Slide
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Apply a slight delay based on position for staggered effect
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 100); 
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Smooth Scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Header Blur on Scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.top = '10px';
    } else {
        header.style.top = '20px';
    }
});
