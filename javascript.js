// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !isExpanded);
  siteNav.classList.toggle('active');
  
  // Animate hamburger
  const bars = menuToggle.querySelectorAll('.bar');
  if (siteNav.classList.contains('active')) {
    bars[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
  } else {
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  }
});

// Close mobile menu when clicking nav links
document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    const bars = menuToggle.querySelectorAll('.bar');
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  const theme = document.body.getAttribute('data-theme');
  
  if (window.scrollY > 100) {
    if (theme === 'light') {
      header.style.background = 'rgba(200, 200, 200, 0.9)';
    } else {
      header.style.background = 'rgba(40, 40, 40, 0.95)';
    }
    header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
  } else {
    header.style.background = 'var(--bg-secondary)';
    header.style.boxShadow = 'none';
  }
});

// Initialize Vanta Globe effect
let vantaEffect;

function initVanta() {
  if (window.VANTA && window.THREE) {
    const theme = document.body.getAttribute('data-theme');
    const backgroundColor = theme === 'light' ? 0xf0f0f0 : 0x2a2a2a;
    const globeColor = 0xf40050; // Always pink for both themes
    
    vantaEffect = VANTA.GLOBE({
      el: "#vanta-globe",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: globeColor,
      size: 1.60,
      backgroundColor: backgroundColor
    });
  }
}

// Initialize TypeIt for bio section
function initTypeWriter() {
  if (typeof TypeIt !== 'undefined') {
    const bioElement = document.getElementById('bio-typewriter');
    bioElement.classList.add('typing');
    
    new TypeIt("#bio-typewriter", {
      speed: 80,
      startDelay: 2000,
      cursor: true,
      cursorChar: "|",
      afterComplete: function(instance) {
        // Remove typing class and add completion effect
        bioElement.classList.remove('typing');
        bioElement.style.color = 'var(--text-secondary)';
      }
    })
    .type("Software Tester")
    .pause(300)
    .type(", ")
    .pause(200)
    .type("Web developer")
    .pause(300)
    .type(", ")
    .pause(200)
    .type("Mobile app developer")
    .go();
  }
}

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const sunIcon = themeToggle.querySelector('.sun');
const moonIcon = themeToggle.querySelector('.moon');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply saved theme
if (currentTheme === 'light') {
  body.setAttribute('data-theme', 'light');
  sunIcon.style.display = 'none';
  moonIcon.style.display = 'inline';
} else {
  body.removeAttribute('data-theme');
  sunIcon.style.display = 'inline';
  moonIcon.style.display = 'none';
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
  const isLight = body.getAttribute('data-theme') === 'light';
  
  if (isLight) {
    // Switch to dark mode
    body.removeAttribute('data-theme');
    sunIcon.style.display = 'inline';
    moonIcon.style.display = 'none';
    localStorage.setItem('theme', 'dark');
    
    // Update Vanta background for dark mode
    if (vantaEffect) {
      vantaEffect.setOptions({
        backgroundColor: 0x2a2a2a,
        color: 0xf40050 // Keep globe pink
      });
    }
  } else {
    // Switch to light mode
    body.setAttribute('data-theme', 'light');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
    localStorage.setItem('theme', 'light');
    
    // Update Vanta background for light mode
    if (vantaEffect) {
      vantaEffect.setOptions({
        backgroundColor: 0xf0f0f0,
        color: 0xf40050 // Keep globe pink
      });
    }
  }
});

// Add loading class removal
window.addEventListener('load', () => {
  document.body.classList.remove('loading');
});

// Enhanced button click effects
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Card hover effects with tilt
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
  });
});

// Initialize when page loads
window.addEventListener('load', () => {
  setTimeout(initVanta, 100);
  setTimeout(initTypeWriter, 500);
});

console.log('🚀 Enhanced portfolio loaded successfully!');