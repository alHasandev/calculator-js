// import Calculator, { compute } from "../index.js";
const calculator = new Calculator();

console.log("2^2 =", compute("2^2"));

const calcWrapper1 = document.querySelector(".calculator-wrapper");

// set controls list
// calculator.controls = [
//   {
//     label: "7",
//     display: "7",
//     code: "7",
//   },
//   {
//     label: "8",
//     display: "8",
//     code: "8",
//   },
//   {
//     label: "9",
//     display: "9",
//     code: "9",
//   },
//   {
//     type: "submit",
//     label: "=",
//   },
// ];

calculator.extra = () => {
  alert("test extra button");
};

console.log(calculator);

calculator.renderTo(calcWrapper1, {
  style: true,
});

calculator.initControl();
