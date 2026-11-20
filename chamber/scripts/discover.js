
import { attractions } from "../data/discover.mjs";

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

// Display the visitor message using localStorage
const visitMessage = document.querySelector("#visit-message");
const storageKey = "discover-last-visit";
const currentVisit = Date.now();
const previousVisit = Number(localStorage.getItem(storageKey));

if (visitMessage) {
    if (!previousVisit || Number.isNaN(previousVisit) || previousVisit > currentVisit) {
        visitMessage.textContent =
            "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifference = currentVisit - previousVisit;
        const oneDay = 24 * 60 * 60 * 1000;

        if (timeDifference < oneDay) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            const daysSinceVisit = Math.floor(timeDifference / oneDay);
            const dayWord = daysSinceVisit === 1 ? "day" : "days";

            visitMessage.textContent =
                `You last visited ${daysSinceVisit} ${dayWord} ago.`;
        }
    }
}

localStorage.setItem(storageKey, currentVisit);

// Create the attraction cards
const attractionsContainer = document.querySelector("#attractions-container");

function createAttractionCard(attraction, index) {
    const card = document.createElement("article");
    card.classList.add("attraction-card", `area-${index + 1}`);

    const heading = document.createElement("h2");
    heading.textContent = attraction.name;

    const figure = document.createElement("figure");
    const image = document.createElement("img");

    image.src = attraction.image;
    image.alt = attraction.name;
    image.width = 300;
    image.height = 200;
    image.loading = "lazy";

    figure.appendChild(image);

    const address = document.createElement("address");
    address.textContent = attraction.address;

    const description = document.createElement("p");
    description.textContent = attraction.description;

    const moreInfo = document.createElement("p");
    moreInfo.classList.add("more-info");
    moreInfo.textContent = attraction.moreInfo;
    moreInfo.hidden = true;

    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("learn-more-button");
    button.textContent = "Learn More";
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", () => {
        const isExpanded = button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", String(!isExpanded));
        moreInfo.hidden = isExpanded;
        button.textContent = isExpanded ? "Learn More" : "Show Less";
    });

    card.append(
        heading,
        figure,
        address,
        description,
        moreInfo,
        button
    );

    return card;
}

if (attractionsContainer) {
    attractions.forEach((attraction, index) => {
        const card = createAttractionCard(attraction, index);
        attractionsContainer.appendChild(card);
    });
}
