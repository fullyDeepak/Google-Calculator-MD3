// for setting focus on input field windows
document.querySelector('.input-field').focus();

let txt = document.getElementById('my-text');

txt.addEventListener('keydown', (key) => {
  changeX(key.key);
});

let decimalPoint = true;

let bracket = true;

const operator = ['.', '+', '-', '*', '/', '%', '', '\u{00D7}', '\u{00F7}'];

function changeX(symbol) {
  //if pressed key is a operator
  if (operator.includes(symbol)) {
    //if len is 0
    if (txt.value.length == 0) {
      if (symbol === '-') {
        txt.value += '-';
      } else if (symbol === '.') {
        txt.value += '0.';
        decimalPoint = false;
      }
    }
    //if len is 1 and it is not a operator
    else if (txt.value.length === 1 && !operator.includes(txt.value)) {
      if (symbol === '+') {
        txt.value += '+';
      } else if (symbol === '-') {
        txt.value += '-';
      } else if (symbol === '*') {
        txt.value += '\u{00D7}';
      } else if (symbol === '/') {
        txt.value += '\u{00F7}';
      } else if (symbol === '%') {
        txt.value += '%';
      } else if (symbol === '.') {
        txt.value += '.';
        decimalPoint = false;
      }
    }
    //if len is greater than 1
    else if (txt.value.length > 1) {
      //if last char is an operator then replace with pressed one
      if (operator.includes(txt.value[txt.value.length - 1])) {
        if (symbol === '+') {
          txt.value = txt.value.slice(0, -1);
          txt.value += '+';
          decimalPoint = true;
        } else if (symbol === '-') {
          txt.value = txt.value.slice(0, -1);
          txt.value += '-';
          decimalPoint = true;
        } else if (symbol === '*') {
          txt.value = txt.value.slice(0, -1);
          txt.value += '\u{00D7}';
          decimalPoint = true;
        } else if (symbol === '/') {
          txt.value = txt.value.slice(0, -1);
          txt.value += '\u{00F7}';
          decimalPoint = true;
        } else if (symbol === '%') {
          txt.value = txt.value.slice(0, -1);
          txt.value += '%';
          decimalPoint = true;
        }
      }
      //if len is greater than 1 and last char is not an operator
      else {
        if (symbol === '+') {
          txt.value += '+';
          decimalPoint = true;
        } else if (symbol === '-') {
          txt.value += '-';
          decimalPoint = true;
        } else if (symbol === '*') {
          txt.value += '\u{00D7}';
          decimalPoint = true;
        } else if (symbol === '/') {
          txt.value += '\u{00F7}';
          decimalPoint = true;
        } else if (symbol === '%') {
          txt.value += '%';
          decimalPoint = true;
        }
        //start here
        else if (symbol === '.') {
          if (decimalPoint) {
            txt.value += '.';
            decimalPoint = false;
          }
        }
      }
    }
  } else if (symbol == 'Enter' || symbol == '=') {
    if (!(txt.value == '')) {
      txt.value = txt.value.replaceAll('\u{00D7}', '*');
      txt.value = txt.value.replaceAll('\u{00F7}', '/');
      txt.value = txt.value.replaceAll('%', '*0.01*');
      if (operator.includes(txt.value[txt.value.length - 1])) {
        txt.value = txt.value.slice(0, -1);
        try {
          txt.value = eval(txt.value);
        } catch (error) {
          txt.value = 'Error';
        }
      } else {
        try {
          txt.value = eval(txt.value);
        } catch (error) {
          txt.value = 'Error';
        }
      }
    }
  } else if (symbol == 'Escape') {
    txt.value = '';
  }
}

function checkValue(key) {
  // console.log(`Value of ${key}`);
  value =
    (key >= '0' && key <= '9') ||
    [
      '(',
      ')',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Control',
      'Backspace',
    ].includes(key);
  return value;
}

let calcButtons = document.querySelectorAll('.calc-button');
// console.log(calcButtons);

// console.log(calcButtons[18].innerHTML)

// calcButtons.addEventListener("click", printValue);

for (let i = 0; i < calcButtons.length; i++) {
  //AC button
  if (i == 0) {
    calcButtons[0].addEventListener('click', () => {
      txt.value = '';
      window.navigator.vibrate(18);
      document.querySelector('.input-field').focus();
      bracket = true;
    });
  } else if (i == 1) {
    calcButtons[i].addEventListener('click', () => {
      window.navigator.vibrate(18);
      if (bracket && txt.value[txt.value.length - 1] != ')') {
        txt.value += '(';
        document.querySelector('.input-field').focus();
        bracket = false;
      } else if (bracket == false && txt.value[txt.value.length - 1] != '(') {
        txt.value += ')';
        document.querySelector('.input-field').focus();
        bracket = true;
      }
    });
  }
  //number input through html div
  else if (
    (i >= 4 && i <= 6) ||
    (i >= 8 && i <= 10) ||
    (i >= 12 && i <= 14) ||
    i === 16
  ) {
    calcButtons[i].addEventListener('click', () => {
      txt.value = txt.value + calcButtons[i].innerText;
      window.navigator.vibrate(18);
      document.querySelector('.input-field').focus();
    });
  }
  //backspace key
  else if (i == 18) {
    calcButtons[i].addEventListener('click', () => {
      if (txt.value[txt.value.length - 1] === '(') {
        bracket = true;
      }
      txt.value = txt.value.slice(0, -1);
      document.querySelector('.input-field').focus();
      window.navigator.vibrate(18);
    });
  } else if (i == 19) {
    calcButtons[i].addEventListener('click', () => {
      if (!(txt.value == '')) {
        txt.value = txt.value.replaceAll('\u{00D7}', '*');
        txt.value = txt.value.replaceAll('\u{00F7}', '/');
        txt.value = txt.value.replaceAll('%', '*0.01*');
        if (operator.includes(txt.value[txt.value.length - 1])) {
          txt.value = txt.value.slice(0, -1);
          try {
            txt.value = eval(txt.value);
          } catch (error) {
            txt.value = 'Error';
          }
        } else {
          try {
            txt.value = eval(txt.value);
          } catch (error) {
            txt.value = 'Error';
          }
        }
      }
      window.navigator.vibrate(18);
      document.querySelector('.input-field').focus();
    });
  }
  //for % div
  else if (i == 2) {
    calcButtons[i].addEventListener('click', (e) => {
      changeX('%');
      window.navigator.vibrate(18);
      document.querySelector('.input-field').focus();
    });
  }
  //for / div
  else if (i == 3) {
    calcButtons[i].addEventListener('click', (e) => {
      changeX('/');
      window.navigator.vibrate(18);
      document.querySelector('.input-field').focus();
    });
  }
  //for X div
  else if (i == 7) {
    calcButtons[i].addEventListener('click', (e) => {
      changeX('*');
      window.navigator.vibrate(18);
      document.querySelector('.input-field').focus();
    });
  }
  //for % div
  else if (i == 11) {
    calcButtons[i].addEventListener('click', (e) => {
      changeX('-');
      window.navigator.vibrate(18);
      document.querySelector('.input-field').focus();
    });
  }
  //for % div
  else if (i == 15) {
    calcButtons[i].addEventListener('click', (e) => {
      changeX('+');
      window.navigator.vibrate(18);
      document.querySelector('.input-field').focus();
    });
  } else if (i == 17) {
    calcButtons[i].addEventListener('click', (e) => {
      changeX('.');
      window.navigator.vibrate(18);
      document.querySelector('.input-field').focus();
    });
  }
}

// Backspace and delete ko implemet karna hai
