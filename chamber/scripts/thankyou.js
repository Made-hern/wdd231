
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

// Read the submitted form information from the URL
const params = new URLSearchParams(window.location.search);

// Display values safely using textContent
function displaySubmittedValue(elementId, parameterName) {
    const element = document.querySelector(`#${elementId}`);
    const value = params.get(parameterName);

    if (element) {
        element.textContent = value && value.trim() !== ""
            ? value
            : "Not provided";
    }
}

displaySubmittedValue("submitted-first-name", "firstName");
displaySubmittedValue("submitted-last-name", "lastName");
displaySubmittedValue("submitted-email", "email");
displaySubmittedValue("submitted-phone", "phone");
displaySubmittedValue("submitted-organization", "organization");

// Format the submission date and time
const timestampElement = document.querySelector("#submitted-timestamp");
const timestampValue = params.get("timestamp");

if (timestampElement && timestampValue) {
    const submittedDate = new Date(timestampValue);

    if (!Number.isNaN(submittedDate.getTime())) {
        timestampElement.textContent = submittedDate.toLocaleString("en-US", {
            dateStyle: "long",
            timeStyle: "short"
        });
    } else {
        timestampElement.textContent = timestampValue;
    }
}
