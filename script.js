// ctso-scripts.js - Combined JavaScript for CTSO Security Website
document.addEventListener('DOMContentLoaded', function() {
    
    // ============ COMMON FUNCTIONALITY ============
    
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
    
    // Animated counter for statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const startCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 20);
    };
    
    // Initialize counter when element is in viewport
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(number => {
            observer.observe(number);
        });
    }
    
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
    
    // ============ HOME PAGE FUNCTIONALITY ============
    
    // Form submission for audit forms
    const auditForm = document.getElementById('auditForm');
    
    if (auditForm) {
        auditForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const service = this.querySelector('select').value;
            
            // Show success message
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Request Sent!';
            submitBtn.style.backgroundColor = '#28a745';
            
            // Reset form
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                
                // Show confirmation alert
                alert(`Thank you, ${name}! Your request for ${service} security audit has been received. Our team will contact you within 24 hours.`);
            }, 2000);
        });
    }
    
    // ============ SERVICES PAGE FUNCTIONALITY ============
    
    // Service navigation
    const serviceNavLinks = document.querySelectorAll('.service-nav-link');
    const serviceDetails = document.querySelectorAll('.service-detail');
    
    if (serviceNavLinks.length > 0) {
        serviceNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get target service
                const targetId = this.getAttribute('href').substring(1);
                
                // Update active nav link
                serviceNavLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                
                // Show target service detail
                serviceDetails.forEach(detail => {
                    detail.classList.remove('active');
                    if (detail.id === targetId) {
                        detail.classList.add('active');
                    }
                });
                
                // Scroll to service detail
                document.getElementById(targetId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
        
        // Check for URL hash on page load
        const hash = window.location.hash;
        if (hash) {
            const targetLink = document.querySelector(`.service-nav-link[href="${hash}"]`);
            if (targetLink) {
                targetLink.click();
            }
        }
    }
    
    // ============ BLOG PAGE FUNCTIONALITY ============
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button');
            
            const originalText = button.textContent;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                button.style.backgroundColor = '#28a745';
                
                setTimeout(() => {
                    this.reset();
                    button.textContent = originalText;
                    button.style.backgroundColor = '';
                    button.disabled = false;
                    
                    alert(`Thank you! You've been subscribed to our security newsletter with email: ${email}`);
                }, 1500);
            }, 1000);
        });
    }
    
    // ============ CONTACT PAGE FUNCTIONALITY ============
    
    // FAQ toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                faqItem.classList.toggle('active');
            });
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const name = formData.get('fullName');
            const service = formData.get('service');
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.backgroundColor = '#28a745';
                
                // Reset form after delay
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                    
                    // Show confirmation
                    alert(`Thank you, ${name}! Your ${service ? service + ' ' : ''}inquiry has been received. We'll contact you within 24 hours.`);
                }, 2000);
            }, 1500);
        });
        
        // Phone number formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 3 && value.length <= 6) {
                    value = value.replace(/(\d{3})(\d+)/, '($1) $2');
                } else if (value.length > 6) {
                    value = value.replace(/(\d{3})(\d{3})(\d+)/, '($1) $2-$3');
                }
                
                e.target.value = value;
            });
        }
    }
    
    // ============ ANIMATIONS ============
    
    // Add security monitor animation for home page
    const monitorScreen = document.querySelector('.monitor-screen');
    
    if (monitorScreen) {
        setInterval(() => {
            monitorScreen.classList.toggle('pulse');
        }, 3000);
    }
    
    // ============ FORM VALIDATION ============
    
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
    
    // ============ SCROLL ANIMATIONS ============
    
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
    
    // ============ BACK TO TOP BUTTON ============
    
    // Create back to top button
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
    
    // ============ ACTIVE NAVIGATION HIGHLIGHT ON SCROLL ============
    
    // Add active class to navbar on scroll for single page navigation
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
    
    // ============ IMAGE LAZY LOADING ============
    
    // Simple lazy loading for images
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
    
    // ============ ADD CSS FOR ANIMATIONS ============
    
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
    
    // ============ LOADING STATE FOR BUTTONS ============
    
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
    
    // ============ SERVICE PRICE FORMATTER ============
    
    // Format price displays
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
    
    // ============ RESPONSIVE MENU ENHANCEMENTS ============
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active') &&
            !e.target.closest('.nav-menu') && !e.target.closest('.hamburger')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // ============ INITIALIZE PAGE-SPECIFIC FUNCTIONALITY ============
    
    console.log('CTSO Security Website initialized successfully');
    
});