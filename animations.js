// Advanced animations and effects
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.initParticleBackground();
        this.initHoverEffects();
        this.initScrollReveal();
        this.initFloatingAnimation();
        this.initMouseFollower();
    }

    // Particle background animation
    initParticleBackground() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.1';
        
        document.body.appendChild(canvas);

        const particles = [];
        const particleCount = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
                ctx.fill();
            }
        }

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections between close particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        resizeCanvas();
        animate();

        window.addEventListener('resize', resizeCanvas);

        // Hide particles on mobile for performance
        if (window.innerWidth <= 768) {
            canvas.style.display = 'none';
        }
    }

    // Enhanced hover effects
    initHoverEffects() {
        // Magnetic button effect
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px) scale(1.02)';
                button.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
                button.style.boxShadow = 'none';
            });
        });

        // Card tilt effect
        const cards = document.querySelectorAll('.skill-card, .project-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });

        // Profile image rotation effect
        const profileImage = document.querySelector('.profile-image');
        if (profileImage) {
            let rotation = 0;
            
            profileImage.addEventListener('mouseenter', () => {
                const rotate = setInterval(() => {
                    rotation += 2;
                    profileImage.style.transform = `rotate(${rotation}deg) scale(1.05)`;
                    
                    if (rotation >= 360) {
                        rotation = 0;
                        clearInterval(rotate);
                        profileImage.style.transform = 'rotate(0deg) scale(1.05)';
                    }
                }, 10);
            });
            
            profileImage.addEventListener('mouseleave', () => {
                profileImage.style.transform = 'rotate(0deg) scale(1)';
            });
        }
    }

    // Scroll reveal animations
    initScrollReveal() {
        const revealElements = document.querySelectorAll('.section-title, .section-subtitle, .about-text p, .contact-item');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, index * 100);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            revealObserver.observe(element);
        });

        // Add revealed class styles
        const style = document.createElement('style');
        style.textContent = `
            .revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Floating animation for certain elements
    initFloatingAnimation() {
        const floatingElements = document.querySelectorAll('.skill-icon, .contact-icon');
        
        floatingElements.forEach((element, index) => {
            element.style.animation = `float ${2 + Math.random()}s ease-in-out infinite`;
            element.style.animationDelay = `${index * 0.2}s`;
        });

        // Add floating keyframes
        const floatingStyle = document.createElement('style');
        floatingStyle.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-10px);
                }
            }
        `;
        document.head.appendChild(floatingStyle);
    }

    // Mouse follower effect
    initMouseFollower() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        const cursor = document.createElement('div');
        cursor.className = 'cursor-follower';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(59, 130, 246, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: multiply;
            transition: all 0.1s ease;
        `;
        
        document.body.appendChild(cursor);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function updateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.1;
            cursorY += dy * 0.1;
            
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            
            requestAnimationFrame(updateCursor);
        }

        updateCursor();

        // Scale cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.backgroundColor = 'rgba(59, 130, 246, 0.8)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.backgroundColor = 'rgba(59, 130, 246, 0.5)';
            });
        });
    }
}

// Intersection Observer for performance optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.enableReducedMotion();
    }

    optimizeImages() {
        const images = document.querySelectorAll('img');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    enableReducedMotion() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition', 'none');
            
            // Disable animations for users who prefer reduced motion
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
    new PerformanceOptimizer();
});

// Parallax scrolling effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroContent.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Text animation effects
class TextAnimations {
    static splitText(element) {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${index * 0.05}s`;
            element.appendChild(span);
        });
    }

    static animateOnScroll(selector, animationType = 'fadeInUp') {
        const elements = document.querySelectorAll(selector);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationType);
                    observer.unobserve(entry.target);
                }
            });
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Initialize text animations
document.addEventListener('DOMContentLoaded', () => {
    initParallaxEffect();
    TextAnimations.animateOnScroll('.timeline-item', 'slideInLeft');
    TextAnimations.animateOnScroll('.skill-card', 'fadeInUp');
    TextAnimations.animateOnScroll('.project-card', 'zoomIn');
});

// Add animation CSS
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .fadeInUp {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .slideInLeft {
        animation: slideInLeft 0.8s ease forwards;
    }
    
    .zoomIn {
        animation: zoomIn 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(animationStyles);