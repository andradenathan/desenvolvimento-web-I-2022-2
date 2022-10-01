let CIRCLES = 0;

const circleContainer = document.createElement("div");
circleContainer.style.display = "flex";
circleContainer.style.flexWrap = "wrap";

const renderCircleHeader = document.createElement("div");
renderCircleHeader.style.display = "flex";
renderCircleHeader.style.justifyContent = "center";
renderCircleHeader.style.alignItems = "center";

const renderCircleContainer = document.createElement("div");
renderCircleContainer.style.display = "flex";
renderCircleContainer.style.justifyContent = "center";
renderCircleContainer.style.alignItems = "center";
renderCircleContainer.style.width = "100%";
renderCircleContainer.style.height = "100%";

const renderCircleInput = document.createElement("input");
renderCircleInput.style.marginRight = "10px";
renderCircleInput.placeholder = "Quantidade de círculos";


const renderCircleInputButton = document.createElement("button");
renderCircleInputButton.style.marginRight = "10px";
renderCircleInputButton.textContent = "Gerar";

const renderCircleCount = document.createElement("h3");

renderCircleCount.textContent = "Quantidade de Circulos: " + CIRCLES;

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
    
    if(circles.length > 1) {
        circles.every(circle => circle.style.backgroundColor === color || circle.style.backgroundColor === "#FFFFFF") ? 
        generateRandomHexaColors() : color;
    }
    
    circle.style.backgroundColor = color;
    circle.style.height = "150px";
    circle.style.width = "150px";
    circle.style.borderRadius = "50%";

    circles.push(circle);
}

function renderCircle(value) {
    CIRCLES = value;
    for (let index = 0; index < CIRCLES; index++) {
        generateRandomCircles();
    }    

    circleContainer.append(...circles);
    renderCircleCount.textContent = "Quantidade de Circulos: " + CIRCLES;
}

function removeAllChilds() {
    while (circleContainer.firstChild) 
        circleContainer.removeChild(circleContainer.firstChild);

    CIRCLES = 1;
    circles.splice(0, circles.length);
    circleContainer.append(...circles);
}

function main() {
    if(!circleContainer.hasChildNodes()) renderCircle(renderCircleInput.value);

    renderCircleInput.disabled = false;
    removeAllChilds();
    renderCircle(renderCircleInput.value);
    return;
}

renderCircleInput.addEventListener("keypress", (event) => {
    if(event.key === "Enter") return main();
});

renderCircleInputButton.addEventListener("click", (event) => {
    return main();
});

renderCircleContainer.appendChild(renderCircleInput);
renderCircleContainer.appendChild(renderCircleInputButton);
renderCircleContainer.appendChild(renderCircleCount);
renderCircleHeader.appendChild(renderCircleContainer);
circleContainer.append(...circles);
document.body.appendChild(renderCircleHeader);
document.body.appendChild(circleContainer);