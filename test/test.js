const calculator = new Calculator();

console.log(calculator);

const calcWrapper1 = document.querySelector(".calculator-wrapper");
calculator.renderTo(calcWrapper1, {
  style: true,
});

calculator.initControl();
