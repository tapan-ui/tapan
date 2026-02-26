gsap.registerPlugin(ScrollTrigger);
if (window.innerWidth < 768) {
  gsap.globalTimeline.timeScale(0.7);
}

// Mobile Menu Toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");

    // Prevent scrolling when menu is open
    if (navLinks.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  // Close menu when clicking a link
  const links = document.querySelectorAll(".nav-links a");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });
}

// Initialize Lenis Smooth Scroll
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Custom Cursor Elite with Trail
const cursor = document.querySelector("#custom-cursor");
const follower = document.querySelector("#custom-cursor-follower");
const trail = document.querySelector("#custom-cursor-trail");

const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice && cursor && follower && trail) {
  document.addEventListener("mousemove", (e) => {
    const { clientX: x, clientY: y } = e;
    gsap.to(cursor, { x, y, duration: 0.1 });
    gsap.to(follower, {
      x: x - 17,
      y: y - 17,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(trail, {
      x: x - 3,
      y: y - 3,
      duration: 0.6,
      ease: "power3.out",
    });
  });
}

// Text Scramble Effect
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let scrambleInterval = null;

const scrambleEffect = (target) => {
  let iteration = 0;
  clearInterval(scrambleInterval);
  const originalText = target.dataset.value || target.innerText;
  if (!target.dataset.value) target.dataset.value = originalText;

  scrambleInterval = setInterval(() => {
    target.innerText = originalText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return originalText[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= originalText.length) {
      clearInterval(scrambleInterval);
    }
    iteration += 1 / 3;
  }, 30);
};

// Apply Scramble to all headings
document
  .querySelectorAll(".split-text, h1, h2.accent-text")
  .forEach((heading) => {
    heading.addEventListener("mouseover", (e) => scrambleEffect(e.target));
  });

// Preloader & Entrance Animations
window.addEventListener("load", () => {
  const tl = gsap.timeline();

  // Hide Preloader
  if (document.querySelector("#preloader")) {
    tl.to("#preloader", {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        document.querySelector("#preloader").style.display = "none";
      },
    });
  }

  // Reveal all initially hidden
  gsap.set(
    ".split-text, .hero-subtitle, .bento-item, .avatar-container, .about-img, .timeline-content",
    {
      opacity: 1,
    },
  );

  tl.from(
    ".logo",
    { y: -30, opacity: 0, duration: 1, ease: "expo.out" },
    "-=0.5",
  )
    .from(
      ".nav-link",
      { y: -20, opacity: 0, stagger: 0.1, duration: 1, ease: "expo.out" },
      "-=0.8",
    )
    .from(
      "h1",
      { y: 100, skewY: 10, opacity: 0, duration: 1.5, ease: "expo.out" },
      "-=0.8",
    )
    .from(
      ".avatar-container, .about-img",
      { scale: 0.8, opacity: 0, duration: 1.5, ease: "expo.out" },
      "-=1.2",
    )
    .from(
      ".hero-subtitle",
      { y: 20, opacity: 0, duration: 1, ease: "expo.out" },
      "-=1.2",
    )
    .from(
      ".bento-item, .timeline-item",
      {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=1",
    );
});

// 3D Tilt Effect for All Cards and Images
const interactiveElements = document.querySelectorAll(
  ".bento-item, .about-img, .philosophy-card, .contact-form-side",
);
interactiveElements.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(el, {
      rotateY: x * 8,
      rotateX: -y * 8,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });
  });

  el.addEventListener("mouseleave", () => {
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  });
});

// Interactive background glow
document.addEventListener("mousemove", (e) => {
  gsap.to(".bg-glow", {
    x: (e.clientX - window.innerWidth / 2) * 0.05,
    y: (e.clientY - window.innerHeight / 2) * 0.05,
    duration: 1.5,
    ease: "power2.out",
  });
});

// Magnetic & Hover
const magnetics = document.querySelectorAll(".magnetic");
magnetics.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const bound = el.getBoundingClientRect();
    const x = e.clientX - bound.left - bound.width / 2;
    const y = e.clientY - bound.top - bound.height / 2;
    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4 });
    if (follower)
      gsap.to(follower, {
        scale: 2.5,
        backgroundColor: "rgba(0, 242, 255, 0.1)",
        duration: 0.3,
      });
  });
  el.addEventListener("mouseleave", () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.4 });
    if (follower)
      gsap.to(follower, {
        scale: 1,
        backgroundColor: "transparent",
        duration: 0.3,
      });
  });
});
