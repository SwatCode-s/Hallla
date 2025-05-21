// Generate floating hearts
document.addEventListener('DOMContentLoaded', function() {
    const floatingHeartsContainer = document.querySelector('.floating-hearts');
    
    // Create 30 hearts with random properties
    for (let i = 0; i < 30; i++) {
        createHeart(floatingHeartsContainer);
    }
    
    // Add new hearts periodically
    setInterval(() => {
        createHeart(floatingHeartsContainer);
    }, 3000);
    
    // Add click event to create hearts on click
    document.addEventListener('click', function(e) {
        for (let i = 0; i < 5; i++) {
            createHeartAtPosition(floatingHeartsContainer, e.clientX, e.clientY);
        }
    });
});

// Function to create a heart with random properties
function createHeart(container) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Random size between 10px and 30px
    const size = Math.random() * 20 + 10;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    
    // Random position along the bottom of the screen
    const posX = Math.random() * window.innerWidth;
    heart.style.left = `${posX}px`;
    
    // Random animation duration between 10s and 25s
    const animationDuration = Math.random() * 15 + 10;
    heart.style.animationDuration = `${animationDuration}s`;
    
    // Random delay before animation starts
    const animationDelay = Math.random() * 5;
    heart.style.animationDelay = `${animationDelay}s`;
    
    // Random color variations
    const hue = Math.random() * 20 + 340; // Red to pink hues
    const saturation = Math.random() * 20 + 80; // High saturation
    const lightness = Math.random() * 20 + 60; // Light to medium lightness
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    heart.style.backgroundColor = color;
    
    // Set the before and after pseudo-elements to the same color
    heart.style.setProperty('--heart-color', color);
    
    // Add to container
    container.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, (animationDuration + animationDelay) * 1000);
}

// Function to create hearts at a specific position (for click events)
function createHeartAtPosition(container, x, y) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Random size between 10px and 25px
    const size = Math.random() * 15 + 10;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    
    // Position at click coordinates
    heart.style.left = `${x}px`;
    heart.style.bottom = `${window.innerHeight - y}px`;
    
    // Random animation duration between 5s and 10s
    const animationDuration = Math.random() * 5 + 5;
    heart.style.animationDuration = `${animationDuration}s`;
    
    // No delay for click hearts
    heart.style.animationDelay = '0s';
    
    // Random color variations
    const hue = Math.random() * 20 + 340; // Red to pink hues
    const saturation = Math.random() * 20 + 80; // High saturation
    const lightness = Math.random() * 20 + 60; // Light to medium lightness
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    heart.style.backgroundColor = color;
    
    // Add to container
    container.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, animationDuration * 1000);
}

// Add smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply smooth scroll for same-page links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Add current date to the footer
document.addEventListener('DOMContentLoaded', function() {
    const footerYear = document.querySelector('footer .footer-content p:last-child');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        if (footerYear.innerHTML.includes('©')) {
            footerYear.innerHTML = `© ${currentYear} محمد وحلا`;
        }
    }
});

// Background music control
document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    const welcomePopup = document.getElementById('welcome-popup');
    const startMusicBtn = document.getElementById('start-music-btn');
    
    // Try to play music automatically (this will likely be blocked by browsers)
    tryPlayMusic();
    
    // Set autoplay and unmute
    backgroundMusic.muted = false;
    
    // Show welcome popup - always show it unless user has explicitly started music
    if (welcomePopup) {
        // Check if user has explicitly started music before
        if (localStorage.getItem('musicStarted') === 'true') {
            welcomePopup.classList.add('hidden');
            // Try to play music if it was started before
            playMusic();
        } else {
            welcomePopup.classList.remove('hidden');
        }
    }
    
    // Add click event to start music button
    if (startMusicBtn) {
        startMusicBtn.addEventListener('click', function() {
            playMusic();
            if (welcomePopup) {
                welcomePopup.classList.add('hidden');
            }
            localStorage.setItem('musicStarted', 'true');
        });
    }
    
    // Try to play music (this function attempts to play but will likely be blocked)
    function tryPlayMusic() {
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // If autoplay works (rare), hide the popup and update UI
                musicToggle.classList.add('playing');
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                localStorage.setItem('musicPlaying', 'true');
                localStorage.setItem('musicStarted', 'true');
                
                if (welcomePopup) {
                    welcomePopup.classList.add('hidden');
                }
            })
            .catch(error => {
                // Autoplay was prevented (expected)
                console.log('Auto-play was prevented. User needs to interact with the document first.');
                backgroundMusic.pause();
            });
        }
    }
    
    // Add click event to toggle music
    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                playMusic();
            } else {
                pauseMusic();
            }
        });
    }
    
    // Function to play music
    function playMusic() {
        // Try to play music (this might fail if user hasn't interacted with the page yet)
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Music started playing successfully
                musicToggle.classList.add('playing');
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                localStorage.setItem('musicPlaying', 'true');
            })
            .catch(error => {
                // Auto-play was prevented
                console.log('Auto-play was prevented. User needs to interact with the document first.');
            });
        }
    }
    
    // Function to pause music
    function pauseMusic() {
        backgroundMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        localStorage.setItem('musicPlaying', 'false');
    }
    
    // Sync music state across pages
    window.addEventListener('storage', function(e) {
        if (e.key === 'musicPlaying') {
            if (e.newValue === 'true' && backgroundMusic.paused) {
                playMusic();
            } else if (e.newValue === 'false' && !backgroundMusic.paused) {
                pauseMusic();
            }
        }
    });
});
