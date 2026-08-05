const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});

const sections = document.querySelectorAll("main section[id]");

const updateActiveNav = () => {
    let current = "home";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 130;
        if (window.scrollY >= sectionTop) {
            current = section.id;
        }
    });

    navItems.forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );
    });
};

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const fields = {
    name: {
        input: document.getElementById("name"),
        error: document.getElementById("nameError"),
        validate: (value) =>
            value.trim().length >= 2 ? "" : "Please enter at least 2 characters."
    },
    email: {
        input: document.getElementById("email"),
        error: document.getElementById("emailError"),
        validate: (value) => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(value.trim())
                ? ""
                : "Please enter a valid email address.";
        }
    },
    subject: {
        input: document.getElementById("subject"),
        error: document.getElementById("subjectError"),
        validate: (value) =>
            value.trim().length >= 3 ? "" : "Subject must be at least 3 characters."
    },
    message: {
        input: document.getElementById("message"),
        error: document.getElementById("messageError"),
        validate: (value) =>
            value.trim().length >= 10
                ? ""
                : "Message must be at least 10 characters."
    }
};

function validateField(field) {
    const message = field.validate(field.input.value);
    field.error.textContent = message;
    field.input.classList.toggle("invalid", Boolean(message));
    return !message;
}

Object.values(fields).forEach((field) => {
    field.input.addEventListener("blur", () => validateField(field));
    field.input.addEventListener("input", () => {
        if (field.input.classList.contains("invalid")) {
            validateField(field);
        }
    });
});

form.addEventListener("submit", (event) => {
    const isValid = Object.values(fields).every(validateField);

    if (!isValid) {
        event.preventDefault();

        formStatus.textContent = "Please fix the errors above.";
        formStatus.style.color = "#ff6b6b";

        return;
    }

    // Do NOT use preventDefault() here.
    // Do NOT reset the form here.
    // The browser will submit the filled form to Formspree.
});

    
