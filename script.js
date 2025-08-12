const display = document.getElementById("display");

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetScreen = false; // flag that says "clear the screen before typing new stuff"

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Nice try 😏 Can't divide by 0!";
    }
    return a / b;
}

// Decide which operation to do
function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return null;
    }
}

function updateDisplay(number) {
    if (display.textContent === "0" || shouldResetScreen) {
        display.textContent = number;
        shouldResetScreen = false; // Now we are no longer starting fresh
    } else {
        display.textContent += number; // otherwise, add the new number to the right of what is there
    }
}

function clearCalculator() {
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
    display.textContent = "0";
}

function setOperator(operator) {
    if (currentOperator !== null) evaluate();
    firstNumber = display.textContent; //save the number that is currently on the screen
    currentOperator = operator;
    shouldResetScreen = true; //clear the screen first next time we type a number
}

// This function does the actual math
function evaluate() {
    if (currentOperator === null || shouldResetScreen) return;
    secondNumber = display.textContent;

    // call our operate() function
    let result = operate(
        currentOperator,
        parseFloat(firstNumber), // make sure the string becomes a real number
        parseFloat(secondNumber)
    );

    if (typeof result === "number") {
        result = Math.round(result * 1000) / 1000; //keeps only 3 decimal palces
    }

    // show the result on the screen
    display.textContent = result;
    currentOperator = null;
}

// listen for clicks on number buttons
document.querySelectorAll(".digit").forEach((button) => {
    button.addEventListener("click", () => {
        updateDisplay(button.textContent);
    });
});

// listen for clicks on math sign buttons
document.querySelectorAll(".operator").forEach((button) => {
    button.addEventListener("click", () => {
        setOperator(button.textContent);
    });
});

// when we click "=" run evaluate
document.getElementById("equals").addEventListener("click", evaluate);

// when we click "C", clear everything
document.getElementById("clear").addEventListener("click", clearCalculator);

// when we click "." add a decimal point but only if we dont already have one
document.getElementById("decimal").addEventListener("click", () => {
    if (!display.textContent.includes(".")) {
        updateDisplay(".");
    }
});

document.getElementById("backspace").addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, -1) || "0";
});
