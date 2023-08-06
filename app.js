//when keys are pressed the number should be displayed on the calculator screen
//save the first and second value  in a variable
//when and operator is pressed right after a number was pressed the number and the operator should be diplay in the previous-oprend div
//you should be able to do basic operator with the calculator and display the answers in a div

let keys = document.querySelectorAll('.key');
let previousDisplayValue = document.querySelector('.previous-operand');
let CurrentDisplayValue = document.querySelector('.current-operand');

keys.forEach((key) => {
  CurrentDisplayValue.textContent = '0';
  key.addEventListener('click', calculate);
});

let firstValue = '';
let operator = '';
let secondValue = '';
let previouseAction;
let isOperatorClicked;

function calculate() {
  removeOperatorStyle();

  let keyContent = this.textContent;
  let keyClass = this.classList;
  let CurrentDisplayValueContent = CurrentDisplayValue.textContent;
  secondValue = CurrentDisplayValueContent;

  if (keyClass.contains('operand')) {
    if (CurrentDisplayValueContent == '0' || isOperatorClicked) {
      isOperatorClicked = false;
      CurrentDisplayValue.textContent = keyContent;
    } else {
      CurrentDisplayValue.textContent += keyContent;
    }
    previouseAction = 'operend';
  }

  if (
    keyClass.contains('decimal') &&
    !CurrentDisplayValueContent.includes('.')
  ) {
    CurrentDisplayValue.textContent = CurrentDisplayValueContent + keyContent;
  }

  if (keyClass.contains('operator')) {
    this.classList.add('active'); //add outline styles to operator

    if (
      firstValue !== '' &&
      operator !== '' &&
      previouseAction !== 'operator' &&
      previouseAction !== 'equal'
    ) {
      console.log(firstValue, operator, secondValue);
      CurrentDisplayValue.textContent = operate(
        Number(firstValue),
        operator,
        Number(secondValue)
      );

      firstValue = CurrentDisplayValue.textContent;
      previousDisplayValue.textContent = firstValue + keyContent;
    } else {
      firstValue = CurrentDisplayValueContent;
      previousDisplayValue.textContent = firstValue + keyContent;
    }

    operator = keyContent;
    isOperatorClicked = true;
    previouseAction = 'operator';
  }

  if (keyClass.contains('equal')) {
    if (
      firstValue !== '' &&
      operator !== '' &&
      secondValue !== '' &&
      previouseAction !== 'equal'
    ) {
      previousDisplayValue.textContent = `${firstValue} ${operator} ${secondValue} ${keyContent}`;
      CurrentDisplayValue.textContent = operate(
        Number(firstValue),
        operator,
        Number(secondValue)
      );
      previouseAction = 'equal';
    }
  }

  resetCalculator(keyClass);
  del(keyClass);
}

function resetCalculator(keyClass) {
  if (keyClass.contains('clear')) {
    CurrentDisplayValue.textContent = 0;
    previousDisplayValue.textContent = '';
    firstValue = '';
    secondValue = '';
    operator = '';
  }
}

function del(keyClass) {
  if (keyClass.contains('del')) {
    let newStr = CurrentDisplayValue.textContent.split('');
    if (newStr.length > 1) {
      newStr.pop();
      CurrentDisplayValue.textContent = newStr.join('');
    } else {
      CurrentDisplayValue.textContent = 0;
    }
  }
}

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
  if (operator == '÷') {
    return operandB == 0 ? 'DUMBASS' : divide(operandA, operandB);
  }
}

function add(a, b) {
  return Number(a) + Number(b);
}
function subtract(a, b) {
  return Number(a) - Number(b);
}
function multiply(a, b) {
  return Number(a) * Number(b);
}
function divide(a, b) {
  return Number(a) / Number(b);
}

function removeOperatorStyle() {
  keys.forEach((key) => {
    key.classList.remove('active');
  });
}
