const gallery = document.getElementById('gallery');
const images = document.querySelectorAll('.image');
const description = document.getElementById('description');
const descText = document.getElementById('desc-text');
const exitBtn = document.getElementById('exit-btn');
let hoverTimeout;
let isHovered = false;

gallery.addEventListener('mouseover', () => {
    gallery.style.animationPlayState = 'paused';
    isHovered = true;
});

gallery.addEventListener('mouseout', () => {
    hoverTimeout = setTimeout(() => {
        if (!isHovered) {
            gallery.style.animationPlayState = 'running';
        }
    }, 3000);
});

images.forEach((image) => {
    image.addEventListener('click', (e) => {
        gallery.style.animationPlayState = 'paused';
        images.forEach((img) => img.style.transform = 'scale(1)');
        e.target.parentElement.style.transform = 'scale(1.5)';
        descText.textContent = e.target.parentElement.getAttribute('data-text');
        description.classList.add('show');
    });

    image.addEventListener('mouseover', () => {
        clearTimeout(hoverTimeout);
    });

    image.addEventListener('mouseout', () => {
        hoverTimeout = setTimeout(() => {
            if (!isHovered) {
                gallery.style.animationPlayState = 'running';
            }
        }, 3000);
    });
});

exitBtn.addEventListener('click', () => {
    gallery.style.animationPlayState = 'running';
    description.classList.add('fade-out');
    setTimeout(() => {
        description.classList.remove('show');
        description.classList.remove('fade-out');
    }, 500); // Match the duration of the fade-out animation

    images.forEach((img) => img.style.transform = 'scale(1)');
    isHovered = false;
});
