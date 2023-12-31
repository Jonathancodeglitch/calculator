
const previouDisplay = document.querySelector('.previous-operand');
const currentDisplay = document.querySelector('.current-operand');
const keys = document.querySelectorAll('.key');

let isEqualKeyClicked = false;

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
    if (
      currentDisplayValue == '0' ||
      previousKeyType == 'operator' ||
      previousKeyType == 'equal'
    ) {
      currentDisplay.textContent = keyContent;
    } else {
      currentDisplay.textContent += keyContent;
    }
    currentDisplay.dataset.previousKeyType = 'number';
  }

  if (keyClass.contains('decimal')) {
    showDisplayValue();
    if (!currentDisplayValue.includes('.')) {
      currentDisplay.textContent = currentDisplayValue + '.';
    } else if (previousKeyType == 'operator' || previousKeyType == 'equal') {
      currentDisplay.textContent = '0.';
    }

    currentDisplay.dataset.previousKeyType = 'decimal';
  }

  if (keyClass.contains('operator')) {
    this.classList.add('active'); //add style to the clicked operator

    if (
      firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'equal' &&
      isEqualKeyClicked == false
    ) {
      console.log(isEqualKeyClicked);
      console.log(firstValue, operator, secondValue);
      const calVal = operate(firstValue, operator, secondValue);
      currentDisplay.textContent = calVal;
      currentDisplay.dataset.firstValue = calVal;
    } else {
      currentDisplay.dataset.firstValue = currentDisplay.textContent;
    }
    currentDisplay.dataset.operator = keyContent;
    previouDisplay.textContent = currentDisplay.textContent + keyContent;
    isEqualKeyClicked = false;
    currentDisplay.dataset.previousKeyType = 'operator';
    hideDisplayValue();
  }

  if (keyClass.contains('equal')) {
    showDisplayValue();
    if (firstValue && operator) {
      if (previousKeyType === 'equal') {
        //update firstValue and secondValue when
        firstValue = currentDisplayValue;
        secondValue = currentDisplay.dataset.modValue;
        previouDisplay.textContent = `${firstValue} ${operator} ${secondValue} =`;
      }
      previouDisplay.textContent = `${firstValue} ${operator} ${secondValue} =`;
      currentDisplay.textContent = operate(firstValue, operator, secondValue);
      //store previous second value
      currentDisplay.dataset.modValue = secondValue;
      isEqualKeyClicked = true;
      currentDisplay.dataset.previousKeyType = 'equal';
    }
  }

  if (keyClass.contains('clear')) {
    currentDisplay.textContent = '0';
    currentDisplay.dataset.firstValue = '';
    currentDisplay.dataset.operator = '';
    currentDisplay.dataset.modValue = '';
    secondValue = '';
    previouDisplay.textContent = '';
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
