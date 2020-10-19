## What is this

A simple calculator class constructor with function in js

## Instalation

Run `npm i alhasandev-calculator`

## HTML

`<div class="calculator-wrapper"></div>`

## JavaScript ES6:

```
import Calculator from 'alhasandev-calculator'

// Init calculator object
const calculator = new Calculator()

// Render calculator on a html element
const calcWrapper = document.querySelector(".calculator-wrapper");
calculator.renderTo(calcWrapper, {
  style: true, // true or false for default style
});

// Init controls event
calculator.initControls();
```

## Common use / Web browser:

```
<div class="calculator-wrapper"></div>

<!-- link to calculator.js file -->
<script src="/calculator/calculator.js"></script>
<script>
// Init calculator object
const calculator = new Calculator()

// Render calculator on a html element
const calcWrapper = document.querySelector(".calculator-wrapper");
calculator.renderTo(calcWrapper, {
  style: true, // true or false for default style
});

// Init controls event
calculator.initControls();
</script>
```

## Parameters of method renderTo

calculator method renderTo accepts two parameter, `htmlElement` HTML element reference (required) and `options` (optional).
