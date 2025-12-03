// services.js - Services Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Wait for common.js to load first
    setTimeout(initServicesPage, 100);
});

function initServicesPage() {
    console.log('Initializing Services Page scripts');
    
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
    
    console.log('Services Page scripts initialized successfully');
}