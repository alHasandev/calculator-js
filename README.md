## What is this

A simple calculator class constructor with function in js

## Instalation

Run `npm i alhasandev-calculator`

## CSS

```
/* Copy css code below for default styling: */

.calculator.wrapper {
  width: 100%;
  border: 1px solid black;
  padding: 0.5rem;
  box-sizing: border-box;
  /* background-color: white; */
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.3);
}

.calculator .displays {
  margin-bottom: 0.5rem;
  border: 1px solid black;
}

.calculator .screen {
  box-sizing: border-box;
  text-align: right;
  width: 100%;
  padding: 0.5rem;
  font-size: 1.2rem;
  border: none;
  outline: none;
  cursor: pointer;
}

.calculator .controls {
  display: grid;
  column-gap: 0.5rem;
  row-gap: 0.25rem;
  grid-template-columns: repeat(4, 1fr);
}

.calculator .btn {
  cursor: pointer;
  padding: 0.25rem;
}

/* extra utilities */
.max-width-32 {
  max-width: 32rem;
}

/* --Or you can simply write your own css using above selector */


```

## HTML

`<div class="calculator-wrapper"></div>`

## JavaScript:

```
import Calculator from 'alhasandev-calculator'

// Init calculator object
const calculator = new Calculator()

// Render calculator on a html element
calculator.renderTo(".calculator-wrapper");

// Init controls event
calculator.initControlsEvent();

```

## Parameters contructor

Calculator constructor accepts two parameters, `_id` (optional) and `initEvent` (optional).

By default, `_id` is undefined and will be given random characters and `initEvent` set to false.

## Parameters of method renderTo

calculator method renderTo accepts one required parameter, `identifier` (query selector string format).
