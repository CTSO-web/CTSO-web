// about.js - About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Wait for common.js to load first
    setTimeout(initAboutPage, 100);
});

function initAboutPage() {
    console.log('Initializing About Page scripts');
    
    // About page specific functionality can be added here
    // For example, team member interactions, timeline animations, etc.
    
    // Example: Team member hover effects
    const teamCards = document.querySelectorAll('.team-card');
    
    if (teamCards.length > 0) {
        teamCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = 'var(--shadow)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // Add animation to certification card
    const certCard = document.querySelector('.certification-card');
    if (certCard) {
        certCard.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        certCard.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    console.log('About Page scripts initialized successfully');
}