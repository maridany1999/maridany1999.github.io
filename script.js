// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
        header.style.boxShadow = 'none';
    }
});

// Simple image lightbox
document.querySelectorAll('.work-item img').forEach(image => {
    image.addEventListener('click', function () {
        console.log('Image clicked:', this.alt);
    });
});

// Add subtle parallax effect to background elements
window.addEventListener('mousemove', function (e) {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    document.querySelectorAll('.hero::before, .about::before, .work::before, .contact::before').forEach(element => {
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Add glow effect to work items on hover
document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        const color = Math.random() > 0.66 ?
            'rgba(156, 136, 255, 0.2)' : // Purple
            (Math.random() > 0.5 ?
                'rgba(112, 161, 255, 0.2)' : // Blue
                'rgba(255, 71, 87, 0.2)'); // Red

        this.style.boxShadow = `0 15px 40px ${color}`;
    });

    item.addEventListener('mouseleave', function () {
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    });
});

// Get the modal
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.getElementsByClassName('modal-close')[0];

// Get all images in work items (excluding video overlay items)
const images = document.querySelectorAll('.work-item img');

// Add click event to all images
images.forEach(img => {
    // Skip if parent has video-overlay
    if (!img.parentElement.querySelector('.video-overlay')) {
        img.onclick = function () {
            openModal(this);
        }
    }
});

function openModal(imgElement) {
    // Set image source before showing modal
    modalImg.src = imgElement.src;

    // Show modal
    modal.style.display = 'block';

    // Force reflow
    modal.offsetHeight;

    // Add show class for transition
    modal.classList.add('show');

    // Prevent scrolling
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    // Start transition
    modal.classList.remove('show');

    // Wait for transition to finish before hiding
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 200); // Match the transition duration from CSS
}

// Close button functionality
closeBtn.onclick = function (e) {
    e.stopPropagation();
    closeModal();
};

// Click outside image to close
modal.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
    }
};

// Close with escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Video state management for page navigation
document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('video.work-media');

    videos.forEach(video => {
        // Reset video when page becomes visible again
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) {
                // Page is visible again, reset all videos
                videos.forEach(v => {
                    v.currentTime = 0;
                    v.play().catch(function (error) {
                        console.log('Video play failed after reset:', error);
                    });
                });
            }
        });

        // Handle page focus events (when user returns to tab)
        window.addEventListener('focus', function () {
            videos.forEach(v => {
                if (v.paused) {
                    v.currentTime = 0;
                    v.play().catch(function (error) {
                        console.log('Video play failed on focus:', error);
                    });
                }
            });
        });

        // Handle beforeunload to pause videos
        window.addEventListener('beforeunload', function () {
            videos.forEach(v => {
                v.pause();
            });
        });

        // Additional reset on page load
        video.currentTime = 0;
        video.play().catch(function (error) {
            console.log('Initial video play failed:', error);
        });
    });
});
