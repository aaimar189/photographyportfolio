document.addEventListener("DOMContentLoaded", function () {

    let currentIndex = 0;

    const slider = document.getElementById("slider");
    const slides = document.querySelectorAll(".project-slide");

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
    }

    window.next = function () {
        currentIndex++;

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

    // 🔥 NUOVA FUNZIONE (NON TOCCARE ALTRO)
    window.nextProject = function () {
        currentIndex += 3; // salta 3 slide (1 progetto)

        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }

        updateSlider();
    }

});
