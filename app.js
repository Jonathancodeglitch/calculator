//when keys are press display values on screen
//get the first values inputed and store it
//get the operator that was clicked and save it
//get the second value after an operator was clicked and store it
//when the equal key is pressed calculate the first value and second value and display the answe
let display = document.getElementById('display');
let keys = document.querySelectorAll('.key');

let isOperatorClicked = false;
let previousAction = display.dataset.previousAction;

keys.forEach((key) => {
  key.addEventListener('click', function () {
    keys.forEach((key) => key.classList.remove('active'));

    let keyContent = this.textContent;
    let displayContent = display.textContent;

    //display clicked numbers
    if (key.classList.contains('operand')) {
      previousAction = 'number';
      if (displayContent == '0' || isOperatorClicked) {
        display.textContent = keyContent;
        isOperatorClicked = false;
      } else {
        display.textContent += keyContent;
      }
    }

    //add decimal
    if (key.classList.contains('decimal')) {
      if (!value.includes('.')) {
        display.textContent = displayContent + '.';
      }
    }

    //when an operator is clicked
    if (key.classList.contains('operator')) {
      this.classList.add('active');
      isOperatorClicked = true;

      let secondValue = displayContent;
      let firstValue = display.dataset.firstValue;
      let operator = display.dataset.operator;

      if (firstValue && operator && previousAction !== 'operator') {
      
        display.textContent = operate(
          Number(firstValue),
          operator,
          Number(secondValue)
        );
          
        display.dataset.firstValue = display.textContent;
      } else {
        display.dataset.firstValue = displayContent;
      }

      display.dataset.operator = keyContent;
      previousAction = 'operator';
    }

    
    if (key.classList.contains('del')) {
      let newStr = displayContent.split('');
      if (newStr.length > 1) {
        newStr.pop();
        display.textContent = newStr.join('');
      } else {
        display.textContent = '0';
      }
    }
 
    //reset
    if (key.classList.contains('clear')) {
      display.textContent = '0';
      display.dataset.firstValue=""
    }

    //equals to
    if (key.classList.contains('equal')) {
      let firstValue = display.dataset.firstValue;
      let secondValue = display.textContent;
      let operator = display.dataset.operator;

      console.log(secondValue);
      display.textContent = operate(
        Number(firstValue),
        operator,
        Number(secondValue)
      );

      display.dataset.firstValue=""
      previousAction = 'equal';
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
