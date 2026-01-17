/**
 * Trazzr SPA Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initMobileMenu();
  initSmoothScroll();
  initTestimonialCarousel();
});

/**
 * Sticky Header Effect
 * Adds a shadow and background when scrolling down
 */
function initStickyHeader() {
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!menuBtn || !mobileNav) return;

  // Toggle menu
  menuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
    menuBtn.classList.toggle("active"); // Optional: Add animation class to button
  });

  // Close menu when a link is clicked
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active");
      menuBtn.classList.remove("active");
    });
  });
}

/**
 * Smooth Scrolling
 * Handles smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
}

/**
 * Testimonial Carousel
 * Simple auto-sliding carousel
 */
function initTestimonialCarousel() {
  const track = document.querySelector(".carousel-track");
  const cards = document.querySelectorAll(".testimonial-card");

  if (!track || cards.length === 0) return;

  let currentIndex = 0;
  const intervalTime = 5000; // 5 seconds

  const slide = () => {
    currentIndex++;
    if (currentIndex >= cards.length) {
      currentIndex = 0;
    }
    updateCarousel();
  };

  const updateCarousel = () => {
    const width = cards[0].clientWidth;
    // Since we want to show 1 card at a time on mobile, but maybe flex on desktop?
    // For simplicity, let's assume one big card slide.
    // Actually, let's stick to percentage translation.
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  // Auto slide
  setInterval(slide, intervalTime);
}
