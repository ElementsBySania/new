// Initialize Lucide Icons
lucide.createIcons();

// Bubble Animation Logic
const bubblesContainer = document.getElementById('bubbles-container');
const iconPaths = [
    'assets/icons/picsart.png',
    'assets/icons/canva.png',
    'assets/icons/adobe_cc.png',
    'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg'
];

function createBubble() {
    if (!bubblesContainer) return;

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    // Randomize Icon
    const icon = document.createElement('img');
    icon.src = iconPaths[Math.floor(Math.random() * iconPaths.length)];
    bubble.appendChild(icon);
    
    // Randomize Size (between 60px and 110px)
    const size = Math.floor(Math.random() * 50) + 60;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Randomize Position
    bubble.style.left = `${Math.random() * 100}%`;
    
    // Randomize Animation Duration
    const duration = Math.random() * 10 + 15;
    bubble.style.animationDuration = `${duration}s`;
    
    // Randomize Delay
    bubble.style.animationDelay = `${Math.random() * 5}s`;

    bubblesContainer.appendChild(bubble);

    // Remove bubble after animation ends
    setTimeout(() => {
        bubble.remove();
    }, duration * 1000);
}

// Spawn initial bubbles
if (bubblesContainer) {
    for (let i = 0; i < 8; i++) {
        setTimeout(createBubble, i * 1500);
    }
    // Continue spawning
    setInterval(createBubble, 3000);
}

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

// Header and Hero Effects on Scroll
const header = document.querySelector('header');
const heroTitle = document.querySelector('.hero-huge-title');

window.addEventListener('scroll', () => {
    // Header Blur and Position
    if (window.scrollY > 50) {
        header.style.top = '10px';
    } else {
        header.style.top = '20px';
    }

    // Hero Title Parallax/Fade
    if (heroTitle) {
        let scrollValue = window.scrollY;
        heroTitle.style.transform = `translateY(${scrollValue * 0.3}px)`;
        heroTitle.style.opacity = 1 - (scrollValue / 600);
    }
});
