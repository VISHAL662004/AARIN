// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('#main-nav') && navList.classList.contains('active')) {
            navList.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Mobile dropdown toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (window.innerWidth <= 768) {
        dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('a');
            
            dropdownLink.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        });
    }
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialSlides.length > 0) {
        let currentSlide = 0;
        
        // Hide all slides except the first one
        testimonialSlides.forEach((slide, index) => {
            if (index !== 0) {
                slide.style.display = 'none';
            }
        });
        
        // Function to show a specific slide
        function showSlide(index) {
            testimonialSlides.forEach(slide => {
                slide.style.display = 'none';
            });
            
            testimonialSlides[index].style.display = 'block';
            
            // Add fade-in animation
            testimonialSlides[index].style.opacity = 0;
            let opacity = 0;
            const fadeIn = setInterval(() => {
                if (opacity >= 1) {
                    clearInterval(fadeIn);
                }
                testimonialSlides[index].style.opacity = opacity;
                opacity += 0.1;
            }, 30);
        }
        
        // Event listeners for navigation buttons
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function() {
                currentSlide--;
                if (currentSlide < 0) {
                    currentSlide = testimonialSlides.length - 1;
                }
                showSlide(currentSlide);
            });
            
            nextBtn.addEventListener('click', function() {
                currentSlide++;
                if (currentSlide > testimonialSlides.length - 1) {
                    currentSlide = 0;
                }
                showSlide(currentSlide);
            });
        }
        
        // Auto slide change
        setInterval(() => {
            currentSlide++;
            if (currentSlide > testimonialSlides.length - 1) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }, 5000);
    }
    
    // Scroll animation for sections
    const sections = document.querySelectorAll('section');
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Function to handle scroll animation
    function handleScrollAnimation() {
        sections.forEach(section => {
            if (isInViewport(section) && !section.classList.contains('animate')) {
                section.classList.add('animate');
                section.style.opacity = 1;
                section.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize sections with animation properties
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check sections on load
    handleScrollAnimation();
    
    // Check sections on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Smooth scrolling for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    hamburger.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 