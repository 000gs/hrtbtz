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
        gallery.style.animationPlayState = 'paused'; // Stop the carousel when clicked
        images.forEach((img) => img.style.transform = 'scale(1)'); // Reset scaling
        e.target.parentElement.style.transform = 'scale(1.5)'; // Enlarge clicked image
        descText.textContent = e.target.parentElement.getAttribute('data-text');
        description.classList.add('show'); // Show description
    });

    image.addEventListener('mouseover', () => {
        clearTimeout(hoverTimeout); // Prevent timeout from resuming the carousel too soon
    });

    image.addEventListener('mouseout', () => {
        hoverTimeout = setTimeout(() => {
            if (!isHovered) {
                gallery.style.animationPlayState = 'running'; // Resume the carousel after 3 seconds
            }
        }, 3000);
    });
});

exitBtn.addEventListener('click', () => {
    // Fade out description and exit button
    description.classList.add('fade-out');
    setTimeout(() => {
        description.classList.remove('show', 'fade-out'); // Hide description after fade-out
    }, 500); // Match the duration of the fade-out animation

    // Resume the carousel and reset image scaling
    gallery.style.animationPlayState = 'running';
    images.forEach((img) => img.style.transform = 'scale(1)');
    isHovered = false;
});
