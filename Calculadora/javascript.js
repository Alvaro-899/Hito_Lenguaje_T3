document.addEventListener('DOMContentLoaded', function() {
    const calculator = document.querySelector('.calculator');
    const keys = calculator.querySelector('.calculator__keys');
    const display = document.querySelector('.calculator__display');
    let firstValue = null;
    let operator = null;
    let awaitingNextNumber = false;

    keys.addEventListener('click', function(e) {
        if (e.target.matches('button')) {
            const key = e.target;
            const action = key.dataset.action;
            const keyContent = key.textContent;

            if (!action) {
                if (awaitingNextNumber) {
                    display.textContent = keyContent;
                    awaitingNextNumber = false;
                } else {
                    display.textContent = display.textContent === '0' ? keyContent : display.textContent + keyContent;
                }
            }

            if (action === 'decimal') {
                if (!display.textContent.includes('.')) {
                    display.textContent += '.';
                } else if (awaitingNextNumber) {
                    display.textContent = '0.';
                    awaitingNextNumber = false;
                }
            }

            if (
                action === 'add' ||
                action === 'subtract' ||
                action === 'multiply' ||
                action === 'divide' ||
                action === 'percentage'
            ) {
                const num = parseFloat(display.textContent);
                if (firstValue === null) {
                    firstValue = num;
                } else if (operator) {
                    const result = operate(firstValue, num, operator);
                    display.textContent = result;
                    firstValue = result;
                }
                operator = action;
                awaitingNextNumber = true;
            }

            if (action === 'clear') {
                display.textContent = '0';
                firstValue = null;
                operator = null;
                awaitingNextNumber = false;
            }

            if (action === 'calculate') {
                if (operator && !awaitingNextNumber) {
                    const num = parseFloat(display.textContent);
                    const result = operate(firstValue, num, operator);
                    display.textContent = result;
                    firstValue = result;
                    operator = null;
                    awaitingNextNumber = true;
                }
            }

            if (action === 'square') {
                const num = parseFloat(display.textContent);
                const result = num * num;
                display.textContent = result;
                firstValue = result;
                awaitingNextNumber = true;
            }

            if (action === 'square-root') {
                const num = parseFloat(display.textContent);
                const result = Math.sqrt(num);
                display.textContent = result;
                firstValue = result;
                awaitingNextNumber = true;
            }

            Array.from(keys.children).forEach(key => key.classList.remove('is-depressed'));
            key.classList.add('is-depressed');
        }
    });

    function operate(num1, num2, operator) {
        switch (operator) {
            case 'add':
                return num1 + num2;
            case 'subtract':
                return num1 - num2;
            case 'multiply':
                return num1 * num2;
            case 'divide':
                return num1 / num2;
            case 'percentage':
                return num1 * (num2 / 100);
            default:
                return num2;
        }
    }
});
