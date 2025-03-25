
/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/
let currentInput = "0";
let operation = null;
let firstNumber = null;
let resetScreen = false;

/*------------------------ Cached Element References ------------------------*/
const display = document.querySelector(".display");
// console.dir(display);
const buttons = document.querySelectorAll(".button");
// console.dir(buttons);
const calculator = document.querySelector("#calculator");
// console.dir(calculator);

/*----------------------------- Event Listeners -----------------------------*/
calculator.addEventListener("click", (event) => {
  if (!event.target.classList.contains("button")) return;

  const buttonText = event.target.innerText;
  console.log(buttonText);

  if (event.target.classList.contains("number")) {
    handleNumber(buttonText);
  } else if (event.target.classList.contains("operator")) {
    if (buttonText === "C") {
      console.log("Clearing all");
      clearAll();
    } else if (["+", "-", "*", "/"].includes(buttonText)) {
      handleOperator(buttonText);
    }
  } else if (event.target.classList.contains("equals")) {
    console.log("Calculating result");
    calculate();
  }
  display.innerText = currentInput;
});

/*-------------------------------- Functions --------------------------------*/
function clearAll() {
  currentInput = "0";
  firstNumber = null;
  operation = null;
  updateDisplay();
}

function updateDisplay() {
  display.textContent = currentInput;
}

function handleNumber(number) {
  if (currentInput === "0") {
    currentInput = number;
    resetScreen = false;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

function handleOperator(operator) {
  if (firstNumber === null) {
    firstNumber = currentInput;
  } else {
    calculate();
    firstNumber = currentInput;
  }
  operation = operator;
  resetScreen = true;

  if (resetScreen) {
    currentInput = "0";
    updateDisplay();
  }
}

function calculate() {
  let result;
  const num1 = parseFloat(firstNumber);
  const num2 = parseFloat(currentInput);

  if (operation === "+") {
    result = num1 + num2;
  } else if (operation === "-") {
    result = num1 - num2;
  } else if (operation === "*") {
    result = num1 * num2;
  } else if (operation === "/") {
    if (num2 !== 0) {
      result = num1 / num2;
    } else {
      result = "Cannot divide by zero";
    }
  } else {
    return;
  }

  currentInput = result.toString();
  firstNumber = null;
  operation = null;
  updateDisplay();
}

