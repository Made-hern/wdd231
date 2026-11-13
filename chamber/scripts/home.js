
// Navigation menu
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#main-nav");

// Footer information
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

currentYear.textContent = new Date().getFullYear();

const modifiedDate = new Date(document.lastModified);

lastModified.textContent = modifiedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
});

// Mobile navigation
menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
});

// Weather API
const weatherUrl =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=14.5586" +
    "&longitude=-90.7295" +
    "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min" +
    "&temperature_unit=celsius" +
    "&wind_speed_unit=kmh" +
    "&timezone=America%2FGuatemala" +
    "&forecast_days=3";

// Convert weather codes into descriptions
function getWeatherDescription(code) {
    const descriptions = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        71: "Slight snow",
        73: "Moderate snow",
        75: "Heavy snow",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        95: "Thunderstorm",
        96: "Thunderstorm with hail",
        99: "Thunderstorm with heavy hail"
    };

    return descriptions[code] || "Weather conditions unavailable";
}

// Display current weather and forecast
async function getWeather() {
    const temperatureElement = document.querySelector("#current-temperature");
    const descriptionElement = document.querySelector("#current-description");
    const windElement = document.querySelector("#current-wind");
    const forecastContainer = document.querySelector("#forecast-list");

    try {
        const response = await fetch(weatherUrl);

        if (!response.ok) {
            throw new Error("Unable to retrieve weather data.");
        }

        const weatherData = await response.json();

        const current = weatherData.current;
        const daily = weatherData.daily;

        temperatureElement.textContent =
            `${Math.round(current.temperature_2m)}°C`;

        descriptionElement.textContent =
            getWeatherDescription(current.weather_code);

        windElement.textContent =
            `Wind: ${Math.round(current.wind_speed_10m)} km/h`;

        forecastContainer.innerHTML = "";

        daily.time.forEach((date, index) => {
            const forecastCard = document.createElement("article");
            forecastCard.classList.add("forecast-card");

            const forecastDate = new Date(`${date}T12:00:00`);

            const dayName = forecastDate.toLocaleDateString("en-US", {
                weekday: "short"
            });

            const description = getWeatherDescription(
                daily.weather_code[index]
            );

            const dayElement = document.createElement("h4");
            dayElement.textContent = dayName;

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = description;

            const temperatureElement = document.createElement("p");
            temperatureElement.classList.add("forecast-temperature");
            temperatureElement.textContent =
                `${Math.round(daily.temperature_2m_max[index])}° / ` +
                `${Math.round(daily.temperature_2m_min[index])}°C`;

            forecastCard.append(
                dayElement,
                descriptionElement,
                temperatureElement
            );

            forecastContainer.appendChild(forecastCard);
        });

    } catch (error) {
        temperatureElement.textContent = "--°C";
        descriptionElement.textContent = "Weather information is unavailable.";
        windElement.textContent = "";
        forecastContainer.textContent =
            "Unable to load the weather forecast. Please try again later.";

        console.error("Weather error:", error);
    }
}

// Randomize an array
function shuffleMembers(members) {
    return [...members].sort(() => Math.random() - 0.5);
}

// Display Gold and Silver member spotlights
async function getSpotlights() {
    const spotlightContainer = document.querySelector("#spotlight-container");

    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members = await response.json();

        const eligibleMembers = members.filter(
            member =>
                member.membershipLevel === 2 ||
                member.membershipLevel === 3
        );

        const shuffledMembers = shuffleMembers(eligibleMembers);

        const numberOfSpotlights = Math.floor(Math.random() * 2) + 2;
        const selectedMembers = shuffledMembers.slice(0, numberOfSpotlights);

        spotlightContainer.innerHTML = "";

        selectedMembers.forEach(member => {
            const card = document.createElement("article");
            card.classList.add("spotlight-card");

            const membershipName =
                member.membershipLevel === 3 ? "Gold Member" : "Silver Member";

            const image = document.createElement("img");
            image.src = `images/${member.image}`;
            image.alt = `${member.name} business logo`;
            image.loading = "lazy";
            image.width = 300;
            image.height = 180;

            image.addEventListener("error", () => {
                image.alt = `${member.name} image unavailable`;
                image.classList.add("image-unavailable");
            });

            const heading = document.createElement("h3");
            heading.textContent = member.name;

            const description = document.createElement("p");
            description.textContent = member.description;

            const address = document.createElement("p");
            address.textContent = `Address: ${member.address}`;

            const phone = document.createElement("p");
            phone.textContent = `Phone: ${member.phone}`;

            const membership = document.createElement("span");
            membership.classList.add("membership-badge");
            membership.textContent = membershipName;

            const website = document.createElement("a");
            website.href = member.website;
            website.textContent = "Visit Website";
            website.target = "_blank";
            website.rel = "noopener noreferrer";

            card.append(
                image,
                heading,
                description,
                address,
                phone,
                membership,
                website
            );

            spotlightContainer.appendChild(card);
        });

        if (selectedMembers.length === 0) {
            spotlightContainer.textContent =
                "Featured members will be available soon.";
        }

    } catch (error) {
        spotlightContainer.textContent =
            "Unable to load featured members. Please try again later.";

        console.error("Spotlight error:", error);
    }
}

// Initialize the home page
getWeather();
getSpotlights();
