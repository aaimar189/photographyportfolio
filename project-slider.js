let currentIndex = 0;
const slides = document.querySelectorAll('.project-slide');

function updateSlider() {
    const slider = document.getElementById('slider');
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function next() {
    currentIndex++;
    
    if (currentIndex >= slides.length) {
        currentIndex = 0; // 🔥 torna alla prima
    }

    updateSlider();
}

function prev() {
    currentIndex--;
    
    if (currentIndex < 0) {
        currentIndex = slides.length - 1; // 🔥 vai all'ultima
    }

    updateSlider();
}
