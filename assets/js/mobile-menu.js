// Mobile menu functionality
document.addEventListener("DOMContentLoaded", function () {
  // Get mobile menu elements
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileHeader = document.querySelector(".mobile-header");

  // Toggle menu when hamburger is clicked
  if (menuToggle && mobileMenu) {
    // Add touch feedback
    menuToggle.addEventListener("touchstart", function () {
      this.classList.add("touch-active");
    });

    menuToggle.addEventListener("touchend", function () {
      this.classList.remove("touch-active");
    });

    // Set initial aria state
    menuToggle.setAttribute("aria-expanded", "false"); // Toggle menu
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent click from bubbling to document
      mobileMenu.classList.toggle("active");
      menuToggle.classList.toggle("is-active");
      const isActive = mobileMenu.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", isActive);

      // Change icon based on menu state
      menuToggle.innerHTML = isActive ? "✕" : "☰";
    }); // Close menu when a link is clicked
    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
        menuToggle.classList.remove("is-active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = "☰"; // Change back to hamburger icon
      });
    }); // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      const isClickInside =
        menuToggle.contains(event.target) || mobileMenu.contains(event.target);
      if (!isClickInside && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        menuToggle.classList.remove("is-active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = "☰"; // Change back to hamburger icon
      }
    });
  }
});
