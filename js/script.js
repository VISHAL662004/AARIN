// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Change header background on scroll with a more subtle transition
    window.addEventListener('scroll', function() {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle with improved handling
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navList.classList.toggle('active');
            
            // Prevent body scrolling when menu is open
            if (navList.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Handle dropdown clicks on mobile with smoother transitions
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                
                // Toggle active class with a slight delay for smooth animations
                if (dropdown.classList.contains('active')) {
                    dropdown.classList.remove('active');
                } else {
                    // Close other dropdowns first
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // Then open this one
                    setTimeout(() => {
                        dropdown.classList.add('active');
                    }, 10);
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && navList.classList.contains('active')) {
            if (!navList.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
                document.body.style.overflow = '';
                
                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
    
    // Close mobile menu when window is resized
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
            document.body.style.overflow = '';
            
            // Close all dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Add smooth scrolling to anchor links with improved offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#' && this.getAttribute('href') !== '#!') {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        hamburger.classList.remove('active');
                        navList.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    // Calculate header height dynamically for better positioning
                    const headerHeight = header.offsetHeight;
                    const scrollPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Highlight active menu item based on scroll position with improved accuracy
    const navSections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a');
    
    function setActiveNavItem() {
        let current = '';
        const scrollY = window.pageYOffset;
        const headerHeight = header.offsetHeight;
        
        navSections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        // Remove active class from all navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current section link
        if (current) {
            const activeLinks = document.querySelectorAll(`.nav-list a[href="#${current}"]`);
            
            activeLinks.forEach(link => {
                link.classList.add('active');
                
                // Handle parent dropdown if link is inside one
                const parentLi = link.closest('li');
                if (parentLi && parentLi.closest('.dropdown-menu')) {
                    const dropdownLink = parentLi.closest('.dropdown').querySelector('a');
                    if (dropdownLink) {
                        dropdownLink.classList.add('active');
                    }
                }
            });
        }
    }
    
    // Check active section on load and scroll
    window.addEventListener('scroll', setActiveNavItem);
    window.addEventListener('load', setActiveNavItem);
    
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
    const animatedSections = document.querySelectorAll('section');
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Function to handle scroll animation
    function handleScrollAnimation() {
        animatedSections.forEach(section => {
            if (isInViewport(section) && !section.classList.contains('animate')) {
                section.classList.add('animate');
                section.style.opacity = 1;
                section.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize sections with animation properties
    animatedSections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check sections on load
    handleScrollAnimation();
    
    // Check sections on scroll
    window.addEventListener('scroll', handleScrollAnimation);
}); 

   