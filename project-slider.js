document.addEventListener("DOMContentLoaded", function () {

    let currentIndex = 0;

    const slider = document.getElementById("slider");
    const slides = document.querySelectorAll(".project-slide");

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
    }

    // 👉 FRECCIA DESTRA (MANCAVA)
    window.next = function () {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }

    // 👉 FRECCIA SINISTRA
    window.prev = function () {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // 👉 NEXT PROJECT
    window.nextProject = function () {
        currentIndex = Math.ceil((currentIndex + 1) / 3) * 3;

        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }

        updateSlider();
    }

});
