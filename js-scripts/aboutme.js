// Add this to each main JS file (e.g., index.js, aboutme.js, projects.js)
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('fade-overlay')?.classList.add('fade-out');
    }, 200); // slight delay for effect
});