document.addEventListener("DOMContentLoaded", function () {

    let currentIndex = 0;

    const slider = document.getElementById("slider");
    const slides = document.querySelectorAll(".project-slide");

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
    }

    window.nextProject = function () {

    // trova il prossimo multiplo di 3
    currentIndex = Math.ceil((currentIndex + 1) / 3) * 3;

    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    updateSlider();
}

    window.prev = function () {
        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }

        updateSlider();
    }

});
