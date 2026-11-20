// Mobile navigation
const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
        const isExpanded = menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute("aria-expanded", String(!isExpanded));
        mainNav.classList.toggle("open");
    });
}

// Footer information
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}

// Add the submission date and time before sending the form
const membershipForm = document.querySelector("#membership-form");
const timestampInput = document.querySelector("#timestamp");

if (membershipForm && timestampInput) {
    membershipForm.addEventListener("submit", () => {
        timestampInput.value = new Date().toISOString();
    });
}

// Membership benefit dialogs
const benefitLinks = document.querySelectorAll(".benefits-link");

benefitLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const modalId = link.dataset.modal;
        const modal = document.querySelector(`#${modalId}`);

        if (modal) {
            modal.showModal();
        }
    });
});

// Close dialogs with their close buttons
const closeButtons = document.querySelectorAll(".modal-close");

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");

        if (modal) {
            modal.close();
        }
    });
});

// Close a dialog when the user clicks outside its content
const dialogs = document.querySelectorAll(".benefits-modal");

dialogs.forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});
