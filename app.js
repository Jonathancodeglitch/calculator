//get all the calculator btns
//display the key clicked with the correct content
//save the first value
// save the operator
// save the second value
//create a function to called operate that that take the first value operator and the second value and return and display the answer
//when and operator is clicked after the first value is present and operator is present display answer plus the opertor clicked

//the caculator should be able to do basic math

const previouDisplay = document.querySelector('.previous-operand');
const currentDisplay = document.querySelector('.current-operand');
const keys = document.querySelectorAll('.key');

keys.forEach((key) => {
  key.addEventListener('click', calculate);
});

function calculate() {
  let keyContent = this.textContent;
  let keyClass = this.classList;
  let currentDisplayValue = currentDisplay.textContent;

  let firstValue = currentDisplay.dataset.firstValue;
  let operator = currentDisplay.dataset.operator;
  let secondValue = currentDisplayValue;
  let previousKeyType = currentDisplay.dataset.previousKeyType;

  removeStyleFromOperator();

  if (keyClass.contains('operand')) {
    showDisplayValue();
    if (currentDisplayValue == 0 || previousKeyType == 'operator') {
      currentDisplay.textContent = keyContent;
    } else {
      currentDisplay.textContent += keyContent;
    }
    currentDisplay.dataset.previousKeyType = 'number';
  }

  if (keyClass.contains('decimal') && !currentDisplayValue.includes('.')) {
    currentDisplay.textContent = currentDisplayValue + '.';
  }

  if (keyClass.contains('operator')) {
    this.classList.add('active'); //add style to the clicked operator

    if (
      firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'equal'
    ) {
      console.log(firstValue, operator, secondValue);
      currentDisplay.textContent = operate(firstValue, operator, secondValue);
      currentDisplay.dataset.firstValue = currentDisplay.textContent;
    } else {
      currentDisplay.dataset.firstValue = currentDisplay.textContent;
    }
    currentDisplay.dataset.operator = keyContent;
    previouDisplay.textContent = currentDisplay.textContent + keyContent;
    currentDisplay.dataset.previousKeyType = 'operator';
    hideDisplayValue();
  }

  if (keyClass.contains('equal')) {
    if (firstValue && operator && previousKeyType !== 'equal') {
      previouDisplay.textContent = `${firstValue} ${operator} ${secondValue} =`;
      currentDisplay.textContent = operate(firstValue, operator, secondValue);
      currentDisplay.dataset.previousKeyType = 'equal';
    }
  }

  if (keyClass.contains('clear')) {
    currentDisplay.dataset.firstValue = '';
    currentDisplay.dataset.operator = '';
    previouDisplay.textContent = '';
    currentDisplay.textContent = '0';
    currentDisplay.dataset.previousKeyType = 'clear';
  }

  if (keyClass.contains('del')) {
    let newStr = currentDisplayValue.split('');
    if (newStr.length > 1) {
      newStr.pop();
      currentDisplay.textContent = newStr.join('');
    } else {
      currentDisplay.textContent = '0';
    }
    currentDisplay.dataset.previousKeyType = 'del';
  }
}

function removeStyleFromOperator() {
  keys.forEach((key) => key.classList.remove('active'));
}

function showDisplayValue() {
  currentDisplay.style.opacity = '1';
}

function hideDisplayValue() {
  currentDisplay.style.opacity = '0';
}

function operate(firstValue, operator, secondValue) {
  if (operator == '+') {
    return add(firstValue, secondValue);
  }
  if (operator == '-') {
    return subtract(firstValue, secondValue);
  }
  if (operator == '÷') {
    return division(firstValue, secondValue);
  }
  if (operator == 'x') {
    return multiply(firstValue, secondValue);
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

function division(a, b) {
  return b == '0' ? 'DUMBASS' : Number(a) / Number(b);
}
