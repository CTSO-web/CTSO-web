// common.js - Shared JavaScript for all pages

document.addEventListener('DOMContentLoaded', function() {
    
    // Set current year in footer
    const currentYearElements = document.querySelectorAll('#currentYear');
    currentYearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });
    
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-item a').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to navbar based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-item a');
    
    navItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        if (itemHref === currentPage || (currentPage === '' && itemHref === 'index.html')) {
            item.classList.add('active');
        }
    });
    
    // Generic form validation for all forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Check required fields
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--primary-red)';
                    
                    // Add error message if not exists
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'This field is required';
                        errorMsg.style.color = 'var(--primary-red)';
                        errorMsg.style.fontSize = '0.8rem';
                        errorMsg.style.marginTop = '5px';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                } else {
                    field.style.borderColor = '';
                    // Remove error message if exists
                    if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
                        field.nextElementSibling.remove();
                    }
                }
            });
            
            // If form has specific ID, let that handler take over
            if (this.id === 'auditForm' || this.id === 'contactForm' || 
                this.classList.contains('newsletter-form')) {
                return; // Let specific handler handle it
            }
            
            // Otherwise, prevent default for generic forms
            if (!isValid) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
        
        // Remove error on input
        form.querySelectorAll('[required]').forEach(field => {
            field.addEventListener('input', function() {
                this.style.borderColor = '';
                if (this.nextElementSibling && this.nextElementSibling.classList.contains('error-message')) {
                    this.nextElementSibling.remove();
                }
            });
        });
    });
    
    // Add scroll animations for elements
    const animatedElements = document.querySelectorAll('.service-card, .value-card, .stat-card, .testimonial-card');
    
    if (animatedElements.length > 0) {
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            elementObserver.observe(element);
        });
    }
    
    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-red);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(192, 10, 10, 0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
            backToTopButton.style.alignItems = 'center';
            backToTopButton.style.justifyContent = 'center';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    // Back to top functionality
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Active navigation highlight on scroll for single page navigation
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '' || window.location.pathname.endsWith('/')) {
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });
    }
    
    // Image lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Add loading state to all buttons on click
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't add loading state to buttons that are already in a form with a submit handler
            if (this.type === 'submit' || this.closest('form')) {
                return;
            }
            
            // For regular buttons, add a temporary loading state
            if (!this.classList.contains('no-loading')) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                this.disabled = true;
                
                // Reset after 1.5 seconds (for demo purposes)
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 1500);
            }
        });
    });
    
    // Service price formatter
    const priceElements = document.querySelectorAll('.price');
    priceElements.forEach(price => {
        const text = price.textContent;
        if (text.includes('$') && !isNaN(text.replace('$', '').replace(',', ''))) {
            const num = parseFloat(text.replace('$', '').replace(',', ''));
            if (num > 999) {
                price.textContent = '$' + num.toLocaleString();
            }
        }
    });
    
    // Responsive menu enhancements
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active') &&
            !e.target.closest('.nav-menu') && !e.target.closest('.hamburger')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Add CSS for animations if not already present
    if (!document.querySelector('#ctso-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'ctso-animation-styles';
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .animated {
                animation: fadeInUp 0.6s ease forwards;
            }
            
            .service-card, .value-card, .stat-card, .testimonial-card {
                opacity: 0;
            }
            
            .service-card.animated, 
            .value-card.animated, 
            .stat-card.animated, 
            .testimonial-card.animated {
                opacity: 1;
            }
            
            .back-to-top:hover {
                background-color: #a00808;
                transform: translateY(-3px);
                box-shadow: 0 6px 15px rgba(192, 10, 10, 0.4);
            }
            
            .pulse {
                animation: pulse 1.5s infinite;
            }
            
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(192, 10, 10, 0.4); }
                70% { box-shadow: 0 0 0 10px rgba(192, 10, 10, 0); }
                100% { box-shadow: 0 0 0 0 rgba(192, 10, 10, 0); }
            }
            
            .faq-answer {
                transition: max-height 0.3s ease, padding 0.3s ease;
            }
            
            .error-message {
                color: var(--primary-red) !important;
                font-size: 0.8rem !important;
                margin-top: 5px !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('CTSO Common scripts initialized');
});