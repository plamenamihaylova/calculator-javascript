export const NUM_KEYS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
export const OPERATORS_KEYS = ["+", "-", "*", "/"];
export const EQUAL_KEYS = ["=", "Enter"];
export const MAX_DIGIT_COUNT = 8;

export const performMathOperation = (firstNumber, secondNumber, operator) => {
  switch (operator) {
    case "+":
      return firstNumber + secondNumber;

    case "-":
      return firstNumber - secondNumber;

    case "*":
      return firstNumber * secondNumber;

    case "/":
      if (secondNumber === 0) {
        return "Cannot divide by zero";
      }
      return firstNumber / secondNumber;
  }
};