window.addEventListener('DOMContentLoaded', () => {
    // Modal logic for featured project cards
    document.querySelectorAll('.project-card .view-details').forEach((btn, idx) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openProjectModal('featured', idx);
        });
    });

    // Modal logic for all project list cards
    document.querySelectorAll('.project-list-card').forEach((card, idx) => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            openProjectModal('list', idx);
        });
        card.querySelectorAll('a, img').forEach(el => {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                openProjectModal('list', idx);
            });
        });
    });

    document.querySelector('.modal-close').onclick = function() {
        document.getElementById('project-modal').classList.remove('show');
        document.body.classList.remove('modal-open');
    };
    document.getElementById('project-modal').onclick = function(e) {
        if (e.target === this) {
            this.classList.remove('show');
            document.body.classList.remove('modal-open');
        }
    };
});

// All projects data (single source of truth)
const allProjects = [
    {
        title: 'Portfolio Website',
        desc: 'Built as a minimalist, accessible, and reliable portfolio after learning from over-design and "tutorial hell." Inspired by satirical sites like <a href="https://motherfuckingwebsite.com" target="_blank" rel="noopener">motherfuckingwebsite.com</a>, this project focuses on MVP, accessibility, and best practices. It is a site I can be proud of, reflecting my journey from overcomplication to simplicity and personal growth.',
        img: '/images/blogs/blog-01/blog01-pic1.png',
        imgAlt: 'Portfolio Website Code Showcase',
        subtitle: 'Showcasing projects & skills',
        tech: [
            { src: 'images/logos/html5-logo.svg', alt: 'HTML5', title: 'HTML5' },
            { src: 'images/logos/js-logo.svg', alt: 'JavaScript', title: 'JavaScript' },
            { src: 'images/logos/css3-logo.svg', alt: 'CSS3', title: 'CSS3' }
        ],
        timeline: 'June 2025 - Present',
        github: 'https://github.com/eschmechel/Portfolio-Page',
        blog: '/blogs/blog-01.html',
    }
    // Add more all projects here
];

// Featured projects references allProjects by index
const featuredProjects = [
    allProjects[0], // Portfolio Website
    // Add more featured projects by referencing allProjects indices
];

function openProjectModal(type, idx) {
    let data;
    if (type === 'featured') {
        data = featuredProjects[idx];
    } else {
        data = allProjects[idx];
    }
    if (!data) return;
    // Unified modal content for both types, timeline and tech stack in a row
    const modalProject = document.querySelector('.modal-project');
    modalProject.innerHTML = `
        <div style=\"flex:1;width:100%;height:100%;display:flex;flex-direction:column;position:relative;font-size:1.13em;\">
            <div>
                <h3 style=\"margin:0 0 10px 0;font-size:2.1em;\">${data.title}</h3>
                ${data.subtitle ? `<h4 class=\"project-subtitle\" style=\"margin:0 0 22px 0;font-size:1.25em;\">${data.subtitle}</h4>` : ''}
                <div style=\"display:flex;align-items:center;gap:16px;margin-bottom:14px;\">
                    ${data.timeline ? `<div style=\"color:#b39ddb;font-size:1.13em;line-height:1;height:32px;display:flex;align-items:center;\">${data.timeline}</div>` : ''}
                    ${data.tech ? `<div class=\"tech-icons\" style=\"margin:0;gap:8px;height:32px;display:flex;align-items:flex-start;position:relative;top:-2px;\">${data.tech.map(t => `<img src='${t.src}' alt='${t.alt}' title='${t.title}' />`).join('')}</div>` : ''}
                </div>
                <hr style=\"border:0;border-top:1.5px solid #b7aaff;margin:0 0 20px 0;opacity:0.25;\">
                <p style=\"margin:0 0 28px 0;line-height:1.5;background:rgba(35,34,50,0.65);padding:18px 22px;border-radius:10px;box-shadow:0 2px 8px rgba(24,24,37,0.08);font-size:1.08em;\">${data.desc}</p>
            </div>
            <div style=\"margin-top:auto;position:absolute;left:0;right:0;bottom:80px;padding-left:32px;font-size:1.08em;color:#b39ddb;z-index:9;\">${data.extra ? data.extra : ''}</div>
        </div>
        <div class=\"modal-btn-row\">
            ${data.github ? `<a href='${data.github}' target='_blank' rel='noopener' class='github-btn'>View GitHub Repo</a>` : ''}
            ${data.blog ? `<a href='${data.blog}' target='_blank' rel='noopener' class='blog-btn'>View Blog Post</a>` : ''}
        </div>
    `;
    const modalGallery = document.querySelector('.modal-gallery');
    modalGallery.innerHTML = `
        <img src=\"${data.img}\" alt=\"${data.imgAlt}\" style=\"max-width:100%;max-height:400px;border-radius:8px;\">
    `;
    document.getElementById('project-modal').classList.add('show');
    document.body.classList.add('modal-open');
}