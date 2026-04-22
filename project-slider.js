document.addEventListener("DOMContentLoaded", function () {

    let currentIndex = 0;
    const slides = document.querySelectorAll('.project-slide');
    const slider = document.getElementById('slider');

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
    }

    window.next = function () {
        currentIndex++;
        if (currentIndex >= slides.length) currentIndex = 0;
        updateSlider();
    }

    window.prev = function () {
        currentIndex--;
        if (currentIndex < 0) currentIndex = slides.length - 1;
        updateSlider();
    }

});
