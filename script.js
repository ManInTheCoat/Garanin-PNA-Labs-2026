window.onload = function() {
  let a = ''; // Первое число
  let b = ''; // Второе число
  let expressionResult = ''; // Результат вычисления
  let selectedOperation = null; // Выбранная операция

  const outputElement = document.getElementById("result"); // Поле вывода
  const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]'); // Все кнопки с цифрами + точка

  // Функция присоединения цифр при нажатии на кнопки
  function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
      if (a.length >= 12) return;

      if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
        a += digit;
      }
      outputElement.innerHTML = a;
    } else {
      if (b.length >= 12) return;

      if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
        b += digit;
        outputElement.innerHTML = b;
      }
    }
  }

  // Обработчик для цифр
  digitButtons.forEach(button => {
    button.onclick = function() {
      const digitValue = button.innerHTML;
      onDigitButtonClicked(digitValue);
    }
  });

  // Функция для накапливаемых операций
  function cumulOperation(op) {
    if (a === '') return;
    if (a !== '' && b !== '' && selectedOperation) {
      document.getElementById("btn_op_equal").click();
    }
    selectedOperation = op;
  }

  // Обработчики для базовых операций
  document.getElementById("btn_op_mult").onclick = () => cumulOperation('x');
  document.getElementById("btn_op_plus").onclick = () => cumulOperation('+');
  document.getElementById("btn_op_minus").onclick = () => cumulOperation('-');
  document.getElementById("btn_op_div").onclick = () => cumulOperation('/');

  // Обработчик для смены знака
  document.getElementById("btn_op_sign").onclick = function() {
    if (!selectedOperation && a !== '') {
      a = (-a).toString();
      outputElement.innerHTML = a;
    } else if (selectedOperation && b !== '') {
      b = (-b).toString();
      outputElement.innerHTML = b;
    }
  }

  // Обработчик для процента
  document.getElementById("btn_op_percent").onclick = function() {
    if (!selectedOperation && a !== '') {
      a = (a / 100).toString();
      outputElement.innerHTML = a;
    } else if (selectedOperation && b !== '') {
      b = (b / 100).toString();
      outputElement.innerHTML = b;
    }
  }

  // Обработчик для backspace
  document.getElementById("btn_op_backspace").onclick = function() {
    if (!selectedOperation && a !== '') {
      a = a.slice(0, -1);
      outputElement.innerHTML = a === '' ? '0' : a;
    } else if (selectedOperation && b !== '') {
      b = b.slice(0, -1);
      outputElement.innerHTML = b === '' ? '0' : b;
    }
  }

  // Обработчик для квадратного корня
  document.getElementById("btn_op_sqrt").onclick = function() {
    if (!selectedOperation && a !== '') {
      a = Math.sqrt(+a).toString();
      outputElement.innerHTML = a;
    } else if (selectedOperation && b !== '') {
      b = Math.sqrt(+b).toString();
      outputElement.innerHTML = b;
    }
  }

  // Обработчик для возведения в квадрат
  document.getElementById("btn_op_square").onclick = function() {
    if (!selectedOperation && a !== '') {
      a = ((+a) * (+a)).toString();
      outputElement.innerHTML = a;
    } else if (selectedOperation && b !== '') {
      b = ((+b) * (+b)).toString();
      outputElement.innerHTML = b;
    }
  }

  // Функция факториала
  function getFactorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;

    if (n > 170 || !isFinite(n)) {
      return Infinity;
    }

    if (!Number.isInteger(n)) {
      n = Math.floor(n);
    }

    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }

  // Обработчик для факториала
  document.getElementById("btn_op_fact").onclick = function() {
    if (!selectedOperation && a !== '') {
      a = getFactorial(+a).toString();
      outputElement.innerHTML = a;
    } else if (selectedOperation && b !== '') {
      b = getFactorial(+b).toString();
      outputElement.innerHTML = b;
    }
  }

  // Обработчик для обратного числа
  document.getElementById("btn_op_inv").onclick = function() {
    if (!selectedOperation && a !== '') {
      a = (1 / (+a)).toString();
      outputElement.innerHTML = a;
    } else if (selectedOperation && b !== '') {
      b = (1 / (+b)).toString();
      outputElement.innerHTML = b;
    }
  }

  const backgrounds = ['#0c1b33', '#222831', '#2b2e4a', '#0f3460']; // Массив цветов для заднего фона
  let currentBgIndex = 0; // Переменная для текущего цвета

  // Обработчик для кнопки смены темы
  document.querySelector('.theme-btn').onclick = function() {
    currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
    document.body.style.backgroundColor = backgrounds[currentBgIndex];
  }

  const textColors = ['#64ffda', '#ff79c6', '#f1fa8c', '#8be9fd', '#50fa7b']; // Массив цветов для окна вывода
  let currentTextColorIndex = 0; // Переменная для текущего цвета

  // Обработчик для смены цвета окна вывода
  document.getElementById("btn_color_res").onclick = function() {
    currentTextColorIndex = (currentTextColorIndex + 1) % textColors.length;
    outputElement.style.color = textColors[currentTextColorIndex];
  }

  // Обработчик для кнопки очистки
  document.getElementById("btn_op_clear").onclick = function() {
    a = '';
    b = '';
    selectedOperation = null;
    expressionResult = '';
    outputElement.innerHTML = 0;
  }

  // Обработчик для равно
  document.getElementById("btn_op_equal").onclick = function() {
    if (a === '' || b === '' || !selectedOperation) return;

    switch(selectedOperation) {
      case 'x':
        expressionResult = (+a) * (+b);
        break;
      case '+':
        expressionResult = (+a) + (+b);
        break;
      case '-':
        expressionResult = (+a) - (+b);
        break;
      case '/':
        expressionResult = (+a) / (+b);
        break;
      default:
        break;
    }

    a = expressionResult.toString();
    b = '';
    selectedOperation = null;
    outputElement.innerHTML = a;
  }
};
