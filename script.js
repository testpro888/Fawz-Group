// ===== Loading Screen =====
const loader = document.getElementById('loader');

window.addEventListener('load', () => {
    setTimeout(() => {
        // Trigger split-open transition
        loader.classList.add('open');

        // After panels finish sliding (0.9s), hide entirely
        setTimeout(() => {
            loader.classList.add('done');
        }, 950);
    }, 1600);
});

// ===== Navbar scroll behavior =====
const navbar = document.getElementById('navbar');

function handleScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        document.getElementById('brandLogo').src = 'assets/fawz-icon-gold.png';
    } else {
        navbar.classList.remove('scrolled');
        document.getElementById('brandLogo').src = 'assets/fawz-icon-white.png';
    }
}

window.addEventListener('scroll', handleScroll);
handleScroll();

// ===== Hero heading text slider =====
const heroSlides = document.querySelectorAll('.hero-slide');
let currentTextSlide = 0;
const textInterval = 3000; // 3 seconds per text

function nextTextSlide() {
    heroSlides[currentTextSlide].classList.remove('active');
    currentTextSlide = (currentTextSlide + 1) % heroSlides.length;
    heroSlides[currentTextSlide].classList.add('active');
}

setInterval(nextTextSlide, textInterval);

// ===== Hero background slideshow =====
const slides = document.querySelectorAll('.hero-bg-slide');
const indicators = document.querySelectorAll('.indicator');
let currentSlide = 0;
const slideInterval = 6000; // 6 seconds per slide

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    currentSlide = index;

    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
}

// Auto-advance slides
let autoSlide = setInterval(nextSlide, slideInterval);

// Click indicators to go to specific slide
indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
        clearInterval(autoSlide);
        goToSlide(parseInt(indicator.dataset.slide));
        autoSlide = setInterval(nextSlide, slideInterval);
    });
});

// Arrow buttons for manual slide control
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');

prevBtn.addEventListener('click', () => {
    clearInterval(autoSlide);
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev);
    autoSlide = setInterval(nextSlide, slideInterval);
});

nextBtn.addEventListener('click', () => {
    clearInterval(autoSlide);
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
    autoSlide = setInterval(nextSlide, slideInterval);
});

// ===== Scroll Reveal Animations =====
const animatedElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.getAttribute('data-delay');
            if (delay) {
                el.style.transitionDelay = delay + 's';
            }
            el.classList.add('animated');
            observer.unobserve(el);
        }
    });
}, observerOptions);

animatedElements.forEach((el) => {
    observer.observe(el);
});
