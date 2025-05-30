/**
 * Force CSS Loading for Vercel Deployment
 * This script ensures CSS files are properly loaded in production environments
 */

// Execute immediately when the script loads
(function() {
    // Check if we're on Vercel or any non-localhost environment
    const isProduction = window.location.hostname.includes('vercel.app') || 
                        window.location.hostname !== 'localhost';
    
    if (isProduction) {
        console.log('Production environment detected, applying CSS fixes');
        
        // Function to force load a CSS file with cache busting
        function forceLoadCSS(href) {
            return new Promise((resolve, reject) => {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href + '?t=' + new Date().getTime();
                
                link.onload = () => {
                    console.log('CSS loaded:', href);
                    resolve();
                };
                
                link.onerror = () => {
                    console.error('Failed to load CSS:', href);
                    reject();
                };
                
                document.head.appendChild(link);
            });
        }
        
        // Critical CSS files that must be loaded first
        const criticalCSSFiles = [
            'styles.css',
            'modern-styles.css',
            'responsive.css',
            'vercel-override.css'
        ];
        
        // Secondary CSS files
        const secondaryCSSFiles = [
            'auth-styles.css',
            'ai-loading-indicator.css',
            'chat-enhancements.css',
            'loading-states.css',
            'web-search.css',
            'sources-display.css',
            'hvachat-ui.css',
            'scroll-behavior.css',
            'input-fix.css',
            'chat-fixes.css',
            'deployment-fixes.css'
        ];
        
        // Load critical CSS files first
        Promise.all(criticalCSSFiles.map(file => forceLoadCSS(file)))
            .then(() => {
                console.log('Critical CSS files loaded');
                
                // Then load secondary CSS files
                return Promise.all(secondaryCSSFiles.map(file => forceLoadCSS(file)));
            })
            .then(() => {
                console.log('All CSS files loaded successfully');
                
                // Apply any additional fixes if needed
                document.body.classList.add('css-loaded');
                
                // Force a layout recalculation
                document.body.offsetHeight;
            })
            .catch(error => {
                console.error('Error loading CSS files:', error);
            });
            
        // Apply critical inline styles immediately
        const criticalStyles = document.createElement('style');
        criticalStyles.textContent = `
            /* Critical layout styles */
            .app-container {
                width: 100% !important;
                max-width: 100% !important;
                display: flex !important;
            }
            
            .chat-sidebar {
                width: 260px !important;
                min-width: 260px !important;
                max-width: 260px !important;
                flex: 0 0 260px !important;
            }
            
            .main-content {
                flex: 1 !important;
                max-width: calc(100% - 260px) !important;
            }
            
            .feature-cards {
                display: flex !important;
                flex-wrap: wrap !important;
                gap: 1rem !important;
                justify-content: space-between !important;
            }
            
            .feature-card {
                flex: 1 1 calc(25% - 1rem) !important;
                min-width: 150px !important;
            }
            
            @media (max-width: 768px) {
                .main-content {
                    max-width: 100% !important;
                    width: 100% !important;
                }
                
                .feature-card {
                    flex: 1 1 calc(50% - 1rem) !important;
                }
            }
        `;
        document.head.appendChild(criticalStyles);
    }
})();
