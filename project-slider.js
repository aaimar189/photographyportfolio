
(function () {
    let currentIndex = 0;
    let slider = null;
    let slides = [];
    let projectStarts = [];
    let projectCounts = [];
    let dotsContainer = null;
    let dotButtons = [];
    let currentProjectIndex = -1;
    let isAnimating = false;
    const transitionMs = 480;
    const imageCache = new Set();

    function findProjectBySlideIndex(index) {
        for (let i = 0; i < projectStarts.length; i += 1) {
            const start = projectStarts[i];
            const count = projectCounts[i];
            const end = start + count - 1;
            if (index >= start && index <= end) {
                return {
                    projectIndex: i,
                    start: start,
                    count: count,
                    offset: index - start
                };
            }
        }
        return null;
    }

    function preloadSlide(index) {
        if (slides.length === 0) {
            return;
        }

        const safeIndex = (index + slides.length) % slides.length;
        const slide = slides[safeIndex];
        if (!slide) {
            return;
        }

        const bgImage = slide.style.backgroundImage;
        const match = bgImage && bgImage.match(/url\(["']?([^"')]+)["']?\)/);
        const url = match ? match[1] : "";

        if (!url || imageCache.has(url)) {
            return;
        }

        const img = new Image();
        img.src = url;
        imageCache.add(url);
    }

    function preloadNearbySlides() {
        preloadSlide(currentIndex);
        preloadSlide(currentIndex + 1);
        preloadSlide(currentIndex - 1);
        preloadSlide(currentIndex + 2);
        preloadSlide(currentIndex - 2);
    }

    function buildDotsForProject(info) {
        if (!dotsContainer || !info) {
            return;
        }

        let markup = "";
        for (let i = 0; i < info.count; i += 1) {
            markup += '<button class="project-dot" data-slide-index="' + (info.start + i) + '" aria-label="Go to image ' + (i + 1) + '"></button>';
        }
        dotsContainer.innerHTML = markup;
        dotButtons = Array.from(dotsContainer.querySelectorAll(".project-dot"));

        dotButtons.forEach(function (dotButton) {
            dotButton.addEventListener("click", function () {
                const slideIndex = Number(dotButton.getAttribute("data-slide-index"));
                if (!Number.isNaN(slideIndex) && !isAnimating) {
                    currentIndex = slideIndex;
                    updateSlider();
                }
            });
        });
    }

    function updateActiveDot(info) {
        if (!info || dotButtons.length === 0) {
            return;
        }

        dotButtons.forEach(function (dotButton) {
            dotButton.classList.remove("active");
        });

        const activeDot = dotButtons[info.offset];
        if (activeDot) {
            activeDot.classList.add("active");
        }
    }

    function updateSlider() {
        if (!slider || slides.length === 0 || isAnimating) {
            return;
        }

        isAnimating = true;
        const info = findProjectBySlideIndex(currentIndex);

        if (info && info.projectIndex !== currentProjectIndex) {
            currentProjectIndex = info.projectIndex;
            buildDotsForProject(info);
        }

        updateActiveDot(info);

        requestAnimationFrame(function () {
            slider.style.transform = "translate3d(-" + (currentIndex * 100) + "vw, 0, 0)";
        });

        preloadNearbySlides();

        window.setTimeout(function () {
            isAnimating = false;
        }, transitionMs);
    }

    function nextSlide() {
        if (slides.length === 0 || isAnimating) {
            return;
        }

        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        if (slides.length === 0 || isAnimating) {
            return;
        }

        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    function nextProjectSlide() {
        if (slides.length === 0 || isAnimating) {
            return;
        }

        const info = findProjectBySlideIndex(currentIndex);
        if (!info) {
            return;
        }

        const nextProjectIndex = (info.projectIndex + 1) % projectStarts.length;
        currentIndex = projectStarts[nextProjectIndex];
        updateSlider();
    }

    // Keep global functions for compatibility with existing HTML.
    window.next = nextSlide;
    window.prev = prevSlide;
    window.nextProject = nextProjectSlide;

    document.addEventListener("DOMContentLoaded", function () {
        slider = document.getElementById("slider");
        slides = Array.from(document.querySelectorAll(".project-slide"));
        dotsContainer = document.getElementById("project-dots");

        if (!slider || slides.length === 0) {
            return;
        }

        projectStarts = [];
        projectCounts = [];

        let previousProject = "";
        slides.forEach(function (slide, index) {
            const projectName = slide.getAttribute("data-project") || "default";
            if (projectName !== previousProject) {
                projectStarts.push(index);
                projectCounts.push(1);
                previousProject = projectName;
            } else {
                projectCounts[projectCounts.length - 1] += 1;
            }
        });

        const leftArrow = document.querySelector(".project-arrow.project-left");
        const rightArrow = document.querySelector(".project-arrow.project-right");
        const nextProjectButtons = document.querySelectorAll(".next-project");

        if (leftArrow) {
            leftArrow.addEventListener("click", prevSlide);
        }

        if (rightArrow) {
            rightArrow.addEventListener("click", nextSlide);
        }

        nextProjectButtons.forEach(function (button) {
            button.addEventListener("click", nextProjectSlide);
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "ArrowRight") {
                nextSlide();
            }
            if (e.key === "ArrowLeft") {
                prevSlide();
            }
        });

        updateSlider();
        preloadNearbySlides();
    });
})();
