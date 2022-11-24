// for setting focus on input field windows
document.querySelector(".input-field").focus();

let txt = document.getElementById("my-text");

txt.addEventListener("keydown", changeX);

function changeX(key) {
  if (key.key == "x" || key.key == "X" || key.key == "*") {
    txt.value += "\u{00D7}";
  } else if (key.key == "Enter" || key.key == "=") {
    if (!(txt.value == "")) {
      txt.value = txt.value.replace("\u{00D7}", "*");
      txt.value = txt.value.replace("\u{00F7}", "/");
      txt.value = txt.value.replace("%", "*0.01*");
      txt.value = eval(txt.value);
    }
  } else if (key.key == "/") {
    txt.value += "\u{00F7}";
  } else if (key.key == "Escape") {
    txt.value = "";
  }
}

function checkValue(key) {
  console.log(`Value of ${key}`);
  value =
    (key >= "0" && key <= "9") ||
    [
      "+",
      "-",
      "%",
      ".",
      "(",
      ")",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Control",
      "Backspace",
    ].includes(key);
  return value;
}

let calcButtons = document.querySelectorAll(".calc-button");
console.log(calcButtons);

// console.log(calcButtons[18].innerHTML)

// calcButtons.addEventListener("click", printValue);

for (let i = 0; i < calcButtons.length; i++) {
  if (i == 18) {
    document
      .querySelectorAll(".calc-button")[18]
      .addEventListener("click", delLast);
  } else {
    document
      .querySelectorAll(".calc-button")
      [i].addEventListener("click", printValue);
  }
  // console.log(i)
}

function delLast() {
  txt.value = txt.value.slice(0, -1);
  document.querySelector(".input-field").focus();
  window.navigator.vibrate(18);
}

function printValue(e) {
  console.log("Im clicked.");
  console.log(e.srcElement.innerText);
  if (e.srcElement.innerText == "AC") {
    txt.value = "";
    window.navigator.vibrate(18);
  }
  //barcets ka logic
  else if (e.srcElement.innerText == "(  )") {
    alert("Not implemented yet");
    window.navigator.vibrate(18);
  } 
  else if (e.srcElement.innerText == "%") {
    txt.value += "%";
    window.navigator.vibrate(18);
  }
  // else if(e.srcElement.innerText == '·'){
  //     let dotPos = 0;
  //     const array1= ["/","*", "-", "+","%"]
  //     const isIncluded =  array1.some(value => txt.value.includes(value))

  //     if(!(txt.value.includes('.'))){
  //         txt.value += '.';
  //     }
  //     else if()
  // }
  else if (e.srcElement.innerText == "·") {
      txt.value += ".";
      window.navigator.vibrate(18);
    }
  else if (e.srcElement.innerText == "=") {
    if (!(txt.value == "")) {
      txt.value = txt.value.replace("\u{00D7}", "*");
      txt.value = txt.value.replace("\u{00F7}", "/");
      txt.value = txt.value.replace("%", "*0.01*");
      txt.value = txt.value.replace("–", "-");
      txt.value = eval(txt.value);
    }
    window.navigator.vibrate(18);
  }
  // else if (){
  //     str = str.slice(0, -1);
  //     txt.value = txt.value
  // }
  else {
    txt.value += e.srcElement.innerText;
    window.navigator.vibrate(18);
  }
  document.querySelector(".input-field").focus();
}

// Backspace and delete ko implemet karna hai
