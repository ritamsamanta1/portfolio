document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.page-section');

    // Hamburger Menu Logic
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close hamburger menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Active Link Highlighting on Scroll
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navItems.forEach(item => {
                    item.classList.toggle('active-link', item.getAttribute('href') === `#${sectionId}`);
                });
            }
        });
    }, { rootMargin: '-40% 0px -60% 0px' });

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // Typing Animation
    const typingTextElement = document.getElementById('typing-text');
    const words = ["Full stack Developer","ML Enthusiast","Data Analyst", "Coder"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        let typeSpeed = isDeleting ? 100 : 200;

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }
        
        typingTextElement.textContent = currentWord.substring(0, charIndex);

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // On-Scroll Animation
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animationObserver.observe(el);
    });

    // Initializations
    type();

});
