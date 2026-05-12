// Button for viewing CV

function clickViewButton() {
    const button = document.querySelector("#viewCV-button");

    button.addEventListener("click", function () {
        window.open("assets/MyCV.pdf", "_blank");
        button.style.backgroundColor = "#004200";
    });
}

// Button for viewing certificate (functionality)
function clickViewButton2() {
    const button2 = document.querySelector("#viewCertificate-button");

    button2.addEventListener("click", function (e) {
        e.preventDefault();
        window.open("assets/python-certificate.jpg", "_blank");

        button2.style.backgroundColor = "#004200";
    });
}

// Buttons for viewing and closing project descriptions (functionality)
function buttonEventListener() {
    document.querySelector("#project-description").addEventListener("click", toggleDescriptionButton);
}

function toggleDescriptionButton() {
    const dbutton = document.querySelector("#project-description");
    const paragraphs = document.querySelectorAll(".descriptions");
    const isHidden = getComputedStyle(paragraphs[0]).visibility === 'hidden';

    paragraphs.forEach(paragraph => {
        if (isHidden) {
            paragraph.style.visibility = 'visible';
        } else {
            paragraph.style.visibility = 'hidden';
        }
    });

    if (isHidden) {
        dbutton.textContent = "Close Project Descriptions";
        dbutton.style.backgroundColor = "#004200";
    } else {
        dbutton.textContent = "View Project Descriptions";
        dbutton.style.backgroundColor = "#152241";
    }
}

function borderSize() {
    const dbutton = document.querySelector("#project-description");
    const projectbox = document.querySelectorAll(".project-container > div");

    dbutton.addEventListener("click", function () {
        projectbox.forEach(project => {
            project.classList.toggle("expanded");
        });
    });
}


// Submitting the contact form
function formSubmission() {
    const form = document.querySelector("#contact-form form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = new URLSearchParams(formData);

        const response = await fetch("/submit", {
            method: "POST",
            body: data
        });

        const text = await response.text();
        document.getElementById("responseMessage").textContent = text;
    });
}

// Fade and show effect for all sections
function hideShowSections() {

    const sections = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    });

    sections.forEach(section => {
        observer.observe(section);
    });

}

// Function for toggling between light and dark modes
function colorPreference() {
    const bulbButton = document.querySelector("#change-mode");
    bulbButton.addEventListener("click", function () {
        document.body.classList.toggle("light-mode");
    });

    const clickedButtons = document.querySelectorAll(".clicked");
    clickedButtons.forEach(button => {
        updateButtonTheme(button);
    });
}

function clickLinkButtons() {
    const linkedButtons = document.querySelectorAll("button");

    linkedButtons.forEach(button => {

        button.addEventListener("click", function() {

            button.classList.add("clicked");

            updateButtonTheme(button);

        });

    });
}

function updateButtonTheme(button) {

    if (document.body.classList.contains("light-mode")) {
        button.style.backgroundColor = "#DBFFDB";
    } else {
        button.style.backgroundColor = "green";
    }

}


clickViewButton();
clickViewButton2();
buttonEventListener();
borderSize();
formSubmission();
hideShowSections();
colorPreference();
clickLinkButtons();
updateButtonTheme();
