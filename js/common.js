// This is a shared script for all pages. It highlights the active menu link and makes the pages fade in smoothly.
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    const topNavLinks = document.querySelectorAll('header nav ul li a');
    topNavLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    const sidebarLinks = document.querySelectorAll('.sidebar .nav-link');
    sidebarLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50);

    document.querySelectorAll('img').forEach(img => {
        if (!img.getAttribute('alt')) {
            img.setAttribute('alt', 'Cyberjaya Sports Center Facility');
        }
    });
});
