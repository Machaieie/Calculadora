const display = document.getElementsByClassName("display")[0];
const buttons = document.querySelectorAll(".btn");

let currentInput = ""; // Armazena o número ou operador atual
let previousValue = ""; // Armazena o valor anterior
let operator = ""; // Armazena o operador atual

// Loop para adicionar evento de clique a cada botão
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const buttonClick = button.getAttribute("value") || button.value;

        // Lógica para o botão "C" (limpar)
        if (buttonClick === "C") {
            display.textContent = "0";
            currentInput = "";
            previousValue = "";
            operator = "";
            return;
        }

        // Lógica para os operadores
        if (["+", "-", "/", "*"].includes(buttonClick)) {
            // Garante que o operador seja adicionado após um número
            if (currentInput !== "") {
                if (previousValue === "") {
                    previousValue = currentInput; // Guarda o valor atual
                } else {
                    previousValue = evaluate(); // Calcula a operação anterior
                }
                operator = buttonClick; // Guarda o operador
                currentInput = ""; // Limpa o número atual para o próximo valor
                display.textContent = previousValue + " " + operator;
            }
            return;
        }

        // Lógica para o botão "="
        if (buttonClick === "=") {
            if (currentInput !== "" && previousValue !== "") {
                const result = evaluate();
                display.textContent = result;
                currentInput = result; // O resultado agora é o novo valor atual
                previousValue = ""; // Reseta o valor anterior
                operator = ""; // Reseta o operador
            }
            return;
        }

        // Lógica para números e ponto
        if (buttonClick === "." && currentInput.includes(".")) {
            return; // Não permite adicionar mais de um ponto
        }

        currentInput += buttonClick; // Adiciona o número ou ponto
        display.textContent = previousValue + " " + operator + " " + currentInput;
    });
});

// Função para calcular a expressão
function evaluate() {
    const num1 = parseFloat(previousValue);
    const num2 = parseFloat(currentInput);
    let result = 0;
    
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
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

    return result;
}
