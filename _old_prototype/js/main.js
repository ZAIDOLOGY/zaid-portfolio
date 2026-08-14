document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // close mobile menu if open
                if(navLinks) navLinks.classList.remove('active');
                
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    // Optional: Counter Animation for Trust Section
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const countObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if(current < target) {
                        stat.innerText = Math.ceil(current) + (stat.getAttribute('data-suffix') || '');
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.innerText = target + (stat.getAttribute('data-suffix') || '');
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.5 });
    
    const trustSection = document.querySelector('.trust');
    if(trustSection) {
        countObserver.observe(trustSection);
    }
});
