const display = document.getElementsByClassName("display")[0];
const buttons = document.querySelectorAll(".btn");

let currentInput = ""; 
let previousValue = ""; 
let operator = ""; 

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const buttonClick = button.getAttribute("value") || button.value;

        if (buttonClick === "C") {
            display.textContent = "0";
            currentInput = "";
            previousValue = "";
            operator = "";
            return;
        }

        if (buttonClick === "del") {
            if (currentInput) {
                currentInput = currentInput.slice(0, -1);
                display.textContent = previousValue + " " + operator + " " + currentInput;
            }
            return;
        }

        if (["+", "-", "/", "*", "^", "√"].includes(buttonClick)) {
            if (buttonClick === "√") {
                if (currentInput || previousValue) {
                    currentInput = evaluate("√");
                    display.textContent = currentInput;
                    previousValue = currentInput;
                    currentInput = "";
                }
            } else {
                if (currentInput !== "") {
                    previousValue = previousValue || currentInput;
                    operator = buttonClick;
                    currentInput = "";
                    display.textContent = previousValue + " " + operator;
                }
            }
            return;
        }

        if (buttonClick === "=") {
            if (currentInput !== "" && previousValue !== "") {
                display.textContent = evaluate();
                currentInput = display.textContent; 
                previousValue = ""; 
                operator = ""; 
            }
            return;
        }

        if (buttonClick === "." && currentInput.includes(".")) {
            return;
        }

        currentInput += buttonClick;
        display.textContent = previousValue + " " + operator + " " + currentInput;
    });
});

function evaluate(op = operator) {
    const num1 = parseFloat(previousValue);
    const num2 = parseFloat(currentInput);
    let result = 0;
    
    switch (op) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "√":
            result = Math.sqrt(num1 || num2);
            break;
        case "^":
            result = num1 ** num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num1 / num2;
            break;
        default:
            break;
    }

    return result.toString();
}
