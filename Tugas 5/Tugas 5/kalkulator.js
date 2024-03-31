function clearDisplay() {
  document.getElementById("display").value = "";
}

function deleteLastCharacter() {
  let displayValue = document.getElementById("display").value;
  document.getElementById("display").value = displayValue.slice(0, -1);
}

function appendToDisplay(value) {
  document.getElementById("display").value += value;
}

function calculate() {
  try {
    const result = eval(document.getElementById("display").value);
    document.getElementById("display").value = result;
  } catch (error) {
    document.getElementById("display").value = "Error";
  }
}

function calculatePercentage() {
  let displayValue = document.getElementById("display").value;
  document.getElementById("display").value = eval(displayValue + "/100");
}

function calculateMultiplication() {
  let displayValue = document.getElementById("display").value;
  document.getElementById("display").value = eval(displayValue);
}
