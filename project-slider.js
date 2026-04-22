let current = 0;
const slider = document.querySelector('.project-slider');
const slides = document.querySelectorAll('.project-slide');
const total = slides.length;

function updateSlider() {
    slider.style.transform = `translateX(-${current * 100}vw)`;
}

function next() {
    if (current < total - 1) {
        current++;
        updateSlider();
    }
}

function prev() {
    if (current > 0) {
        current--;
        updateSlider();
    }
}
