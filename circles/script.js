const INPUT_MIN = 1;
const INPUT_MAX = 100;
let CIRCLES_COUNT = INPUT_MIN;

const renderCircleContainer = document.createElement("div");
renderCircleContainer.style.display = "flex";
renderCircleContainer.style.justifyContent = "center";
renderCircleContainer.style.alignItems = "center";
renderCircleContainer.style.width = "100%";
renderCircleContainer.style.height = "100%";

const renderCircleInput = document.createElement("input");
renderCircleInput.type = "range";
renderCircleInput.value = INPUT_MIN;
renderCircleInput.min = INPUT_MIN;
renderCircleInput.max = INPUT_MAX;

const renderCircleCount = document.createElement("h3");
renderCircleContainer.style.display = "flex";
renderCircleContainer.style.justifyContent = "center";
renderCircleContainer.style.alignItems = "center";
renderCircleCount.textContent = "Circulos: " + CIRCLES_COUNT.toString();

const circleContainer = document.createElement("div");
circleContainer.style.display = "flex";

const circles = [];

function generateRandomHexaColors() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function generateRandomCircles() {
    const circle = document.createElement('div');
    const color = generateRandomHexaColors();
    
    if(circles.length > 0) {
        circles.every(circle => circle.style.backgroundColor === color) ? 
        generateRandomHexaColors() : color;
    }
    
    circle.style.backgroundColor = color;
    circle.style.height = "150px";
    circle.style.width = "150px";
    circle.style.borderRadius = "50%";

    circles.push(circle);
}

renderCircleInput.addEventListener("change", (event) => {
    CIRCLES_COUNT = event.target.value;
    
    for (let index = 0; index < CIRCLES_COUNT; index++) {
        generateRandomCircles();
    }    
    circleContainer.append(...circles);

    renderCircleCount.textContent = "Circulos: " + event.target.value.toString();
});



generateRandomCircles();
renderCircleContainer.appendChild(renderCircleInput);
renderCircleContainer.appendChild(renderCircleCount);
circleContainer.append(...circles);
document.body.appendChild(renderCircleContainer);
document.body.appendChild(circleContainer);