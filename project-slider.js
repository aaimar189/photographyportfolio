document.addEventListener("DOMContentLoaded", function () {

    let currentIndex = 0;

    const slider = document.getElementById("slider");
    const slides = document.querySelectorAll(".project-slide");

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
    }

    // 👉 FRECCIA DESTRA
    window.next = function () {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }

    // 👉 FRECCIA SINISTRA
    window.prev = function () {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // 👉 NEXT PROJECT (SENZA HARDCODE 3)
    window.nextProject = function () {

        // trova la prossima slide che ha una caption (cioè inizio progetto)
        let nextIndex = currentIndex + 1;

        while (nextIndex < slides.length) {
            if (slides[nextIndex].querySelector('.project-caption')) {
                currentIndex = nextIndex;
                updateSlider();
                return;
            }
            nextIndex++;
        }

        // se non trova → torna al primo progetto
        currentIndex = 0;
        updateSlider();
    }

});
