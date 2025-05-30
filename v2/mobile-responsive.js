/**
 * Mobile responsiveness enhancement for HVAC AI Demo
 * Provides functionality for mobile sidebar toggle and responsive adjustments
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle button if it doesn't exist
    if (!document.getElementById('mobileSidebarToggle')) {
        const toggleButton = document.createElement('button');
        toggleButton.id = 'mobileSidebarToggle';
        toggleButton.className = 'mobile-sidebar-toggle';
        toggleButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        `;
        
        // Add the toggle button to the header controls
        const headerControls = document.querySelector('.header-controls');
        if (headerControls) {
            headerControls.prepend(toggleButton);
        }
        
        // Add event listener for toggle
        toggleButton.addEventListener('click', toggleSidebar);
    }
    
    // Add overlay for closing sidebar when clicking outside
    if (!document.getElementById('sidebarOverlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'sidebarOverlay';
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', closeSidebar);
    }
    
    // Handle resize events
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleResize();
});

/**
 * Toggle the sidebar visibility on mobile
 */
function toggleSidebar() {
    const sidebar = document.querySelector('.chat-sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar) {
        sidebar.classList.toggle('active');
        
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            if (overlay) overlay.classList.add('active');
        } else {
            document.body.style.overflow = '';
            if (overlay) overlay.classList.remove('active');
        }
    }
}

/**
 * Close the sidebar
 */
function closeSidebar() {
    const sidebar = document.querySelector('.chat-sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar) {
        sidebar.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (overlay) {
        overlay.classList.remove('active');
    }
}

/**
 * Handle window resize events
 */
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    const sidebar = document.querySelector('.chat-sidebar');
    const toggle = document.getElementById('mobileSidebarToggle');
    
    if (toggle) {
        toggle.style.display = isMobile ? 'flex' : 'none';
    }
    
    if (!isMobile && sidebar) {
        // Always show sidebar on desktop
        sidebar.classList.remove('active');
        document.body.style.overflow = '';
        
        // Hide overlay
        const overlay = document.getElementById('sidebarOverlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
}

// Export functions for global access
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
