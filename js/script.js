document.getElementById("shapeSelect").addEventListener("change", updateInputFields);
document.getElementById("calculateButton").addEventListener("click", calculate);
document.getElementById("resetButton").addEventListener("click", resetValues);

// Call updateInputFields when the page loads to initialize the first input
updateInputFields();

function updateInputFields() {
    var shape = document.getElementById("shapeSelect").value;
    var dimensionsInput = document.getElementById("dimensionsInput");

    dimensionsInput.innerHTML = ""; // Clear previous input fields

    var dimensionLabels = [];

    switch (shape) {
        case 'square':
            dimensionLabels.push("Side:");
            break;
        case 'rectangle':
            dimensionLabels.push("Length:");
            dimensionLabels.push("Width:");
            break;
        case 'circle':
            dimensionLabels.push("Radius:");
            break;
        case 'triangle':
            dimensionLabels.push("Base:");
            dimensionLabels.push("Height:");
            break;
        // Add more cases for other shapes

        default:
            alert("Select a valid shape.");
            return;
    }

    dimensionLabels.forEach(function (label) {
        var inputLabel = document.createElement("label");
        inputLabel.setAttribute("for", label.toLowerCase());
        inputLabel.textContent = label;
        dimensionsInput.appendChild(inputLabel);

        var inputField = document.createElement("input");
        inputField.setAttribute("type", "number");
        inputField.setAttribute("id", label.toLowerCase());
        inputField.setAttribute("placeholder", "Enter " + label.toLowerCase());
        inputField.setAttribute("required", "true");
        dimensionsInput.appendChild(inputField);
    });
}

function calculate() {
    var shape = document.getElementById("shapeSelect").value;
    var dimensionInputs = document.querySelectorAll("#dimensionsInput input");

    var dimensions = Array.from(dimensionInputs).map(function (input) {
        return parseFloat(input.value);
    });

    if (dimensions.some(isNaN) || dimensions.some(function (dim) { return dim <= 0; })) {
        alert("Enter valid dimensions.");
        return;
    }

    var calculationType = document.querySelector('input[name="calculation"]:checked').value;

    var result;
    var formulaLabel;

    switch (shape) {
        case 'square':
            result = calculateSquare(calculationType, dimensions[0]);
            formulaLabel = "Square: " + getSquareFormula(calculationType);
            break;
        case 'rectangle':
            result = calculateRectangle(calculationType, dimensions[0], dimensions[1]);
            formulaLabel = "Rectangle: " + getRectangleFormula(calculationType);
            break;
        case 'circle':
            result = calculateCircle(calculationType, dimensions[0]);
            formulaLabel = "Circle: " + getCircleFormula(calculationType);
            break;
        case 'triangle':
            result = calculateTriangle(calculationType, dimensions[0], dimensions[1]);
            formulaLabel = "Triangle: " + getTriangleFormula(calculationType);
            break;
        // Add more cases for other shapes

        default:
            alert("Select a valid shape.");
            return;
    }

    document.getElementById("result").textContent = result;
    document.getElementById("formulaLabel").textContent = formulaLabel;
}

function resetValues() {
    document.getElementById("shapeSelect").value = "square";
    var dimensionInputs = document.querySelectorAll("#dimensionsInput input");
    dimensionInputs.forEach(function (input) {
        input.value = "";
    });
    document.querySelector('input[name="calculation"][value="area"]').checked = true;
    document.getElementById("result").textContent = "";
    document.getElementById("formulaLabel").textContent = "";

    // Clear dimensions input
    updateInputFields();
}

// Calculation functions for each shape (add your own formulas here)
function calculateSquare(calculationType, sideLength) {
    switch (calculationType) {
        case 'area':
            return "Area: " + (sideLength * sideLength).toFixed(2);
        case 'perimeter':
            return "Perimeter: " + (4 * sideLength).toFixed(2);
        default:
            return "Select a valid calculation type.";
    }
}

function getSquareFormula(calculationType) {
    switch (calculationType) {
        case 'area':
            return "Side x Side";
        case 'perimeter':
            return "4 x Side";
        default:
            return "No valid formula.";
    }
}

function calculateRectangle(calculationType, length, width) {
    switch (calculationType) {
        case 'area':
            return "Area: " + (length * width).toFixed(2);
        case 'perimeter':
            return "Perimeter: " + (2 * (length + width)).toFixed(2);
        default:
            return "Select a valid calculation type.";
    }
}

function getRectangleFormula(calculationType) {
    switch (calculationType) {
        case 'area':
            return "Length x Width";
        case 'perimeter':
            return "2 x (Length + Width)";
        default:
            return "No valid formula.";
    }
}

function calculateCircle(calculationType, radius) {
    switch (calculationType) {
        case 'area':
            return "Area: " + (Math.PI * radius * radius).toFixed(2);
        case 'perimeter':
            return "Circumference: " + (2 * Math.PI * radius).toFixed(2);
        default:
            return "Select a valid calculation type.";
    }
}

function getCircleFormula(calculationType) {
    switch (calculationType) {
        case 'area':
            return "π x Radius^2";
        case 'perimeter':
            return "2 x π x Radius";
        default:
            return "No valid formula.";
    }
}

function calculateTriangle(calculationType, base, height) {
    switch (calculationType) {
        case 'area':
            return "Area: " + (0.5 * base * height).toFixed(2);
        case 'perimeter':
            return "Perimeter: " + (base + height + Math.sqrt(base**2 + height**2)).toFixed(2);
        default:
            return "Select a valid calculation type.";
    }
}

function getTriangleFormula(calculationType) {
    switch (calculationType) {
        case 'area':
            return "0.5 x Base x Height";
        case 'perimeter':
            return "Base + Height + √(Base^2 + Height^2)";
        default:
            return "No valid formula.";
    }
}

// Add more calculation functions and formulas for other shapes as needed
