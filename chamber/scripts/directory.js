
const memberContainer = document.querySelector("#member-directory");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#main-nav");

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

currentYear.textContent = new Date().getFullYear();

const modifiedDate = new Date(document.lastModified);

lastModified.textContent = modifiedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
});

menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
});

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members = await response.json();

        displayMembers(members);
    } catch (error) {
        memberContainer.innerHTML = "<p>Unable to load the business directory. Please try again later.</p>";
        console.error("Error loading members:", error);
    }
}

function displayMembers(members) {
    memberContainer.innerHTML = "";

    members.forEach((member) => {
        const membershipNames = {
            1: "Member",
            2: "Silver Member",
            3: "Gold Member"
        };

        const card = document.createElement("article");
        card.classList.add("member-card");

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name}"
                loading="lazy"
                width="400"
                height="250"
            >

            <h3>${member.name}</h3>

            <p>${member.description}</p>

            <p><strong>Address:</strong> ${member.address}</p>

            <p><strong>Phone:</strong> ${member.phone}</p>

            <span class="membership-badge">
                ${membershipNames[member.membershipLevel]}
            </span>

            <a href="${member.website}" target="_blank" rel="noopener noreferrer">
                Visit Website
            </a>
        `;

        memberContainer.appendChild(card);
    });
}

gridButton.addEventListener("click", () => {
    memberContainer.classList.remove("member-list");
    memberContainer.classList.add("member-grid");

    gridButton.classList.add("active");
    listButton.classList.remove("active");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
});

listButton.addEventListener("click", () => {
    memberContainer.classList.remove("member-grid");
    memberContainer.classList.add("member-list");

    listButton.classList.add("active");
    gridButton.classList.remove("active");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");
});

getMembers();
