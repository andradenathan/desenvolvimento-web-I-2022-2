const INPUT_MAX = window.prompt("Insira o limite máximo de círculos: ");
let CIRCLES_MIN = 1;

const circleContainer = document.createElement("div");
circleContainer.style.display = "flex";
circleContainer.style.flexWrap = "wrap";

const renderCircleContainer = document.createElement("div");
renderCircleContainer.style.display = "flex";
renderCircleContainer.style.justifyContent = "center";
renderCircleContainer.style.alignItems = "center";
renderCircleContainer.style.width = "100%";
renderCircleContainer.style.height = "100%";

const renderCircleInput = document.createElement("input");
renderCircleInput.type = "range";
renderCircleInput.value = CIRCLES_MIN;
renderCircleInput.min = CIRCLES_MIN;
renderCircleInput.max = INPUT_MAX;

const renderCircleCount = document.createElement("h3");
renderCircleContainer.style.display = "flex";
renderCircleContainer.style.justifyContent = "center";
renderCircleContainer.style.alignItems = "center";
renderCircleCount.textContent = "Quantidade de Circulos: " + CIRCLES_MIN;

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

function renderCircle(event) {
    CIRCLES_MIN = event.target.value - 1;
    for (let index = 0; index < CIRCLES_MIN; index++) {
        generateRandomCircles();
    }    

    circleContainer.append(...circles);
    renderCircleCount.textContent = "Quantidade de Circulos: " + CIRCLES_MIN;
}

function removeAllChilds() {
    while (circleContainer.firstChild) 
        circleContainer.removeChild(circleContainer.firstChild);

    circles.splice(0, circles.length);
    CIRCLES_MIN = 1;

    generateRandomCircles();
    circleContainer.append(...circles);
}

renderCircleInput.addEventListener("change", (event) => {
    if(!circleContainer.hasChildNodes()) renderCircle(event);
    
    removeAllChilds();
    renderCircle(event);
    return;
});


generateRandomCircles();
renderCircleContainer.appendChild(renderCircleInput);
renderCircleContainer.appendChild(renderCircleCount);
circleContainer.append(...circles);
document.body.appendChild(renderCircleContainer);
document.body.appendChild(circleContainer);