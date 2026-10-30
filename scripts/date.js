
// Get the current year
const currentYear = new Date().getFullYear();

document.querySelector("#current-year").textContent = currentYear;

// Get the last modified date
document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;
