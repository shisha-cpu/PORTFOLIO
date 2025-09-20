document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: "#4facfe" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#4facfe",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        },
        retina_detect: true
    });

    const portfolioApp = {
        currentIndex: 0,
        scrollCount: 0,
        sections: document.querySelectorAll('.section'),
        dots: document.querySelectorAll('.dot'),
        gridBg: document.querySelector('.grid-bg'),
        scrollsPerSection: 8,
        touchStartY: 0,
        touchEndY: 0,
        
        updateSections: function() {
            this.sections.forEach((section, index) => {
                section.classList.remove('active', 'next', 'far', 'gone');
                
                if (index === this.currentIndex) {
                    section.classList.add('active');
                } else if (index === this.currentIndex + 1) {
                    section.classList.add('next');
                } else if (index > this.currentIndex + 1) {
                    section.classList.add('far');
                } else if (index < this.currentIndex) {
                    section.classList.add('gone');
                }
            });
            
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
            
            this.gridBg.style.transform = 
                `perspective(500px) rotateX(60deg) translateZ(${-this.currentIndex * 20 - 100}px)`;
        },
        
        init: function() {
            this.setupEventListeners();
            this.updateSections();
        },
        
        setupEventListeners: function() {
            window.addEventListener('wheel', (e) => {
                e.preventDefault();
                if (e.deltaY > 0) {
                    this.scrollCount++;
                    if (this.scrollCount >= this.scrollsPerSection && this.currentIndex < this.sections.length - 1) {
                        this.currentIndex++;
                        this.scrollCount = 0;
                    }
                } else if (e.deltaY < 0) {
                    this.scrollCount--;
                    if (this.scrollCount <= -this.scrollsPerSection && this.currentIndex > 0) {
                        this.currentIndex--;
                        this.scrollCount = 0;
                    }
                }
                this.updateSections();
            }, { passive: false });
            
            window.addEventListener('touchstart', (e) => {
                this.touchStartY = e.changedTouches[0].screenY;
            }, { passive: true });
            
            window.addEventListener('touchend', (e) => {
                this.touchEndY = e.changedTouches[0].screenY;
                const swipeDistance = this.touchStartY - this.touchEndY;
                const swipeThreshold = 50;
                
                if (swipeDistance > swipeThreshold && this.currentIndex < this.sections.length - 1) {
                    this.currentIndex++;
                    this.scrollCount = 0;
                    this.updateSections();
                } else if (swipeDistance < -swipeThreshold && this.currentIndex > 0) {
                    this.currentIndex--;
                    this.scrollCount = 0;
                    this.updateSections();
                }
            }, { passive: true });
            
            this.dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    this.currentIndex = parseInt(dot.getAttribute('data-index'));
                    this.scrollCount = 0;
                    this.updateSections();
                });
            });
            
            window.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (this.currentIndex < this.sections.length - 1) {
                        this.currentIndex++;
                        this.scrollCount = 0;
                        this.updateSections();
                    }
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (this.currentIndex > 0) {
                        this.currentIndex--;
                        this.scrollCount = 0;
                        this.updateSections();
                    }
                }
            });
        }
    };
    
    portfolioApp.init();
});