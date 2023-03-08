import * as utils from "./utils.js";

let upperLine = document.querySelector(".upper-line");
let lowerLine = document.querySelector(".lower-line");

// initial calculator values
let firstNumber = parseFloat(lowerLine.innerText);
let secondNumber;
let operator = "";

const initApp = () => {
  handleKeyDownActions();
  handleDigitClick();
  handleOperatorClick();
  handleEqualClick();
  handleClearLine();
  handleClearEverything();
  handleLastDigitDeletion();
  handleChangeSignOperation();
  handleDecimalPointAddition();
};

const handleKeyDownActions = () => {
  document.addEventListener("keydown", (event) => {
    if (utils.NUM_KEYS.includes(event.key)) {
      selectDigit(event.key);
    } else if (utils.OPERATORS_KEYS.includes(event.key)) {
      selectOperator(event.key);
    } else if (utils.EQUAL_KEYS.includes(event.key)) {
      performEqualCalculation();
    }
  });
};

const handleDigitClick = () => {
  const numBtns = document.querySelectorAll(".num");
  numBtns.forEach((numBtn) => {
    numBtn.addEventListener("click", () => {
      selectDigit(numBtn.innerText);
    });
  });
};

const selectDigit = (digitSelected) => {
  if (
    parseFloat(lowerLine.innerText) === firstNumber ||
    upperLine.innerText.endsWith("=")
  ) {
    lowerLine.innerText = digitSelected;
    if (upperLine.innerText.endsWith("=")) {
      upperLine.innerText = "";
    }
  } else {
    if (lowerLine.innerText.length < utils.MAX_DIGIT_COUNT) {
        lowerLine.innerText += digitSelected;
    }
    
  }
};

const handleOperatorClick = () => {
  const operatorBtns = document.querySelectorAll(".operator");
  operatorBtns.forEach((operatorBtn) => {
    operatorBtn.addEventListener("click", () => {
      selectOperator(operatorBtn.innerText);
    });
  });
};

const selectOperator = (operatorSelected) => {
  if (operator === "") {
    firstNumber = parseFloat(lowerLine.innerText);
    upperLine.innerText = lowerLine.innerText + operatorSelected;
    lowerLine.innerText = firstNumber.toString();
  } else {
    if (
      !upperLine.innerText.endsWith("=") &&
      firstNumber !== parseFloat(lowerLine.innerText)
    ) {
      secondNumber = parseFloat(lowerLine.innerText);
      firstNumber = utils.performMathOperation(
        firstNumber,
        secondNumber,
        operator
      );

      upperLine.innerText = firstNumber;
      upperLine.innerText += operator;
      lowerLine.innerText = firstNumber;
    } else {
      secondNumber = firstNumber;
      upperLine.innerText = firstNumber + operatorSelected;
    }
  }
  operator = operatorSelected;
};

const handleEqualClick = () => {
  const equalBtn = document.querySelector(".equal");
  equalBtn.addEventListener("click", () => {
    performEqualCalculation();
  });
};

const performEqualCalculation = () => {
  if (operator === "") {
    firstNumber = parseFloat(lowerLine.innerText);
    upperLine.innerText = lowerLine.innerText + "=";
    lowerLine.innerText = firstNumber.toString();
  } else {
    if (!secondNumber || firstNumber !== parseFloat(lowerLine.innerText)) {
      secondNumber = parseFloat(lowerLine.innerText);
    }

    lowerLine.innerText = utils.performMathOperation(
      firstNumber,
      secondNumber,
      operator
    );

    upperLine.innerText =
      firstNumber.toString() + operator + secondNumber.toString() + "=";
    firstNumber = parseFloat(lowerLine.innerText);
  }
};

const handleClearEverything = () => {
  const clearBtn = document.querySelector(".clear-all");
  clearBtn.addEventListener("click", () => {
    resetUpperLine();
    resetLowerLine();
    operator = "";
  });
};

const handleClearLine = () => {
  const clearBtn = document.querySelector(".clear");
  clearBtn.addEventListener("click", () => {
    resetLowerLine();
  });
};

const resetLowerLine = () => {
  lowerLine.innerText = "0";
  firstNumber = parseFloat(lowerLine.innerText);
};

const resetUpperLine = () => {
  upperLine.innerText = "";
  secondNumber = null;
};

const handleLastDigitDeletion = () => {
  const delBtn = document.querySelector(".del");
  delBtn.addEventListener("click", () => {
    if (lowerLine.innerText.length === 1) {
      resetLowerLine();
    } else {
      lowerLine.innerText = lowerLine.innerText.slice(
        0,
        lowerLine.innerText.length - 1
      );
    }
  });
};

const handleChangeSignOperation = () => {
  const changeSignBtn = document.querySelector(".change-sign");
  changeSignBtn.addEventListener("click", () => {
    if (lowerLine.innerText !== "0") {
      if (lowerLine.innerText.startsWith("-")) {
        lowerLine.innerText = lowerLine.innerText.slice(1);
      } else {
        lowerLine.innerText = "-" + lowerLine.innerText;
      }
    }
  });
};

const handleDecimalPointAddition = () => {
  const decimalPointBtn = document.querySelector(".decimal-point");
  decimalPointBtn.addEventListener("click", () => {
    if (!lowerLine.innerText.includes(".")) {
      lowerLine.innerText = lowerLine.innerText + ".";
    }
  });
};

document.addEventListener("DOMContentLoaded", initApp);
