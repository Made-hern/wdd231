
const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces students to programming. It presents the basic components of programming languages and uses them to solve problems.",
        technology: ["Python"],
        completed: false
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces students to the World Wide Web and careers in web design and development. Students create simple websites and learn the fundamentals of web development.",
        technology: ["HTML", "CSS"],
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Students learn to research, write, call, debug and test functions to solve problems in different disciplines.",
        technology: ["Python"],
        completed: false
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces classes and objects, encapsulation, inheritance and polymorphism.",
        technology: ["C#"],
        completed: false
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Students learn to create dynamic websites using JavaScript to respond to events, update content and create responsive user experiences.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: false
    },
    {
        subject: "WDD",
        number: 231,
        title: "Frontend Web Development I",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Students focus on user experience, accessibility, compliance, performance optimization and basic API usage.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: false
    }
];

// Display courses
const courseContainer = document.querySelector("#course-container");
const creditTotal = document.querySelector("#credit-total");

// Display all courses or filter by subject
function displayCourses(courseList) {

    courseContainer.innerHTML = "";

    courseList.forEach(course => {

        const card = document.createElement("article");

        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} Credits</p>
            <p>${course.technology.join(", ")}</p>
            <p>${course.completed ? "✓ Completed" : "In Progress"}</p>
        `;

        courseContainer.appendChild(card);
    });

    // Calculate visible credits
    const totalCredits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    creditTotal.textContent = `Total Credits: ${totalCredits}`;
}

// Filter buttons
document.querySelector("#all-courses").addEventListener("click", () => {
    displayCourses(courses);
    setActiveButton("all-courses");
});

document.querySelector("#wdd-courses").addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses);
    setActiveButton("wdd-courses");
});

document.querySelector("#cse-courses").addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses);
    setActiveButton("cse-courses");
});

// Update active filter button
function setActiveButton(buttonId) {

    document.querySelectorAll(".filter-button").forEach(button => {
        button.classList.remove("active");
    });

    document.querySelector(`#${buttonId}`).classList.add("active");
}

// Initial display
displayCourses(courses);
