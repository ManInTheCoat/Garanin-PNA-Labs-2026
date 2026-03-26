const backgrounds = ['#0c1b33', '#222831', '#2b2e4a', '#0f3460'];
let savedBg = localStorage.getItem('themeIndex');
let currentBgIndex = savedBg ? parseInt(savedBg) : 0;

document.documentElement.style.setProperty('--current-bg', backgrounds[currentBgIndex]);

window.onload = function() {
  const themeBtn = document.querySelector('.theme-btn');
  if (themeBtn) {
    themeBtn.onclick = function() {
      currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
      document.documentElement.style.setProperty('--current-bg', backgrounds[currentBgIndex]);
      localStorage.setItem('themeIndex', currentBgIndex);
    }
  }

  const outputElement = document.getElementById("result");

  if (outputElement) {
    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;

    const historyList = document.getElementById("history-list");

    if (historyList) {
      const savedHistory = localStorage.getItem('calcHistory');
      if (savedHistory) {
        historyList.innerHTML = savedHistory;
      }
    }

    function addToHistory(recordText) {
      if (!historyList) return;

      const emptyMsg = historyList.querySelector('.empty-history');
      if (emptyMsg) emptyMsg.remove();

      const li = document.createElement("li");
      li.textContent = recordText;
      historyList.prepend(li);

      localStorage.setItem('calcHistory', historyList.innerHTML);
    }

    const btnClearHistory = document.getElementById("btn_clear_history");
    if (btnClearHistory) {
      btnClearHistory.onclick = function() {
        historyList.innerHTML = '<li class="empty-history">История пока пуста...</li>';
        localStorage.removeItem('calcHistory');
      }
    }

    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

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

    digitButtons.forEach(button => {
      button.onclick = function() {
        const digitValue = button.innerHTML;
        onDigitButtonClicked(digitValue);
      }
    });

    function cumulOperation(op) {
      if (a === '') return;
      if (a !== '' && b !== '' && selectedOperation) {
        document.getElementById("btn_op_equal").click();
      }
      selectedOperation = op;
    }

    document.getElementById("btn_op_mult").onclick = () => cumulOperation('x');
    document.getElementById("btn_op_plus").onclick = () => cumulOperation('+');
    document.getElementById("btn_op_minus").onclick = () => cumulOperation('-');
    document.getElementById("btn_op_div").onclick = () => cumulOperation('/');

    document.getElementById("btn_op_sign").onclick = function() {
      if (!selectedOperation && a !== '') {
        a = (-a).toString();
        outputElement.innerHTML = a;
      } else if (selectedOperation && b !== '') {
        b = (-b).toString();
        outputElement.innerHTML = b;
      }
    }

    document.getElementById("btn_op_percent").onclick = function() {
      if (!selectedOperation && a !== '') {
        a = (a / 100).toString();
        outputElement.innerHTML = a;
      } else if (selectedOperation && b !== '') {
        b = (b / 100).toString();
        outputElement.innerHTML = b;
      }
    }

    document.getElementById("btn_op_backspace").onclick = function() {
      if (!selectedOperation && a !== '') {
        a = a.slice(0, -1);
        outputElement.innerHTML = a === '' ? '0' : a;
      } else if (selectedOperation && b !== '') {
        b = b.slice(0, -1);
        outputElement.innerHTML = b === '' ? '0' : b;
      }
    }

    document.getElementById("btn_op_sqrt").onclick = function() {
      if (!selectedOperation && a !== '') {
        let res = Math.sqrt(+a).toString();
        addToHistory(`√(${a}) = ${res}`);
        a = res;
        outputElement.innerHTML = a;
      } else if (selectedOperation && b !== '') {
        let res = Math.sqrt(+b).toString();
        addToHistory(`√(${b}) = ${res}`);
        b = res;
        outputElement.innerHTML = b;
      }
    }

    document.getElementById("btn_op_square").onclick = function() {
      if (!selectedOperation && a !== '') {
        let res = ((+a) * (+a)).toString();
        addToHistory(`(${a})² = ${res}`);
        a = res;
        outputElement.innerHTML = a;
      } else if (selectedOperation && b !== '') {
        let res = ((+b) * (+b)).toString();
        addToHistory(`(${b})² = ${res}`);
        b = res;
        outputElement.innerHTML = b;
      }
    }

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

    document.getElementById("btn_op_fact").onclick = function() {
      if (!selectedOperation && a !== '') {
        let res = getFactorial(+a).toString();
        addToHistory(`${a}! = ${res}`);
        a = res;
        outputElement.innerHTML = a;
      } else if (selectedOperation && b !== '') {
        let res = getFactorial(+b).toString();
        addToHistory(`${b}! = ${res}`);
        b = res;
        outputElement.innerHTML = b;
      }
    }

    document.getElementById("btn_op_inv").onclick = function() {
      if (!selectedOperation && a !== '') {
        let res = (1 / (+a)).toString();
        addToHistory(`1/${a} = ${res}`);
        a = res;
        outputElement.innerHTML = a;
      } else if (selectedOperation && b !== '') {
        let res = (1 / (+b)).toString();
        addToHistory(`1/${b} = ${res}`);
        b = res;
        outputElement.innerHTML = b;
      }
    }

    const textColors = ['#64ffda', '#ff79c6', '#f1fa8c', '#8be9fd', '#50fa7b'];
    let currentTextColorIndex = 0;

    document.getElementById("btn_color_res").onclick = function() {
      currentTextColorIndex = (currentTextColorIndex + 1) % textColors.length;
      outputElement.style.color = textColors[currentTextColorIndex];
    }

    document.getElementById("btn_op_clear").onclick = function() {
      a = '';
      b = '';
      selectedOperation = null;
      expressionResult = '';
      outputElement.innerHTML = 0;
    }

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

      addToHistory(`${a} ${selectedOperation} ${b} = ${expressionResult}`);

      a = expressionResult.toString();
      b = '';
      selectedOperation = null;
      outputElement.innerHTML = a;
    }
  }
};
