const header = document.querySelector(".site-header");
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const navigationLinks = document.querySelectorAll(".nav-links a");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");

// Add a background and border to the header after scrolling.
function updateHeader() {
    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

// Open or close the mobile navigation menu.
function toggleMenu() {
    const isOpen = navLinks.classList.toggle("active");

    menuButton.classList.toggle("active", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
}

// Close the mobile menu after selecting a navigation link.
function closeMenu() {
    navLinks.classList.remove("active");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
}

// Reveal page elements as they enter the viewport.
const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

// Highlight the navigation link for the section currently in view.
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            navigationLinks.forEach((link) => {
                link.classList.remove("active");

                if (link.getAttribute("href") === `#${entry.target.id}`) {
                    link.classList.add("active");
                }
            });
        });
    },
    {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});

menuButton.addEventListener("click", toggleMenu);

navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", updateHeader);

window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
        closeMenu();
    }
});

updateHeader();
