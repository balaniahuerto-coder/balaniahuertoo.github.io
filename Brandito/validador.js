// SENATI Signature Validator - Interactive JavaScript

// DOM Elements
const documentPreview = document.getElementById('documentPreview');
const modal = document.getElementById('documentModal');
const closeModalBtn = document.getElementById('closeModal');
const signatureHeaders = document.querySelectorAll('.signature-header');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeSignatureToggles();
    initializeDocumentModal();
    addAnimationOnScroll();
});

/**
 * Initialize signature detail toggles
 */
function initializeSignatureToggles() {
    signatureHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const details = document.getElementById(targetId);

            // Toggle active states
            this.classList.toggle('active');
            details.classList.toggle('active');

            // Close other open signatures
            signatureHeaders.forEach(otherHeader => {
                if (otherHeader !== this) {
                    otherHeader.classList.remove('active');
                    const otherId = otherHeader.getAttribute('data-target');
                    const otherDetails = document.getElementById(otherId);
                    otherDetails.classList.remove('active');
                }
            });

            // Add smooth scroll animation
            if (details.classList.contains('active')) {
                setTimeout(() => {
                    details.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 100);
            }
        });

        // Add hover effect
        header.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(5px)';
        });

        header.addEventListener('mouseleave', function () {
            this.style.transform = 'translateX(0)';
        });
    });
}

/**
 * Initialize document modal functionality
 */
function initializeDocumentModal() {
    // Open modal on document click
    if (documentPreview) {
        documentPreview.addEventListener('click', function () {
            openModal();
        });
    }

    // Close modal on button click
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function () {
            closeModal();
        });
    }

    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Open the document modal
 */
function openModal() {
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

/**
 * Close the document modal
 */
function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

/**
 * Add animation on scroll for cards
 */
function addAnimationOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

/**
 * Add ripple effect to clickable elements
 */
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Add ripple effects to signature headers
signatureHeaders.forEach(header => {
    header.addEventListener('click', createRipple);
});

// Smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Log initialization
console.log('✅ SENATI Signature Validator initialized successfully');
console.log('📄 Document viewer ready');
console.log('✍️ Digital signatures ready');
