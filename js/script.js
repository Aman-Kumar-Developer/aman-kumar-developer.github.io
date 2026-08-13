// Simple portfolio interactions — no framework required.

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");
const detailButtons = document.querySelectorAll(".details-toggle");

// Mobile navigation.
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    });
});

// Project details expand/collapse.
detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".project-card");
        const isOpen = card.classList.toggle("open");

        button.setAttribute("aria-expanded", String(isOpen));
        button.innerHTML = isOpen
            ? "<span>−</span> Details"
            : "<span>+</span> Details";
    });
});

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            navItems.forEach((item) => {
                item.classList.toggle(
                    "active",
                    item.getAttribute("href") === `#${entry.target.id}`
                );
            });
        });
    },
    { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => observer.observe(section));

// Small reveal animation for cards and the architecture image.
const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
    (entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Current year.
document.getElementById("year").textContent = new Date().getFullYear();

// Profile Image Lightbox Logic
const modal = document.getElementById("imageModal");
const profilePic = document.getElementById("profilePic");
const modalImg = document.getElementById("expandedImage");
const closeBtn = document.querySelector(".modal-close");

// Open modal on click
profilePic.onclick = function() {
    modal.style.display = "flex";
    // Brief timeout allows the browser to register display:flex before applying the opacity transition
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);
    modalImg.src = this.src;
}

// Function to close modal smoothly
const closeModal = () => {
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
    }, 300); // Matches the CSS transition duration
}

// Close on 'X' click
closeBtn.onclick = closeModal;

// Close when clicking outside the image
modal.onclick = function(event) {
    if (event.target !== modalImg) {
        closeModal();
    }
}

// Close on Escape key press
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && modal.classList.contains("show")) {
        closeModal();
    }
});
