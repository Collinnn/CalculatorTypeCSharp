import "./style.css";
import { calculate } from "./api";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
    <div class="calculator">
        <div id="display" class="display">0</div>

        <div class="buttons">
            <button data-value="7">7</button>
            <button data-value="8">8</button>
            <button data-value="9">9</button>
            <button data-operation="/">÷</button>

            <button data-value="4">4</button>
            <button data-value="5">5</button>
            <button data-value="6">6</button>
            <button data-operation="*">×</button>

            <button data-value="1">1</button>
            <button data-value="2">2</button>
            <button data-value="3">3</button>
            <button data-operation="-">−</button>

            <button data-value="0">0</button>
            <button id="clear">C</button>
            <button id="equals">=</button>
            <button data-operation="+">+</button>
        </div>
    </div>
`;

const display = document.querySelector<HTMLDivElement>("#display")!;


//Binary wait for second number, so no more than 2 int
let firstNumber: number | null = null;
let operation: string | null = null;
let waitingForSecondNumber = false;

const numberButtons =
    document.querySelectorAll<HTMLButtonElement>("[data-value]");

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value!;

        if (waitingForSecondNumber) {
            display.textContent = value;
            waitingForSecondNumber = false;
        } else {
            display.textContent =
                display.textContent === "0"
                    ? value
                    : display.textContent + value;
        }
    });
});


const operationButtons =
    document.querySelectorAll<HTMLButtonElement>("[data-operation]");

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        firstNumber = Number(display.textContent);
        operation = button.dataset.operation!;
        waitingForSecondNumber = true;
    });
});


//What should happen with equals button click
document.querySelector("#equals")!.addEventListener("click", async () => {
    if (firstNumber === null || operation === null) {
        return;
    }

    const secondNumber = Number(display.textContent);

    try {
        const result = await calculate(
            firstNumber,
            secondNumber,
            operation
        );

        display.textContent = String(result);

        firstNumber = null;
        operation = null;
    } catch (error) {
        display.textContent =
            error instanceof Error
                ? error.message
                : "Error";
    }
});

// clear Button
document.querySelector("#clear")!.addEventListener("click", () => {
    display.textContent = "0";
    firstNumber = null;
    operation = null;
    waitingForSecondNumber = false;
});