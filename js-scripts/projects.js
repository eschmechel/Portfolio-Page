// Rotating hero background using project images

//Rotating background images
const images = [
    // Use your actual project image URLs here, or sample images for now
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
];

let idx = 0;
function rotateHeroBg() {
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        hero.style.backgroundImage = `url('${images[idx]}')`;
        idx = (idx + 1) % images.length;
    }
}

// Initial set and interval
rotateHeroBg();
setInterval(rotateHeroBg, 4000);

// Smoothly shrink hero background as you scroll down
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-bg');
    if (!hero) return;
    const startHeight = 68; // vh
    const endHeight = 20;   // vh
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    // Calculate scroll progress (0 at top, 1 at bottom)
    let progress = Math.min(scrollY / (docHeight || 1), 1);
    // Interpolate height
    const newHeight = startHeight - (startHeight - endHeight) * progress;
    hero.style.height = `${newHeight}vh`;
});

window.addEventListener('DOMContentLoaded', () => {
    // Modal logic (ensure this runs after DOM is ready)
    document.querySelectorAll('.project-card a').forEach((btn, idx) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showProjectModal(idx);
        });
    });

    document.querySelector('.modal-close').onclick = function() {
        document.getElementById('project-modal').classList.remove('show');
        document.body.classList.remove('modal-open'); // Add this line
    };
    document.getElementById('project-modal').onclick = function(e) {
        if (e.target === this) {
            this.classList.remove('show');
            document.body.classList.remove('modal-open'); // Add this line
        }
    };
});

function showProjectModal(idx) {
    // Get the project card
    const projectCards = document.querySelectorAll('.project-card');
    const card = projectCards[idx];

    // Extract info from the card
    const imgSrc = card.querySelector('.project-image')?.getAttribute('src') || '';
    const imgAlt = card.querySelector('.project-image')?.getAttribute('alt') || '';
    const title = card.querySelector('h3')?.textContent || '';
    const subtitle = card.querySelector('.project-subtitle')?.textContent || '';
    const desc = card.querySelector('.project-desc')?.innerHTML || '';
    const techIcons = card.querySelector('.tech-icons')?.innerHTML || '';
    const timeline = card.querySelector('.project-timeline')?.textContent || '';

    // Left: title at top, subtitle underneath, gap, then description, then tech stack, then timeline
    const modalProject = document.querySelector('.modal-project');
    modalProject.innerHTML = `
        <h3 style="margin:0 0 8px 0;">${title}</h3>
        <h4 class="project-subtitle" style="margin:0 0 20px 0;">${subtitle}</h4>
        <p style="margin:0 0 24px 0;">${desc}</p>
        <div class="tech-icons" style="margin-bottom:16px;">${techIcons}</div>
        <div class="project-timeline" style="font-size:1.05em;color:#b39ddb;margin-top:8px;">
            ${timeline}
        </div>
    `;

    const modalGallery = document.querySelector('.modal-gallery');
    modalGallery.innerHTML = `
        <img src="${imgSrc}" alt="${imgAlt}" style="max-width:100%;max-height:400px;border-radius:8px;">
    `;

    document.getElementById('project-modal').classList.add('show');
    document.body.classList.add('modal-open');
}