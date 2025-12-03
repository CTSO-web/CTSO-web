// index.js - Home Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Wait for common.js to load first
    setTimeout(initHomePage, 100);
});

function initHomePage() {
    console.log('Initializing Home Page scripts');
    
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
    
    // Add security monitor animation
    const monitorScreen = document.querySelector('.monitor-screen');
    
    if (monitorScreen) {
        setInterval(() => {
            monitorScreen.classList.toggle('pulse');
        }, 3000);
    }
    
    console.log('Home Page scripts initialized successfully');
}