let currentIndex = 0;

const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".project-slide");

function updateSlider() {
    const slideWidth = slider.clientWidth;
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function next() {
    currentIndex++;

    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    updateSlider();
}

function prev() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }

    updateSlider();
}
