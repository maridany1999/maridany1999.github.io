
// Images Load / Read
document.querySelectorAll('.work-grid').forEach(grid => {
    const _folder = grid.dataset.folder;
    const _file = grid.dataset.file;
    const _folderFull = `${_folder}/${_file}`;

    grid.querySelectorAll('.work-item-square').forEach(item => {
        const _name = item.dataset.name;
        const _year = item.dataset.year;
        const _index = item.dataset.index;
        const _fileFull = `${_file}_${_index}`;

        // Create image
        const _img = document.createElement('img');
        _img.src = `${_folderFull}/Thumbs/${_fileFull}.jpg`;
        _img.dataset.full = `${_folderFull}/${_fileFull}.jpg`;
        _img.alt = `Drawing: ${_name}`;

        // Create work info
        const _info = document.createElement('div');
        _info.classList.add('work-info');

        const _h4 = document.createElement('h4');
        _h4.textContent = _name;

        const _p = document.createElement('p');
        _p.textContent = _year;

        // #index
        /* const _span = document.createElement('span');
        _span.textContent = ` #${_index}`;
        _span.style.marginLeft = '0.5em';
        _span.style.opacity = '0.6';
        _p.appendChild(_span); */

        _info.appendChild(_h4);
        _info.appendChild(_p);

        item.appendChild(_img);
        item.appendChild(_info);
    });
});


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1); // Remove the # from the href
        console.log('Target ID:', targetId);
        const targetElement = document.getElementById(targetId);
        console.log('Target Element:', targetElement);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 120,
                behavior: 'smooth'
            });
        } else {
            console.log('Element not found for ID:', targetId);
        }
    });
});

// Section Navigation Smooth Scrolling
document.addEventListener('DOMContentLoaded', function () {
    const navButtons = document.querySelectorAll('.nav-btn');

    navButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Remove active class from all buttons
                navButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Smooth scroll to target
                const offsetTop = targetElement.offsetTop - 120; // Account for sticky nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active button based on scroll position
    window.addEventListener('scroll', function () {
        const sections = ['rhodes', 'alexander', 'underwater', 'spacestation', 'lab'];
        const scrollPosition = window.scrollY + 150; // Offset for better detection

        let activeSection = '';

        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    activeSection = sectionId;
                }
            }
        });

        // Update active button
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-target') === activeSection) {
                btn.classList.add('active');
            }
        });
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

document.querySelectorAll('.work-item-square img').forEach(image => {
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
            'rgba(156, 136, 255, 0.2)' :
            (Math.random() > 0.5 ?
                'rgba(112, 161, 255, 0.2)' :
                'rgba(255, 71, 87, 0.2)');

        this.style.boxShadow = `0 15px 40px ${color}`;
    });

    item.addEventListener('mouseleave', function () {
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    });
});

document.querySelectorAll('.work-item-square').forEach(item => {
    item.addEventListener('mouseenter', function () {
        const color = Math.random() > 0.66 ?
            'rgba(156, 136, 255, 0.2)' :
            (Math.random() > 0.5 ?
                'rgba(112, 161, 255, 0.2)' :
                'rgba(255, 71, 87, 0.2)');

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



// Get all images in work items (excluding video overlay items)
const images_square = document.querySelectorAll('.work-item-square img');

// Add click event to all images
images_square.forEach(img => {
    // Skip if parent has video-overlay
    if (!img.parentElement.querySelector('.video-overlay')) {
        img.onclick = function () {
            openModal(this);
        }
    }
});



























function openModal(imgElement) {
    // Use full-res image if available, otherwise use thumbnail
    const fullResSrc = imgElement.getAttribute('data-full');
    modalImg.src = fullResSrc || imgElement.src;

    // if full-res does not exist, do not open modal
    if (!fullResSrc) {
        return;
    }

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
    }, 200); // This here matches the transition duration from CSS
}

// Close button functionality
closeBtn.onclick = function (e) {
    e.stopPropagation();
    closeModal();
};

// Close modal when clicking on the modal background
modal.onclick = function (e) {
    if (e.target === modal) {
        closeModal();
    }
};

// Close modal when clicking on the image
modalImg.onclick = function (e) {
    e.stopPropagation();
    closeModal();
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
    });
});

// Scroll to Top Button Functionality
document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Audio Player Management
document.addEventListener('DOMContentLoaded', function () {
    const audioPlayers = document.querySelectorAll('.audio-player');

    // Auto-pause other tracks when one starts playing
    audioPlayers.forEach(player => {
        player.addEventListener('play', function () {
            // Pause all other audio players
            audioPlayers.forEach(otherPlayer => {
                if (otherPlayer !== player) {
                    otherPlayer.pause();
                }
            });
        });

        // Add visual feedback when playing
        player.addEventListener('play', function () {
            this.closest('.audio-item').classList.add('playing');
        });

        player.addEventListener('pause', function () {
            this.closest('.audio-item').classList.remove('playing');
        });

        player.addEventListener('ended', function () {
            this.closest('.audio-item').classList.remove('playing');
        });
    });
});























// AUDIO

function initCustomPlayers() {
    document.querySelectorAll("audio[data-player]").forEach(audio => {
        const wrapper = audio.parentElement;

        wrapper.classList.add("audio-wrapper");
        wrapper.innerHTML = `
      <audio src="${audio.getAttribute("src")}" preload="metadata"></audio>
      <div class="controls">
        <button class="play">▷</button>
        <div class="timeline">
          <input class="progress" type="range" min="0" max="100" value="0">
        </div>
      </div>
      <div class="bottom-row">
        <div class="volume">
          <span class="icon">🔊</span>
          <input class="vol" type="range" min="0" max="1" step="0.01" value="1">
        </div>
      </div>
    `;

        const player = wrapper.querySelector("audio");
        const playBtn = wrapper.querySelector(".play");
        const volIcon = wrapper.querySelector(".icon");
        const vol = wrapper.querySelector(".vol");
        const progress = wrapper.querySelector(".progress");

        playBtn.onclick = () => {
            if (player.paused) {
                player.play();
                playBtn.textContent = "⏸️";
            } else {
                player.pause();
                playBtn.textContent = "▷";
            }
        };

        progress.oninput = () => player.currentTime = (progress.value / 100) * player.duration;

        vol.oninput = () => {
            player.volume = vol.value;
            volIcon.textContent = player.volume == 0 ? "🔇" : player.volume < 0.5 ? "🔉" : "🔊";
        };

        player.ontimeupdate = () => {
            progress.value = (player.currentTime / player.duration) * 100 || 0;
        };

        player.onended = () => {
            playBtn.textContent = "▷";
            progress.value = 0;
        };
    });
}

document.addEventListener("DOMContentLoaded", initCustomPlayers);