window.onload = function(){
  let a = '' // Первое число
  let b = '' // Второе число
  let expressionResult = '' // Результат вычисления
  let selectedOperation = null // Выбранная операция

  const outputElement = document.getElementById("result") // Поле вывода
  const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]') // Все кнопки с цифрами

  function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
      if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
        a += digit;
      }
      outputElement.innerHTML = a;
    }
    else {
      if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
        b += digit;
        outputElement.innerHTML = b;
      }
    }
  }

  digitButtons.forEach(button => {
    button.onclick = function() {
      const digitValue = button.innerHTML;
      onDigitButtonClicked(digitValue);
    }
  });

  document.getElementById("btn_op_mult").onclick = function() {
    if (a === '') return;
    selectedOperation = 'x';
  }
  document.getElementById("btn_op_plus").onclick = function() {
    if (a === '') return;
    selectedOperation = '+';
  }
  document.getElementById("btn_op_minus").onclick = function() {
    if (a === '') return;
    selectedOperation = '-';
  }
  document.getElementById("btn_op_div").onclick = function() {
    if (a === '') return;
    selectedOperation = '/';
  }

  document.getElementById("btn_op_clear").onclick = function() {
    a = ''
    b = ''
    selectedOperation = ''
    expressionResult = ''
    outputElement.innerHTML = 0
  }

  document.getElementById("btn_op_equal").onclick = function() {
    if (a === '' || b === '' || !selectedOperation)
      return

    switch(selectedOperation) {
      case 'x':
        expressionResult = (+a) * (+b)
        break;
      case '+':
        expressionResult = (+a) + (+b)
        break;
      case '-':
        expressionResult = (+a) - (+b)
        break;
      case '/':
        expressionResult = (+a) / (+b)
        break;
      default:
        break;
    }

    a = expressionResult.toString()
    b = ''
    selectedOperation = null

    outputElement.innerHTML = a
  }
};
