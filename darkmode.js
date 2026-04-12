// Dark mode functionality
class DarkModeController {
    constructor() {
        this.darkMode = false;
        this.toggleButton = document.getElementById('theme-toggle');
        this.init();
    }

    init() {
        this.loadUserPreference();
        this.setupToggle();
        this.setupSystemPreference();
        this.updateIcon();
    }

    loadUserPreference() {
        // Check for saved user preference
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            this.darkMode = savedTheme === 'dark';
        } else {
            // Check system preference
            this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        this.applyTheme();
    }

    setupToggle() {
        this.toggleButton.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Keyboard support
        this.toggleButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    setupSystemPreference() {
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.darkMode = e.matches;
                this.applyTheme();
                this.updateIcon();
            }
        });
    }

    toggleTheme() {
        this.darkMode = !this.darkMode;
        this.applyTheme();
        this.saveUserPreference();
        this.updateIcon();
        this.animateToggle();
    }

    applyTheme() {
        if (this.darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.classList.add('dark-theme');
        } else {
            document.documentElement.removeAttribute('data-theme');
            document.body.classList.remove('dark-theme');
        }

        // Update meta theme color for mobile browsers
        this.updateMetaThemeColor();
    }

    saveUserPreference() {
        localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
    }

    updateIcon() {
        const icon = this.toggleButton.querySelector('i');
        
        if (this.darkMode) {
            icon.className = 'fas fa-sun';
            this.toggleButton.setAttribute('aria-label', 'Switch to light mode');
        } else {
            icon.className = 'fas fa-moon';
            this.toggleButton.setAttribute('aria-label', 'Switch to dark mode');
        }
    }

    updateMetaThemeColor() {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }

        metaThemeColor.content = this.darkMode ? '#111827' : '#FFFFFF';
    }

    animateToggle() {
        // Create a smooth transition animation
        this.toggleButton.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            this.toggleButton.style.transform = 'scale(1)';
        }, 150);

        // Add ripple effect
        this.createRippleEffect();
    }

    createRippleEffect() {
        const ripple = document.createElement('div');
        const rect = this.toggleButton.getBoundingClientRect();
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(59, 130, 246, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${rect.left + rect.width / 2 - 25}px;
            top: ${rect.top + rect.height / 2 - 25}px;
            width: 50px;
            height: 50px;
            pointer-events: none;
            z-index: 10000;
        `;

        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Theme transition animations
class ThemeTransitions {
    constructor() {
        this.setupTransitions();
    }

    setupTransitions() {
        // Add transition styles for smooth theme switching
        const style = document.createElement('style');
        style.textContent = `
            * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
            }
            
            .theme-transition {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes themeSwitch {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);

        // Add theme transition class to elements
        const elements = document.querySelectorAll('body, .navbar, .hero, section, .btn, .skill-card, .project-card, .contact-form');
        elements.forEach(el => el.classList.add('theme-transition'));
    }
}

// Enhanced dark mode features
class EnhancedDarkMode {
    constructor() {
        this.setupAdvancedFeatures();
    }

    setupAdvancedFeatures() {
        this.setupAutoMode();
        this.setupCustomColors();
        this.setupAccessibility();
    }

    setupAutoMode() {
        // Auto mode based on time of day
        const hour = new Date().getHours();
        const isNightTime = hour >= 20 || hour <= 6;
        
        if (!localStorage.getItem('theme') && isNightTime) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    setupCustomColors() {
        // Allow users to customize dark mode colors
        const darkModeColors = {
            primary: '#3B82F6',
            primaryDark: '#2563EB',
            background: '#111827',
            surface: '#1F2937',
            text: '#F9FAFB',
            textSecondary: '#D1D5DB'
        };

        // Apply custom colors if user has preferences
        const savedColors = localStorage.getItem('darkModeColors');
        if (savedColors) {
            const colors = JSON.parse(savedColors);
            this.applyCustomColors(colors);
        }
    }

    applyCustomColors(colors) {
        const root = document.documentElement;
        
        Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(`--dark-${key}`, value);
        });
    }

    setupAccessibility() {
        // Respect user's reduced motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const style = document.createElement('style');
            style.textContent = `
                * {
                    transition: none !important;
                    animation: none !important;
                }
            `;
            document.head.appendChild(style);
        }

        // High contrast mode support
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            document.documentElement.setAttribute('data-high-contrast', 'true');
        }
    }
}

// Initialize dark mode when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DarkModeController();
    new ThemeTransitions();
    new EnhancedDarkMode();
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DarkModeController, ThemeTransitions, EnhancedDarkMode };
}

// Utility functions for theme management
const ThemeUtils = {
    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    },

    isSystemDarkMode() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    },

    saveThemePreference(theme) {
        localStorage.setItem('theme', theme);
    },

    getThemePreference() {
        return localStorage.getItem('theme');
    },

    clearThemePreference() {
        localStorage.removeItem('theme');
    },

    // Theme-specific utility classes
    addThemeClass(element, lightClass, darkClass) {
        const theme = this.getCurrentTheme();
        element.classList.remove(lightClass, darkClass);
        element.classList.add(theme === 'dark' ? darkClass : lightClass);
    },

    // Generate theme-aware colors
    getThemeColor(colorName, opacity = 1) {
        const colors = {
            light: {
                primary: '#3B82F6',
                background: '#FFFFFF',
                text: '#1F2937'
            },
            dark: {
                primary: '#60A5FA',
                background: '#111827',
                text: '#F9FAFB'
            }
        };

        const theme = this.getCurrentTheme();
        const color = colors[theme][colorName];
        
        if (opacity < 1) {
            const rgb = this.hexToRgb(color);
            return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
        }

        return color;
    },

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
};

// Make ThemeUtils globally available
window.ThemeUtils = ThemeUtils;