//when keys are press display values on screen
//get the first values inputed and store it
//get the operator that was clicked and save it
//get the second value after an operator was clicked and store it
let display = document.getElementById('display');
let keys = document.querySelectorAll('.key');
let isOperatorClicked = false;

keys.forEach((key) => {
  key.addEventListener('click', function () {
    let keyValue = this.textContent;
    let displayValue = display.textContent;

    if (key.classList.contains('operand')) {
      if (displayValue == '0' || isOperatorClicked) {
        isOperatorClicked = false;
        display.textContent = keyValue;
      } else {
        display.textContent += keyValue;
      }
    }

    if (key.classList.contains('operator')) {
      display.dataset.firstValue = displayValue;
      display.dataset.operator = keyValue;
      isOperatorClicked = true;
    }

    if (key.classList.contains('equal')) {
      let firstValue = Number(display.dataset.firstValue);
      let secondValue = Number(displayValue);
      let operator = display.dataset.operator;

      display.textContent = operate(firstValue, operator, secondValue);
    }
  });
});

function operate(operandA, operator, operandB) {
  if (operator == '+') {
    return add(operandA, operandB);
  }
  if (operator == '-') {
    return subtract(operandA, operandB);
  }
  if (operator == 'x') {
    return multiply(operandA, operandB);
  }
  if (operator == '/') {
    return divide(operandA, operandB);
  }
}

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
  return a / b;
}
