document.addEventListener('DOMContentLoaded', () => {
    // Music Player Logic
    const bgMusic = document.getElementById('bg-music');
    const playBtn = document.querySelector('.play-btn');
    const playIcon = playBtn.querySelector('i');
    const progressFill = document.querySelector('.progress-fill');
    const currentTimeEl = document.querySelector('.current-time');
    const totalDurationEl = document.querySelector('.total-duration');
    
    let isPlaying = false;

    // Helper to format time
    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec.toString().padStart(2, '0')}`;
    }

    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            bgMusic.play();
            playIcon.setAttribute('data-lucide', 'pause');
        } else {
            bgMusic.pause();
            playIcon.setAttribute('data-lucide', 'play');
        }
        lucide.createIcons();
    });

    bgMusic.addEventListener('timeupdate', () => {
        const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
        progressFill.style.width = progress + '%';
        currentTimeEl.textContent = formatTime(bgMusic.currentTime);
        if (!isNaN(bgMusic.duration)) {
            totalDurationEl.textContent = formatTime(bgMusic.duration);
        }
    });

    bgMusic.addEventListener('loadedmetadata', () => {
        totalDurationEl.textContent = formatTime(bgMusic.duration);
    });

    // Splash Screen Logic
    const splash = document.getElementById('splash-screen');
    const enterBtn = document.getElementById('enter-btn');
    
    enterBtn.addEventListener('click', () => {
        splash.classList.add('hidden');
        bgMusic.play().catch(e => console.log("Autoplay blocked or failed", e));
        isPlaying = true;
        playIcon.setAttribute('data-lucide', 'pause');
        lucide.createIcons();
    });

    // Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!cursor.classList.contains('active')) {
            cursor.classList.add('active');
        }
    });

    function updateCursor() {
        // Pure translate3d for the fastest possible movement
        cursor.style.transform = `translate3d(${mouseX - 10}px, ${mouseY - 10}px, 0)`;
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Add hover class to cursor when over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .glass-card, #enter-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Retro CRT / Hologram Glitch Shader Toggle Logic
    const crtToggle = document.getElementById('crt-toggle');
    const crtToggleText = crtToggle.querySelector('.btn-text');
    let isCrtActive = localStorage.getItem('crtMode') === 'true';

    function setCrtMode(active) {
        if (active) {
            document.body.classList.add('crt-active');
            crtToggleText.textContent = 'CRT: ON';
            localStorage.setItem('crtMode', 'true');
        } else {
            document.body.classList.remove('crt-active');
            crtToggleText.textContent = 'CRT: OFF';
            localStorage.setItem('crtMode', 'false');
        }
    }

    // Apply persistent CRT mode on startup
    setCrtMode(isCrtActive);

    crtToggle.addEventListener('click', () => {
        isCrtActive = !isCrtActive;
        setCrtMode(isCrtActive);
    });

    // Particle Background (Heavily reduced for performance)
    const container = document.body;
    const particleCount = 10; // Very low count to prevent lag
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(particle);
    }
});

// Add styles for particles dynamically
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: fixed;
        width: 2px;
        height: 2px;
        background: var(--accent-cyan);
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        opacity: 0.5;
        animation: float infinite linear;
    }
    @keyframes float {
        0% { transform: translateY(0) scale(1); opacity: 0; }
        50% { opacity: 0.5; }
        100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
    }
`;
document.head.appendChild(style);
