// blog.js - Blog Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Wait for common.js to load first
    setTimeout(initBlogPage, 100);
});

function initBlogPage() {
    console.log('Initializing Blog Page scripts');
    
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
    
    console.log('Blog Page scripts initialized successfully');
}